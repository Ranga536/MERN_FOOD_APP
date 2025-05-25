import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/restaurants/address-slice";
import AddressCard from "./address-card";
import { toast } from "sonner";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address = ({ setCurrentSelectedAddress, selectedId }) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  const handleManageAddress = (event) => {
    event.preventDefault();

    if (addressList.length >= 2 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast.error("You can add only 2 addresses");
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast.success("Address Updated Successfully!");
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {

          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            toast.success("Address Added Successfully!");
          }
        });
  };

  const handleDeleteAddress = (getCurrentAddress) => {

    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast.success("Address Deleted Successfully!");
      }
    });
  };

  const handleEditAddress = (getCurrentAddress) => {
    setCurrentEditedId(getCurrentAddress._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);



  return (
    // <Card>
    //   <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
    //     {addressList && addressList.length > 0 ? (
    //       addressList.map((singleAddressItem) => (
    //         <AddressCard
    //           selectedId={selectedId}
    //           addressInfo={singleAddressItem}
    //           handleDeleteAddress={handleDeleteAddress}
    //           handleEditAddress={handleEditAddress}
    //           setCurrentSelectedAddress={setCurrentSelectedAddress}
    //         />
    //       ))
    //     ) : (
    //       <p>You Haven't Added the Address Yet!!</p>
    //     )}
    //   </div>
    //   <CardHeader>
    //     <CardTitle>
    //       {currentEditedId !== null ? "Update Address" : "Add Address"}
    //     </CardTitle>
    //   </CardHeader>
    //   <CardContent className="space-y-3">
    //     <CommonForm
    //       formControls={addressFormControls}
    //       formData={formData}
    //       setFormData={setFormData}
    //       buttonText={currentEditedId !== null ? "Update" : "Add"}
    //       onSubmit={handleManageAddress}
    //       isBtnDisabled={!isFormValid()}
    //     />
    //   </CardContent>
    // </Card>
    <Card className="bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-6 rounded-3xl shadow-2xl border border-purple-200">
  <div className="mb-6 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
    {addressList && addressList.length > 0 ? (
      addressList.map((singleAddressItem) => (
        <AddressCard
          key={singleAddressItem._id}
          selectedId={selectedId}
          addressInfo={singleAddressItem}
          handleDeleteAddress={handleDeleteAddress}
          handleEditAddress={handleEditAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
      ))
    ) : (
      <div className="col-span-full text-center text-red-600 font-medium text-lg">
        🚫 You haven’t added any address yet!
      </div>
    )}
  </div>

  <CardHeader className="bg-white/80 rounded-xl p-4 shadow-inner mb-4">
    <CardTitle className="text-xl font-bold text-purple-800">
      {currentEditedId !== null ? "✏️ Update Address" : "➕ Add New Address"}
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-4 bg-white/90 rounded-xl p-6 shadow-lg">
    <CommonForm
      formControls={addressFormControls}
      formData={formData}
      setFormData={setFormData}
      buttonText={currentEditedId !== null ? "Update" : "Add"}
      onSubmit={handleManageAddress}
      isBtnDisabled={!isFormValid()}
    />
  </CardContent>
</Card>

  );
};

export default Address;
