
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentProfileTab from "@/components/student/StudentProfileTab";
import BookingsTab from "@/components/student/BookingsTab";
import PaymentsTab from "@/components/student/PaymentsTab";
import ComplaintsTab from "@/components/student/ComplaintsTab";
import StudentRegistrationForm from "@/components/student/StudentRegistrationForm";
import StudentUpdateForm from "@/components/student/StudentUpdateForm";
import AllStudentsList from "@/components/student/AllStudentsList";
import StudentOverviewTab from "./StudentOverviewTab";

interface StudentDashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: any;
  onProfileUpdateSuccess: () => void;
}

const StudentDashboardTabs = ({ 
  activeTab, 
  setActiveTab, 
  profile,
  onProfileUpdateSuccess 
}: StudentDashboardTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
        <TabsTrigger value="complaints">Complaints</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
        <TabsTrigger value="updateProfile">Update Profile</TabsTrigger>
        <TabsTrigger value="allStudents">All Students</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <StudentOverviewTab profile={profile} />
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

      <TabsContent value="register">
        <StudentRegistrationForm />
      </TabsContent>

      <TabsContent value="updateProfile">
        {profile && <StudentUpdateForm student={profile} onSuccess={onProfileUpdateSuccess} />}
      </TabsContent>

      <TabsContent value="allStudents">
        <AllStudentsList />
      </TabsContent>
    </Tabs>
  );
};

export default StudentDashboardTabs;
