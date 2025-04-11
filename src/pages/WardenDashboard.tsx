
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
  Calendar
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
    actionType: "warning"
  },
  {
    id: "2",
    user: { name: "Mary Johnson", initials: "MJ" },
    action: "filed a maintenance complaint",
    timestamp: "2 hours ago",
    actionType: "info"
  },
  {
    id: "3",
    user: { name: "Admin", initials: "AD" },
    action: "assigned new students to Block B",
    timestamp: "1 day ago",
    actionType: "info"
  },
];

const WardenDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");

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

  // Calculate stats from student data
  const totalStudents = students?.length || 0;
  const pendingApprovals = students?.filter(s => s.needsApproval)?.length || 0;
  const occupiedRooms = students?.filter(s => s.roomId)?.length || 0;
  const availableRooms = 100 - occupiedRooms; // Assuming 100 total rooms

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
                      <AvatarFallback>WD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        warden@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
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
