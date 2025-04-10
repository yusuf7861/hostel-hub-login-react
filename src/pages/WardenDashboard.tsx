
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Student } from "@/api/studentApi";
import { wardenApi } from "@/api/wardenApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import NavBar from "@/components/NavBar";
import StudentList from "@/components/warden/StudentList";
import RoomApproval from "@/components/warden/RoomApproval";
import { AlertCircle, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WardenDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("students");

  const { data: students, isLoading, error } = useQuery({
    queryKey: ["warden-students"],
    queryFn: wardenApi.getStudents,
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to fetch students data. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container mx-auto py-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 border-b p-6">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <div>
                <CardTitle>Error Loading Dashboard</CardTitle>
                <CardDescription>
                  There was an error loading the warden dashboard data. Please refresh the page or try again later.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Warden Dashboard</h1>
            <p className="text-muted-foreground">Manage students and room assignments</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">Warden Portal</p>
              <p className="text-sm text-muted-foreground">Hostel Management</p>
            </div>
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">W</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>Manage hostel operations</CardDescription>
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
                  onClick={() => setActiveTab("rooms")}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm ${
                    activeTab === "rooms" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <Users size={18} />
                  Room Approvals
                </button>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-3">
            <Card>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4 grid w-full grid-cols-2">
                    <TabsTrigger value="students">Student List</TabsTrigger>
                    <TabsTrigger value="rooms">Room Approvals</TabsTrigger>
                  </TabsList>
                  <TabsContent value="students">
                    <StudentList students={students || []} isLoading={isLoading} />
                  </TabsContent>
                  <TabsContent value="rooms">
                    <RoomApproval students={students || []} isLoading={isLoading} />
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

export default WardenDashboard;
