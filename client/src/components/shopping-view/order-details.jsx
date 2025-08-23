import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const ShoppingOrderDetailsView = ({ orderDetails }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 shadow-2xl p-6 border border-purple-200 backdrop-blur-md">
      <div className="grid gap-6">
        {/* Order Summary */}
        <div className="grid gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-md shadow-inner">
          <h2 className="text-lg font-semibold text-purple-800 flex items-center gap-2">
            🧾 Order Summary
          </h2>

          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Order ID</p>
            <Label className="text-indigo-700">{orderDetails?._id}</Label>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Order Date</p>
            <Label className="text-indigo-700">
              {orderDetails?.orderDate.split("T")[0]}
            </Label>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Status</p>
            <Badge
              className={`py-1 px-3 text-white font-medium rounded-full ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-500"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            >
              {orderDetails?.orderStatus.toUpperCase()}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Total Price</p>
            <Label className="text-indigo-700 font-bold text-md">
              ₹{orderDetails?.totalAmount}
            </Label>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Payment Method</p>
            <Label className="text-indigo-700">Cash On Delivery</Label>
          </div>
        </div>

        <Separator />

        {/* Order Items */}
        <div className="grid gap-4">
          <h3 className="text-lg font-semibold text-purple-800 flex items-center gap-2">
            🍽️ Ordered Items
          </h3>
          <ul className="grid gap-4">
            {orderDetails?.cartItems?.map((item) => (
              <li
                key={item.menuItemId}
                className="bg-white/90 p-4 rounded-xl shadow-lg border border-gray-200 grid gap-1 hover:scale-[1.02] transition-transform"
              >
                <p className="text-gray-800">
                  🍔 <strong>{item.name}</strong>
                </p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">Item Price: ₹{item.offerPrice}</p>
                <p className="text-gray-600">Delivery: ₹30</p>
                <p className="text-gray-600">
                  Restaurant:{" "}
                  <span className="text-indigo-600">{item.restaurantName}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Shipping Address */}
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold text-purple-800 flex items-center gap-2">
            🚚 Delivery Address
          </h3>
          <div className="grid gap-1 bg-white/90 p-4 rounded-xl shadow-inner text-sm text-gray-700">
            <p>👤 Name: {user.userName}</p>
            <p>🏠 Address: {orderDetails?.addressInfo?.address}</p>
            <p>🌆 City: {orderDetails?.addressInfo?.city}</p>
            <p>📮 Pincode: {orderDetails?.addressInfo?.pincode}</p>
            <p>📞 Phone: {orderDetails?.addressInfo?.phone}</p>
            <p>📝 Notes: {orderDetails?.addressInfo?.notes || "N/A"}</p>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetailsView;
