
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Shield, 
  User, 
  LogOut, 
  Users, 
  Building2, 
  Settings, 
  Activity,
  FileText,
  CheckCircle,
  PieChart,
  UserPlus,
  Edit,
  AtSign,
  Phone
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { adminApi } from "@/api/adminApi";
import { useNavigate } from "react-router-dom";
import { logout } from "@/api/auth";
import WardensList from "@/components/admin/WardensList";
import StudentsList from "@/components/admin/StudentsList";
import HostelsList from "@/components/admin/HostelsList";
import WardenRegistration from "@/components/admin/WardenRegistration";
import { toast } from "sonner";
import { StatsCard } from "@/components/ui/dashboard/stats-card";
import { ActivityChart } from "@/components/ui/dashboard/activity-chart";
import { RecentActivity } from "@/components/ui/dashboard/recent-activity";
import { DashboardIllustration } from "@/components/assets";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Sample data for the activity chart
const occupancyData = [
  { name: "Jan", value: 65 },
  { name: "Feb", value: 70 },
  { name: "Mar", value: 75 },
  { name: "Apr", value: 80 },
  { name: "May", value: 85 },
  { name: "Jun", value: 90 },
  { name: "Jul", value: 92 },
  { name: "Aug", value: 88 },
];

// Sample data for recent activities with correct actionType values
const recentActivities = [
  {
    id: "1",
    user: { name: "System", initials: "SY" },
    action: "generated monthly report",
    timestamp: "1 hour ago",
    actionType: "info" as const
  },
  {
    id: "2",
    user: { name: "Admin", initials: "AD" },
    action: "registered new warden",
    timestamp: "Yesterday",
    actionType: "success" as const
  },
  {
    id: "3",
    user: { name: "Warden", initials: "WD" },
    action: "requested maintenance for Block C",
    timestamp: "2 days ago",
    actionType: "warning" as const
  },
];

// Added interface for admin profile
interface AdminProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  
  // Sample admin profile data
  const [adminProfile, setAdminProfile] = useState<AdminProfile>({
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    phone: "+91 9988776655",
    role: "Super Admin"
  });
  
  const [formData, setFormData] = useState({
    name: adminProfile.name,
    email: adminProfile.email,
    phone: adminProfile.phone
  });

  const { data: wardens, isLoading: isWardensLoading, error: wardensError } = useQuery({
    queryKey: ['adminWardens'],
    queryFn: () => adminApi.getAllWardens()
  });

  const { data: students, isLoading: isStudentsLoading, error: studentsError } = useQuery({
    queryKey: ['adminStudents'],
    queryFn: () => adminApi.getAllStudents()
  });

  // If there are errors, show error toasts
  if (wardensError) {
    toast.error("Failed to load wardens");
    console.error("Error fetching wardens:", wardensError);
  }

  if (studentsError) {
    toast.error("Failed to load students");
    console.error("Error fetching students:", studentsError);
  }

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate("/signin");
      toast.success("Logged out successfully");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminProfile({
      ...adminProfile,
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    });
    setIsEditProfileOpen(false);
    toast.success("Profile updated successfully");
  };

  const isLoading = isWardensLoading || isStudentsLoading;
  const hasError = wardensError || studentsError;

  // Calculate stats
  const totalWardens = wardens?.length || 0;
  const totalStudents = students?.length || 0;
  const totalHostels = 5; // Example static value
  const occupancyRate = 88; // Example static value

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col bg-white p-6 shadow-md md:flex">
        <div className="mb-6 text-2xl font-bold">Admin Portal</div>
        <nav className="flex-1 space-y-2">
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "overview" ? "bg-primary/10" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <Activity className="mr-2 h-4 w-4" />
            Overview
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "profile" ? "bg-primary/10" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "wardens" ? "bg-primary/10" : ""}`}
            onClick={() => setActiveTab("wardens")}
          >
            <Users className="mr-2 h-4 w-4" />
            Wardens
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "students" ? "bg-primary/10" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            <User className="mr-2 h-4 w-4" />
            Students
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "hostels" ? "bg-primary/10" : ""}`}
            onClick={() => setActiveTab("hostels")}
          >
            <Building2 className="mr-2 h-4 w-4" />
            Hostels
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "registerWarden" ? "bg-primary/10" : ""}`}
            onClick={() => setActiveTab("registerWarden")}
          >
            <Shield className="mr-2 h-4 w-4" />
            Register Warden
          </Button>
        </nav>
        <div className="border-t pt-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="border-b bg-white p-4 shadow-sm">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold md:hidden">Admin Portal</h1>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src="" alt="Admin profile" />
                      <AvatarFallback>{getInitials(adminProfile.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{adminProfile.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {adminProfile.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab("profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="container mx-auto">
            <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
              </div>
            ) : hasError ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-red-500">Error loading data. Please try again.</p>
                    <Button className="mt-4" onClick={() => window.location.reload()}>
                      Refresh
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="wardens">Wardens</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="hostels">Hostels</TabsTrigger>
                  <TabsTrigger value="registerWarden">Register Warden</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatsCard 
                      title="Total Students" 
                      value={totalStudents}
                      icon={<Users className="h-4 w-4" />}
                      description="Registered students"
                      trend={{ value: 12, isPositive: true }}
                    />
                    <StatsCard 
                      title="Total Wardens" 
                      value={totalWardens}
                      icon={<Shield className="h-4 w-4" />}
                      description="Active staff members"
                    />
                    <StatsCard 
                      title="Hostels" 
                      value={totalHostels}
                      icon={<Building2 className="h-4 w-4" />}
                      description="Managed properties"
                    />
                    <StatsCard 
                      title="Occupancy Rate" 
                      value={`${occupancyRate}%`}
                      icon={<PieChart className="h-4 w-4" />}
                      description="Current occupancy"
                      trend={{ value: 5, isPositive: true }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <ActivityChart 
                      title="Hostel Occupancy Trends" 
                      data={occupancyData}
                      className="lg:col-span-2"
                    />
                    
                    {!isMobile && (
                      <Card className="overflow-hidden flex items-center justify-center p-6 bg-primary/5">
                        <img 
                          src={DashboardIllustration} 
                          alt="Admin Dashboard" 
                          className="max-w-full h-auto object-contain max-h-[250px]" 
                        />
                      </Card>
                    )}
                    
                    <RecentActivity 
                      title="Recent Activities" 
                      activities={recentActivities}
                      className="lg:col-span-3"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="profile">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Admin Profile</CardTitle>
                            <CardDescription>Your personal and contact information</CardDescription>
                          </div>
                          <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Profile
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Your Profile</DialogTitle>
                                <DialogDescription>
                                  Update your personal information below
                                </DialogDescription>
                              </DialogHeader>
                              <form onSubmit={handleProfileSubmit}>
                                <div className="grid gap-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                      id="name"
                                      name="name"
                                      value={formData.name}
                                      onChange={handleInputChange}
                                      placeholder="Your full name"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                      id="email"
                                      name="email"
                                      type="email"
                                      value={formData.email}
                                      onChange={handleInputChange}
                                      placeholder="Your email address"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                      id="phone"
                                      name="phone"
                                      value={formData.phone}
                                      onChange={handleInputChange}
                                      placeholder="Your phone number"
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Save Changes</Button>
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col md:flex-row gap-8">
                          <div className="flex flex-col items-center space-y-4">
                            <Avatar className="h-32 w-32">
                              <AvatarImage src="" alt="Admin avatar" />
                              <AvatarFallback className="text-2xl">{getInitials(adminProfile.name)}</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" size="sm">
                              Upload Photo
                            </Button>
                          </div>
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                                <p className="flex items-center">
                                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                                  {adminProfile.name}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                <p className="flex items-center">
                                  <AtSign className="mr-2 h-4 w-4 text-muted-foreground" />
                                  {adminProfile.email}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                                <p className="flex items-center">
                                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                  {adminProfile.phone}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Role</p>
                                <p className="flex items-center">
                                  <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                                  {adminProfile.role}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="wardens">
                  <WardensList wardens={wardens || []} isLoading={isWardensLoading} />
                </TabsContent>
                <TabsContent value="students">
                  <StudentsList students={students || []} isLoading={isStudentsLoading} />
                </TabsContent>
                <TabsContent value="hostels">
                  <HostelsList hostels={[]} isLoading={false} />
                </TabsContent>
                <TabsContent value="registerWarden">
                  <WardenRegistration />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
