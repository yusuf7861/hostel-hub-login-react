
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut, UserRound } from "lucide-react";
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

const WardenDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("students");

  const { data: students, isLoading, error } = useQuery({
    queryKey: ['wardenStudents'],
    queryFn: () => wardenApi.getStudentsForWarden(),
    onError: (error) => {
      toast.error("Failed to load students");
      console.error("Error fetching students:", error);
    }
  });

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate("/signin");
      toast.success("Logged out successfully");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col bg-white p-6 shadow-md md:flex">
        <div className="mb-6 text-2xl font-bold">Warden Portal</div>
        <nav className="flex-1 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("students")}
          >
            <UserRound className="mr-2 h-4 w-4" />
            Students
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("roomApprovals")}
          >
            <UserRound className="mr-2 h-4 w-4" />
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
        <main className="flex-1 p-6">
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
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="roomApprovals">Room Approvals</TabsTrigger>
                </TabsList>
                <TabsContent value="students">
                  <StudentList students={students || []} />
                </TabsContent>
                <TabsContent value="roomApprovals">
                  <RoomApproval students={students || []} />
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
