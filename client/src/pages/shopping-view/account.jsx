import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import checkoutImage from "../../assets/checkout-banner.png";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import FooterInfo from "@/components/shopping-view/footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Mail, User, User2, UserCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ShoppingAccount = () => {
  const user = useSelector((state) => state.auth.user);
   useEffect(() => {
    // Prevent infinite reload
    if (!window.location.hash.includes("reloaded")) {
      window.location.hash = "reloaded";
      window.location.reload();
    }
  }, []);
  return (
    //previous background styling - className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100"
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 via-40% to-yellow-100">
      {/* Header Section with Image */}
      <div className="relative h-[200px] w-full overflow-hidden shadow-md">
        <img
          src={checkoutImage}
          alt="Checkout"
          // className="h-full w-full object-cover object-center brightness-90"
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-white font-bold italic text-4xl">Account</h1>
        </div>
      </div>

      {/* User Info Card */}
     <div className="px-3 sm:px-5 lg:px-0 max-w-2xl mx-auto mt-5">
      <Card className="rounded-3xl shadow-2xl border border-slate-200 bg-transparent backdrop-blur-md transition-all hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
        <CardContent className=" sm:p-6 space-y-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-tr from-purple-500 to-sky-400 text-white rounded-full p-3 shadow-md">
                <User2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Hey Foodie...</h2>
                <p className="text-sm text-muted-foreground">Here’s your account summary</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <User2 className="w-5 h-5 text-blue-400 mt-1 " />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Name</p>
                <p className="text-base font-medium text-foreground">{user?.userName || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                <p className="text-base font-medium text-foreground">{user?.email || "N/A"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-2 md:px-4 py-8">
        <div className="rounded-3xl border border-gray-200 bg-white/90 backdrop-blur-md p-4 md:p-10 shadow-2xl transition-all hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
          <Tabs defaultValue="orders">
            {/* Tab Buttons */}
            <TabsList className="flex gap-4 justify-center mb-8 bg-slate-100 p-4 rounded-xl shadow-inner">
              <TabsTrigger
                value="orders"
                className="flex-1 py-2 px-4 p-3 text-base font-semibold text-gray-700 rounded-lg hover:bg-white hover:text-indigo-600 focus-visible:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              >
                🛒 Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="flex-1 py-2 px-4 p-3 text-base font-semibold text-gray-700 rounded-lg hover:bg-white hover:text-indigo-600 focus-visible:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              >
                📍 Address
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <FooterInfo />
    </div>
  );
};

export default ShoppingAccount;
