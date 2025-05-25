import RestaurantImageUpload from "@/components/admin-view/image-upload";
import AdminRestaurantTile from "@/components/admin-view/restaurant-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addNewRestaurant,
  deleteRestaurant,
  editRestaurant,
  fetchAllRestaurants,
} from "@/store/admin/restaurant-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
  image: null,
  name: "",
  description: "",
  email: "",
  phone: "",
  address: "",
  category: "",
  openingTime: "",
  priceRange: "",
  closingTime: "",
  discount: "",
  deliveryTime: "",
  rating: "4.0",
};

const AdminRestaurants = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { restaurantList } = useSelector((state) => state.adminRestaurants);
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editRestaurant({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllRestaurants());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewRestaurant({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllRestaurants());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast.success("Restaurant added successfully!");
          }
        });
  };

  const handleDelete = (getCurrentRestaurantId) => {
    dispatch(deleteRestaurant(getCurrentRestaurantId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllRestaurants());
      }
    });
  };

  // const handleGetRestaurantDetails = (getCurrentRestaurantId) => {

  // }

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAllRestaurants());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Restaurant
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {restaurantList && restaurantList.length > 0
          ? restaurantList.map((restaurantItem) => (
              <AdminRestaurantTile
                key={restaurantItem._id}
                setFormData={setFormData}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                product={restaurantItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null
                ? "Edit Restaurant"
                : "Add new Restaurant"}
            </SheetTitle>
          </SheetHeader>
          <RestaurantImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6 p-5">
            <CommonForm
              formControls={addProductFormElements}
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Update" : "Add"}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminRestaurants;
