
import { 
  Activity,
  User, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  LogOut,
  UserPlus,
  Settings,
  List
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

const StudentSidebar = ({ activeTab, setActiveTab, handleLogout }: StudentSidebarProps) => {
  return (
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
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${activeTab === "register" ? "bg-primary/10" : ""}`}
          onClick={() => setActiveTab("register")}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Register Student
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${activeTab === "updateProfile" ? "bg-primary/10" : ""}`}
          onClick={() => setActiveTab("updateProfile")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Update Profile
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${activeTab === "allStudents" ? "bg-primary/10" : ""}`}
          onClick={() => setActiveTab("allStudents")}
        >
          <List className="mr-2 h-4 w-4" />
          All Students
        </Button>
      </nav>
      
      <div className="pt-4 border-t mt-auto">
        <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default StudentSidebar;
