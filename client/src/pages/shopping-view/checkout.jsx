import Address from "@/components/shopping-view/address";
import image from "../../assets/checkout-banner.png";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/restaurants/order-slice";
import { useNavigate } from "react-router-dom";
import { toast} from "sonner";
import FooterInfo from "@/components/shopping-view/footer";
import {
  HandCoins,
  Info,
} from "lucide-react";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isButtonClicked, setIsBtnClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deliveryCharge = 25;

  const totalItemAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum + currentItem.offerPrice * currentItem.quantity,
          0
        )
      : 0;
  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? totalItemAmount + deliveryCharge
      : 0;

  const handleInitiatePayment = () => {
    if (cartItems.length === 0) {
      toast.error("Please add items to cart!");
      return;
    }

    if (currentSelectedAddress === null) {
      toast.error("Please select an address!");
      return;
    }

    setIsBtnClicked(true);

    const orderData = {
      userId: user.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        menuItemId: singleCartItem.menuItemId,
        name: singleCartItem.name,
        image: singleCartItem.image,
        restaurantId: singleCartItem.restaurantId,
        restaurantName: singleCartItem.restaurantName,
        offerPrice:
          singleCartItem.offerPrice > singleCartItem.originalPrice
            ? singleCartItem.originalPrice
            : singleCartItem.offerPrice,
        quantity: singleCartItem.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "Pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        navigate("/shop/order-success");
      } else {
        setIsOrderPlaced(false);
      }
    });
  };

  // if (isOrderPlaced) {
  //   window.location.href = "/shop/order-success";
  // }

  return (
    <div className="flex flex-col">
      <div className="relative h-[200px] w-full overflow-hidden">
        <img
          src={image}
          // className="h-full w-full object-cover object-center"
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
          alt="Checkout image"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5 bg-gradient-to-r from-pink-200 via-gray-200 to-blue-200">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {/* cash on delivery badge */}
          <div className="flex items-start gap-3 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl shadow-md max-w-xl mx-auto my-6">
            <HandCoins className="w-7 h-7 text-yellow-600 mt-1" />
            <div>
              <h2 className="text-yellow-800 font-semibold text-lg">
                Currently, all orders are available through{" "}
                <span className="underline">Cash on Delivery</span> only.
              </h2>
              {/* <p className="text-sm text-yellow-700 mt-1">
      Online payments will be available soon as we are working on integrating secure payment options.
    </p> */}
            </div>
          </div>
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} key={item.name} />
              ))
            : null}
          {/* <div className="mt-8 space-y-3 border-t pt-4">
            <div className="flex justify-between text-sm sm:text-base">
              <span>Items Total</span>
              <span>{totalItemAmount} ₹</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Delivery Charges</span>
              <span>{deliveryCharge} ₹</span>
            </div>
            <div className="flex justify-between font-bold text-base sm:text-lg pt-3 border-t">
              <span>Total Amount</span>
              <span>{totalCartAmount} ₹</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              onClick={handleInitiatePayment}
              className="w-full cursor-pointer"
            >
              {isOrderPlaced ? "Processing Order..." : "Place Order"}
            </Button>
          </div> */}

          <div className="mt-10 max-w-md mx-auto px-6 py-6 bg-white rounded-2xl shadow-xl">
            {/* Items Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="flex items-center gap-2 text-gray-700 font-medium text-base sm:text-lg">
                🧺 Items Total
              </span>
              <span className="font-semibold text-gray-900 text-base sm:text-lg">
                {totalItemAmount} ₹
              </span>
            </div>

            {/* Delivery Charges */}
            <div className="flex justify-between items-center mb-6">
              <span className="flex items-center gap-2 text-gray-700 font-medium text-base sm:text-lg">
                🚚 Delivery Charges
              </span>
              <span className="font-semibold text-gray-900 text-base sm:text-lg">
                {deliveryCharge} ₹
              </span>
            </div>

            {/* Separator */}
            <hr className="border-dashed border-gray-300 mb-6" />

            {/* Total Amount */}
            <div className="flex justify-between items-center mb-8">
              <span className="flex items-center gap-3 m-3 text-indigo-600 font-extrabold text-xl sm:text-2xl">
                💰 Total Amount -
              </span>
              <span className="font-extrabold text-indigo-800 text-xl sm:text-2xl">
                {totalCartAmount} ₹
              </span>
            </div>

            {/* disclaimer */}
            <div className="flex items-start gap-3 bg-green-50 border-l-4 border-green-400 p-4 rounded-xl shadow-md max-w-xl mx-auto my-6">
              <Info className="w-8 h-8 text-green-600 mt-1" />
              <div>
                <h2 className="text-green-800 font-semibold text-sm">
                  Please review your order before placing. Help us reduce food waste and avoid cancellations
                </h2>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handleInitiatePayment}
              // disabled={isOrderPlaced}
              className={`w-full py-4 rounded-3xl font-semibold text-white
      bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500
      shadow-md shadow-pink-400/50
      transition-transform duration-300 ease-in-out
      hover:scale-105 hover:shadow-lg hover:shadow-pink-500/70
      focus:outline-none focus:ring-4 focus:ring-pink-300
      disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3`}
            >
              {isOrderPlaced ? (
                <>⏳ Processing Order...</>
              ) : (
                <>✅ Place Order</>
              )}
            </button>
            {isButtonClicked ? (
              <p className="text-center text-green-500">
                Your Order is Processing!...
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <FooterInfo />
    </div>
  );
};

export default ShoppingCheckout;
