import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

const AdminMenuItemsTile = ({
  product,
  setFormData,
  setOpenCreateMenuItemDialog,
  setCurrentEditedId,
  handleDelete,
}) => {
  return (
    // <Card
    //   className={`${product?.isOpen ? "" : "disabled"} w-full max-w-sm mx-auto p-0`}
    // >
    //   <div>
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
    //             product?.offerPrice < product?.originalPrice
    //               ? ""
    //               : "line-through"
    //           } text-lg font-semibold text-primary`}
    //         >
    //           {product?.originalPrice}.RS
    //         </span>

    //         {product?.offerPrice < product?.originalPrice ? (
    //           <span className="text-lg font-bold">
    //             {product?.offerPrice}.RS
    //           </span>
    //         ) : null}

    //         <span
    //           className={`${
    //             product?.isAvailable ? "" : "line-through"
    //           } text-lg font-semibold text-primary`}
    //         >
    //           {product?.isAvailable ? "Available" : "Not Available"}
    //         </span>
    //       </div>
    //     </CardContent>
    //     <CardFooter className="flex justify-between items-center">
    //       <Button
    //         className="cursor-pointer"
    //         onClick={() => {
    //           setOpenCreateMenuItemDialog(true);
    //           setCurrentEditedId(product?._id);
    //           setFormData(product);
    //         }}
    //       >
    //         Edit
    //       </Button>
    //       <Button
    //         onClick={() => handleDelete(product?._id)}
    //         className="cursor-pointer"
    //       >
    //         Delete
    //       </Button>
    //     </CardFooter>
    //   </div>
    // </Card>
    <Card
  className={`${
    product?.isOpen ? "" : "opacity-80"
  } w-full max-w-xs mx-auto bg-white shadow-xl rounded-xl overflow-hidden transform transition duration-300 hover:scale-[1.02] p-0`}
>
  {/* Product Image */}
  <div className="relative group">
    <img
      src={product?.image}
      alt={product?.name}
      className="w-full h-[220px] object-cover rounded-t-xl group-hover:brightness-90 transition"
    />

    {/* Availability Badge */}
    <span
      className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full shadow-md ${
        product?.isAvailable
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white line-through"
      }`}
    >
      {product?.isAvailable ? "Available" : "Not Available"}
    </span>

    {/* Discount Badge */}
    {product?.offerPrice < product?.originalPrice && (
      <span className="absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md">
        {product?.discount} % OFF
      </span>
    )}
  </div>

  {/* Product Content */}
  <CardContent className="p-2">
    <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate m-0">
      {product?.name}
    </h2>

    <div className="flex justify-between items-center text-sm sm:text-base">
      <h1 className="font-medium text-green-600 italic">{product?.category}</h1>

      {/* Price Section */}
      <div className="flex flex-col items-end m-0 p-0">
        {product?.offerPrice < product?.originalPrice ? (
          <>
            <span className="line-through text-gray-400 text-sm">
              ₹{product?.originalPrice}
            </span>
            <span className="text-lg font-bold text-red-600">
              ₹{product?.offerPrice}
            </span>
          </>
        ) : (
          <span className="text-lg font-bold text-gray-800">
            ₹{product?.originalPrice}
          </span>
        )}
      </div>
    </div>
  </CardContent>

  {/* Footer Actions */}
  <CardFooter className="flex justify-between px-4 pb-4">
    <Button
      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg shadow-md transition-all duration-200"
      onClick={() => {
        setOpenCreateMenuItemDialog(true);
        setCurrentEditedId(product?._id);
        setFormData(product);
      }}
    >
      ✏️ Edit
    </Button>
    <Button
      onClick={() => handleDelete(product?._id)}
      className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow-md transition-all duration-200"
    >
      🗑 Delete
    </Button>
  </CardFooter>
</Card>

  );
};

export default AdminMenuItemsTile;
