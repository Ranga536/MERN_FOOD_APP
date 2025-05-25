import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { successPlacedOrder } from "@/store/restaurants/order-slice";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

    dispatch(successPlacedOrder({ orderId })).then((data) => {
      if (data?.payload?.success) {
        sessionStorage.removeItem("currentOrderId");
      }
    });
  }, []);

  return (
    <Card className="p-10 bg-gradient-to-br from-green-100 via-white to-green-50 shadow-2xl rounded-2xl text-center">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-4xl font-extrabold text-green-700 flex items-center justify-center gap-2">
          <CheckCircle className="text-green-600 w-8 h-8" />
          Order Placed Successfully!
        </CardTitle>
      </CardHeader>
      <p className="text-gray-600 text-lg mb-6">
        Thank you for your order. You can track it in your account section.
      </p>
      <Button
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 ease-in-out shadow-md"
        onClick={() => navigate("/shop/account")}
      >
        View My Orders
      </Button>
    </Card>
  );
};

export default OrderSuccessPage;
