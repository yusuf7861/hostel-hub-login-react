
import { useState } from "react";
import { Warden } from "@/api/adminApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, UserCog } from "lucide-react";

interface WardensListProps {
  wardens?: Warden[];
  isLoading: boolean;
}

const WardensList = ({ wardens = [], isLoading }: WardensListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredWardens = wardens.filter((warden) => 
    warden.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warden.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warden.contactNumber.includes(searchTerm)
  );

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading wardens...</span>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCog className="h-5 w-5 text-primary" />
          Wardens
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search by name, email, or contact number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {filteredWardens.length === 0 ? (
          <div className="flex h-48 items-center justify-center border rounded-md">
            <p className="text-muted-foreground">No wardens found</p>
          </div>
        ) : (
          <div className="overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Contact Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWardens.map((warden) => (
                  <TableRow key={warden.id}>
                    <TableCell>{warden.id}</TableCell>
                    <TableCell className="font-medium">{warden.name}</TableCell>
                    <TableCell>{warden.email}</TableCell>
                    <TableCell>{warden.contactNumber}</TableCell>
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

export default WardensList;
