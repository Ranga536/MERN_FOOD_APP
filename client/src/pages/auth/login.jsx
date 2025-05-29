import { Link } from "react-router-dom";
import { useState } from "react";
import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { MailIcon, LockIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message);
      } else {
        toast.error(data?.payload?.message || "something went wrong");
      }
    });
  };

  return (
    //previous background color className="min-h-screen w-full flex items-center justify-center bg-[linear-gradient(to_bottom_right,_#ffe4e6,_#fff1f3,_#fbcfe8)] px-4"
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-pink-300 via-purple-200 to-cyan-400 text-yellow-600  bg-no-repeat bg-cover px-4 font-['Inter'] transition-all duration-500">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl p-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Welcome Back 👋
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Don’t have an account?
            <Link
              className="text-primary font-semibold hover:underline ml-1"
              to="/auth/register"
            >
              Register
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="relative">
            <MailIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg  focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 "
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <LockIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right mt-1">
            <Link
              to="/auth/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            // className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6a11cb] via-[#2575fc] to-[#00c9ff] text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthLogin;
