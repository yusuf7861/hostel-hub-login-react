
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import { Building2, LogOut, Shield, User, UserCog, Users } from "lucide-react";
import { publicApi } from "@/api/publicApi";
import { studentApi } from "@/api/studentApi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { logout } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import WardenRegistration from "@/components/admin/WardenRegistration";
import StudentsList from "@/components/admin/StudentsList";
import WardensList from "@/components/admin/WardensList";
import HostelsList from "@/components/admin/HostelsList";

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("students");

  // Fetch data for the dashboard
  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ["admin-students"],
    queryFn: studentApi.getAllStudents,
    onSettled: (data, error) => {
      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch students data",
          variant: "destructive",
        });
      }
    },
  });

  const { data: hostels, isLoading: hostelsLoading } = useQuery({
    queryKey: ["admin-hostels"],
    queryFn: publicApi.getHostels,
    onSettled: (data, error) => {
      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch hostels data",
          variant: "destructive",
        });
      }
    },
  });

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate("/signin");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage wardens, students, and hostels</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">Admin Portal</p>
              <p className="text-sm text-muted-foreground">System Administrator</p>
            </div>
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Shield size={20} />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Sidebar */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>System administration</CardDescription>
              <div className="mt-2">
                <Badge variant="outline" className="bg-primary/10">
                  Admin
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab("students")}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm ${
                    activeTab === "students" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <Users size={18} />
                  Students
                </button>
                <button
                  onClick={() => setActiveTab("wardens")}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm ${
                    activeTab === "wardens" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <UserCog size={18} />
                  Wardens
                </button>
                <button
                  onClick={() => setActiveTab("hostels")}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm ${
                    activeTab === "hostels" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <Building2 size={18} />
                  Hostels
                </button>
                <button
                  onClick={() => setActiveTab("register-warden")}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm ${
                    activeTab === "register-warden" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <User size={18} />
                  Register Warden
                </button>
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="flex w-full items-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Card>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4 grid w-full grid-cols-4">
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="wardens">Wardens</TabsTrigger>
                    <TabsTrigger value="hostels">Hostels</TabsTrigger>
                    <TabsTrigger value="register-warden">Register Warden</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="students">
                    <StudentsList students={students || []} isLoading={studentsLoading} />
                  </TabsContent>
                  
                  <TabsContent value="wardens">
                    <WardensList isLoading={false} />
                  </TabsContent>
                  
                  <TabsContent value="hostels">
                    <HostelsList hostels={hostels || []} isLoading={hostelsLoading} />
                  </TabsContent>
                  
                  <TabsContent value="register-warden">
                    <WardenRegistration />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
