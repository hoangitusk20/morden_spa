import { useState } from "react";
import AdminLayout from "../components/layouts/AdminLayout";
import ServicesTable from "../components/services/ServicesTable";
import ServiceForm from "../components/services/ServiceForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { ServiceData } from "@/shared/type";

// Mock data
const mockServices = [
  {
    id: "s1",
    title: "Deep Tissue Massage",
    category: "massage",
    duration: "60 minutes",
    price: 95,
    description: "A therapeutic massage targeting deeper muscle layers.",
    detailedDescription:
      "This massage uses slow strokes and deep finger pressure to relieve tension in the deeper layers of muscle and connective tissue. Ideal for chronic aches and pain or contracted areas such as a stiff neck, low back tightness, and sore shoulders.",
  },
  {
    id: "s2",
    title: "Facial Treatment",
    category: "facial",
    duration: "45 minutes",
    price: 80,
    description: "Rejuvenating facial with custom products.",
    detailedDescription:
      "This facial treatment uses premium skincare products customized to your skin type. It includes cleansing, exfoliation, extraction if needed, facial massage, mask, and moisturizer application. Leaves skin refreshed and glowing.",
  },
  {
    id: "s3",
    title: "Hot Stone Therapy",
    category: "massage",
    duration: "90 minutes",
    price: 120,
    description: "Relaxing massage using heated stones.",
    detailedDescription:
      "Heated volcanic stones are placed on key points of the body and used as massage tools. The heat from the stones helps to relax muscles more deeply, allowing for more effective tissue and muscle manipulation. Perfect for stress relief and deep relaxation.",
  },
  {
    id: "s4",
    title: "Aromatherapy",
    category: "wellness",
    duration: "60 minutes",
    price: 85,
    description: "Therapeutic essential oil massage.",
    detailedDescription:
      "This massage therapy incorporates essential oils derived from plants to enhance physical and psychological well-being. Different oils are used for different therapeutic effects, such as lavender for relaxation or eucalyptus for respiratory health.",
  },
  {
    id: "s5",
    title: "Body Scrub",
    category: "body",
    duration: "45 minutes",
    price: 70,
    description: "Exfoliating scrub for smooth, renewed skin.",
    detailedDescription:
      "A full-body exfoliation treatment that removes dead skin cells and stimulates circulation. Using a mixture of sea salt or sugar with aromatic oils, this treatment leaves skin smooth, soft, and renewed. Finished with a hydrating application of body lotion or oil.",
  },
];

const Services = () => {
  const [services, setServices] = useState(mockServices);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<ServiceData>({
    title: "",
    duration: "60",
    price: 0,
    description: "",
    detailedDescription: "",
    category: "",
  });

  const handleAddClick = () => {
    setIsFormOpen(true);
  };

  const handleEditClick = (id: string) => {
    const serviceToEdit = services.find((service) => service.id === id);
    setCurrentService(serviceToEdit);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const serviceToDelete = services.find((service) => service.id === id);
    setCurrentService(serviceToDelete);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = (serviceData: ServiceData) => {
    if (serviceData.id) {
      // Update existing service
      setServices((prev) =>
        prev.map((service) =>
          service.id === serviceData.id ? serviceData : service
        )
      );
      toast.success("Service updated successfully");
    } else {
      // Add new service with a generated ID
      const newService = {
        ...serviceData,
        id: `s${services.length + 1}`,
      };
      setServices((prev) => [...prev, newService]);
      toast.success("Service added successfully");
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (currentService) {
      setServices((prev) =>
        prev.filter((service) => service.id !== currentService.id)
      );
      setIsDeleteDialogOpen(false);
      setCurrentService(null);
      toast.success("Service deleted successfully");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Services Management
          </h1>
          <p className="text-muted-foreground">
            Manage the services offered at your spa.
          </p>
        </div>

        <ServicesTable
          services={services}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onAdd={handleAddClick}
        />

        {/* Service Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>
                {currentService ? "Edit Service" : "Add New Service"}
              </DialogTitle>
              <DialogDescription>
                {currentService
                  ? "Make changes to the existing service."
                  : "Fill in the details to create a new service."}
              </DialogDescription>
            </DialogHeader>
            <ServiceForm
              initialData={currentService}
              onSubmit={handleSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                service "{currentService?.title}" and remove it from the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default Services;
