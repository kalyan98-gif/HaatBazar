// index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ All Shops with their items
// index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ All Shops with their items
const shops = [
  {
    id: "1",
    name: "Online Hub",
    type: "online",
    items: [],
  },
  {
    id: "2",
    name: "Usha Store",
    type: "shop",
    items: [
      { id: "p1", name: "Basmati Rice 1kg", price: 90 },
      { id: "p2", name: "Moong Dal 1kg", price: 120 },
      { id: "p3", name: "Mustard Oil 1L", price: 150 },
      { id: "p4", name: "Sugar 1kg", price: 50 },
      { id: "p5", name: "Tata Salt 1kg", price: 28 },
      { id: "p6", name: "Marie Gold Biscuit", price: 10 },
    ],
  },
  {
    id: "3",
    name: "Sukesh Saloon",
    type: "saloon",
    items: [
      { id: "s1", name: "Hair Cut", price: 80 },
      { id: "s2", name: "Shaving", price: 50 },
      { id: "s3", name: "Hair Colour", price: 250 },
      { id: "s4", name: "Facial (Gold)", price: 400 },
      { id: "s5", name: "Head Massage", price: 150 },
      { id: "s6", name: "Beard Trim", price: 70 },
    ],
  },
  {
    id: "4",
    name: "Babu Restaurant",
    type: "shop",
    items: [
      { id: "f1", name: "Chicken Biryani", price: 180 },
      { id: "f2", name: "Paneer Butter Masala", price: 160 },
      { id: "f3", name: "Tandoori Roti", price: 15 },
      { id: "f4", name: "Chicken Kasha", price: 220 },
      { id: "f5", name: "Mixed Fried Rice", price: 150 },
      { id: "f6", name: "Green Salad", price: 50 },
    ],
  },
  {
    id: "5",
    name: "Maa Tara Hardware",
    type: "shop",
    items: [
      { id: "h1", name: "Cement Bag (ACC)", price: 450 },
      { id: "h2", name: "TMT Rod (per kg)", price: 80 },
      { id: "h3", name: "Paint (1 Litre)", price: 300 },
      { id: "h4", name: "Hammer", price: 150 },
      { id: "h5", name: "Bricks (per piece)", price: 12 },
      { id: "h6", name: "Screwdriver Set", price: 200 },
    ],
  },
  {
    id: "6",
    name: "New Rekha Dress",
    type: "shop",
    items: [
      { id: "d1", name: "Cotton Saree", price: 800 },
      { id: "d2", name: "Men's T-Shirt", price: 450 },
      { id: "d3", name: "Jeans Pant", price: 1200 },
      { id: "d4", name: "Designer Kurti", price: 700 },
      { id: "d5", name: "Formal Shirt", price: 900 },
      { id: "d6", name: "Ladies Dupatta", price: 250 },
    ],
  },
  {
    id: "7",
    name: "Mamoni Shoe House",
    type: "shop",
    items: [
      { id: "sh1", name: "Formal Shoes (Men)", price: 1500 },
      { id: "sh2", name: "Sneakers", price: 1800 },
      { id: "sh3", name: "Sandals (Women)", price: 600 },
      { id: "sh4", name: "Leather Slippers", price: 400 },
      { id: "sh5", name: "Sports Shoes", price: 2500 },
      { id: "sh6", name: "Kids School Shoes", price: 750 },
    ],
  },
  {
    id: "8",
    name: "Light House",
    type: "shop",
    items: [
      { id: "e1", name: "Ceiling Fan", price: 1800 },
      { id: "e2", name: "LED Bulb (9W)", price: 120 },
      { id: "e3", name: "Iron", price: 900 },
      { id: "e4", name: "Extension Board", price: 350 },
      { id: "e5", name: "Table Fan", price: 1300 },
      { id: "e6", name: "Mixer Grinder", price: 2200 },
    ],
  },
  {
    id: "9",
    name: "Dev Kumar Saloon",
    type: "saloon",
    items: [
      { id: "s1", name: "Hair Cut", price: 100 },
      { id: "s2", name: "Shaving", price: 60 },
      { id: "s3", name: "Facial", price: 300 },
    ],
  },
  {
    id: "10",
    name: "Sritama Beauty Parlour",
    type: "parlour",
    items: [
      { id: "sp1", name: "Makeup", price: 1500 },
      { id: "sp2", name: "Bridal Package", price: 5000 },
      { id: "sp3", name: "Hair Styling", price: 700 },
    ],
  },
  {
    id: "11",
    name: "Mratree Sweet",
    type: "sweet",
    items: [
      { id: "m1", name: "Rasgulla (1kg)", price: 200 },
      { id: "m2", name: "Sandesh (1kg)", price: 250 },
      { id: "m3", name: "Gulab Jamun (1kg)", price: 300 },
    ],
  },
  {
    id: "12",
    name: "Babujee Restuarant",
    type: "shop",
    items: [
      { id: "f7", name: "Fish Curry", price: 200 },
      { id: "f8", name: "Mutton Curry", price: 350 },
      { id: "f9", name: "Veg Thali", price: 120 },
    ],
  },
  {
    id: "13",
    name: "Sarkar Telecom",
    type: "shop",
    items: [
      { id: "p1", name: "Motorola g85", price: 30000 },
      { id: "p2", name: "Vivo v25 plus", price: 44500 },
      { id: "p3", name: "Samsung S25", price: 15000 },
      { id: "p4", name: "Nokia music express", price: 2800 },
      { id: "p5", name: "Oppo reno 7 plus", price: 85000 },
      { id: "p6", name: "Nothing Phone3", price: 45000 },
    ],
  },

  // ===== New Shops =====
  {
    id: "14",
    name: "Haldar Enterprise",
    type: "shop",
    items: [
      { id: "he1", name: "Notebook", price: 50 },
      { id: "he2", name: "Pen Pack", price: 30 },
      { id: "he3", name: "Stapler", price: 150 },
    ],
  },
  {
    id: "15",
    name: "Gayan Store",
    type: "shop",
    items: [
      { id: "gs1", name: "Tea Pack", price: 200 },
      { id: "gs2", name: "Coffee Beans", price: 400 },
      { id: "gs3", name: "Sugar 1kg", price: 60 },
    ],
  },
  {
    id: "16",
    name: "Dee Store",
    type: "shop",
    items: [
      { id: "ds1", name: "Shampoo", price: 150 },
      { id: "ds2", name: "Soap", price: 40 },
      { id: "ds3", name: "Conditioner", price: 200 },
    ],
  },
  {
    id: "17",
    name: "Saha Hotel",
    type: "shop",
    items: [
      { id: "sh1", name: "Chicken Curry", price: 250 },
      { id: "sh2", name: "Mutton Curry", price: 400 },
      { id: "sh3", name: "Veg Thali", price: 120 },
    ],
  },
];

// ✅ API routes
app.get("/", (req, res) => {
  res.send("✅ HaatBazar Backend is Running...");
});

app.get("/shops", (req, res) => {
  res.json(shops);
});

app.get("/shops/:id", (req, res) => {
  const shop = shops.find((s) => s.id === req.params.id);
  if (!shop) return res.status(404).json({ message: "Shop not found" });
  res.json(shop);
});

app.post("/order", (req, res) => {
  const { items, total } = req.body;
  res.json({ message: "✅ Order received!", items, total });
});

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

// ✅ API routes
app.get("/", (req, res) => {
  res.send("✅ HaatBazar Backend is Running...");
});

app.get("/shops", (req, res) => {
  res.json(shops);
});

app.get("/shops/:id", (req, res) => {
  const shop = shops.find((s) => s.id === req.params.id);
  if (!shop) return res.status(404).json({ message: "Shop not found" });
  res.json(shop);
});

app.post("/order", (req, res) => {
  const { items, total } = req.body;
  res.json({ message: "✅ Order received!", items, total });
});

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});