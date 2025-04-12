
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Settings, 
  LogOut, 
  UserRound, 
  Building2, 
  Activity,
  Users,
  Home,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Edit
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { logout } from "@/api/auth";
import { toast } from "sonner";
import { Student } from "@/api/studentApi";
import { wardenApi } from "@/api/wardenApi";
import StudentList from "@/components/warden/StudentList";
import RoomApproval from "@/components/warden/RoomApproval";
import { StatsCard } from "@/components/ui/dashboard/stats-card";
import { ActivityChart } from "@/components/ui/dashboard/activity-chart";
import { RecentActivity } from "@/components/ui/dashboard/recent-activity";
import { WardenIllustration } from "@/components/assets";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Sample data for the activity chart
const activityData = [
  { name: "Jan", value: 20 },
  { name: "Feb", value: 35 },
  { name: "Mar", value: 40 },
  { name: "Apr", value: 30 },
  { name: "May", value: 45 },
  { name: "Jun", value: 55 },
  { name: "Jul", value: 60 },
  { name: "Aug", value: 75 },
];

// Sample data for recent activities
const recentActivities = [
  {
    id: "1",
    user: { name: "John Smith", initials: "JS" },
    action: "requested room allocation",
    timestamp: "30 minutes ago",
    actionType: "warning" as const
  },
  {
    id: "2",
    user: { name: "Mary Johnson", initials: "MJ" },
    action: "filed a maintenance complaint",
    timestamp: "2 hours ago",
    actionType: "info" as const
  },
  {
    id: "3",
    user: { name: "Admin", initials: "AD" },
    action: "assigned new students to Block B",
    timestamp: "1 day ago",
    actionType: "info" as const
  },
];

// Added interface for warden profile
interface WardenProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  hostelId: number;
  hostelName?: string;
}

const WardenDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [wardenProfile, setWardenProfile] = useState<WardenProfile>({
    id: 1,
    name: "John Doe",
    email: "warden@example.com",
    phone: "+91 9876543210",
    hostelId: 1,
    hostelName: "Block A"
  });
  
  const [formData, setFormData] = useState({
    name: wardenProfile.name,
    email: wardenProfile.email,
    phone: wardenProfile.phone
  });

  const { data: students, isLoading, error } = useQuery({
    queryKey: ['wardenStudents'],
    queryFn: () => wardenApi.getStudentsForWarden()
  });

  // Handle error case separately to avoid the onError property
  if (error) {
    toast.error("Failed to load students");
    console.error("Error fetching students:", error);
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
    setWardenProfile({
      ...wardenProfile,
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    });
    setIsEditProfileOpen(false);
    toast.success("Profile updated successfully");
  };

  // Calculate stats from student data
  const totalStudents = students?.length || 0;
  const pendingApprovals = students?.filter(s => s.roomId === null)?.length || 0;
  const occupiedRooms = students?.filter(s => s.roomId !== null)?.length || 0;
  const availableRooms = 100 - occupiedRooms; // Assuming 100 total rooms

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
        <div className="mb-6 text-2xl font-bold">Warden Portal</div>
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
            className={`w-full justify-start ${activeTab === "students" ? "bg-primary/10" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            <UserRound className="mr-2 h-4 w-4" />
            Students
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "roomApprovals" ? "bg-primary/10" : ""}`}
            onClick={() => setActiveTab("roomApprovals")}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Room Approvals
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
            <h1 className="text-xl font-bold md:hidden">Warden Portal</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="relative" size="icon">
                <AlertCircle className="h-5 w-5" />
                {pendingApprovals > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src="" alt="Warden profile" />
                      <AvatarFallback>{getInitials(wardenProfile.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{wardenProfile.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {wardenProfile.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab("profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
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
            <h1 className="mb-6 text-2xl font-bold">Warden Dashboard</h1>
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
              </div>
            ) : error ? (
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
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="roomApprovals">Room Approvals</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatsCard 
                      title="Total Students" 
                      value={totalStudents}
                      icon={<Users className="h-4 w-4" />}
                      description="Registered students"
                    />
                    <StatsCard 
                      title="Pending Approvals" 
                      value={pendingApprovals}
                      icon={<Clock className="h-4 w-4" />}
                      description="Requests waiting approval"
                      trend={pendingApprovals > 5 ? { value: 30, isPositive: false } : { value: 10, isPositive: true }}
                    />
                    <StatsCard 
                      title="Occupied Rooms" 
                      value={occupiedRooms}
                      icon={<Home className="h-4 w-4" />}
                      description="Currently occupied"
                      trend={{ value: 15, isPositive: true }}
                    />
                    <StatsCard 
                      title="Available Rooms" 
                      value={availableRooms}
                      icon={<Building2 className="h-4 w-4" />}
                      description="Ready for allocation"
                      trend={{ value: 5, isPositive: false }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <ActivityChart 
                      title="Monthly Room Allocations" 
                      data={activityData}
                      className="lg:col-span-2"
                    />
                    
                    {!isMobile && (
                      <Card className="overflow-hidden flex items-center justify-center p-6 bg-primary/5">
                        <img 
                          src={WardenIllustration} 
                          alt="Warden Dashboard" 
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
                            <CardTitle>Warden Profile</CardTitle>
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
                              <AvatarImage src="" alt="Warden avatar" />
                              <AvatarFallback className="text-2xl">{getInitials(wardenProfile.name)}</AvatarFallback>
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
                                  {wardenProfile.name}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                <p className="flex items-center">
                                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                                  {wardenProfile.email}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                                <p className="flex items-center">
                                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                                  {wardenProfile.phone}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Hostel</p>
                                <p className="flex items-center">
                                  <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                                  {wardenProfile.hostelName}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="students">
                  <StudentList students={students || []} isLoading={isLoading} />
                </TabsContent>
                <TabsContent value="roomApprovals">
                  <RoomApproval students={students || []} isLoading={isLoading} />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default WardenDashboard;
