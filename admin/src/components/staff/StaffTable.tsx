import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Edit, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { StaffMember } from "@/shared/type";

interface StaffTableProps {
  staffMembers: StaffMember[];
  onEdit: (id: string) => void;
  onAdd: () => void;
  onDelete?: (id: string) => void;
}

const StaffTable: React.FC<StaffTableProps> = ({
  staffMembers,
  onEdit,
  onAdd,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Add safety check to ensure staffMembers exists and is an array
  const safeStaffMembers = Array.isArray(staffMembers) ? staffMembers : [];

  const filteredStaff = safeStaffMembers.filter(
    (staff) =>
      staff && // Add null check for staff
      staff.name &&
      staff.email &&
      staff.position && // Add null checks for required properties
      (staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.position.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="data-table-container">
      <div className="flex justify-between items-center p-4 border-b border-border">
        <h2 className="text-xl font-semibold">Staff Members</h2>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button onClick={onAdd}>
            <Plus className="h-4 w-4 mr-2" /> Add Staff
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Specialties</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.length > 0 ? (
              filteredStaff.map((staff) => (
                <TableRow key={staff?.id || "unknown"}>
                  <TableCell className="font-medium">
                    {staff?.name || "N/A"}
                  </TableCell>
                  <TableCell>{staff?.position || "N/A"}</TableCell>
                  <TableCell>
                    <div className="text-sm">{staff?.email || "N/A"}</div>
                    <div className="text-sm text-muted-foreground">
                      {staff?.phone || "N/A"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {staff?.specialties &&
                      Array.isArray(staff.specialties) ? (
                        staff.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-primary/5"
                          >
                            {specialty}
                          </Badge>
                        ))
                      ) : (
                        <span>No specialties</span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {staff?.id && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(staff.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {onDelete && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDelete(staff.id)}
                              className="text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No staff members found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StaffTable;
