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
      { id: "p1", name: "Basmati Rice 1kg", price: 90, desc: "উচ্চ মানের সুগন্ধি চাল, দৈনন্দিন রান্নার জন্য উপযুক্ত।" },
      { id: "p2", name: "Moong Dal 1kg", price: 120, desc: "প্রোটিনসমৃদ্ধ মুগ ডাল, খিচুড়ি বা তরকারির জন্য আদর্শ।" },
      { id: "p3", name: "Mustard Oil 1L", price: 150, desc: "বিশুদ্ধ সরিষার তেল, রান্না ও মালিশ দুইয়ের জন্যই ভালো।" },
      { id: "p4", name: "Sugar 1kg", price: 50, desc: "সাদা দানাদার চিনি, চা বা মিষ্টান্নে ব্যবহারের উপযোগী।" },
      { id: "p5", name: "Tata Salt 1kg", price: 28, desc: "আয়োডিনযুক্ত লবণ, স্বাস্থ্যকর খাদ্যের জন্য প্রয়োজনীয়।" },
      { id: "p6", name: "Marie Gold Biscuit", price: 10, desc: "হালকা ও স্বাস্থ্যকর বিস্কুট, চায়ের সঙ্গে উপভোগ্য।" },
    ],
  },

  // ✅ নতুন ২৫টি গ্রামীণ দোকান
  {
    id: "18",
    name: "Kamal Fish Stall",
    type: "shop",
    items: [
      { id: "kf1", name: "Rohu Fish (1kg)", price: 280, desc: "তাজা নদীর রুই মাছ, রান্নায় স্বাদে ভরপুর।" },
      { id: "kf2", name: "Katla Fish (1kg)", price: 300, desc: "বড় সাইজের কাতলা মাছ, পুষ্টিকর ও সুস্বাদু।" },
      { id: "kf3", name: "Small Prawn (500g)", price: 250, desc: "গ্রামীণ পুকুরের ছোট চিংড়ি, ভাজা বা তরকারির জন্য।" },
    ],
  },
  {
    id: "19",
    name: "Rina Tailors",
    type: "shop",
    items: [
      { id: "rt1", name: "Blouse Stitching", price: 200, desc: "মেয়েদের ব্লাউজ নিখুঁতভাবে তৈরি করা হয়।" },
      { id: "rt2", name: "Petticoat Stitching", price: 150, desc: "পেটিকোট কাস্টম মাপে তৈরি।" },
      { id: "rt3", name: "Kurta Alteration", price: 100, desc: "পুরুষদের কুর্তা কাটিং ও ঠিক করা হয়।" },
    ],
  },
  {
    id: "20",
    name: "Gopal Stationery",
    type: "shop",
    items: [
      { id: "gs1", name: "Notebook", price: 40, desc: "স্কুল-কলেজের জন্য ভালো মানের নোটবুক।" },
      { id: "gs2", name: "Blue Pen (Pack of 5)", price: 30, desc: "স্মুথ লিখনের পেন সেট।" },
      { id: "gs3", name: "Glue Bottle", price: 25, desc: "শিশুদের হস্তশিল্পের জন্য নিরাপদ গ্লু।" },
    ],
  },
  {
    id: "21",
    name: "Hari Cycle Repair",
    type: "shop",
    items: [
      { id: "hc1", name: "Tube Change", price: 60, desc: "সাইকেলের টিউব পরিবর্তন ও বাতাস দেওয়া হয়।" },
      { id: "hc2", name: "Brake Cable", price: 40, desc: "সাইকেলের ব্রেকের তার ও সার্ভিসিং।" },
      { id: "hc3", name: "Full Service", price: 150, desc: "সম্পূর্ণ সাইকেল চেকআপ ও মেরামত।" },
    ],
  },
  {
    id: "22",
    name: "Kali Mandir Flowers",
    type: "shop",
    items: [
      { id: "km1", name: "Lotus Flower", price: 20, desc: "পুজোর জন্য সতেজ পদ্মফুল।" },
      { id: "km2", name: "Garland", price: 50, desc: "তাজা গাঁদা ফুলের মালা।" },
      { id: "km3", name: "Incense Sticks (Packet)", price: 15, desc: "সুগন্ধি ধূপ, দৈনিক পূজার জন্য।" },
    ],
  },
  {
    id: "23",
    name: "Raju Tea Stall",
    type: "shop",
    items: [
      { id: "rt1", name: "Milk Tea", price: 10, desc: "তাজা দুধ ও আদা দিয়ে তৈরি চা।" },
      { id: "rt2", name: "Lemon Tea", price: 8, desc: "লেবুর হালকা চা, রিফ্রেশিং।" },
      { id: "rt3", name: "Samosa", price: 10, desc: "গরম গরম আলুর সামোসা, চায়ের সঙ্গে আদর্শ।" },
    ],
  },
  {
    id: "24",
    name: "Bapi Mobile Center",
    type: "shop",
    items: [
      { id: "bm1", name: "Mobile Cover", price: 120, desc: "সব মডেলের জন্য স্টাইলিশ কভার।" },
      { id: "bm2", name: "Screen Guard", price: 50, desc: "স্মার্টফোন স্ক্রিন সুরক্ষা।" },
      { id: "bm3", name: "Charger Cable", price: 180, desc: "উচ্চমানের ডেটা কেবল।" },
    ],
  },
  {
    id: "25",
    name: "Nimai Shoe Repair",
    type: "shop",
    items: [
      { id: "ns1", name: "Shoe Sole Replace", price: 100, desc: "জুতোয় নতুন সোল লাগানো হয়।" },
      { id: "ns2", name: "Polish & Clean", price: 30, desc: "পুরোনো জুতো চকচকে করা হয়।" },
      { id: "ns3", name: "Stitch Repair", price: 50, desc: "ছেঁড়া অংশ সেলাই করে ঠিক করা হয়।" },
    ],
  },
  {
    id: "26",
    name: "Sona Jewelry Shop",
    type: "shop",
    items: [
      { id: "sj1", name: "Silver Ring", price: 250, desc: "খাঁটি রুপার আংটি।" },
      { id: "sj2", name: "Gold Plated Chain", price: 800, desc: "গোল্ড-প্লেটেড হালকা চেইন।" },
      { id: "sj3", name: "Nose Pin", price: 100, desc: "সুন্দর ডিজাইনের নাকফুল।" },
    ],
  },
  {
    id: "27",
    name: "Pintu Electrical",
    type: "shop",
    items: [
      { id: "pe1", name: "Switch Board", price: 150, desc: "বাড়ির জন্য মজবুত সুইচ বোর্ড।" },
      { id: "pe2", name: "Wire (10m)", price: 100, desc: "উচ্চমানের ইলেকট্রিক তার।" },
      { id: "pe3", name: "Bulb 12W", price: 130, desc: "এনার্জি সেভিং LED বাল্ব।" },
    ],
  },
  {
    id: "28",
    name: "Laxmi Sweet Shop",
    type: "sweet",
    items: [
      { id: "ls1", name: "Jalebi (1kg)", price: 220, desc: "গরম গরম ক্রিসপি জিলিপি।" },
      { id: "ls2", name: "Rasgulla (1kg)", price: 200, desc: "নরম স্পঞ্জি রসগোল্লা।" },
      { id: "ls3", name: "Chamcham (1kg)", price: 240, desc: "মিষ্টি দুধে তৈরি চমচম।" },
    ],
  },
  {
    id: "29",
    name: "Tapan Poultry",
    type: "shop",
    items: [
      { id: "tp1", name: "Desi Chicken (1kg)", price: 320, desc: "গ্রামের দেশি মুরগি, সুস্বাদু ও স্বাস্থ্যকর।" },
      { id: "tp2", name: "Duck Egg (per piece)", price: 15, desc: "তাজা হাঁসের ডিম।" },
      { id: "tp3", name: "Broiler Chicken (1kg)", price: 180, desc: "তাজা ব্রয়লার মুরগি।" },
    ],
  },
  {
    id: "30",
    name: "Manoj Vegetables",
    type: "shop",
    items: [
      { id: "mv1", name: "Potato (1kg)", price: 25, desc: "তাজা আলু, প্রতিদিনের রান্নার জন্য।" },
      { id: "mv2", name: "Onion (1kg)", price: 40, desc: "রান্নার অপরিহার্য উপাদান।" },
      { id: "mv3", name: "Tomato (1kg)", price: 50, desc: "রসালো টমেটো, সালাদ বা রান্নায়।" },
    ],
  },
  {
    id: "31",
    name: "Raju Barber Shop",
    type: "saloon",
    items: [
      { id: "rb1", name: "Hair Cut", price: 60, desc: "চুল কাটা দক্ষ হাতের কাজে।" },
      { id: "rb2", name: "Shaving", price: 40, desc: "পরিষ্কার শেভিং সার্ভিস।" },
      { id: "rb3", name: "Hair Wash", price: 30, desc: "শ্যাম্পু ও চুল পরিষ্কার।" },
    ],
  },
  {
    id: "32",
    name: "Bina Beauty Parlour",
    type: "parlour",
    items: [
      { id: "bp1", name: "Facial", price: 350, desc: "ত্বকের উজ্জ্বলতা বৃদ্ধিতে সাহায্য করে।" },
      { id: "bp2", name: "Hair Spa", price: 400, desc: "চুল মসৃণ ও ঝলমলে করে।" },
      { id: "bp3", name: "Eyebrow Threading", price: 50, desc: "পরিষ্কার ও নিখুঁত আইব্রো কাট।" },
    ],
  },
  {
    id: "33",
    name: "Sitaram Dairy",
    type: "shop",
    items: [
      { id: "sd1", name: "Cow Milk (1L)", price: 60, desc: "তাজা গরুর দুধ।" },
      { id: "sd2", name: "Curd (500g)", price: 40, desc: "ঘন দই, খাওয়ার বা রান্নার জন্য।" },
      { id: "sd3", name: "Paneer (250g)", price: 80, desc: "তাজা ছানার পনির।" },
    ],
  },
  {
    id: "34",
    name: "Goutam Furniture",
    type: "shop",
    items: [
      { id: "gf1", name: "Wooden Chair", price: 800, desc: "টিকাউ কাঠের চেয়ার।" },
      { id: "gf2", name: "Study Table", price: 1500, desc: "ছাত্রছাত্রীদের জন্য উপযুক্ত টেবিল।" },
      { id: "gf3", name: "Cot (Single)", price: 2500, desc: "মজবুত কাঠের খাট।" },
    ],
  },
  {
    id: "35",
    name: "Ananda Bakery",
    type: "shop",
    items: [
      { id: "ab1", name: "Bread (400g)", price: 40, desc: "তাজা বেকারি পাউরুটি।" },
      { id: "ab2", name: "Cake (250g)", price: 120, desc: "হালকা মিষ্টি কেক।" },
      { id: "ab3", name: "Cream Roll", price: 30, desc: "বাচ্চাদের প্রিয় মিষ্টি রোল।" },
    ],
  },
  {
    id: "36",
    name: "Hari Shoe Store",
    type: "shop",
    items: [
      { id: "hs1", name: "Rubber Slipper", price: 150, desc: "আরামদায়ক রাবারের স্যান্ডেল।" },
      { id: "hs2", name: "Kids Shoes", price: 450, desc: "শিশুদের স্কুল জুতো।" },
      { id: "hs3", name: "Ladies Sandal", price: 600, desc: "স্টাইলিশ ও টেকসই স্যান্ডেল।" },
    ],
  },
  {
    id: "37",
    name: "Tapan Meat Shop",
    type: "shop",
    items: [
      { id: "tm1", name: "Goat Meat (1kg)", price: 650, desc: "তাজা খাসির মাংস, প্রোটিনসমৃদ্ধ।" },
      { id: "tm2", name: "Chicken Meat (1kg)", price: 220, desc: "তাজা দেশি মুরগির মাংস।" },
      { id: "tm3", name: "Mutton Liver (500g)", price: 300, desc: "পুষ্টিকর খাসির কলিজা।" },
    ],
  },
  {
    id: "38",
    name: "Ratan Book House",
    type: "shop",
    items: [
      { id: "rbh1", name: "Bangla Textbook", price: 120, desc: "বিদ্যালয়ের বাংলা পাঠ্যবই।" },
      { id: "rbh2", name: "English Grammar", price: 180, desc: "শিক্ষার্থীদের জন্য ব্যাকরণ বই।" },
      { id: "rbh3", name: "Story Book", price: 150, desc: "শিশুদের গল্পের বই।" },
    ],
  },
  {
    id: "39",
    name: "Nitai Vegetable Seeds",
    type: "shop",
    items: [
      { id: "nv1", name: "Tomato Seeds", price: 30, desc: "উচ্চ ফলনশীল টমেটোর বীজ।" },
      { id: "nv2", name: "Chilli Seeds", price: 25, desc: "ঝাল মরিচ চাষের জন্য বীজ।" },
      { id: "nv3", name: "Brinjal Seeds", price: 40, desc: "গাছের ভালো ফলন দেয় এমন বেগুন বীজ।" },
    ],
  },
  {
    id: "40",
    name: "Gita Handicrafts",
    type: "shop",
    items: [
      { id: "gh1", name: "Jute Bag", price: 200, desc: "গ্রামীণ হাতের কাজের জুট ব্যাগ।" },
      { id: "gh2", name: "Bamboo Basket", price: 180, desc: "বাঁশের তৈরি ঝুড়ি।" },
      { id: "gh3", name: "Hand Fan", price: 60, desc: "গ্রামের ঐতিহ্যবাহী পাখা।" },
    ],
  },
  {
    id: "41",
    name: "Sanjay Medical",
    type: "shop",
    items: [
      { id: "sm1", name: "Paracetamol (10 tabs)", price: 25, desc: "জ্বর ও ব্যথা কমানোর ওষুধ।" },
      { id: "sm2", name: "ORS Pack", price: 15, desc: "শরীরে জলীয় ভারসাম্য বজায় রাখে।" },
      { id: "sm3", name: "Vicks Balm", price: 40, desc: "ঠান্ডা ও মাথাব্যথায় উপকারী।" },
    ],
  },
  {
    id: "42",
    name: "Madan Tea Garden",
    type: "shop",
    items: [
      { id: "mt1", name: "Leaf Tea (250g)", price: 100, desc: "পাহাড়ি চায়ের পাতা, দারুণ সুগন্ধি।" },
      { id: "mt2", name: "Dust Tea (500g)", price: 160, desc: "গাঢ় কালো চায়ের পাউডার।" },
      {
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