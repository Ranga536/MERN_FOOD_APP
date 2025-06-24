// import { Button } from "@/components/ui/button";
// import bannerOne from "../../assets/banner-1.webp";
// import bannerTwo from "../../assets/banner-2.webp";
// import bannerThree from "../../assets/banner-3.webp";
// import {
//   Carrot,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   Coffee,
//   Drumstick,
//   IceCream,
//   Pizza,
// } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getFeatureImages } from "@/store/common-slice";
// import FooterInfo from "@/components/shopping-view/footer";

// const ShoppingHome = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slides = [bannerOne, bannerTwo, bannerThree]; //remove this line whenever admin banner upload is started and uncomment commented useEffect, and onclick and comment dummy previous useeffect, onclick
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { featureImageList } = useSelector((state) => state.commonFeature);

//   //pending - check 8h 30m
//   const handleNavigateToSearchPage = (keyword) => {
//     navigate(`/shop/search/?keyword=${keyword}`);
//   };

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
//     }, 15000);

//     return () => clearInterval(timer);
//   }, [featureImageList]);

//   useEffect(() => {
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   const categoriesWithIcon = [
//     {
//       id: 1,
//       label: "Burger",
//       icon: Pizza,
//       image:
//         "https://res.cloudinary.com/dgk6jgali/image/upload/v1748091078/search%20category%20images/gqxuypyrjyejsrzgqwtw.jpg",
//     },
//     {
//       id: 2,
//       label: "Tiffins",
//       icon: Drumstick,
//       image:
//         "https://res.cloudinary.com/dgk6jgali/image/upload/v1748091307/search%20category%20images/o1pxviekk8xzfpvnodig.png",
//     },
//     {
//       id: 3,
//       label: "Biryani",
//       icon: IceCream,
//       image:
//         "https://res.cloudinary.com/dgk6jgali/image/upload/v1748091365/search%20category%20images/bbsndssyay0ohzy6hksc.jpg",
//     },
//     {
//       id: 4,
//       label: "Snacks",
//       icon: Coffee,
//       image:
//         "https://res.cloudinary.com/dgk6jgali/image/upload/v1748091415/search%20category%20images/zzjev12klopnhumnomxi.png",
//     },
//     {
//       id: 5,
//       label: "Veg Meals",
//       icon: Carrot,
//       image:
//         "https://res.cloudinary.com/dgk6jgali/image/upload/v1748091456/search%20category%20images/qxoocqlpbvy4jhiovajs.png",
//     },
//     {
//       id: 6,
//       label: "Curries",
//       icon: Carrot,
//       image:
//         "https://res.cloudinary.com/dgk6jgali/image/upload/v1748091500/search%20category%20images/nhqgqhdvkybugd52aubj.png",
//     },
//     {
//       id: 7,
//       label: "Ice Creams",
//       icon: Carrot,
//       image:
//         "https://res.cloudinary.com/dgk6jgali/image/upload/v1748091539/search%20category%20images/j0gvwpfxrfs2faxzafno.jpg",
//     },
//     {
//       id: 8,
//       label: "Cool Drinks",
//       icon: Carrot,
//       image:
//         "https://res.cloudinary.com/dgk6jgali/image/upload/v1748091549/search%20category%20images/v3ap7yqkgvpwh8wbyblo.png",
//     },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Banner Section */}
//       <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden">
//         {featureImageList && featureImageList.length > 0
//           ? featureImageList.map((slide, index) => (
//               <img
//                 src={slide?.image}
//                 key={index}
//                 className={`${
//                   index === currentSlide ? "opacity-100" : "opacity-0"
//                 } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
//               />
//             ))
//           : null}

//         {/* Slide Controls */}
//         <Button
//           variant="outline"
//           size="icon"
//           // onClick={() =>
//           //   setCurrentSlide(
//           //     (prev) => (prev - 1 + slides.length) % slides.length
//           //   )
//           // }

//           onClick={() =>
//             setCurrentSlide(
//               (prevSlide) => (prevSlide + 1) % featureImageList.length
//             )
//           }
//           className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white/80 shadow"
//         >
//           <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
//           className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white/80 shadow"
//         >
//           <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
//         </Button>
//       </div>

//       {/* Categories Section */}
//       <section className="py-8 sm:py-12 bg-gradient-to-br from-[#ff43e9] via-[#06fffb] to-[#ff22e5] ">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-grey-700">
//             Order Your Favorite Food!!
//           </h2>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {categoriesWithIcon.map((item) => (
//               <Card
//                 onClick={() => handleNavigateToSearchPage(item.label)}
//                 key={item.id}
//                 className="cursor-pointer hover:shadow-lg transition-shadow"
//               >
//                 <CardContent className="flex flex-col items-center justify-center p-0 sm:p-3">
//                   {/* <item.icon className="w-10 h-10 sm:w-12 sm:h-12 mb-3 text-primary" /> */}
//                   <img
//                     src={item.image}
//                     className="w-18 h-18 shadow-lg sm:w-12 sm:h-12  md:w-20 md:h-20 mb-3 text-primary rounded-full hover:scale-110 hover:shadow-lg transform-content transition-shadow"
//                   />
//                   <span className="text-sm sm:text-base font-semibold">
//                     {item.label}
//                   </span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//       <FooterInfo />
//     </div>
//   );
// };

// export default ShoppingHome;

import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { Phone, MessageCircle, Truck, Gift, Bike, Home, Utensils } from "lucide-react"; // Add these at top
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

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [bannerOne, bannerTwo, bannerThree];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { featureImageList } = useSelector((state) => state.commonFeature);

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
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden">
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

      {/* Categories Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-[#ff43e9] via-[#06fffb] to-[#ff22e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

           <h2 className="text-3xl font-bold text-center mb-10 text-white drop-shadow-lg">
            Currently Available in Gooty 
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


          <h2 className="text-3xl font-bold text-center mb-10 text-white drop-shadow-lg">
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
                      className="w-18 h-18 md:w-20 md:h-20 mb-2 rounded-full border-2 border-white shadow-md"
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
          <div className="mt-10 mb-10 flex flex-col items-center text-white text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-10 px-6 rounded-2xl shadow-2xl max-w-3xl mx-auto">
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
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-12 bg-gradient-to-br from-[#ff22e5] via-[#06fffb] to-[#ff43e9]">
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

          {/* Contact Info */}
          {/* <div className="mt-10 flex flex-col items-center text-grey-600 text-center">
      <h3 className="text-xl font-semibold mb-2">We take orders on WhatsApp & Call!</h3>
      <div className="flex items-center gap-4 text-lg">
        <MessageCircle className="w-6 h-6" />
        <span>WhatsApp Us: <a href="https://wa.me/+919515836496" className="underline">+91-95158 36496</a></span>
      </div>
      <div className="flex items-center gap-4 text-lg mt-2">
        <Phone className="w-6 h-6" />
        <span>Call Us: <a href="tel:+919515836496" className="underline">+91-95158 36496</a></span>
      </div>
    </div> */}
        </div>
      </section>

      <FooterInfo />
    </div>


  );
};

export default ShoppingHome;
