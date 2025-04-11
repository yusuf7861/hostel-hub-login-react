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
  ChevronDown
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

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

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
      navigate("/signin");
    }
  };

  const handleProfileClick = () => {
    setActiveTab("profile");
  };

  const handleSettingsClick = () => {
    // Navigate to settings page when implemented
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
            className="w-full justify-start"
            onClick={() => setActiveTab("profile")}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => setActiveTab("bookings")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Bookings
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => setActiveTab("payments")}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Payments
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start"
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
        
        <main className="flex-1 p-4 md:p-6">
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
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                  <TabsTrigger value="complaints">Complaints</TabsTrigger>
                </TabsList>
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
