import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  StarIcon,
  TimerIcon,
  IndianRupeeIcon,
  UtensilsIcon,
} from "lucide-react";

const ShoppingProductTile = ({ product }) => {
  const navigate = useNavigate();

  const handleGetRestaurantDetails = (getCurrentRestaurantId) => {
    navigate(`/shop/listing/${getCurrentRestaurantId}`);
  };

  return (
    <div
      onClick={() => handleGetRestaurantDetails(product._id)}
      className="cursor-pointer transition-transform hover:scale-[1.015]"
    >
      <Card className="w-full max-w-sm mx-auto p-0 overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all bg-white">
        {/* Image Section */}
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-[200px] object-cover"
          />
          {!product?.isOpen && (
            <Badge className="absolute top-2 left-2 bg-red-600 text-white">
              Closed
            </Badge>
          )}
          <Badge className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
            <TimerIcon />
            {product?.deliveryTime}
          </Badge>
        </div>

        {/* Content Section */}
        <CardContent className="pb-4 px-4 pt-2">
          {/* Restaurant Name and Rating */}
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold text-gray-800 truncate max-w-[70%]">
              {product?.name}
            </h2>
            <div className="flex items-center px-2 py-0.5 bg-green-500 rounded-md">
              <StarIcon className="w-4 h-4 text-white mr-1" />
              <p className="text-sm text-white font-medium">
                {product?.rating}
              </p>
            </div>
          </div>

          {/* Address */}
          <p className="text-sm text-gray-500 mt-1 truncate">
            {product?.address}
          </p>

          {/* Price and Category */}
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-gray-600 font-medium">
              ₹{product?.priceRange} for two
            </span>
            <div className="flex items-center space-x-1">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  product?.category === "veg" ? "bg-green-600" : "bg-red-600"
                }`}
              />
              <span className="text-xs text-gray-600 capitalize">
                {product?.category}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingProductTile;
