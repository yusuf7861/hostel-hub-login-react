
import { useState, useEffect } from "react";
import { Building2, Loader2, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import NavBar from "@/components/NavBar";
import { Hostel } from "@/api/publicApi";
import { publicApi } from "@/api/publicApi";
import { toast } from "sonner";

interface Room {
  id: number;
  number: string;
  type: string;
  capacity: number;
  occupied: number;
  hostelId: number;
}

const Hostels = () => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [rooms, setRooms] = useState<Record<number, Room[]>>({});
  const [loadingHostels, setLoadingHostels] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState<Record<number, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const fetchHostels = async () => {
    setLoadingHostels(true);
    setError(null);
    try {
      const data = await publicApi.getHostels();
      // Ensure hostels is always an array
      if (Array.isArray(data)) {
        setHostels(data);
      } else {
        console.error("API returned non-array data:", data);
        // If data is not an array, set an empty array
        setHostels([]);
        setError("Received invalid data format from server. Please try again.");
      }
    } catch (err) {
      console.error("Error fetching hostels:", err);
      setError("Failed to load hostels. Please try again.");
      setHostels([]); // Ensure hostels is an array even on error
    } finally {
      setLoadingHostels(false);
    }
  };

  const fetchRooms = async (hostelId: number) => {
    setLoadingRooms(prev => ({ ...prev, [hostelId]: true }));
    setError(null);
    try {
      // This would be the actual endpoint in a real application
      // For now, we'll simulate some sample data since the API endpoint doesn't exist yet
      
      // Simulated response for demo purposes
      const sampleRooms: Room[] = [
        { id: 1, number: "101", type: "Single", capacity: 1, occupied: 1, hostelId },
        { id: 2, number: "102", type: "Double", capacity: 2, occupied: 1, hostelId },
        { id: 3, number: "103", type: "Triple", capacity: 3, occupied: 2, hostelId },
      ];
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRooms(prev => ({ ...prev, [hostelId]: sampleRooms }));
      toast.success(`Rooms for ${hostels.find(h => h.id === hostelId)?.name} loaded`);
    } catch (err) {
      console.error(`Error fetching rooms for hostel ${hostelId}:`, err);
      setError(`Failed to load rooms for hostel ${hostelId}. Please try again.`);
    } finally {
      setLoadingRooms(prev => ({ ...prev, [hostelId]: false }));
    }
  };

  // Load hostels when component mounts
  useEffect(() => {
    fetchHostels();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Hostels</h1>
          <Button 
            onClick={fetchHostels} 
            disabled={loadingHostels}
            className="flex items-center gap-2"
          >
            {loadingHostels ? (
              <>
                <Loader2 className="animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Building2 />
                Refresh Hostels
              </>
            )}
          </Button>
        </div>
        
        {error && (
          <div className="bg-destructive/15 text-destructive p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(hostels) && hostels.map(hostel => (
            <Card key={hostel.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="text-primary" />
                  {hostel.name}
                </CardTitle>
                <CardDescription>{hostel.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  <span className="font-medium">Contact:</span> {hostel.contactNumber}
                </p>
                
                <Button 
                  onClick={() => fetchRooms(hostel.id)} 
                  disabled={loadingRooms[hostel.id]}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  {loadingRooms[hostel.id] ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Loading Rooms...
                    </>
                  ) : (
                    <>
                      <DoorOpen />
                      {rooms[hostel.id] ? 'Refresh Rooms' : 'View Rooms'}
                    </>
                  )}
                </Button>
              </CardContent>
              
              {rooms[hostel.id] && (
                <CardFooter className="flex flex-col block w-full px-6">
                  <h3 className="text-lg font-medium mb-2">Available Rooms</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Room</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rooms[hostel.id].map(room => (
                        <TableRow key={room.id}>
                          <TableCell>{room.number}</TableCell>
                          <TableCell>{room.type}</TableCell>
                          <TableCell>{room.occupied}/{room.capacity}</TableCell>
                          <TableCell>
                            {room.occupied < room.capacity ? (
                              <span className="text-green-600 font-medium">Available</span>
                            ) : (
                              <span className="text-red-600 font-medium">Full</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardFooter>
              )}
            </Card>
          ))}
          
          {Array.isArray(hostels) && hostels.length === 0 && !loadingHostels && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground mb-4">No hostels found.</p>
              <Button onClick={fetchHostels}>
                <Building2 className="mr-2" />
                Fetch Hostels
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Hostels;
