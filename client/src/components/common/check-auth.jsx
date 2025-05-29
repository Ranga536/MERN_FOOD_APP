
import LandingPage from "@/pages/auth/landingPage";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      // return <Navigate to="/auth/login" />;
      return <LandingPage />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/verify-otp") ||
      location.pathname.includes("/terms-conditions") ||
      location.pathname.includes("/privacy-policy") ||
      location.pathname.includes("/forgot-password") ||
      location.pathname.includes("/reset-password")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;


// src/components/auth/CheckAuth.jsx
// import { Navigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";

// const CheckAuth = ({ children }) => {
//   const location = useLocation();
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//     // 🔐 Force redirect if user is not authenticated but tries to access private route
//   useEffect(() => {
//     if (!isAuthenticated && !location.pathname.startsWith("/auth")) {
//       window.history.replaceState({}, '', '/auth/login'); // replace history entry
//     }
//   }, [isAuthenticated, location]);

//   // 1. Root redirection
//   if (location.pathname === "/") {
//     if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
//     return user?.role === "admin"
//       ? <Navigate to="/admin/dashboard" replace />
//       : <Navigate to="/shop/home" replace />;
//   }

//   // 2. Publicly accessible routes
//   const publicPaths = [
//     "/auth/login",
//     "/auth/register",
//     "/auth/verify-otp",
//     "/auth/forgot-password",
//     "/auth/reset-password",
//     "/auth/terms-conditions",
//     "/auth/privacy-policy",
//     "/unauth-page"
//   ];

//   if (!isAuthenticated && !publicPaths.some((path) => location.pathname.startsWith(path))) {
//     return <Navigate to="/auth/login" replace />;
//   }

//   // 3. If authenticated and visiting login/register — redirect to dashboard
//   if (
//     isAuthenticated &&
//     (location.pathname.startsWith("/auth/login") ||
//      location.pathname.startsWith("/auth/register"))
//   ) {
//     return user?.role === "admin"
//       ? <Navigate to="/admin/dashboard" replace />
//       : <Navigate to="/shop/home" replace />;
//   }

//   // 4. Prevent normal users accessing admin routes
//   if (isAuthenticated && user?.role !== "admin" && location.pathname.startsWith("/admin")) {
//     return <Navigate to="/unauth-page" replace />;
//   }

//   // 5. Prevent admin accessing user/shop routes
//   if (isAuthenticated && user?.role === "admin" && location.pathname.startsWith("/shop")) {
//     return <Navigate to="/admin/dashboard" replace />;
//   }

//   return <>{children}</>;
// };

// export default CheckAuth;
