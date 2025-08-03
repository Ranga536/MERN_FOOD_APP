import { PhoneOutgoing } from "lucide-react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden sm:flex lg:flex items-center justify-center w-1/2 px-12 bg-gradient-to-t from-purple-100 via-indigo-100 to-pink-100


">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          {/* <h2 className="text-2xl font-bold text-gray-800">Call us to Place Your Order Today!! - 9515836496</h2> */}
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Delicious Meals Delivered
          </h2>
          <p className="text-gray-600">
            Get your favorite food at your doorstep! 🚀📦
          </p>

          <img
            className="rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
            // src="https://th.bing.com/th/id/OIP.LcCMoXlu2IKb74tqm0LLNQHaF7?rs=1&pid=ImgDetMain"
            src="https://res.cloudinary.com/dgk6jgali/image/upload/v1747679980/rus8jgvwmy94rtajoemg.jpg"
            alt="Promo"
          />
          <h2
            className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent"
            style={{
              fontFamily:
                "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            {/* Call us to Place Your Order Today!! 9876543210 */}
            {/* Ring us today at 9515836496 and get your order on the way! */}
          </h2>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
