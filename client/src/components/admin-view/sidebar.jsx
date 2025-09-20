import {
  BadgeCheck,
  ChartNoAxesCombined,
  Hotel,
  LayoutDashboard,
  MessageCircleCode,
  ShieldUser,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard color="#e60fd4" />,
  },
  {
    id: "restaurants",
    label: "Restaurants",
    path: "/admin/restaurants",
    icon: <Hotel color="#0fe6d8" />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingBag color="#e60f0f" />,
  },
  {
    id: "admin-notifications",
    label: "Notifications",
    path: "/admin/notifications",
    icon: <MessageCircleCode color="orange" />
  },
];

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex cursor-pointer text-xl font-bold italic font-mono not-even: items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
};

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                {/* <ChartNoAxesCombined size={30} /> */}
                <ShieldUser size={28} color="red" />
                <h1 className="text-xl font-extrabold ">Delbite-Admin</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          {/* <ChartNoAxesCombined size={30} /> */}
          <ShieldUser size={28} color="red" />
          <h1 className="text-xl font-extrabold">Delbite-Admin</h1>
          
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
