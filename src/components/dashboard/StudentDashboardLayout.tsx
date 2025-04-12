
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { logout } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { studentApi } from "@/api/studentApi";
import StudentSidebar from "./StudentSidebar";
import StudentDashboardHeader from "./StudentDashboardHeader";
import StudentDashboardTabs from "./StudentDashboardTabs";

const StudentDashboardLayout = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: profile, isLoading, error, refetch } = useQuery({
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

  const handleProfileUpdateSuccess = () => {
    refetch();
    toast.success("Profile updated successfully");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col">
        <StudentDashboardHeader 
          profile={profile} 
          setActiveTab={setActiveTab} 
          handleLogout={handleLogout}
        />
        
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
              <StudentDashboardTabs 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                profile={profile}
                onProfileUpdateSuccess={handleProfileUpdateSuccess}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
