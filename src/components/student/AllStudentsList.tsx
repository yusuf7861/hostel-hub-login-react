
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Student, studentApi } from "@/api/studentApi";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search } from "lucide-react";

const AllStudentsList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: students = [], isLoading, error } = useQuery({
    queryKey: ['allStudents'],
    queryFn: studentApi.getAllStudents
  });

  const filteredStudents = students.filter((student: Student) => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading students...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-48 items-center justify-center text-destructive">
        <p>Error loading students.</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Registered Students</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Input
            type="text"
            placeholder="Search by name, college, department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm pl-10"
          />
          <Search className="h-4 w-4 absolute top-3 left-3 text-muted-foreground" />
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
                  <TableHead>Guardian Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Guardian Contact</TableHead>
                  <TableHead>Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student: Student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.guardianName}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.collegeName}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>{student.guardianContactNumber}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={student.address}>
                        {student.address}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AllStudentsList;
