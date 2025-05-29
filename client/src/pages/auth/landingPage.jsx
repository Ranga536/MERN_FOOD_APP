import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Utensils, Truck, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  const navigate = useNavigate()

  return (
    <div
      className={`relative min-h-screen overflow-hidden bg-gradient-to-tr from-purple-900 via-indigo-800 to-cyan-800 text-gray-100 px-8 py-14 font-sans transition-opacity duration-1000 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Animated blobs */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full opacity-70 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-[100px] right-[-100px] w-[400px] h-[400px] bg-gradient-to-r from-pink-500 to-red-600 rounded-full opacity-60 blur-3xl animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-[-80px] left-[50%] translate-x-[-50%] w-[450px] h-[450px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-50 blur-3xl animate-blob animation-delay-6000"></div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-4xl mx-auto text-center mt-12">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-extrabold tracking-tight mb-8 leading-tight bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-xl"
        >
          Welcome to Delbite
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xl max-w-xl mx-auto text-gray-200 mb-10 drop-shadow-sm leading-relaxed"
        >
          Craving something tasty? Get your favorite meals delivered fast from local restaurants. Fresh, fast, and delightful — only with Delbite in Gooty. 
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-10 py-4 text-lg rounded-full font-semibold shadow-xl hover:shadow-cyan-400/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300"
            onClick={() => navigate("/auth/login")}
          >
            Order Now
          </Button>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 bg-white/10 rounded-xl shadow-lg mt-24 py-20 px-14 max-w-5xl mx-auto backdrop-blur-md border border-white/20">
        <h2 className="text-4xl font-bold text-center mb-14 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
          Why Choose Delbite?
        </h2>
        <div className="grid md:grid-cols-3 gap-12 text-center text-white">
          <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
            <Truck className="mx-auto text-cyan-300 drop-shadow-lg" size={48} />
            <h3 className="text-2xl font-semibold mt-6 mb-4 text-cyan-100 drop-shadow-sm">
              Fast Delivery
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Your food, delivered piping hot and right on time.
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
            <Utensils className="mx-auto text-cyan-300 drop-shadow-lg" size={48} />
            <h3 className="text-2xl font-semibold mt-6 mb-4 text-cyan-100 drop-shadow-sm">
              Top Restaurants
            </h3>
            <p className="text-gray-300 leading-relaxed">
              We partner with the best to bring you the best.
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
            <Smartphone className="mx-auto text-cyan-300 drop-shadow-lg" size={48} />
            <h3 className="text-2xl font-semibold mt-6 mb-4 text-cyan-100 drop-shadow-sm">
              Easy Ordering
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Quick and simple ordering process, anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-24 px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-2 gap-16 text-white">
          {[{
            quote: "Delbite is my go-to for food delivery! Super fast and always reliable.",
            name: "Anjali R."
          }, {
            quote: "Love the user interface. It's super easy to find and order what I want.",
            name: "Rajesh M."
          }].map(({ quote, name }, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="bg-white/10 p-10 rounded-3xl shadow-xl backdrop-blur-md border border-white/20 hover:scale-105 transition-transform cursor-pointer"
            >
              <p className="mb-8 text-lg drop-shadow-sm italic leading-relaxed">
                "{quote}"
              </p>
              <div className="flex items-center space-x-3 mb-5">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="text-yellow-400 drop-shadow-lg"
                    size={22}
                  />
                ))}
              </div>
              <p className="font-semibold text-cyan-200 drop-shadow-sm">— {name}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 30px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;