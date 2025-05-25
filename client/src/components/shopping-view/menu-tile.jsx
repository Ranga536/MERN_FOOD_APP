import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

const UserMenuItemTile = ({ product, handleAddToCart }) => {
  return (
    <Card className="flex flex-row md:flex-col w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 bg-white p-0">
      {/* Image Section */}
      <div className="relative w-28 h-28 md:w-full md:h-48 shrink-0 md:rounded-t-2xl rounded-xl md:rounded-none md:overflow-hidden overflow-hidden m-3 md:m-0">
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover rounded-xl md:rounded-none md:rounded-t-2xl"
        />

        {/* Not Available Badge */}
        {product?.isAvailable !== true && (
          <Badge className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-[2px] rounded shadow">
            Not Available
          </Badge>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between flex-1 pr-3 py-3 md:p-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 truncate">
            {product?.name}
          </h2>

          <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
            <span className="capitalize truncate">{product?.category}</span>
            <div className="flex items-center gap-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  product?.isVeg ? "bg-green-600" : "bg-red-600"
                }`}
              />
              <span
                className={`text-xs ${
                  product?.isVeg ? "text-green-600" : "text-red-500"
                }`}
              >
                {product?.isVeg ? "Veg" : "Non-Veg"}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              {product?.offerPrice < product?.originalPrice && (
                <span className="text-xs line-through text-gray-400">
                  ₹{product?.originalPrice}
                </span>
              )}
              <span className="text-sm font-bold text-gray-900">
                ₹{product?.offerPrice}
              </span>
            </div>

            {product?.discount > 0 && (
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                {product?.discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Footer Button */}
        <CardFooter className="px-0 pt-2">
          <Button
            onClick={() => handleAddToCart(product?._id)}
            disabled={product?.isAvailable !== true}
            className={`w-full py-1.5 text-sm rounded-md font-medium transition-all ${
              product?.isAvailable !== true
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default UserMenuItemTile;
