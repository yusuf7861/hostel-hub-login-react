
import { StatsCard } from "@/components/ui/dashboard/stats-card";
import { ActivityChart } from "@/components/ui/dashboard/activity-chart";
import { RecentActivity } from "@/components/ui/dashboard/recent-activity";
import { StudentIllustration } from "@/components/assets";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home as HomeIcon, CreditCard, Calendar, MessageSquare } from "lucide-react";

interface StudentOverviewTabProps {
  profile: any;
}

// Mock data for the overview tab
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

const StudentOverviewTab = ({ profile }: StudentOverviewTabProps) => {
  const isMobile = useIsMobile();
  
  return (
    <>
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
    </>
  );
};

export default StudentOverviewTab;
