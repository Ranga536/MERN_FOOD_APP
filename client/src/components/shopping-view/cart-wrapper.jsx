import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();
  const deliveryCharge = 25;

  const totalItemAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum + currentItem.offerPrice * currentItem.quantity,
          0
        )
      : 0;

  const totalCartAmount =
    cartItems && cartItems.length > 0 ? totalItemAmount + deliveryCharge : 0;

  return (
    <SheetContent
      className="sm:max-w-md w-full px-4 py-6 overflow-y-auto shadow-xl rounded-t-2xl sm:rounded-none"
      style={{
        backgroundImage: `linear-gradient(135deg, #d5f4e6 0%, #e5d4f2 100%)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Header */}
      <SheetHeader>
        <SheetTitle className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white tracking-wide">
          🛒 Your Cart
        </SheetTitle>
      </SheetHeader>

      {/* Cart Items */}
      <div className="mt-6 space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent cartItem={item} key={item.name} />
          ))
        ) : (
          <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 italic">
            Your cart is empty.
          </p>
        )}
      </div>

      {/* Cart Summary */}
      {cartItems && cartItems.length > 0 && (
        <div className="mt-8 space-y-4 border-t border-gray-300 dark:border-gray-700 pt-4 text-sm sm:text-base text-gray-700 dark:text-gray-300">
          <div className="flex justify-between">
            <span className="font-medium">🧾 Items Total</span>
            <span className="font-semibold">{totalItemAmount} ₹</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">🚚 Delivery Charges</span>
            <span className="font-semibold">{deliveryCharge} ₹</span>
          </div>
          <div className="flex justify-between text-base sm:text-lg font-bold text-gray-900 dark:text-white pt-3 border-t">
            <span>Total Amount</span>
            <span>{totalCartAmount} ₹</span>
          </div>

          {/* Checkout Button */}
          <Button
            onClick={() => {
              navigate("/shop/checkout");
              setOpenCartSheet(false);
            }}
            className="w-full mt-4 py-2.5 sm:py-3 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            🚀 Proceed to Checkout
          </Button>
        </div>
      )}
    </SheetContent>
  );
};

export default UserCartWrapper;
