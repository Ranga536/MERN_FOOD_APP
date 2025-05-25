const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  verifyOtp,
  forgotPasswordController,
  resetPasswordController,
} = require("../../controllers/auth/auth-controller");

const router = express.Router({ mergeParams: true });

router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
// Send reset email
router.post("/forgot-password", forgotPasswordController);

// Reset password
router.post("/reset-password/:token", resetPasswordController);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user; //get the user from the request object to access the user data
  res.status(200).json({
    success: true,
    message: "user authenticated",
    user,
  });
});

module.exports = router;
