// index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Dummy shops
const shops = [
  { id: "1", name: "Online Hub", type: "online" },
  { id: "2", name: "Usha Store", type: "shop" },
  { id: "3", name: "Sukesh Saloon", type: "saloon" },
  { id: "4", name: "Babu Restaurant", type: "shop" },
  { id: "5", name: "Maa Tara Hardware", type: "shop" },
];

// Dummy products
const products = [
  { id: "p1", name: "Rice 1kg", price: 50 },
  { id: "p2", name: "Dal 1kg", price: 90 },
  { id: "p3", name: "Oil 1L", price: 130 },
  { id: "p4", name: "Sugar 1kg", price: 45 },
  { id: "p5", name: "Salt 1kg", price: 25 },
  { id: "p6", name: "Shirt", price: 400 },
  { id: "p7", name: "T-shirt", price: 250 },
  { id: "p8", name: "Shoes", price: 600 },
  { id: "p9", name: "Fan", price: 1200 },
  { id: "p10", name: "Light", price: 150 }
];

// Dummy services
const services = [
  { id: "s1", name: "Hair Cut", price: 50 },
  { id: "s2", name: "Shaving", price: 40 },
  { id: "s3", name: "Facial", price: 150 },
  { id: "s4", name: "Massage", price: 200 },
];

// ✅ API routes
app.get("/", (req, res) => {
  res.send("✅ HaatBazar Backend is Running...");
});

app.get("/shops", (req, res) => {
  res.json(shops);
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/services", (req, res) => {
  res.json(services);
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
