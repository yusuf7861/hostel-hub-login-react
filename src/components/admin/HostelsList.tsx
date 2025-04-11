
import { Hostel } from "@/api/publicApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Loader2 } from "lucide-react";

interface HostelsListProps {
  hostels: Hostel[];
  isLoading: boolean;
}

const HostelsList = ({ hostels, isLoading }: HostelsListProps) => {
  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading hostels...</span>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Hostels
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hostels.length === 0 ? (
          <div className="flex h-48 items-center justify-center border rounded-md">
            <p className="text-muted-foreground">No hostels found</p>
          </div>
        ) : (
          <div className="overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hostels.map((hostel) => (
                  <TableRow key={hostel.id}>
                    <TableCell>{hostel.id}</TableCell>
                    <TableCell className="font-medium">{hostel.name}</TableCell>
                    <TableCell>{hostel.location}</TableCell>
                    <TableCell>{hostel.contactNumber}</TableCell>
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

export default HostelsList;
