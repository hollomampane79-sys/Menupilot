import express from "express";
import MenuItem from "../models/MenuItem.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find().sort({ createdAt: 1 });

    res.json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    });
  } catch (error) {
    console.error("Error fetching menu items:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load menu items.",
    });
  }
});

export default router;