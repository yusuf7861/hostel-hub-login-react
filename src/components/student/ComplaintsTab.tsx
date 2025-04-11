
import { useState } from "react";
import { toast } from "sonner";
import { MessageSquare, Plus, Clock, CheckCircle, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ComplaintsTabProps {
  studentId?: number;
}

// Mock data for complaints
const mockComplaints = [
  {
    id: 1,
    subject: "Water Leakage in Room",
    category: "Maintenance",
    description: "There is water leaking from the ceiling in my room.",
    date: "2025-03-10",
    status: "resolved",
    response: "Maintenance team fixed the leakage on March 12th.",
  },
  {
    id: 2,
    subject: "Noisy Neighbors",
    category: "Noise Complaint",
    description: "The students in the adjacent room play loud music late at night.",
    date: "2025-04-05",
    status: "pending",
    response: null,
  },
];

const ComplaintsTab = ({ studentId }: ComplaintsTabProps) => {
  const [complaints, setComplaints] = useState(mockComplaints);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    category: "Maintenance",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically make an API call to submit a complaint
    // For now, we'll just simulate it with a timeout
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: "Submitting complaint...",
        success: "Complaint submitted successfully!",
        error: "Failed to submit complaint"
      }
    );
    
    // Add to our mock complaints with a pending status
    const newComplaint = {
      id: complaints.length + 1,
      subject: formData.subject,
      category: formData.category,
      description: formData.description,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      response: null,
    };
    
    setComplaints([...complaints, newComplaint]);
    setIsDialogOpen(false);
    setFormData({
      subject: "",
      category: "Maintenance",
      description: "",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Complaints</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Complaint
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit a Complaint</DialogTitle>
              <DialogDescription>
                Please provide details about your complaint or issue
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief title for your complaint"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                    <option value="Maintenance">Maintenance</option>
                    <option value="Noise Complaint">Noise Complaint</option>
                    <option value="Cleanliness">Cleanliness</option>
                    <option value="Security">Security</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Detailed description of your complaint or issue"
                    rows={5}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit Complaint</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Complaint History</CardTitle>
          <CardDescription>Track all your submitted complaints and their status</CardDescription>
        </CardHeader>
        <CardContent>
          {complaints.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{complaint.subject}</TableCell>
                    <TableCell>{complaint.category}</TableCell>
                    <TableCell>{complaint.date}</TableCell>
                    <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{complaint.subject}</DialogTitle>
                            <DialogDescription>
                              {complaint.category} - {complaint.date}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Description:</h4>
                              <p className="text-sm p-3 bg-muted rounded-md">
                                {complaint.description}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Status:</span>
                              {getStatusBadge(complaint.status)}
                            </div>
                            
                            {complaint.status === "pending" && (
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-2 h-4 w-4" />
                                Waiting for warden's response
                              </div>
                            )}
                            
                            {complaint.status === "resolved" && complaint.response && (
                              <div>
                                <h4 className="text-sm font-medium mb-2 flex items-center">
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                  Resolution:
                                </h4>
                                <p className="text-sm p-3 bg-muted rounded-md">
                                  {complaint.response}
                                </p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">You haven't submitted any complaints yet.</p>
              <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                Submit Your First Complaint
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplaintsTab;
