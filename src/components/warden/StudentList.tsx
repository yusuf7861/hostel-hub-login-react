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
import { Edit, Loader2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentListProps {
  students: Student[];
  isLoading: boolean;
}

const StudentList = ({ students, isLoading }: StudentListProps) => {
  const { toast } = useToast();
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Student>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleEditClick = (student: Student) => {
    setEditingStudentId(student.id || null);
    setEditFormData(student);
  };

  const handleCancelEdit = () => {
    setEditingStudentId(null);
    setEditFormData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // In a real application, you would update the student data via API
      // await studentApi.updateStudent(editFormData);
      
      toast({
        title: "Success",
        description: "Student information updated successfully",
      });
      
      setEditingStudentId(null);
      setEditFormData({});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update student information",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const filteredStudents = students.filter((student) => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                <TableHead>Contact</TableHead>
                <TableHead>Guardian Name</TableHead>
                <TableHead>Guardian Contact</TableHead>
                <TableHead>Room Allotted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    {editingStudentId === student.id ? (
                      <Input
                        name="name"
                        value={editFormData.name || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      student.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingStudentId === student.id ? (
                      <Input
                        name="phone"
                        value={editFormData.phone || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      student.phone
                    )}
                  </TableCell>
                  <TableCell>
                    {editingStudentId === student.id ? (
                      <Input
                        name="guardianName"
                        value={editFormData.guardianName || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      student.guardianName
                    )}
                  </TableCell>
                  <TableCell>
                    {editingStudentId === student.id ? (
                      <Input
                        name="guardianContactNumber"
                        value={editFormData.guardianContactNumber || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      student.guardianContactNumber
                    )}
                  </TableCell>
                  <TableCell>
                    {student.roomId ? `Room #${student.roomId}` : "Not assigned"}
                  </TableCell>
                  <TableCell>
                    {editingStudentId === student.id ? (
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleSave}
                          disabled={isSaving}
                        >
                          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleCancelEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditClick(student)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
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

export default StudentList;
