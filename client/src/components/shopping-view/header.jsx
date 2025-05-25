import {
  CircleUser,
  LogOut,
  Menu,
  SearchIcon,
  ShoppingCart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/restaurants/cart-slice";
import delbiteLogo from "../../assets/Delbite Logo.jpg";

const MenuItems = ({ setOpenSheet }) => {
  return (
    <nav className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-3 mb-3 lg:mb-0 font-urbanist">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link
          key={menuItem.id}
          to={menuItem.path}
          onClick={() => setOpenSheet?.(false)}
          className="relative text-sm font-semibold text-gray-800 transition duration-300 ease-in-out hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 px-4 py-2 rounded-xl shadow-md hover:scale-105"
        >
          {menuItem.label}
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-red-500 scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
        </Link>
      ))}
    </nav>
  );
};

const HeaderRightContent = ({ setOpenSheet }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    setOpenSheet?.(false);
  };

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4 items-center">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6 cursor-pointer" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm  rounded-full">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">user cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems?.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black text-white font-extrabold">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          className="w-72 rounded-2xl border border-white/20 shadow-xl bg-gradient-to-br from-pink-100 via-white to-yellow-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 p-4 backdrop-blur-md animate-in fade-in slide-in-from-top-2"
        >
          {/* Avatar & Name */}
          <div className="flex items-center gap-3 mb-4 px-2">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.userName}`}
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-pink-300 shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Welcome back,
              </span>
              <span className="font-bold text-lg text-zinc-800 dark:text-white drop-shadow">
                {user?.userName.charAt(0).toUpperCase() +
                  user?.userName.slice(1)}
              </span>
            </div>
          </div>

          {/* Account */}
          <DropdownMenuItem
            onClick={() => {
              navigate("/shop/account");
              setOpenSheet?.(false);
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pink-200/70 dark:hover:bg-pink-600/30 text-zinc-800 dark:text-white font-semibold transition-all duration-300 group"
          >
            <CircleUser className="h-5 w-5 text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-pink-700 dark:group-hover:text-pink-300">
              My Account
            </span>
          </DropdownMenuItem>

          {/* Logout */}
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-200/70 dark:hover:bg-red-600/30 text-red-600 dark:text-red-400 font-semibold transition-all duration-300 group mt-2"
          >
            <LogOut className="h-5 w-5 group-hover:rotate-[-12deg] transition-transform" />
            <span className="group-hover:text-red-700 dark:group-hover:text-red-300">
              Log Out
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const [openSheet, setOpenSheet] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/shop/home" className="flex items-center gap-2">
            <img src={delbiteLogo} className="h-10 w-10" alt="Delbite Logo" />
            <span className="font-bold">Delbite</span>
          </Link>
        </div>

        {/* Center: Menu Items (hidden on small screens) */}
        <div className="hidden lg:flex flex-1 justify-center">
          <MenuItems />
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          {/* SearchIcon visible on all screens */}
          <div className="cursor-pointer p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition">
            <Link to="/shop/search">
              <SearchIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Link>
          </div>

          {/* Mobile menu icon (hidden on lg and up) */}
          <div className="lg:hidden">
            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Header Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs">
                <MenuItems setOpenSheet={setOpenSheet} />
                <HeaderRightContent setOpenSheet={setOpenSheet} />
              </SheetContent>
            </Sheet>
          </div>

          {/* Right content (hidden on small screens) */}
          <div className="hidden lg:flex">
            <HeaderRightContent />
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
