import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* /admin sidebar */}
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader open={openSidebar} setOpen={setOpenSidebar} />
        {/* <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">   */}
        <main className="flex-1 flex-col flex bg-gradient-to-br from-pink-200 via-teal-100 to-green-200 p-4 md:p-6">  
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
