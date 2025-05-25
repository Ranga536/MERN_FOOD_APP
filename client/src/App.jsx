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
import LogoImg from "./assets/Delbite Logo.jpg"

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

    <div className="flex items-center justify-center h-screen bg-white">
    <img
      src={LogoImg} // <-- replace with your logo path
      alt="Loading..."
      className="w-16 h-16 animate-spin"
    />
  </div>
 
    );

  return (
    <div className="flex flex-col overflow-hidden bg-white">
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
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="restaurants" element={<AdminRestaurants />} />
          <Route path="restaurants/:id" element={<AdminMenuItems />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="listing/:id" element={<UserMenuItems />} />
          <Route path="home" element={<ShoppingHome />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="order-success" element={<OrderSuccessPage />} />
          <Route path="search" element={<SearchFoodItems />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
