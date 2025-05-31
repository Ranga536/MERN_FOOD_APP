const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../../models/User");
const sendEmail = require("../../utils/sendEmail");
// const {validationResult} = require('express-validator');

//register
// const registerUser = async (req, res) => {
//   const { userName, email, phone, password } = req.body;

//   try {
//     const checkUser = await User.findOne({ email });

//     if (checkUser)
//       return res.json({
//         success: false,
//         message: "User already exists with this email",
//       });

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const newUser = new User({
//       userName,
//       email,
//       phone,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     res.status(200).json({
//       success: true,
//       message: "Registration Successful",
//     });
//   } catch (err) {
//
//     res.status(500).
//       json({
//         success: false,
//         message: "Server Error",
//       });
//   }
// };

//without jwt
// const registerUser = async (req, res) => {
//   const { userName, email, phone, password } = req.body;

//   try {
//     const checkUser = await User.findOne({ email });

//     if (checkUser) {
//       return res.json({
//         success: false,
//         message: "User already exists with this email",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     // Generate 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 mins

//     const newUser = new User({
//       userName,
//       email,
//       phone,
//       password: hashedPassword,
//       otp: otp,
//       otpExpiry: otpExpiry,
//       isVerified: false,
//     });

//     await newUser.save();

//     // Send OTP email
//     await sendEmail(
//       email,
//       "Your OTP for Verification",
//       `Your OTP for email verification is: ${otp}. It will expire in 10 minutes.`
//     );

//     res.status(200).json({
//       success: true,
//       message: "Registration successful! OTP sent to your email.",
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

//with jwt
const registerUser = async (req, res) => {
  const { userName, email, phone, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    // ✅ Generate JWT token here like loginUser
    // const token = jwt.sign(
    //   {
    //     id: newUser._id,
    //     role: newUser.role,
    //     email: newUser.email,
    //     userName: newUser.userName,
    //     phone: newUser.phone,
    //   },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "60m" }
    // );

    // ✅ Send cookie with token
    res
      // .cookie("token", token, {
      //   httpOnly: true,
      //   secure: false, // use `true` if using HTTPS in production
      // })
      .status(200)
      .json({
        success: true,
        message: "Registration successful!.",
        user: {
          id: newUser._id,
          userName: newUser.userName,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
        },
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't Exists! Please Register!",
      });

    const CheckPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!CheckPasswordMatch)
      return res.json({
        success: false,
        message: "Invalid Password! please try again!",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
        phone: checkUser.phone,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true, //to prevent cross site scripting attacks
        secure: true, //set to true if using https in production
        // secure : process.env.NODE_ENV === "production", //set to true if using https in production
        // sameSite : "strict", //to prevent cross site request forgery attacks
        // maxAge : 60 * 60 * 1000 //1 hour
        sameSite: "strict", // or "lax" if needed
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .json({
        success: true,
        message: "Logged in Successfully",
        user: {
          id: checkUser._id,
          userName: checkUser.userName,
          email: checkUser.email,
          phone: checkUser.phone,
          role: checkUser.role,
        },
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//logout
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token").json({
      success: true,
      message: "Logged out Successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//auth-middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token; //get the token from the cookie

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Not Authorized! Please Login again!",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verifying the token

    req.user = decoded; //setting the user in the request object to access it in the next middleware

    next(); //calling the next middleware
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Not Authorized! please login again!",
    });
  }
};

//verify otp
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.json({
        success: true,
        message: "User already verified",
      });
    }

    if (
      // user.otp !== parseInt(otp) ||
      // new Date(user.otpExpiry) < new Date()
      user.otp?.toString() !== otp?.toString() ||
      new Date(user.otpExpiry) < new Date()
    ) {
      return res.json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//forgot password
const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this email",
      });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set token and expiry
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const resetUrl = `${process.env.CLIENT_BASE_URL}/auth/reset-password/${resetToken}`;
    const message = `
      <h2>Hello ${user.userName}</h2>
      <p>You requested to reset your password. Click the link below:</p>
      <a href="${resetUrl}" target="_blank">Reset Password</a>
      <p>This link will expire in 10 minutes.</p>
    `;

    await sendEmail(user.email, "Password Reset Request", message);

    res.json({
      success: true,
      message: "Password Reset link has been sent to your email. If you haven't received it, please wait for sometime!.",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

//reset password
const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ success: true, message: "Password reset successful." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  verifyOtp,
  forgotPasswordController,
  resetPasswordController,
};
