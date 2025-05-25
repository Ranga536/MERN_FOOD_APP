import MenuItemImageUpload from "@/components/admin-view/menu-image-upload";
import AdminMenuItemsTile from "@/components/admin-view/menuitem-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addMenuItemElements } from "@/config";
import {
  addNewMenuItem,
  deleteMenuItem,
  editMenuItem,
  fetchAllMenuItems,
} from "@/store/admin/menu-items-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const AdminMenuItems = () => {
  const { id } = useParams();

  const initialFormData = {
    image: null,
    name: "",
    description: "",
    originalPrice: "",
    offerPrice: "",
    isVeg: "",
    category: "",
    ingredients: "",
    preparationTime: "",
    rating: "",
    isAvailable: "",
  };

  const [openCreateMenuItemDialog, setOpenCreateMenuItemDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { menuItemsList } = useSelector((state) => state.adminMenuItems);

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editMenuItem({
            id,
            menuId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllMenuItems(id));
            setFormData(initialFormData);
            setOpenCreateMenuItemDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewMenuItem({
            id,
            formData: {
              ...formData,
              image: uploadedImageUrl,
            },
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllMenuItems(id));
            setOpenCreateMenuItemDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast.success("Menu Item added successfully!");
          }
        });
  };

  const handleDelete = (getCurrentMenuItemId) => {
    dispatch(deleteMenuItem({ id, menuId: getCurrentMenuItemId })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllMenuItems(id));
        }
      }
    );
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAllMenuItems(id));
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateMenuItemDialog(true)}>
          Add New Item
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {menuItemsList && menuItemsList.length > 0
          ? menuItemsList.map((menuItem) => (
              <AdminMenuItemsTile
                key={menuItem._id}
                setFormData={setFormData}
                setOpenCreateMenuItemDialog={setOpenCreateMenuItemDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={menuItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateMenuItemDialog}
        onOpenChange={() => {
          setOpenCreateMenuItemDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Item" : "Add Item"}
            </SheetTitle>
          </SheetHeader>
          <MenuItemImageUpload
            id={id}
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6 p-3">
            <CommonForm
              onSubmit={onSubmit}
              formControls={addMenuItemElements}
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

export default AdminMenuItems;
