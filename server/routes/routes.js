const express = require("express");
const {
  createUserController,
  getUsersController,
  loginUserController,
  logoutUserController,
  getUserByIdController,
} = require("../controllers/userController");
const authenticateToken = require("../middleware/auth");
const {
  createDonationController,
  getAllDonationsController,
  getDonationByIdController,
  updateDonationController,
  deleteDonationController,
  getDonationsByUserIdController,
} = require("../controllers/donationController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/users", createUserController);

// Protect this route with the authentication middleware
router.get("/users", authenticateToken, getUsersController);
router.get("/users/:userId", getUserByIdController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);

router.post("/donations", upload.single("picture"), createDonationController);
router.get("/donations", getAllDonationsController);
router.get("/donations/:id", getDonationByIdController);
router.put("/donations/:id", updateDonationController);
router.delete("/donations/:id", deleteDonationController);

router.get('/donations/user/:userId', getDonationsByUserIdController);   

module.exports = router;
