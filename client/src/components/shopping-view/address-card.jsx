import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";

const AddressCard = ({
  addressInfo,
  handleEditAddress,
  handleDeleteAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer transition-all duration-300 ease-in-out rounded-2xl shadow-md hover:shadow-lg backdrop-blur-md
    ${
      selectedId?._id === addressInfo?._id
        ? "border-4 border-pink-500 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900 dark:to-pink-800"
        : "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
    }`}
    >
      <CardContent className="grid grid-cols-1 gap-3 p-5 text-sm sm:text-base text-zinc-700 dark:text-zinc-300">
        <Label className="font-medium">
          📍 Address:{" "}
          <span className="font-normal">{addressInfo?.address}</span>
        </Label>
        <Label className="font-medium">
          🏙️ City: <span className="font-normal">{addressInfo?.city}</span>
        </Label>
        <Label className="font-medium">
          🧾 Pincode:{" "}
          <span className="font-normal">{addressInfo?.pincode}</span>
        </Label>
        <Label className="font-medium">
          📞 Phone: <span className="font-normal">{addressInfo?.phone}</span>
        </Label>
        <Label className="font-medium">
          📝 Notes:{" "}
          <span className="font-normal">{addressInfo?.notes || "None"}</span>
        </Label>
      </CardContent>

      <CardFooter className="p-4 pt-2 flex flex-col sm:flex-row gap-3 sm:justify-end">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
          className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition duration-200"
        >
          ✏️ Update
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
          className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition duration-200"
        >
          🗑️ Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
