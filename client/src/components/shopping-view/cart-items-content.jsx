import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  updateCartQuantity,
} from "@/store/restaurants/cart-slice";
import { toast } from "sonner";

const UserCartItemsContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleUpdateQuantity = (getCartItem, typeOfAction) => {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        menuItemId: getCartItem?.menuItemId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart item updated successfully");
      }
    });
  };

  const handleCartItemDelete = (getCartItem) => {
    dispatch(
      deleteCartItem({ userId: user?.id, menuItemId: getCartItem?.menuItemId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart item deleted successfully");
      }
    });
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 font-poppins">
      <img
        src={cartItem?.image}
        alt={cartItem?.name}
        className="w-20 h-20 rounded-xl object-cover border border-gray-200"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-extrabold text-gray-700 text-sm sm:text-base truncate">
          {cartItem?.restaurantName}
        </h3>
        <h2 className="font-extrabold text-gray-900 text-base sm:text-lg truncate">
          {cartItem?.name}
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full cursor-pointer"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold text-gray-800">
            {cartItem?.quantity}
          </span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full cursor-pointer"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end min-w-[80px]">
        <p className="font-semibold text-gray-900 text-base sm:text-lg">
          {cartItem?.offerPrice
            ? `₹${(cartItem?.offerPrice * cartItem?.quantity).toFixed(2)}`
            : `₹${(cartItem?.originalPrice * cartItem?.quantity).toFixed(2)}`}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1 w-5 h-5 text-red-500 hover:text-red-700 transition-colors"
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;
