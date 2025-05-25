import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
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

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [bannerOne, bannerTwo, bannerThree]; //remove this line whenever admin banner upload is started and uncomment commented useEffect, and onclick and comment dummy previous useeffect, onclick
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  //pending - check 8h 30m
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
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}

        {/* Slide Controls */}
        <Button
          variant="outline"
          size="icon"
          // onClick={() =>
          //   setCurrentSlide(
          //     (prev) => (prev - 1 + slides.length) % slides.length
          //   )
          // }

          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white/80 shadow"
        >
          <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white/80 shadow"
        >
          <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      </div>

      {/* Categories Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-[#ffe3e3] via-[#06eaff] to-[#ff22e5] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Order Your Favorite Food!!
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((item) => (
              <Card
                onClick={() => handleNavigateToSearchPage(item.label)}
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                  {/* <item.icon className="w-10 h-10 sm:w-12 sm:h-12 mb-3 text-primary" /> */}
                  <img
                    src={item.image}
                    className="w-20 h-20 sm:w-12 sm:h-12  md:w-20 md:h-20 mb-3 text-primary rounded-full hover:scale-110 hover:shadow-lg transform-content transition-shadow"
                  />
                  <span className="text-sm sm:text-base font-semibold">
                    {item.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <FooterInfo />
    </div>
  );
};

export default ShoppingHome;
