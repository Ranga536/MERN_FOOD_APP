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
    <Card
      className={`${product?.isOpen ? "" : "disabled"} w-full max-w-sm mx-auto`}
    >
      <div>
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
              {product?.description}
            </h1>

            <span
              className={`${
                product?.offerPrice < product?.originalPrice
                  ? ""
                  : "line-through"
              } text-lg font-semibold text-primary`}
            >
              {product?.originalPrice}.RS
            </span>

            {product?.offerPrice < product?.originalPrice ? (
              <span className="text-lg font-bold">
                {product?.offerPrice}.RS
              </span>
            ) : null}

            <span
              className={`${
                product?.isAvailable ? "" : "line-through"
              } text-lg font-semibold text-primary`}
            >
              {product?.isAvailable ? "Available" : "Not Available"}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            className="cursor-pointer"
            onClick={() => {
              setOpenCreateMenuItemDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(product?._id)}
            className="cursor-pointer"
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminMenuItemsTile;
