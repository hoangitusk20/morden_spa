
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StaffMember {
  id: string;
  name: string;
  position: string;
  bookings: number;
  rating: number;
  target: number;
}

const staffData: StaffMember[] = [
  { id: "1", name: "Emma Johnson", position: "Massage Therapist", bookings: 32, rating: 4.9, target: 30 },
  { id: "2", name: "Michael Chen", position: "Esthetician", bookings: 24, rating: 4.7, target: 25 },
  { id: "3", name: "Sophia Rodriguez", position: "Massage Therapist", bookings: 28, rating: 4.8, target: 30 },
  { id: "4", name: "James Wilson", position: "Wellness Coach", bookings: 18, rating: 4.6, target: 20 },
];

const StaffPerformance = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Staff Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Staff Member</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Target</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffData.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium">{staff.name}</TableCell>
                <TableCell>{staff.position}</TableCell>
                <TableCell>{staff.rating} / 5</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Progress
                      value={(staff.bookings / staff.target) * 100}
                      className="h-2 w-[80px] mr-2"
                    />
                    <span className="text-sm">
                      {staff.bookings}/{staff.target}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {Math.round((staff.bookings / staff.target) * 100)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StaffPerformance;
