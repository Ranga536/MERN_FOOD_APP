import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { Phone, MessageCircle, Truck, Gift, Bike, Home, Utensils, UserCircle, User } from "lucide-react"; // Add these at top
import {
  Carrot,
  ChevronLeftIcon,
  ChevronRightIcon,
  Coffee,
  Drumstick,
  IceCream,
  Pizza,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFeatureImages } from "@/store/common-slice";
import FooterInfo from "@/components/shopping-view/footer";
import { motion } from "framer-motion";
import rcbOfferImg from "../../assets/rcb-offer.jpeg"
import groupWorkImg from "../../assets/undraw_group-project_kow1.png"

import { getFcmToken, onMessageListener } from "@/firebase/pushNotification";
import { setFcmToken } from "@/store/notifications/fcmSlice";
import { toast } from "sonner"; // or your toast lib (can replace with alert)


const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [bannerOne, bannerTwo, bannerThree];
  const [location, setLocation] = useState("Detecting...");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { featureImageList } = useSelector((state) => state.commonFeature);

   const user = useSelector((state) => state.auth.user); 
   const fcmToken = useSelector((state) => state.fcm.token);

  const handleNavigateToSearchPage = (keyword) => {
    navigate(`/shop/search/?keyword=${keyword}`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

    // ✅ Setup Push Notification
  useEffect(() => {
    const setupFcm = async () => {
      if (!user) return;

      const token = await getFcmToken();
      if (token && token !== fcmToken) {
        dispatch(setFcmToken(token));

        // Optional: send to backend
        await fetch(`${import.meta.env.VITE_API_URL}/api/fcm/save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            userId: user.id,
            role: user.role,
            userName: user.userName,
          }),
        });
      }
    };

    setupFcm();

    onMessageListener().then((payload) => {
      // toast(`${payload.notification.title}: ${payload.notification.body}`);
          const { title, body } = payload.notification;

    // ✅ Show actual native push notification (like mobile or desktop push)
    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/logo.png", // or your favicon or app icon
      });
    }

    // Optional: still show toast inside app
    toast(`${title}: ${body}`);
      
    });
  }, [user]);



  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;

          try {
            // Call OpenStreetMap Nominatim API (Free)
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`
            );
            const data = await res.json();

            if (data && data.address) {
              // Pick the best available (mandal, city, town, or village)
              const place =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                data.address.suburb ||
                data.address.county ||
                "Unknown";

              setLocation(place);
            } else {
              setLocation("Location unavailable");
            }
          } catch (error) {
            setLocation("Error fetching location");
          }
        },
        (err) => {
          console.error(err);
          setLocation("Location permission denied ❌");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  const categoriesWithIcon = [
    {
      id: 1,
      label: "Burger",
      icon: Pizza,
      image:
        "https://res.cloudinary.com/dgk6jgali/image/upload/v1748091078/search%20category%20images/gqxuypyrjyejsrzgqwtw.jpg",
    },
    {
      id: 2,
      label: "Tiffins",
      icon: Drumstick,
      image:
        "https://res.cloudinary.com/dgk6jgali/image/upload/v1748091307/search%20category%20images/o1pxviekk8xzfpvnodig.png",
    },
    {
      id: 3,
      label: "Biryani",
      icon: IceCream,
      image:
        "https://res.cloudinary.com/dgk6jgali/image/upload/v1748091365/search%20category%20images/bbsndssyay0ohzy6hksc.jpg",
    },
    {
      id: 4,
      label: "Snacks",
      icon: Coffee,
      image:
        "https://res.cloudinary.com/dgk6jgali/image/upload/v1748091415/search%20category%20images/zzjev12klopnhumnomxi.png",
    },
    {
      id: 5,
      label: "Veg Meals",
      icon: Carrot,
      image:
        "https://res.cloudinary.com/dgk6jgali/image/upload/v1748091456/search%20category%20images/qxoocqlpbvy4jhiovajs.png",
    },
    {
      id: 6,
      label: "Curries",
      icon: Carrot,
      image:
        "https://res.cloudinary.com/dgk6jgali/image/upload/v1748091500/search%20category%20images/nhqgqhdvkybugd52aubj.png",
    },
    {
      id: 7,
      label: "Ice Creams",
      icon: Carrot,
      image:
        "https://res.cloudinary.com/dgk6jgali/image/upload/v1748091539/search%20category%20images/j0gvwpfxrfs2faxzafno.jpg",
    },
    {
      id: 8,
      label: "Cool Drinks",
      icon: Carrot,
      image:
        "https://res.cloudinary.com/dgk6jgali/image/upload/v1748091549/search%20category%20images/v3ap7yqkgvpwh8wbyblo.png",
    },
    {
      id: 9,
      label: "Pizzas",
      icon: Carrot,
      image:
        "https://res.cloudinary.com/dgk6jgali/image/upload/v1753356830/lzayy0ykdqyeg1qmcivz.jpg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b  bg-white from-pink-50 to-white/90">
  <header className="px-4 sm:px-8 py-4 flex items-center justify-between 
  bg-gradient-to-r from-green-200 via-red-100 to-pink-300 shadow-md sticky top-0 z-50 rounded-2xl m-2">
  
 {/* Left Section */}
<div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full">
  {/* Hello User (Always Left) */}
  <p className="font-extrabold text-gray-800 leading-snug text-lg sm:text-xl">
    Hello, <span className="text-pink-600">{user.userName} 👋</span>
  </p>

  {/* Location (Stacks below on small, floats right on lg+) */}
  <p className="text-gray-700 text-sm sm:text-base mt-1 lg:mt-0 flex items-center lg:ml-auto">
    <span className="font-semibold text-pink-700 flex items-center">
      <span className="animate-pulse mr-1">📍</span>
      {location || "Fetching..."}
    </span>
  </p>
</div>

  {/* Right Section (User Avatar - hidden on lg+) */}
  <div className="relative group block lg:hidden">
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center 
      justify-center shadow-lg cursor-pointer border-2 border-pink-400 
      transition-transform transform hover:scale-110 hover:shadow-pink-300">
      <User className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 p-2 
          shadow-lg cursor-pointer border-2 border-green-400 
          transition-transform transform hover:scale-110 hover:shadow-green-300"
          onClick={() => navigate("/shop/account")}/>
    </div>
    {/* Tooltip */}
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 
      group-hover:opacity-100 transition-opacity bg-gray-800 text-white 
      text-xs sm:text-sm px-2 py-1 rounded-lg whitespace-nowrap shadow-md">
      {user.userName}
    </span>
  </div>
</header>

      {/* Banner Section */}
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden rounded-3xl mb-5 mt-5">
        {featureImageList &&
          featureImageList.length > 0 &&
          featureImageList.map((slide, index) => (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 1 }}
              src={slide?.image}
              key={index}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          ))}

        {/* Slide Controls */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black/70 text-white hover:bg-black"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % featureImageList.length)
          }
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black/70 text-white hover:bg-black"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </Button>
      </div>

      {/* Categories Section - from-[#ff43e9] via-[#06fffb] to-[#ff22e5] */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-pink-300 via-teal-200 to-green-200 rounded-3xl mb-1 border-t-rose-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

           {/* <h2 className="text-2xl font-bold text-center mb-10 text-gray-800 italic drop-shadow-lg">
            Currently Available in Gooty 
          </h2> */}

          <h2 className="text-2xl font-bold text-center mb-10 text-gray-800 italic drop-shadow-lg">
            Welcome to Delbite 
          </h2>

{/* <img 
src={rcbOfferImg}
className="w-75 h-auto max-w-2xl mx-auto rounded-lg shadow-lg mb-5"
/> */}

   <div className="w-full flex justify-center items-center mt-12 mb-10 px-4">
      <Button
        onClick={() => navigate("/shop/listing")}
        className="relative px-8 py-4 text-lg font-semibold text-white rounded-full 
          bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 
          shadow-2xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:scale-105 
          transition-transform duration-300 ease-in-out flex items-center gap-3 overflow-hidden"
      >
        {/* Glowing Pulse Border Layer */}
        <span className="absolute inset-0 border-2 border-white/20 rounded-full animate-pulse blur-[2px] z-0" />

        {/* Icon + Text */}
        <Utensils className="w-5 h-5 z-10 animate-wiggle" />
        <span className="relative z-10">Click To Explore Restaurants</span>
      </Button>
    </div>


          <h2 className="text-2xl font-bold text-center mb-10 text-black drop-shadow-lg italic">
            Order Your Favorite Food!!
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {categoriesWithIcon.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  onClick={() => handleNavigateToSearchPage(item.label)}
                  className="p-0 cursor-pointer bg-white/90 backdrop-blur-md rounded-xl shadow-xl hover:shadow-2xl transition-all"
                >
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <img
                      src={item.image}
                      className="w-18 h-18 md:w-20 md:h-20 mb-2 rounded-full border-2 border-pink-400 shadow-md"
                      alt={item.label}
                    />
                    <span className="text-base font-semibold text-gray-800">
                      {item.label}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          {/* Contact Info */}
          {/* <div className="mt-10 mb-10 flex flex-col items-center text-white text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-10 px-6 rounded-2xl shadow-2xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 tracking-wide drop-shadow-md">
              Order Now via WhatsApp or Call!
            </h3>
            <p className="text-sm text-white/80 mb-6">
              We’re just a message or call away to deliver fresh food, homemade
              meals, and more right to your doorstep!
            </p>
            <div className="flex flex-col gap-4 text-lg font-medium">
              <div className="flex items-center gap-3 hover:text-green-200 transition-all">
                <MessageCircle className="w-6 h-6 animate-pulse text-green-300" />
                <span>
                  WhatsApp Us:{" "}
                  <a
                    href="https://wa.me/+919515836496"
                    className="underline hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    95158 36496
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-3 hover:text-yellow-200 transition-all">
                <Phone className="w-6 h-6 animate-pulse text-yellow-300" />
                <span>
                  Call Us:{" "}
                  <a
                    href="tel:+919515836496"
                    className="underline hover:text-white"
                  >
                    95158 36496
                  </a>
                </span>
              </div>
            </div>
          </div> */}
          {/* Promote Social Media Section */}
          <div className="mt-10 mb-10 flex flex-col items-center text-white text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-10 px-6 rounded-2xl shadow-2xl max-w-3xl mx-auto">
  <h3 className="text-2xl font-bold mb-4 tracking-wide drop-shadow-md">
    Stay Connected & Support Us 💖
  </h3>
  <p className="text-sm text-white/80 mb-6">
    We’re growing with your love! 🌟  
    Follow us on Instagram & YouTube to support our journey and never miss an update and offers 🚀
  </p>

  {/* Social Buttons */}
  <div className="flex space-x-6">
      <a
      href="https://www.youtube.com/@delbite_official"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg shadow-md"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M21.8 8s-.2-1.5-.8-2.1c-.7-.8-1.5-.8-1.9-.9C16.4 5 12 5 12 5h-.1s-4.4 0-7.1.2c-.4 0-1.2 0-1.9.9C2.2 6.5 2 8 2 8s-.2 1.7-.2 3.4v1.2C1.8 14.3 2 16 2 16s.2 1.5.8 2.1c.7.8 1.6.8 2 .9 1.4.1 6.9.2 6.9.2s4.4 0 7.1-.2c.4 0 1.2 0 1.9-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.4V11.4C22 9.7 21.8 8 21.8 8zM9.8 14.3V9.7l5.2 2.3-5.2 2.3z" />
      </svg>
      <span className="font-bold">YouTube</span>
    </a>
    <a
      href="https://www.instagram.com/delbite_official"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 bg-pink-600 hover:bg-pink-700 transition px-4 py-2 rounded-lg shadow-md"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
      </svg>
      <span className="font-bold">Instagram</span>
    </a>
  </div>
</div>

        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-12 bg-gradient-to-br from-[#ff22e5] via-[#06fffb] to-[#ff43e9] rounded-t-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-white drop-shadow-lg">
            Our Services
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {/* Service Cards */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card className="bg-white/90 backdrop-blur-md shadow-xl hover:shadow-2xl p-4 text-center">
                <Truck className="mx-auto h-10 w-10 text-primary mb-2" />
                <h3 className="font-semibold text-lg text-gray-800">
                  Food Delivery
                </h3>
                <p className="text-sm text-gray-600">
                  Fast and fresh food delivered to your door.
                </p>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card className="bg-white/90 backdrop-blur-md shadow-xl hover:shadow-2xl p-4 text-center">
                <Gift className="mx-auto h-10 w-10 text-primary mb-2" />
                <h3 className="font-semibold text-lg text-gray-800">
                  Bulk Orders
                </h3>
                <p className="text-sm text-gray-600">
                  Party or event? We take large food orders.
                </p>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card className="bg-white/90 backdrop-blur-md shadow-xl hover:shadow-2xl p-4 text-center">
                <Bike className="mx-auto h-10 w-10 text-primary mb-2" />
                <h3 className="font-semibold text-lg text-gray-800">
                  Two-Wheeler Parcel
                </h3>
                <p className="text-sm text-gray-600">
                  Send or receive local parcels quickly.
                </p>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card className="bg-white/90 backdrop-blur-md shadow-xl hover:shadow-2xl p-4 text-center">
                <Home className="mx-auto h-10 w-10 text-primary mb-2" />
                <h3 className="font-semibold text-lg text-gray-800">
                  Home-Made Food
                </h3>
                <p className="text-sm text-gray-600">
                  Healthy, home-style meals available.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <FooterInfo />
    </div>
//  <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br bg-white p-6">
//       {/* Illustration */}
//       <img
//         src={groupWorkImg}
//         alt="Under Maintenance"
//         className="w-72 md:w-96 mb-6 rounded-3xl"
//       />

//       {/* Text Section */}
//       <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
//         🍔 We’re Cooking Something Delicious!🍴
//       </h1>
//       <p className="text-lg md:text-xl text-gray-600 text-center max-w-xl mb-6 italic">
//         Our Delbite - food delivery website is currently <span className="font-semibold">under maintenance</span>.  
//         We’ll be back very soon with a fresh and tasty experience. Stay tuned!
//       </p>

//       {/* Action / Button */}
//       <button
//         onClick={() => window.location.reload()}
//         className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
//       >
//         Refresh 
//       </button>
//     </main>

//   );
// };

export default ShoppingHome;