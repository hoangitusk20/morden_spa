import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../components/layouts/AdminLayout";
import ServicesTable from "../components/services/ServicesTable";
import ServiceForm from "../components/services/ServiceForm";
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
import { ServiceData, UpdateServiceRequest } from "@/shared/type";
import { AppDispatch } from "../redux/store";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
  setCurrentService,
  selectAllServices,
  selectServicesLoading,
  selectServicesError,
  selectCurrentService,
  revalidateService,
  revalidateRelatedService,
} from "../redux/features/serviceSlice";

const Services = () => {
  const dispatch = useDispatch<AppDispatch>();
  const services = useSelector(selectAllServices);
  const isLoading = useSelector(selectServicesLoading);
  const error = useSelector(selectServicesError);
  const currentService = useSelector(selectCurrentService);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Lấy danh sách dịch vụ khi component mount
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Hiển thị thông báo lỗi nếu có
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleAddClick = () => {
    dispatch(
      setCurrentService({
        title: "",
        duration: 60,
        price: 0,
        description: "",
        detailDescription: "",
        category: "",
      })
    );
    setIsFormOpen(true);
  };

  const handleEditClick = (id: string) => {
    const serviceToEdit = services.find((service) => service._id === id);
    if (serviceToEdit) {
      dispatch(setCurrentService(serviceToEdit));
      setIsFormOpen(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    const serviceToDelete = services.find((service) => service._id === id);
    if (serviceToDelete) {
      dispatch(setCurrentService(serviceToDelete));
      setIsDeleteDialogOpen(true);
    }
  };

  const handleSubmit = async (serviceData: ServiceData) => {
    console.log("Service data:", serviceData);
    if (!selectedFile && !serviceData._id) {
      toast.error("Vui lòng chọn hình ảnh cho dịch vụ");
      return;
    }

    try {
      if (serviceData._id) {
        // Cập nhật dịch vụ hiện có
        const updateData: UpdateServiceRequest = {
          _id: serviceData._id,
          title: serviceData.title,
          duration: serviceData.duration,
          price: serviceData.price,
          description: serviceData.description,
          detailDescription: serviceData.detailDescription,
          category: serviceData.category.toUpperCase(),
        };

        if (selectedFile) {
          updateData.image = selectedFile;
        }

        await dispatch(updateService(updateData))
          .unwrap()
          .then(() => {
            dispatch(revalidateService("service-data"));
            dispatch(revalidateService(`service-detail-${currentService._id}`));
            dispatch(revalidateRelatedService(currentService._id));
          });
        toast.success("Cập nhật dịch vụ thành công");
      } else {
        // Thêm dịch vụ mới
        await dispatch(
          createService({
            title: serviceData.title,
            duration: serviceData.duration,
            price: serviceData.price,
            description: serviceData.description,
            detailDescription: serviceData.detailDescription,
            category: serviceData.category.toUpperCase(),
            image: selectedFile as File,
          })
        )
          .unwrap()
          .then(() => {
            dispatch(revalidateService("service-data"));
            dispatch(revalidateService(`service-detail-${currentService._id}`));
            dispatch(revalidateRelatedService(currentService._id));
          });
        toast.success("Thêm dịch vụ mới thành công");
      }
      setIsFormOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error submitting service:", error);
    }
  };

  const handleDelete = async () => {
    if (currentService?._id) {
      try {
        await dispatch(deleteService(currentService._id))
          .unwrap()
          .then(() => {
            dispatch(revalidateService("service-data"));
            dispatch(revalidateService(`service-detail-${currentService._id}`));
          });
        setIsDeleteDialogOpen(false);
        dispatch(setCurrentService(null));
        toast.success("Xóa dịch vụ thành công");
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Service Management
          </h1>
          <p className="text-muted-foreground">
            Manage your services here. Add, edit, and delete services as needed.
          </p>
        </div>

        {isLoading && services.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : (
          <ServicesTable
            services={services}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onAdd={handleAddClick}
          />
        )}

        {/* Service Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>
                {currentService?._id ? "Update Service" : "Create Service"}
              </DialogTitle>
              <DialogDescription>
                {currentService?._id
                  ? "Update service information here."
                  : "Add a new service to the system."}
              </DialogDescription>
            </DialogHeader>
            {currentService && (
              <ServiceForm
                initialData={currentService}
                onSubmit={handleSubmit}
                onCancel={() => setIsFormOpen(false)}
                onFileChange={handleFileChange}
              />
            )}
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
                service."{currentService?.title}" and remove it from the system.
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
