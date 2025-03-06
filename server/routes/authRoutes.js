const express = require("express");
const { 
  registerUser, 
  loginUser, 
  checkToken, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser ,
  updatePassword
} = require("../controllers/authController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check", protect, checkToken);

router.get("/users",  getUsers);
router.get("/users/:id", protect, admin, getUserById);
router.put("/users/:id",  updateUser);
router.delete("/users/:id",  deleteUser);
router.put("/users/update/:id", updatePassword)
module.exports = router;
