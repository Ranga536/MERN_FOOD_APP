import Address from "@/components/shopping-view/address";
import image from "../../assets/checkout-banner.png";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/restaurants/order-slice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import FooterInfo from "@/components/shopping-view/footer";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const deliveryCharge = 35;

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
      toast.error("Please select an address");
      return;
    }

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
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={image}
          className="h-full w-full object-cover object-center"
          alt="Checkout image"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} key={item.name} />
              ))
            : null}
          <div className="mt-8 space-y-3 border-t pt-4">
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
            <Button onClick={handleInitiatePayment} className="w-full cursor-pointer">
              {
                isOrderPlaced ? 'Processing Order...' : 'Place Order'
              }
            </Button>
          </div>
        </div>
      </div>
      <FooterInfo />
    </div>
  );
};

export default ShoppingCheckout;
