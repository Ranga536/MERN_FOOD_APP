import { FileIcon, UploadCloudIcon, XSquareIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const RestaurantImageUpload = ({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (event) => {

    const selectedFile = event.target.files?.[0];

    if (selectedFile) setImageFile(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true); //set the image loading state to true
    const data = new FormData(); //create a new form data object why because we need to send the file as form data to the server
    data.append("my_file", imageFile); //append the file to the form data object with the key my_file

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/restaurants/upload-image`, //this is the endpoint to upload the image to cloudinary
      data
    ); //send the form data to server

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url); //set the uploaded image url to the state
      setImageLoadingState(false); //set the image loading state to false.
    }
  };

 
  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary(); //if the image file is not null then upload the image to cloudinary
  }, [imageFile]) //when image file changes upload the image to cloudinary

  return (
    <div className={`w-full  mt-4 ${isCustomStyling ? '' : 'max-w-md mx-auto'} `}>
      <Label className="text-lg font-semibold mb-2 block pl-5">Upload Image</Label>
      <div
        className={` ${isEditMode ? "opacity-60" : ""} border-2 border-dashed rounded-lg p-4`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id="image-upload"
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={handleImageFileChange}
          // disabled={isEditMode} //if want to disable image upload while updating/editing data -> uncomment this 
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${isEditMode ? 'cursor-not-allowed' : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-500" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XSquareIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantImageUpload;
