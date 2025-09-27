import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminFeatures from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";
import AdminLayout from "./components/admin-view/layout";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import AdminRestaurants from "./pages/admin-view/restaurants";
import AdminMenuItems from "./pages/admin-view/menuitems";
import UserMenuItems from "./pages/shopping-view/menu";
import OrderSuccessPage from "./pages/shopping-view/order-success";
import SearchFoodItems from "./pages/shopping-view/search";
import VerifyOtp from "./pages/auth/verifyOtp";
import TermsAndConditions from "./pages/auth/terms-conditons";
import PrivacyAndPolicy from "./pages/auth/privacy-policy";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword";
import { Loader2, Loader2Icon } from "lucide-react";
import ContactPage from "./pages/shopping-view/contact";
import AdminNotificationsPage from "./pages/admin-view/SendNotificationPage";
import Feedback from "./pages/shopping-view/feedback";
// import gifImg from "./assets/deliverybike-giphy.gif"


function App() {
  //check if user is authenticated or not
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  ); //written to get the user data from redux toolkit

  const dispatch = useDispatch(); //dispatch is used to dispatch actions to the redux store

  useEffect(() => {
    dispatch(checkAuth()); //dispatching the checkAuth action to check if the user is authenticated or not
  }, [dispatch]);

  if (isLoading)
    return (
      // <Skeleton className="w-[1000px] h-[1000px] rounded-xl bg-gray-500" />
  //     <div className="flex items-center justify-center h-screen bg-white">
  //   <Loader2Icon className="w-10 h-10 animate-spin text-primary" />
  // </div>

<div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-white via-blue-100 to-purple-200 text-center px-4">
  {/* <div className="bg-white shadow-xl w-60 p-6 rounded-2xl border border-gray-200 animate-fade-in"> */}
    <img
      src="https://cdn.dribbble.com/userupload/25651927/file/original-6501e52c3e9c850da0cf82d96845b15d.gif"
      alt="Loading..."
      className="w-64 max-w-md h-auto mx-auto rounded-xl"
    />
    <p className="mt-6 text-xl text-gray-700 font-semibold animate-pulse">
      Loading, please wait...
    </p>
    {/* <p className="text-sm text-gray-500 mt-2">Fetching delicious experiences just for you 🍽️</p> */}
  {/* </div> */}
</div>

    );

  return (
    <div className="flex flex-col overflow-hidden bg-white select-none">
      {/*common components  */}
      {/* <h1>Header Component</h1> */}
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="verify-otp" element={<VerifyOtp />} />{" "}
          {/* ✅ Add this line */}
          <Route path="terms-conditions" element={<TermsAndConditions />} />
          <Route path="privacy-policy" element={<PrivacyAndPolicy />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          {/* <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="restaurants" element={<AdminRestaurants />} />
          <Route path="restaurants/:id" element={<AdminMenuItems />} />
          <Route path="notifications" element={<AdminNotificationsPage />} /> */}
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          {/* <Route path="account" element={<ShoppingAccount />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="listing/:id" element={<UserMenuItems />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="order-success" element={<OrderSuccessPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="search" element={<SearchFoodItems />} />
          <Route path="feedback" element={<Feedback />} /> */}
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
