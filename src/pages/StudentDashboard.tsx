
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Settings, 
  LogOut,
  Book,
  Calendar,
  Home as HomeIcon,
  Bell,
  CreditCard,
  MessageSquare,
  ChevronDown,
  Users,
  Clock,
  Activity
} from "lucide-react";

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
import { studentApi } from "@/api/studentApi";
import { logout } from "@/api/auth";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentProfileTab from "@/components/student/StudentProfileTab";
import BookingsTab from "@/components/student/BookingsTab";
import PaymentsTab from "@/components/student/PaymentsTab";
import ComplaintsTab from "@/components/student/ComplaintsTab";
import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "@/components/ui/dashboard/stats-card";
import { ActivityChart } from "@/components/ui/dashboard/activity-chart";
import { RecentActivity } from "@/components/ui/dashboard/recent-activity";
import { useIsMobile } from "@/hooks/use-mobile";
import { StudentIllustration } from "@/components/assets";

// Sample data for the activity chart
const activityData = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 40 },
  { name: "Mar", value: 35 },
  { name: "Apr", value: 50 },
  { name: "May", value: 49 },
  { name: "Jun", value: 60 },
  { name: "Jul", value: 70 },
  { name: "Aug", value: 91 },
];

// Sample data for recent activities with correct actionType values
const recentActivities = [
  {
    id: "1",
    user: { name: "Admin", initials: "AD" },
    action: "approved your room allocation",
    timestamp: "2 hours ago",
    actionType: "success" as const
  },
  {
    id: "2",
    user: { name: "System", initials: "SY" },
    action: "processed your payment",
    timestamp: "1 day ago",
    actionType: "info" as const
  },
  {
    id: "3",
    user: { name: "Warden", initials: "WD" },
    action: "responded to your complaint",
    timestamp: "3 days ago",
    actionType: "info" as const
  },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['studentProfile'],
    queryFn: studentApi.getStudentProfile
  });

  if (error) {
    toast.error("Failed to load profile");
    console.error("Error fetching profile:", error);
  }

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate("/SignIn");
    }
  };

  const handleProfileClick = () => {
    setActiveTab("profile");
  };

  const handleSettingsClick = () => {
    toast.info("Settings page coming soon!");
  };

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
      <aside className="hidden w-64 bg-white shadow-md p-4 md:flex flex-col border-r">
        <div className="text-xl font-bold mb-6">Student Portal</div>
        
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
            className={`w-full justify-start ${activeTab === "bookings" ? "bg-primary/10" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Bookings
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "payments" ? "bg-primary/10" : ""}`}
            onClick={() => setActiveTab("payments")}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Payments
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "complaints" ? "bg-primary/10" : ""}`}
            onClick={() => setActiveTab("complaints")}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Complaints
          </Button>
        </nav>
        
        <div className="pt-4 border-t mt-auto">
          <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="md:hidden text-xl font-bold">Student Portal</div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="relative" size="icon">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src="" alt="Profile picture" />
                      <AvatarFallback>
                        {profile ? getInitials(profile.name) : "ST"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {profile ? profile.name : "Loading..."}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {profile ? profile.email : ""}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleProfileClick}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSettingsClick}>
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
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500">There was an error loading your profile.</p>
                <Button onClick={() => window.location.reload()} className="mt-4">
                  Try Again
                </Button>
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                  <TabsTrigger value="complaints">Complaints</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatsCard 
                      title="Room Number" 
                      value={profile?.roomId || "Not Assigned"}
                      icon={<HomeIcon className="h-4 w-4" />}
                      description="Your current room assignment"
                    />
                    <StatsCard 
                      title="Hostel Fee" 
                      value="₹25,000"
                      icon={<CreditCard className="h-4 w-4" />}
                      description="Per semester"
                      trend={{ value: 0, isPositive: true }}
                    />
                    <StatsCard 
                      title="Bookings" 
                      value="3"
                      icon={<Calendar className="h-4 w-4" />}
                      description="Total room bookings"
                      trend={{ value: 50, isPositive: true }}
                    />
                    <StatsCard 
                      title="Complaints" 
                      value="1"
                      icon={<MessageSquare className="h-4 w-4" />}
                      description="Open complaints"
                      trend={{ value: 25, isPositive: false }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <ActivityChart 
                      title="Hostel Activity" 
                      data={activityData}
                      className="lg:col-span-2"
                    />
                    
                    {!isMobile && (
                      <Card className="overflow-hidden flex items-center justify-center p-6 bg-primary/5">
                        <img 
                          src={StudentIllustration} 
                          alt="Student Dashboard" 
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
                  <StudentProfileTab profile={profile} />
                </TabsContent>
                <TabsContent value="bookings">
                  <BookingsTab studentId={profile?.id} />
                </TabsContent>
                <TabsContent value="payments">
                  <PaymentsTab studentId={profile?.id} />
                </TabsContent>
                <TabsContent value="complaints">
                  <ComplaintsTab studentId={profile?.id} />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
