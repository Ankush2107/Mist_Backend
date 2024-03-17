import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
const router = Router();

router.get("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/logout", logoutUser);
// router.get("/me", isLoggedIn, getUserProfile);
// router.post("/forgetpassword", forgetPassword);
// router.post("/reset/:resetToken", resetPassword);
// router.post("/change-password", isLoggedIn, changePassword);
// router.put("/update", isLoggedIn, updateUser);

export default router;