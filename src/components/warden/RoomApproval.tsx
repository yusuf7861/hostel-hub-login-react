
import { useState } from "react";
import { Student } from "@/api/studentApi";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Check,
  Loader2, 
  Search, 
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface RoomApprovalProps {
  students: Student[];
  isLoading: boolean;
}

interface RoomAssignment {
  studentId: number;
  hostelId: number;
  roomId: number;
  status: 'pending' | 'approved' | 'rejected';
}

// Mock data for room assignments
const mockRoomAssignments: RoomAssignment[] = [
  { studentId: 1, hostelId: 1, roomId: 101, status: 'pending' },
  { studentId: 2, hostelId: 1, roomId: 102, status: 'pending' },
  { studentId: 3, hostelId: 2, roomId: 201, status: 'approved' },
  { studentId: 4, hostelId: 2, roomId: 202, status: 'rejected' },
];

const RoomApproval = ({ students, isLoading }: RoomApprovalProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roomAssignments, setRoomAssignments] = useState<RoomAssignment[]>(mockRoomAssignments);
  const [processingIds, setProcessingIds] = useState<number[]>([]);

  const handleApproveRoom = async (studentId: number) => {
    try {
      setProcessingIds((prev) => [...prev, studentId]);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setRoomAssignments((prev) => 
        prev.map((assignment) => 
          assignment.studentId === studentId 
            ? { ...assignment, status: 'approved' } 
            : assignment
        )
      );
      
      toast({
        title: "Room Approved",
        description: "Student's room has been approved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve room",
        variant: "destructive",
      });
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== studentId));
    }
  };

  const handleRejectRoom = async (studentId: number) => {
    try {
      setProcessingIds((prev) => [...prev, studentId]);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setRoomAssignments((prev) => 
        prev.map((assignment) => 
          assignment.studentId === studentId 
            ? { ...assignment, status: 'rejected' } 
            : assignment
        )
      );
      
      toast({
        title: "Room Rejected",
        description: "Student's room has been rejected",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject room",
        variant: "destructive",
      });
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== studentId));
    }
  };

  // Combine students with their room assignments
  const studentsWithRooms = students.map(student => {
    const roomAssignment = roomAssignments.find(
      assignment => assignment.studentId === student.id
    );
    return {
      ...student,
      roomAssignment
    };
  });

  const filteredStudents = studentsWithRooms.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.roomAssignment && 
      String(student.roomAssignment.roomId).includes(searchTerm))
  );

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading room assignments...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, roll number, or room"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-md border">
          <p className="text-muted-foreground">No room assignments found</p>
        </div>
      ) : (
        <div className="overflow-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Hostel</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>
                    {student.roomAssignment ? `Hostel #${student.roomAssignment.hostelId}` : "Not assigned"}
                  </TableCell>
                  <TableCell>
                    {student.roomAssignment ? `Room #${student.roomAssignment.roomId}` : "Not assigned"}
                  </TableCell>
                  <TableCell>
                    {student.roomAssignment && (
                      <Badge variant={
                        student.roomAssignment.status === 'approved' ? 'default' :
                        student.roomAssignment.status === 'rejected' ? 'destructive' : 'outline'
                      }>
                        {student.roomAssignment.status.charAt(0).toUpperCase() + student.roomAssignment.status.slice(1)}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {student.roomAssignment && student.roomAssignment.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
                          onClick={() => handleApproveRoom(student.id || 0)}
                          disabled={processingIds.includes(student.id || 0)}
                        >
                          {processingIds.includes(student.id || 0) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleRejectRoom(student.id || 0)}
                          disabled={processingIds.includes(student.id || 0)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    {student.roomAssignment && student.roomAssignment.status !== 'pending' && (
                      <span className="text-sm text-muted-foreground">
                        {student.roomAssignment.status === 'approved' ? 'Approved' : 'Rejected'}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default RoomApproval;
