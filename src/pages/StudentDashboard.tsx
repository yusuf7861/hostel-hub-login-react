
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Settings, 
  LogOut,
  Book,
  Calendar,
  Home as HomeIcon,
  Bell
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

interface StudentProfile {
  id?: number;
  name: string;
  email: string;
  rollNumber: string;
  contactNumber: string;
  hostelId?: number;
  roomId?: number;
}

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        setIsLoading(true);
        const data = await studentApi.getStudentProfile();
        setProfile(data);
      } catch (error) {
        toast.error("Failed to load profile");
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentProfile();
  }, []);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate("/signin");
    }
  };

  const handleProfileClick = () => {
    // Navigate to profile page when implemented
    toast.info("Profile page coming soon!");
  };

  const handleSettingsClick = () => {
    // Navigate to settings page when implemented
    toast.info("Settings page coming soon!");
  };

  // Extract initials for avatar fallback
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
      <aside className="hidden w-64 bg-white shadow-md p-4 md:flex flex-col border-r">
        <div className="text-xl font-bold mb-6">Student Portal</div>
        
        <nav className="flex-1 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <HomeIcon className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Attendance
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Book className="mr-2 h-4 w-4" />
            Courses
          </Button>
        </nav>
        
        <div className="pt-4 border-t mt-auto">
          <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header/Navbar */}
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
        
        {/* Dashboard content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Information</CardTitle>
                    <CardDescription>Your personal details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {profile && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Name:</span>
                          <span className="font-medium">{profile.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Roll Number:</span>
                          <span className="font-medium">{profile.rollNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Email:</span>
                          <span className="font-medium">{profile.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Contact:</span>
                          <span className="font-medium">{profile.contactNumber}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Hostel Information</CardTitle>
                    <CardDescription>Your accommodation details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {profile?.hostelId ? (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Hostel ID:</span>
                          <span className="font-medium">{profile.hostelId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Room Number:</span>
                          <span className="font-medium">{profile.roomId || "Not assigned"}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">No hostel assigned yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Commonly used features</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <Button variant="outline" className="justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      View Attendance
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Book className="mr-2 h-4 w-4" />
                      View Courses
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={handleProfileClick}>
                      <User className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
