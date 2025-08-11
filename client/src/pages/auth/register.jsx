import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  MailIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "@/store/auth-slice";
import { toast } from "sonner";

const initialState = {
  userName: "",
  phone: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const [isChecked, setIsChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  // Add this to your component state
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const { userName, email, phone, password } = formData;
    if (userName && email && phone && password && isChecked) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData, isChecked]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message);
        // navigate("/shop/home");
        // navigate("/auth/login");
        // navigate("/auth/verify-otp", { state: { email: formData.email } });

        // Immediately log the user in
        dispatch(
          loginUser({ email: formData.email, password: formData.password })
        ).then((loginData) => {
          if (loginData?.payload?.success) {
            navigate("/shop/home");
          } else {
            toast.error(
              "Registered but auto-login failed. Please log in manually."
            );
            navigate("/auth/login");
          }
        });
      } else {
        toast.error(data?.payload?.message || "Something went wrong");
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[linear-gradient(135deg,_#c3ecf7,_#f5c6ec,_#fdd9b5,_#b5ead7,_#c9c9ff)] bg-no-repeat bg-cover px-4 font-['Inter'] transition-all duration-500">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/80 border border-white/40 shadow-xl rounded-2xl p-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Create New Account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?
            <Link
              className="text-primary font-semibold hover:underline ml-1"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* User Name */}
          <div className="relative">
            <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
              placeholder="User Name"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <MailIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <PhoneIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              inputmode="numeric"
              pattern="\d{10}"
              maxlength="10"
              minLength="10"
              title="Enter Valid Phone Number"
              placeholder="Phone"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <LockIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Checkbox for Terms */}
          <div className="flex items-start gap-3 text-sm mt-4">
            <input
              type="checkbox"
              id="terms"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-1 accent-blue-600 w-4 h-4 rounded cursor-pointer"
            />
            <label htmlFor="terms" className="text-gray-700 leading-relaxed">
              I agree to the{" "}
              <Link
                to="/auth/terms-conditions"
                className="text-blue-600 font-medium underline hover:text-blue-800 transition-colors duration-200"
              >
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="/auth/privacy-policy"
                className="text-blue-600 font-medium underline hover:text-blue-800 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-xl text-white font-bold shadow-lg transition-all duration-300 ${
              isFormValid
                ? "bg-gradient-to-r from-[#6a11cb] via-[#2575fc] to-[#00c9ff] hover:shadow-xl hover:scale-[1.02]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthRegister;
