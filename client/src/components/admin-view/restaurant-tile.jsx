import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

const AdminRestaurantTile = ({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) => {

  const navigate = useNavigate();

const handleClick = (currentSelectedRestaurantId) => {

navigate(`/admin/restaurants/${currentSelectedRestaurantId}`);

}


  return (
    // <Card
    //   className={`${product?.isOpen ? "" : "disabled"} w-full max-w-sm mx-auto`}
    // >
    //   <div onClick={() => handleClick(product._id)} >
    //     <div className="relative">
    //       <img
    //         src={product?.image}
    //         alt={product?.name}
    //         className="w-full h-[200px] object-cover rounded-t-lg"
    //       />
    //     </div>
    //     <CardContent>
    //       <h2 className="text-xl font-bold mb-2 mt-2">{product?.name}</h2>
    //       <div className="flex justify-between items-center mb-2">
    //         <h1 className="text-lg font-semibold text-primary">
    //           {product?.category}
    //         </h1>
    //         <span
    //           className={`${
    //             product?.isOpen ? "" : "line-through"
    //           } text-lg font-semibold text-primary`}
    //         >
    //           {product?.isOpen ? "Open" : "Closed"}
    //         </span>
    //       </div>
    //     </CardContent>
    //   </div>
    //   <div className="flex justify-between p-2">
    //   <Button
    //         className="cursor-pointer"
    //         onClick={() => {
    //           setOpenCreateProductsDialog(true);
    //           setCurrentEditedId(product?._id);
    //           setFormData(product);
    //         }}
    //       >
    //         Edit
    //       </Button>
    //       <Button
    //         className="cursor-pointer"
    //         onClick={() => handleDelete(product?._id)}
    //       >
    //         Delete
    //       </Button>
    //   </div>
    // </Card>
    <Card
  className={`${
    product?.isOpen ? "" : "opacity-70"
  } w-full max-w-xs mx-auto shadow-lg rounded-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 p-0`}
>
  {/* Image Section */}
  <div onClick={() => handleClick(product._id)} className="cursor-pointer">
    <div className="relative">
      <img
        src={product?.image}
        alt={product?.name}
        className="w-full h-[220px] object-cover rounded-t-xl"
      />

      {/* Open/Closed Badge */}
      <span
        className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
          product?.isOpen
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white line-through"
        }`}
      >
        {product?.isOpen ? "Open" : "Closed"}
      </span>
    </div>

    {/* Content */}
    <CardContent className="p-3">
      <h2 className="text-xl font-bold mb-2 text-gray-800 truncate">
        {product?.name}
      </h2>
      <div className="flex justify-between items-center">
        <h1 className="text-md font-medium text-gray-600 italic">
          {product?.category}
        </h1>
        <h1 className="text-md font-medium text-green-600 italic">
          {product?.openingTime} - {product?.closingTime}
        </h1>
      </div>
    </CardContent>
  </div>

  {/* Action Buttons */}
  <div className="flex justify-between px-4 pb-4">
    <Button
      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg shadow-md transition-all duration-200"
      onClick={() => {
        setOpenCreateProductsDialog(true);
        setCurrentEditedId(product?._id);
        setFormData(product);
      }}
    >
      ✏️ Edit
    </Button>
    <Button
      className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow-md transition-all duration-200"
      onClick={() => handleDelete(product?._id)}
    >
      🗑 Delete
    </Button>
  </div>
</Card>

  );
};

export default AdminRestaurantTile;
