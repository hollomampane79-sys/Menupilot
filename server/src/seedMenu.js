import mongoose from "mongoose";
import MenuItem from "./models/MenuItem.js";
import "dotenv/config";

const menuItems = [
  {
    name: "Classic Beef Burger",
    description:
      "Juicy beef patty, melted cheese, fresh lettuce, tomato, and house sauce.",
    price: 85,
    category: "Burgers",
    imageUrl: "",
    isAvailable: true,
  },
  {
    name: "Crispy Chicken Burger",
    description:
      "Crispy chicken fillet, lettuce, tomato, and creamy sauce in a toasted bun.",
    price: 75,
    category: "Burgers",
    imageUrl: "",
    isAvailable: true,
  },
  {
    name: "Margherita Pizza",
    description:
      "Tomato base, mozzarella cheese, and fresh basil on a crispy crust.",
    price: 110,
    category: "Pizza",
    imageUrl: "",
    isAvailable: true,
  },
  {
    name: "Chicken Tikka Pizza",
    description:
      "Spiced chicken tikka, peppers, onion, mozzarella, and tomato sauce.",
    price: 135,
    category: "Pizza",
    imageUrl: "",
    isAvailable: true,
  },
  {
    name: "Loaded French Fries",
    description:
      "Golden fries topped with cheese sauce, crispy chicken, and herbs.",
    price: 55,
    category: "Sides",
    imageUrl: "",
    isAvailable: true,
  },
  {
    name: "Chocolate Milkshake",
    description:
      "Creamy chocolate milkshake topped with whipped cream.",
    price: 45,
    category: "Drinks",
    imageUrl: "",
    isAvailable: true,
  },
];

async function seedMenu() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "menupilot",
    });

    const existingCount = await MenuItem.countDocuments();

    if (existingCount > 0) {
      console.log(
        `Seed skipped: ${existingCount} menu item(s) already exist.`
      );
      return;
    }

    const insertedItems = await MenuItem.insertMany(menuItems);

    console.log(`Inserted ${insertedItems.length} menu items.`);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedMenu();