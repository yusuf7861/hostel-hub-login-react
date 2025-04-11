
import { useState } from "react";
import { toast } from "sonner";
import { Calendar, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface BookingsTabProps {
  studentId?: number;
}

// Mock data for bookings
const mockBookings = [
  {
    id: 1,
    roomNumber: "101",
    hostelName: "Boys Hostel A",
    bookingDate: "2025-01-15",
    status: "approved",
  },
  {
    id: 2,
    roomNumber: "203",
    hostelName: "Boys Hostel B",
    bookingDate: "2025-04-05",
    status: "pending",
  },
];

const BookingsTab = ({ studentId }: BookingsTabProps) => {
  const [bookings, setBookings] = useState(mockBookings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    hostelPreference: "",
    roomType: "single",
    specialRequests: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically make an API call to create a booking
    // For now, we'll just simulate it with a timeout
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: "Creating booking...",
        success: "Booking request submitted successfully!",
        error: "Failed to create booking"
      }
    );
    
    // Add to our mock bookings with a pending status
    const newBooking = {
      id: bookings.length + 1,
      roomNumber: "TBD",
      hostelName: formData.hostelPreference,
      bookingDate: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    
    setBookings([...bookings, newBooking]);
    setIsDialogOpen(false);
    setFormData({
      hostelPreference: "",
      roomType: "single",
      specialRequests: "",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Bookings</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Booking Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request a Room Booking</DialogTitle>
              <DialogDescription>
                Fill out the form below to request a room booking
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="hostelPreference">Hostel Preference</Label>
                  <Input
                    id="hostelPreference"
                    name="hostelPreference"
                    value={formData.hostelPreference}
                    onChange={handleChange}
                    placeholder="e.g., Boys Hostel A"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roomType">Room Type</Label>
                  <select
                    id="roomType"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="triple">Triple</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="Any special requirements or notes"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit Request</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
          <CardDescription>View all your room booking requests and their status</CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hostel</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Booking Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.hostelName}</TableCell>
                    <TableCell>{booking.roomNumber}</TableCell>
                    <TableCell>{booking.bookingDate}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">You haven't made any bookings yet.</p>
              <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                Create Your First Booking
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsTab;
