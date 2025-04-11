
import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, CalendarDays, Download, ChevronDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface PaymentsTabProps {
  studentId?: number;
}

// Mock data for payments
const mockPayments = [
  {
    id: 1,
    month: "January",
    year: "2025",
    amount: 5000,
    dueDate: "2025-01-10",
    status: "paid",
    paymentDate: "2025-01-05",
  },
  {
    id: 2,
    month: "February",
    year: "2025",
    amount: 5000,
    dueDate: "2025-02-10",
    status: "pending",
    paymentDate: null,
  },
  {
    id: 3,
    month: "March",
    year: "2025",
    amount: 5000,
    dueDate: "2025-03-10",
    status: "overdue",
    paymentDate: null,
  },
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();
const years = [currentYear - 1, currentYear, currentYear + 1];

const PaymentsTab = ({ studentId }: PaymentsTabProps) => {
  const [payments, setPayments] = useState(mockPayments);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const handlePayment = (paymentId: number) => {
    // Here you would make an API call to process payment
    // For now, we'll just simulate it with a timeout
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "Processing payment...",
        success: "Payment completed successfully!",
        error: "Payment failed. Please try again."
      }
    );
    
    // Update the payment status in our mock data
    setPayments(payments.map(payment => 
      payment.id === paymentId 
        ? { 
            ...payment, 
            status: "paid", 
            paymentDate: new Date().toISOString().split("T")[0] 
          } 
        : payment
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-500">Overdue</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  const handleMakePayment = () => {
    if (!selectedMonth || !selectedYear) {
      toast.error("Please select both month and year");
      return;
    }
    
    // Check if payment already exists for the selected month/year
    const existingPayment = payments.find(
      p => p.month === selectedMonth && p.year === selectedYear
    );
    
    if (existingPayment) {
      if (existingPayment.status === "paid") {
        toast.info("Payment for this month has already been made");
      } else {
        handlePayment(existingPayment.id);
      }
    } else {
      // In a real app, you'd fetch the payment record from the server
      toast.error("No payment record found for the selected month");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Make a Payment</CardTitle>
          <CardDescription>
            Select a month and year to make a payment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Month</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full" onClick={handleMakePayment}>
                <CreditCard className="mr-2 h-4 w-4" />
                Make Payment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>All your payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {payments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month/Year</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{`${payment.month} ${payment.year}`}</TableCell>
                    <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{payment.dueDate}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>{payment.paymentDate || "N/A"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            Actions <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem disabled={payment.status === "paid"} 
                            onClick={() => payment.status !== "paid" && handlePayment(payment.id)}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Pay Now
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download Receipt
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No payment records found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsTab;
