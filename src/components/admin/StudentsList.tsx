
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface StudentsListProps {
  students: Student[];
  isLoading: boolean;
}

const StudentsList = ({ students, isLoading }: StudentsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((student) => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading students...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by name, roll number, or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {filteredStudents.length === 0 ? (
        <div className="flex h-48 items-center justify-center border rounded-md">
          <p className="text-muted-foreground">No students found</p>
        </div>
      ) : (
        <div className="overflow-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact Number</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id || student.rollNumber}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.contactNumber}</TableCell>
                  <TableCell>
                    {student.roomId ? `Room #${student.roomId}` : "Not assigned"}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={student.roomId ? "default" : "outline"}
                      className={student.roomId ? "bg-green-100 text-green-800" : ""}
                    >
                      {student.roomId ? "Allocated" : "Pending"}
                    </Badge>
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

export default StudentsList;
