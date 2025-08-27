import RestaurantImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import groupWorkImg from "../../assets/undraw_group-project_kow1.png";

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const handleUploadFeatureImage = () => {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null)
        setUploadedImageUrl("")
        toast.success("Banner Image Uploaded Successfully!")
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      <h1>Upload Feature Images</h1>

      <RestaurantImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((FeatureImgItem) => (
              <div className="relative" key={FeatureImgItem._id}>
                <img
                  src={FeatureImgItem.image}
                  className="w-full h-[200px] object-cover"
                />
              </div>
            ))
          : null}
      </div>
    </div>
    // <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br bg-white p-6 rounded-2xl">
    //       {/* Illustration */}
    //       <img
    //         src={groupWorkImg}
    //         alt="Under Maintenance"
    //         className="w-72 md:w-96 mb-6 rounded-3xl"
    //       />
    
    //       {/* Text Section */}
    //       <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
    //         🍔 We’re Cooking Something Delicious!🍴
    //       </h1>
    //       <p className="text-lg md:text-xl text-gray-600 text-center max-w-xl mb-6 italic">
    //         Our Delbite - food delivery website is currently <span className="font-semibold">under maintenance</span>.  
    //         We’ll be back very soon with a fresh and tasty experience. Stay tuned!
    //       </p>
    
    //       {/* Action / Button */}
    //       <button
    //         onClick={() => window.location.reload()}
    //         className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
    //       >
    //         Refresh 
    //       </button>
    //     </main>
  );
};

export default AdminDashboard;
