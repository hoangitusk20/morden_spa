
import { useState } from 'react';
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
import { Edit, Trash, Plus } from "lucide-react";
import { Input } from '@/components/ui/input';

interface Service {
  id: string;
  title: string;
  category: string;
  duration: string;
  price: number;
}

interface ServicesTableProps {
  services: Service[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const ServicesTable: React.FC<ServicesTableProps> = ({ services, onEdit, onDelete, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="data-table-container">
      <div className="flex justify-between items-center p-4 border-b border-border">
        <h2 className="text-xl font-semibold">Services</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
          <Button onClick={onAdd}>
            <Plus className="h-4 w-4 mr-2" /> Add Service
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-primary/5">
                    {service.category}
                  </Badge>
                </TableCell>
                <TableCell>{service.duration}</TableCell>
                <TableCell>${service.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(service.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => onDelete(service.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ServicesTable;
