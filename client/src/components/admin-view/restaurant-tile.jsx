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
    <Card
      className={`${product?.isOpen ? "" : "disabled"} w-full max-w-sm mx-auto`}
    >
      <div onClick={() => handleClick(product._id)} >
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-[200px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.name}</h2>
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-lg font-semibold text-primary">
              {product?.address}
            </h1>
            <span
              className={`${
                product?.isOpen ? "" : "line-through"
              } text-lg font-semibold text-primary`}
            >
              {product?.isOpen ? "Open" : "Closed"}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          {/* <Button
            className="cursor-pointer"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => handleDelete(product?._id)}
          >
            Delete
          </Button> */}
        </CardFooter>
      </div>
      <div className="flex justify-between">
      <Button
            className="cursor-pointer"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => handleDelete(product?._id)}
          >
            Delete
          </Button>
      </div>
    </Card>
  );
};

export default AdminRestaurantTile;
