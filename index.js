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
      { id: "p1", name: "Basmati Rice 1kg", price: 90, description: "উচ্চ মানের সুগন্ধি বাসমতী চাল, প্রতিদিনের রান্নার জন্য উপযুক্ত।" },
      { id: "p2", name: "Moong Dal 1kg", price: 120, description: "তাজা মুগ ডাল, সহজে সিদ্ধ হয় এবং প্রোটিনে ভরপুর।" },
      { id: "p3", name: "Mustard Oil 1L", price: 150, description: "খাঁটি সরিষার তেল, রান্না ও মেসেজ উভয়ের জন্য ভালো।" },
      { id: "p4", name: "Sugar 1kg", price: 50, description: "পরিষ্কার ও মিষ্টি দানার চিনি, দৈনন্দিন ব্যবহারের উপযোগী।" },
      { id: "p5", name: "Tata Salt 1kg", price: 28, description: "আয়োডিনযুক্ত লবণ যা শরীরের প্রয়োজনীয় খনিজ সরবরাহ করে।" },
      { id: "p6", name: "Marie Gold Biscuit", price: 10, description: "হালকা চা-বিস্কুট, সকালের নাস্তায় উপযুক্ত।" },
    ],
  },
  {
    id: "3",
    name: "Sukesh Saloon",
    type: "saloon",
    items: [
      { id: "s1", name: "Hair Cut", price: 80, description: "নিপুণ হাতে আধুনিক স্টাইলে হেয়ার কাট।" },
      { id: "s2", name: "Shaving", price: 50, description: "পরিষ্কার ও মসৃণ শেভিং সার্ভিস।" },
      { id: "s3", name: "Hair Colour", price: 250, description: "উচ্চ মানের কালার দিয়ে চুলে নতুন লুক।" },
      { id: "s4", name: "Facial (Gold)", price: 400, description: "গোল্ড ফেসিয়াল যা মুখের উজ্জ্বলতা বাড়ায়।" },
      { id: "s5", name: "Head Massage", price: 150, description: "রিল্যাক্সিং হেড ম্যাসেজ, মানসিক প্রশান্তির জন্য।" },
      { id: "s6", name: "Beard Trim", price: 70, description: "দাড়ি ট্রিমিং আধুনিক স্টাইলে।" },
    ],
  },
  {
    id: "4",
    name: "Babu Restaurant",
    type: "shop",
    items: [
      { id: "f1", name: "Chicken Biryani", price: 180, description: "সুগন্ধি চাল ও মসলায় রান্না করা চিকেন বিরিয়ানি।" },
      { id: "f2", name: "Paneer Butter Masala", price: 160, description: "ক্রিমি বাটার গ্রেভিতে পনিরের অনন্য স্বাদ।" },
      { id: "f3", name: "Tandoori Roti", price: 15, description: "তন্দুরি চুলায় তৈরি নরম রুটি।" },
      { id: "f4", name: "Chicken Kasha", price: 220, description: "মশলাদার চিকেন কাশা, গরম ভাতের সাথে আদর্শ।" },
      { id: "f5", name: "Mixed Fried Rice", price: 150, description: "সবজি ও ডিম মিশ্রিত ফ্রাইড রাইস।" },
      { id: "f6", name: "Green Salad", price: 50, description: "তাজা সবজি দিয়ে তৈরি হেলদি স্যালাড।" },
    ],
  },
  {
    id: "5",
    name: "Maa Tara Hardware",
    type: "shop",
    items: [
      { id: "h1", name: "Cement Bag (ACC)", price: 450, description: "উচ্চ মানের ACC সিমেন্ট, নির্মাণ কাজে উপযুক্ত।" },
      { id: "h2", name: "TMT Rod (per kg)", price: 80, description: "মজবুত টিএমটি রড, বাড়ির কাঠামো তৈরিতে ব্যবহার হয়।" },
      { id: "h3", name: "Paint (1 Litre)", price: 300, description: "দেয়ালের জন্য সুন্দর উজ্জ্বল রঙের পেইন্ট।" },
      { id: "h4", name: "Hammer", price: 150, description: "লোহার হাতুড়ি, বিভিন্ন কাজে দরকারী।" },
      { id: "h5", name: "Bricks (per piece)", price: 12, description: "পাকা লাল ইট, ঘর নির্মাণে উপযুক্ত।" },
      { id: "h6", name: "Screwdriver Set", price: 200, description: "বাড়ির ছোটখাটো মেরামতে ব্যবহারের জন্য স্ক্রু-ড্রাইভার সেট।" },
    ],
  },
  {
    id: "6",
    name: "New Rekha Dress",
    type: "shop",
    items: [
      { id: "d1", name: "Cotton Saree", price: 800, description: "নরম তুলার শাড়ি, গরমে পরার জন্য আরামদায়ক।" },
      { id: "d2", name: "Men's T-Shirt", price: 450, description: "ফ্যাশনেবল পুরুষদের টি-শার্ট, বিভিন্ন রঙে পাওয়া যায়।" },
      { id: "d3", name: "Jeans Pant", price: 1200, description: "স্টাইলিশ জিন্স প্যান্ট, দৈনন্দিন পরিধানে আরামদায়ক।" },
      { id: "d4", name: "Designer Kurti", price: 700, description: "ফ্যাশনেবল ডিজাইনের কুর্তি, বিভিন্ন সাইজে পাওয়া যায়।" },
      { id: "d5", name: "Formal Shirt", price: 900, description: "অফিস ও অনুষ্ঠানের জন্য উপযুক্ত ফরমাল শার্ট।" },
      { id: "d6", name: "Ladies Dupatta", price: 250, description: "নরম কাপড়ের দোপাট্টা, কুর্তির সাথে মানানসই।" },
    ],
  },
  {
    id: "7",
    name: "Mamoni Shoe House",
    type: "shop",
    items: [
      { id: "sh1", name: "Formal Shoes (Men)", price: 1500, description: "পুরুষদের জন্য কালো ফরমাল জুতো, অফিস ব্যবহারে আদর্শ।" },
      { id: "sh2", name: "Sneakers", price: 1800, description: "আরামদায়ক স্নিকার্স, প্রতিদিনের ব্যবহারে উপযোগী।" },
      { id: "sh3", name: "Sandals (Women)", price: 600, description: "নারীদের জন্য নরম ও হালকা স্যান্ডেল।" },
      { id: "sh4", name: "Leather Slippers", price: 400, description: "চামড়ার স্লিপার, টেকসই ও আরামদায়ক।" },
      { id: "sh5", name: "Sports Shoes", price: 2500, description: "দৌড়ানো ও ব্যায়ামের জন্য হালকা স্পোর্টস শু।" },
      { id: "sh6", name: "Kids School Shoes", price: 750, description: "স্কুল পড়ুয়া শিশুদের জন্য কালো স্কুল শু।" },
    ],
  },
  {
    id: "8",
    name: "Light House",
    type: "shop",
    items: [
      { id: "e1", name: "Ceiling Fan", price: 1800, description: "৩ ব্লেডের উচ্চ গতি সম্পন্ন সিলিং ফ্যান।" },
      { id: "e2", name: "LED Bulb (9W)", price: 120, description: "এনার্জি সেভার ৯ ওয়াট এলইডি বাল্ব।" },
      { id: "e3", name: "Iron", price: 900, description: "ইলেকট্রিক আয়রন, কাপড় ইস্ত্রি করার জন্য।" },
      { id: "e4", name: "Extension Board", price: 350, description: "একাধিক ডিভাইস চালানোর জন্য এক্সটেনশন বোর্ড।" },
      { id: "e5", name: "Table Fan", price: 1300, description: "ছোট ঘরের জন্য উপযুক্ত টেবিল ফ্যান।" },
      { id: "e6", name: "Mixer Grinder", price: 2200, description: "রান্নার জন্য প্রয়োজনীয় মিক্সার গ্রাইন্ডার সেট।" },
    ],
  },
  {
    id: "9",
    name: "Dev Kumar Saloon",
    type: "saloon",
    items: [
      { id: "s1", name: "Hair Cut", price: 100, description: "স্টাইলিশ হেয়ার কাট, পুরুষদের জন্য।" },
      { id: "s2", name: "Shaving", price: 60, description: "ক্লিন ও সেফ শেভিং সার্ভিস।" },
      { id: "s3", name: "Facial", price: 300, description: "ত্বক উজ্জ্বল করার জন্য ফেসিয়াল সার্ভিস।" },
    ],
  },
  {
    id: "10",
    name: "Sritama Beauty Parlour",
    type: "parlour",
    items: [
      { id: "sp1", name: "Makeup", price: 1500, description: "বিয়ে বা পার্টির জন্য প্রফেশনাল মেকআপ সার্ভিস।" },
      { id: "sp2", name: "Bridal Package", price: 5000, description: "ব্রাইডাল মেকআপ, হেয়ার স্টাইলিং ও ফেস কেয়ারসহ সম্পূর্ণ প্যাকেজ।" },
      { id: "sp3", name: "Hair Styling", price: 700, description: "চুলের বিভিন্ন আধুনিক স্টাইল তৈরি।" },
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