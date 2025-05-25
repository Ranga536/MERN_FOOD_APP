import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUser,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/restaurants/order-slice";
import { Badge } from "../ui/badge";
const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  const handleFetchOrderDetails = (getId) => {
    dispatch(getOrderDetails(getId));
  };

  useEffect(() => {
    dispatch(getAllOrdersByUser(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-gradient-to-br from-purple-100 via-pink-100 via-40% to-yellow-100 backdrop-blur-sm transition-all hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white rounded-t-3xl shadow-sm">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          🧾 Order History
        </h2>
      </div>

      {/* Content with blurred white glass-like card section */}
      <CardContent className="p-6 overflow-x-auto bg-white/70 rounded-b-3xl backdrop-blur-md">
        <Table className="min-w-full text-sm">
          <TableHeader>
            <TableRow className="bg-slate-100 rounded-lg">
              <TableHead className="p-3 font-semibold text-gray-700">
                #ID
              </TableHead>
              <TableHead className="p-3 font-semibold text-gray-700">
                📅 Date
              </TableHead>
              <TableHead className="p-3 font-semibold text-gray-700">
                📦 Status
              </TableHead>
              <TableHead className="p-3 font-semibold text-gray-700">
                💰 Total
              </TableHead>
              <TableHead className="p-3 font-semibold text-gray-700">
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((orderItem) => (
                <TableRow
                  key={orderItem?._id}
                  className="hover:bg-indigo-50 transition-all duration-300"
                >
                  <TableCell className="p-3 text-gray-800 font-medium">
                    {orderItem?._id.slice(-6).toUpperCase()}
                  </TableCell>
                  <TableCell className="p-3 text-gray-600">
                    {orderItem?.orderDate.split("T")[0]}
                  </TableCell>
                  <TableCell className="p-3">
                    <Badge
                      className={`py-1 px-3 text-white rounded-full text-xs font-medium ${
                        orderItem?.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : orderItem?.orderStatus === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {orderItem?.orderStatus.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-3 text-gray-700 font-semibold">
                    ₹{orderItem?.totalAmount}
                  </TableCell>
                  <TableCell className="p-3">
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                      }}
                    >
                      <Button
                        variant="outline"
                        className="text-indigo-600 border-indigo-300 hover:bg-indigo-100"
                        onClick={() => handleFetchOrderDetails(orderItem?._id)}
                      >
                        👁 View
                      </Button>
                      <ShoppingOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-gray-500"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
