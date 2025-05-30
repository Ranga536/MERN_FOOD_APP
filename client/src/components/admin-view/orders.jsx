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
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

const AdminOrdersView = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  const handleFetchOrderDetails = (getId) => {
    dispatch(getOrderDetailsForAdmin(getId));
  };

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails != null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="hidden md:block">
          {/* Desktop & Tablet view - normal table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0
                ? orderList.map((orderItem) => (
                    <TableRow key={orderItem._id}>
                      <TableCell>{orderItem?._id}</TableCell>
                      <TableCell>
                        {orderItem?.orderDate.split("T")[0]}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`py-1 px-3 ${
                            orderItem?.orderStatus === "confirmed"
                              ? "bg-green-500"
                              : orderItem?.orderStatus === "rejected"
                              ? "bg-red-600"
                              : "bg-black"
                          }`}
                        >
                          {orderItem?.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>₹{orderItem?.totalAmount}</TableCell>
                      <TableCell>
                        <Dialog
                          open={openDetailsDialog}
                          onOpenChange={() => {
                            setOpenDetailsDialog(false);
                            dispatch(resetOrderDetails());
                          }}
                        >
                          <Button
                            onClick={() =>
                              handleFetchOrderDetails(orderItem?._id)
                            }
                          >
                            View Details
                          </Button>
                          <AdminOrderDetailsView orderDetails={orderDetails} />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>

        {/* Mobile view - stacked cards */}
        <div className="md:hidden space-y-4">
          {orderList && orderList.length > 0
            ? orderList.map((orderItem) => (
                <div
                  key={orderItem._id}
                  className="border rounded-lg p-4 shadow-sm bg-white"
                >
                  <div className="mb-2">
                    <span className="font-semibold">Order ID: </span>
                    <span>{orderItem?._id}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Order Date: </span>
                    <span>{orderItem?.orderDate.split("T")[0]}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Order Status: </span>
                    <Badge
                      className={`py-1 px-3 text-white ${
                        orderItem?.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : orderItem?.orderStatus === "rejected"
                          ? "bg-red-600"
                          : "bg-black"
                      }`}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Order Price: </span>
                    <span>₹{orderItem?.totalAmount}</span>
                  </div>
                  <div>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                      }}
                    >
                      <Button
                        onClick={() => handleFetchOrderDetails(orderItem?._id)}
                        className="mt-2 w-full"
                      >
                        View Details
                      </Button>
                      <AdminOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </div>
                </div>
              ))
            : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminOrdersView;
