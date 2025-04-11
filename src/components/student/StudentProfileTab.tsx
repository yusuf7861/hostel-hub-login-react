
import { useState } from "react";
import { toast } from "sonner";
import { User, AtSign, Phone, Hash } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { studentApi, UpdateStudent } from "@/api/studentApi";

interface StudentProfileProps {
  profile: any;
}

const StudentProfileTab = ({ profile }: StudentProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    contactNumber: profile?.contactNumber || "",
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create a properly typed update object
      const updateData: UpdateStudent = {
        email: formData.email,
        contactNumber: formData.contactNumber,
      };
      
      await studentApi.updateStudent(updateData);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Manage your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl">
                  {getInitials(profile?.name || "")}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                Upload Photo
              </Button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="flex-1 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        className="pl-10"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        className="pl-10"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="contactNumber"
                        name="contactNumber"
                        className="pl-10"
                        value={formData.contactNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            ) : (
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                    <p className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      {profile?.name || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="flex items-center">
                      <AtSign className="mr-2 h-4 w-4 text-muted-foreground" />
                      {profile?.email || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Contact Number</p>
                    <p className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      {profile?.contactNumber || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Roll Number</p>
                    <p className="flex items-center">
                      <Hash className="mr-2 h-4 w-4 text-muted-foreground" />
                      {profile?.rollNumber || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hostel Information</CardTitle>
          <CardDescription>Your current accommodation details</CardDescription>
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
    </div>
  );
};

export default StudentProfileTab;
