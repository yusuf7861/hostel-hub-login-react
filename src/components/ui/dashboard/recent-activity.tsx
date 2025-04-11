
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  timestamp: string;
  actionType?: "info" | "success" | "warning" | "error";
}

interface RecentActivityProps {
  title: string;
  activities: Activity[];
  className?: string;
}

export function RecentActivity({ title, activities, className }: RecentActivityProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.user.name}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
              {activity.actionType && (
                <div className={cn(
                  "ml-auto px-2.5 py-0.5 rounded-full text-xs font-medium",
                  {
                    "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300": activity.actionType === "info",
                    "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300": activity.actionType === "success",
                    "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300": activity.actionType === "warning",
                    "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300": activity.actionType === "error",
                  }
                )}>
                  {activity.actionType}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
