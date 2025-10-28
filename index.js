// index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Selected Shops with 10-12 products each (32 shops)
const shops = [
  { 
    id: "1", 
    name: "Usha Store", 
    type: "shop", 
    items: [
      { id: "p1", name: "Basmati Rice 1kg", price: 90, desc: "উচ্চ মানের সুগন্ধি চাল, দৈনন্দিন রান্নার জন্য উপযুক্ত।" },
      { id: "p2", name: "Moong Dal 1kg", price: 120, desc: "প্রোটিনসমৃদ্ধ মুগ ডাল, খিচুড়ি বা তরকারির জন্য আদর্শ।" },
      { id: "p3", name: "Mustard Oil 1L", price: 150, desc: "বিশুদ্ধ সরিষার তেল, রান্না ও মালিশ দুইয়ের জন্যই ভালো।" },
      { id: "p4", name: "Wheat Flour 2kg", price: 80, desc: "তাজা গমের আটা, রুটি ও পরোটার জন্য উপযুক্ত।" },
      { id: "p5", name: "Sugar 1kg", price: 45, desc: "পরিশোধিত সাদা চিনি, চা ও মিষ্টির জন্য।" },
      { id: "p6", name: "Salt 1kg", price: 20, desc: "আয়োডিনযুক্ত লবণ, রান্নার জন্য প্রয়োজনীয়।" },
      { id: "p7", name: "Turmeric Powder 100g", price: 30, desc: "প্রাকৃতিক হলুদ গুঁড়া, রান্নায় রং ও স্বাদের জন্য।" },
      { id: "p8", name: "Red Chili Powder 100g", price: 35, desc: "তীক্ষ্ণ লাল মরিচ গুঁড়া, ঝাল স্বাদের জন্য।" },
      { id: "p9", name: "Cumin Seeds 100g", price: 25, desc: "সুগন্ধি জিরা, তরকারিতে স্বাদ বৃদ্ধির জন্য।" },
      { id: "p10", name: "Tea Leaves 250g", price: 85, desc: "উচ্চ মানের চা পাতা, সকালের সতেজতার জন্য।" },
      { id: "p11", name: "Biscuit Packet", price: 30, desc: "ক্রিম-filled বিস্কুট, স্ন্যাক্স হিসেবে উপযুক্ত।" },
      { id: "p12", name: "Soap Bar", price: 25, desc: "সুগন্ধি সাবান, ব্যক্তিগত পরিচ্ছন্নতার জন্য।" }
    ]
  },
  { 
    id: "2", 
    name: "Sukesh Saloon", 
    type: "saloon", 
    items: [
      { id: "s1", name: "Hair Cut", price: 80, desc: "দক্ষ হস্তের দ্বারা চুল কাটার সার্ভিস।" },
      { id: "s2", name: "Shaving", price: 50, desc: "পরিষ্কার ও নিখুঁত শেভ।" },
      { id: "s3", name: "Hair Colour", price: 250, desc: "চুল রঙ করার সার্ভিস।" },
      { id: "s4", name: "Head Massage", price: 100, desc: "আয়ুর্বেদিক তেল দিয়ে মাথার মালিশ।" },
      { id: "s5", name: "Beard Trim", price: 40, desc: "দাড়ি ট্রিম ও শেপ দেওয়া।" },
      { id: "s6", name: "Hair Wash", price: 30, desc: "শ্যাম্পু ও কন্ডিশনার দিয়ে চুল ধোয়া।" },
      { id: "s7", name: "Face Cleanup", price: 150, desc: "ফেসিয়াল ক্লিনআপ ও স্ক্রাব।" },
      { id: "s8", name: "Hair Styling", price: 70, desc: "বিশেষ অনুষ্ঠানের জন্য হেয়ার স্টাইলিং।" },
      { id: "s9", name: "Hair Treatment", price: 300, desc: "চুলের বিশেষ ট্রিটমেন্ট ও কন্ডিশনিং।" },
      { id: "s10", name: "Beard Coloring", price: 120, desc: "দাড়ি কালো করার সার্ভিস।" },
      { id: "s11", name: "Scalp Massage", price: 90, desc: "স্ক্যাল্প মাসাজ স্ট্রেস রিলিফের জন্য।" }
    ]
  },
  { 
    id: "3", 
    name: "Babu Restaurant", 
    type: "shop", 
    items: [
      { id: "f1", name: "Chicken Biryani", price: 180, desc: "মশলাদার চিকেন বিরিয়ানি।" },
      { id: "f2", name: "Paneer Butter Masala", price: 160, desc: "নরম পনির, মাখন ও মশলার সঙ্গে রান্না।" },
      { id: "f3", name: "Veg Thali", price: 120, desc: "সম্পূর্ণ vegetarian থালি, ডাল, ভাত, সবজি, সালাদ সহ।" },
      { id: "f4", name: "Chicken Curry", price: 140, desc: "মশলাদার চিকেন কারি, ভাত বা রুটির সাথে।" },
      { id: "f5", name: "Fish Curry", price: 130, desc: "মাছের ঝোল, traditional Bengali style।" },
      { id: "f6", name: "Egg Curry", price: 70, desc: "ডিমের ঝাল ঝোল, ভাতের সাথে উপযুক্ত।" },
      { id: "f7", name: "Mixed Veg", price: 90, desc: "মিশ্র সবজির তরকারি, স্বাস্থ্যকর বিকল্প।" },
      { id: "f8", name: "Dal Fry", price: 60, desc: "সাধারণ ভাজা ডাল, ঘরোয়া স্বাদ।" },
      { id: "f9", name: "Plain Rice", price: 30, desc: "সাদা ভাত, যেকোনো তরকারির সাথে।" },
      { id: "f10", name: "Roti/Chapati", price: 10, desc: "তাজা গমের রুটি, তরকারির সাথে পরিবেশন।" },
      { id: "f11", name: "Lassi", price: 40, desc: "তাজা দইয়ের লস্সি, মিষ্টি বা নোনতা।" }
    ]
  },
  { 
    id: "4", 
    name: "Kamal Fish Stall", 
    type: "shop", 
    items: [
      { id: "kf1", name: "Rohu Fish (1kg)", price: 280, desc: "তাজা নদীর রুই মাছ।" },
      { id: "kf2", name: "Katla Fish (1kg)", price: 300, desc: "বড় সাইজের কাতলা মাছ।" },
      { id: "kf3", name: "Small Prawn (500g)", price: 250, desc: "গ্রামীণ পুকুরের ছোট চিংড়ি।" },
      { id: "kf4", name: "Hilsa Fish (1kg)", price: 600, desc: "সিজনাল ইলিশ মাছ, বিশেষ স্বাদের জন্য।" },
      { id: "kf5", name: "Pabda Fish (500g)", price: 200, desc: "ছোট পাবদা মাছ, ঝোলের জন্য উপযুক্ত।" },
      { id: "kf6", name: "Tilapia Fish (1kg)", price: 180, desc: "ফার্মের তেলাপিয়া মাছ, কম কাঁটা।" },
      { id: "kf7", name: "Bhetki Fish (1kg)", price: 400, desc: "ভেটকি মাছ, ফ্রাই ও কারির জন্য।" },
      { id: "kf8", name: "Large Prawn (500g)", price: 350, desc: "বড়サイズのচিংড়ি, বিশেষ রান্নার জন্য。" },
      { id: "kf9", name: "Crab (4pcs)", price: 150, desc: "তাজা কাঁকড়া, ঝাল রান্নার জন্য。" },
      { id: "kf10", name: "Fish Cut Pieces (500g)", price: 120, desc: "মাছের কাটা টুকরো, immediate cookingএর জন্য。" }
    ]
  },
  { 
    id: "5", 
    name: "Rina Tailors", 
    type: "shop", 
    items: [
      { id: "rt1", name: "Blouse Stitching", price: 200, desc: "মেয়েদের ব্লাউজ সেলাই সার্ভিস।" },
      { id: "rt2", name: "Petticoat Stitching", price: 150, desc: "কাস্টম মাপে পেটিকোট।" },
      { id: "rt3", name: "Kurta Alteration", price: 100, desc: "পুরুষদের কুর্তা কাটিং ও ঠিক করা হয়।" },
      { id: "rt4", name: "Saree Fall Stitching", price: 80, desc: "শাড়িতে ফল attach করা。" },
      { id: "rt5", name: "Shirt Stitching", price: 250, desc: "পুরুষদের ফুল শার্ট সেলাই。" },
      { id: "rt6", name: "Pant Stitching", price: 300, desc: "পুরুষদের প্যান্ট সেলাই。" },
      { id: "rt7", name: "Salwar Kameez Set", price: 500, desc: "সম্পূর্ণ সালোয়ার কামিজ সেট সেলাই。" },
      { id: "rt8", name: "Kids Dress Stitching", price: 180, desc: "বাচ্চাদের পোশাক সেলাই。" },
      { id: "rt9", name: "Zari Work Blouse", price: 400, desc: "জরির কাজ সহ ব্লাউজ সেলাই。" },
      { id: "rt10", name: "Designer Kurta", price: 350, desc: "ডিজাইনার কুর্তা সেলাই。" }
    ]
  },
  { 
    id: "6", 
    name: "Gopal Stationery", 
    type: "shop", 
    items: [
      { id: "gs1", name: "Notebook", price: 40, desc: "স্কুল-কলেজের জন্য ভালো মানের নোটবুক।" },
      { id: "gs2", name: "Blue Pen (Pack of 5)", price: 30, desc: "স্মুথ লিখনের পেন সেট।" },
      { id: "gs3", name: "Glue Bottle", price: 25, desc: "শিশুদের হস্তশিল্পের জন্য নিরাপদ গ্লু।" },
      { id: "gs4", name: "Pencil (Pack of 10)", price: 20, desc: "সাধারণ পেন্সিল, স্কুলের জন্য উপযুক্ত।" },
      { id: "gs5", name: "Eraser", price: 5, desc: "রাবার ইরেজার, ভুল改正ের জন্য。" },
      { id: "gs6", name: "Sharpener", price: 8, desc: "পেন্সিল শার্পনার, তীক্ষ্ণ tipএর জন্য。" },
      { id: "gs7", name: "Geometry Box", price: 80, desc: "সম্পূর্ণ জ্যামিতি বক্স, compass, protector সহ。" },
      { id: "gs8", name: "Drawing Copy", price: 35, desc: "আঁকার খাতা, শিল্পের জন্য উপযুক্ত。" },
      { id: "gs9", name: "Color Pencils (12 pcs)", price: 60, desc: "রঙিন পেন্সিল সেট, drawingএর জন্য。" },
      { id: "gs10", name: "Stapler", price: 45, desc: "ছোট স্টেপলার, কাগজ attach করার জন্য。" }
    ]
  },
  { 
    id: "7", 
    name: "Hari Cycle Repair", 
    type: "shop", 
    items: [
      { id: "hc1", name: "Tube Change", price: 60, desc: "সাইকেলের টিউব পরিবর্তন ও বাতাস দেওয়া।" },
      { id: "hc2", name: "Brake Cable", price: 40, desc: "সাইকেলের ব্রেকের তার।" },
      { id: "hc3", name: "Full Service", price: 150, desc: "সম্পূর্ণ সাইকেল চেকআপ ও মেরামত।" },
      { id: "hc4", name: "Chain Repair", price: 50, desc: "চেইন ঠিক করা ও গ্রিজ দেওয়া।" },
      { id: "hc5", name: "Tyre Change", price: 100, desc: "সাইকেলের টায়ার পরিবর্তন।" },
      { id: "hc6", name: "Gear Adjustment", price: 70, desc: "গিয়ার সিস্টেম adjustment。" },
      { id: "hc7", name: "Handle Grip Change", price: 30, desc: "হ্যান্ডেল গ্রিপ পরিবর্তন。" },
      { id: "hc8", name: "Seat Cover Change", price: 45, desc: "সিট কভার পরিবর্তন。" },
      { id: "hc9", name: "Bell Installation", price: 25, desc: "নতুন বেল install করা。" },
      { id: "hc10", name: "Wheel Alignment", price: 55, desc: "চাকা alignment ঠিক করা。" }
    ]
  },
  { 
    id: "8", 
    name: "Kali Mandir Flowers", 
    type: "shop", 
    items: [
      { id: "km1", name: "Lotus Flower", price: 20, desc: "পুজোর জন্য সতেজ পদ্মফুল।" },
      { id: "km2", name: "Garland", price: 50, desc: "তাজা ফুলের মালা।" },
      { id: "km3", name: "Incense Sticks (Packet)", price: 15, desc: "সুগন্ধি ধূপ, দৈনিক পূজার জন্য।" },
      { id: "km4", name: "Marigold Flowers", price: 25, desc: "গাঁদা ফুল, পূজা ও decorationএর জন্য。" },
      { id: "km5", name: "Rose Flowers (6pcs)", price: 30, desc: "তাজা গোলাপ ফুল, special occasionsএর জন্য。" },
      { id: "km6", name: "Jasmine Flowers", price: 35, desc: "সুগন্ধি বেলি ফুল, চুলে পরার জন্য。" },
      { id: "km7", name: "Champak Flowers", price: 28, desc: "সুগন্ধি চাঁপা ফুল, traditional পূজার জন্য。" },
      { id: "km8", name: "Tulsi Plant", price: 40, desc: "তুলসী গাছ, spiritual importance আছে。" },
      { id: "km9", name: "Camphor Tablet", price: 10, desc: "কর্পূর ট্যাবলেট, আরতি করার জন্য。" },
      { id: "km10", name: "Sacred Thread", price: 5, desc: "পবিত্র সুতা, ritualsএর জন্য。" }
    ]
  },
  { 
    id: "9", 
    name: "Raju Tea Stall", 
    type: "shop", 
    items: [
      { id: "rt1", name: "Milk Tea", price: 10, desc: "তাজা দুধ ও চা পাতা দিয়ে তৈরি।" },
      { id: "rt2", name: "Lemon Tea", price: 8, desc: "লেবুর হালকা চা, রিফ্রেশিং।" },
      { id: "rt3", name: "Samosa", price: 10, desc: "গরম আলুর সামোসা।" },
      { id: "rt4", name: "Biscuit (2pcs)", price: 5, desc: "সাধারণ বিস্কুট, চায়ের সাথে。" },
      { id: "rt5", name: "Toast Butter", price: 12, desc: "বাটার টোস্ট, crispy ও সুস্বাদু。" },
      { id: "rt6", name: "Egg Roll", price: 25, desc: "ডিমের রোল, তাজা vegetables সহ。" },
      { id: "rt7", name: "Chicken Roll", price: 35, desc: "চিকেন রোল, spicy filling সহ。" },
      { id: "rt8", name: "Coffee", price: 15, desc: "সাধারণ কফি, instant coffee দিয়ে তৈরি。" },
      { id: "rt9", name: "Mineral Water", price: 20, desc: "বোতলজাত পানি。" },
      { id: "rt10", name: "Cold Drink", price: 25, desc: "ঠান্ডা soft drink。" }
    ]
  },
  { 
    id: "10", 
    name: "Bapi Mobile Center", 
    type: "shop", 
    items: [
      { id: "bm1", name: "Mobile Cover", price: 120, desc: "সব মডেলের জন্য স্টাইলিশ কভার।" },
      { id: "bm2", name: "Screen Guard", price: 50, desc: "স্মার্টফোন স্ক্রিন সুরক্ষা।" },
      { id: "bm3", name: "Charger Cable", price: 180, desc: "উচ্চমানের ডেটা কেবল।" },
      { id: "bm4", name: "Power Bank", price: 600, desc: "10000mAh পাওয়ার ব্যাংক。" },
      { id: "bm5", name: "Earphones", price: 200, desc: "ওয়্যারড ইয়ারফোন, ভাল sound quality。" },
      { id: "bm6", name: "Bluetooth Speaker", price: 450, desc: "পোর্টেবল ব্লুটুথ স্পিকার。" },
      { id: "bm7", name: "Memory Card 32GB", price: 350, desc: "32GB মেমোরি কার্ড, storage বাড়ানোর জন্য。" },
      { id: "bm8", name: "Selfie Stick", price: 150, desc: "এডজাস্টেবল সেলফি স্টিক。" },
      { id: "bm9", name: "Car Charger", price: 120, desc: "গাড়ির জন্য মোবাইল চার্জার。" },
      { id: "bm10", name: "OTG Cable", price: 80, desc: "USB OTG cable, data transferএর জন্য。" }
    ]
  },
  { 
    id: "11", 
    name: "Mina Beauty Parlor", 
    type: "beauty", 
    items: [
      { id: "mb1", name: "Bridal Makeup", price: 1500, desc: "বিয়ের জন্য বিশেষ মেকআপ সার্ভিস।" },
      { id: "mb2", name: "Facial", price: 300, desc: "ত্বক পরিষ্কার ও উজ্জ্বল করার ফেসিয়াল।" },
      { id: "mb3", name: "Hair Spa", price: 400, desc: "চুলের বিশেষ যত্নের সার্ভিস।" },
      { id: "mb4", name: "Manicure", price: 150, desc: "হাতের নখের যত্ন ও polishing。" },
      { id: "mb5", name: "Pedicure", price: 200, desc: "পায়ের নখের যত্ন ও cleaning。" },
      { id: "mb6", name: "Waxing (Full Arms)", price: 120, desc: "হাতের waxing, unwanted hair removal。" },
      { id: "mb7", name: "Threading", price: 50, desc: "ভ্রু threading, perfect shape দেওয়ার জন্য。" },
      { id: "mb8", name: "Hair Cut Ladies", price: 100, desc: "মহিলাদের hair cut service。" },
      { id: "mb9", name: "Hair Color", price: 350, desc: "চুল coloring service, various shades。" },
      { id: "mb10", name: "Makeup for Party", price: 600, desc: "পার্টির জন্য বিশেষ মেকআপ。" }
    ]
  },
  { 
    id: "12", 
    name: "Shyam Vegetable Shop", 
    type: "shop", 
    items: [
      { id: "sv1", name: "Potato (1kg)", price: 25, desc: "তাজা আলু, রান্নার জন্য উপযুক্ত।" },
      { id: "sv2", name: "Tomato (1kg)", price: 40, desc: "লাল টমেটো, তরকারি ও স্যালাডের জন্য।" },
      { id: "sv3", name: "Onion (1kg)", price: 30, desc: "মশলাদার পেঁয়াজ, প্রতিদিনের রান্নার জন্য।" },
      { id: "sv4", name: "Cauliflower", price: 35, desc: "তাজা ফুলকপি, vegetable curryএর জন্য。" },
      { id: "sv5", name: "Cabbage", price: 28, desc: "সবুজ বাঁধাকপি, salad ও cooked dishesএর জন্য。" },
      { id: "sv6", name: "Carrot (1kg)", price: 45, desc: "তাজা গাজর, salad ও cookingএর জন্য。" },
      { id: "sv7", name: "Green Beans (500g)", price: 40, desc: "সবুজ বীনস, stir fryএর জন্য উপযুক্ত。" },
      { id: "sv8", name: "Brinjal (1kg)", price: 32, desc: "বেগুন, various Bengali dishesএর জন্য。" },
      { id: "sv9", name: "Cucumber (4pcs)", price: 20, desc: "শসা, salad ও raitaএর জন্য。" },
      { id: "sv10", name: "Green Chili (100g)", price: 10, desc: "কাঁচা মরিচ, spicy flavorএর জন্য。" }
    ]
  },
  { 
    id: "13", 
    name: "Gouranga Sweet House", 
    type: "shop", 
    items: [
      { id: "gs1", name: "Rasgulla (1pc)", price: 15, desc: "তাজা স্পঞ্জি রসগোল্লা।" },
      { id: "gs2", name: "Sandesh (1pc)", price: 12, desc: "সুগন্ধি ছানার সন্দেশ।" },
      { id: "gs3", name: "Gulab Jamun (1pc)", price: 18, desc: "মিষ্টি গোলাপ জামুন।" },
      { id: "gs4", name: "Rasmalai (1pc)", price: 20, desc: "রসমালাই, creamy ও delicious。" },
      { id: "gs5", name: "Cham Cham (1pc)", price: 16, desc: "চমচম, traditional Bengali sweet。" },
      { id: "gs6", name: "Mihidana (250g)", price: 60, desc: "মিহিদানা, special occasionsএর জন্য。" },
      { id: "gs7", name: "Sitabhog (250g)", price: 65, desc: "সীতাভোগ, rice flour sweet。" },
      { id: "gs8", name: "Pantua (1pc)", price: 14, desc: "পান্তুয়া, deep fried sweet。" },
      { id: "gs9", name: "Ledikeni (1pc)", price: 22, desc: "লেডিকেনি, special occasion sweet。" },
      { id: "gs10", name: "Malpua (1pc)", price: 25, desc: "মালপুয়া, fried pancake sweet。" }
    ]
  },
  { 
    id: "14", 
    name: "Bhola Electrician", 
    type: "service", 
    items: [
      { id: "be1", name: "Switch Repair", price: 100, desc: "বৈদ্যুতিক সুইচ মেরামত।" },
      { id: "be2", name: "Fan Installation", price: 200, desc: "নতুন ফ্যান বসানো।" },
      { id: "be3", name: "Wiring Checkup", price: 300, desc: "পুরো ঘরের ওয়্যারিং চেকআপ।" },
      { id: "be4", name: "Light Point Installation", price: 150, desc: "নতুন লাইট পয়েন্ট install করা。" },
      { id: "be5", name: "Socket Repair", price: 80, desc: "বৈদ্যুতিক socket repair করা。" },
      { id: "be6", name: "MCB Change", price: 120, desc: "MCB change ও upgrade করা。" },
      { id: "be7", name: "Inverter Setup", price: 500, desc: "ইনভার্টার setup ও installation。" },
      { id: "be8", name: "Voltage Stabilizer", price: 250, desc: "ভোল্টেজ stabilizer install করা。" },
      { id: "be9", name: "Emergency Light Fix", price: 90, desc: "জরুরি লাইট repair করা。" },
      { id: "be10", name: "Chandelier Installation", price: 400, desc: "বড় light fixture install করা。" }
    ]
  },
  { 
    id: "15", 
    name: "Laxmi Kirana Store", 
    type: "shop", 
    items: [
      { id: "lk1", name: "Wheat Flour 1kg", price: 45, desc: "শতভাগ বিশুদ্ধ আটার ময়দা।" },
      { id: "lk2", name: "Sugar 1kg", price: 42, desc: "পরিশোধিত চিনি।" },
      { id: "lk3", name: "Salt 1kg", price: 20, desc: "আয়োডিনযুক্ত লবণ।" },
      { id: "lk4", name: "Toor Dal 1kg", price: 110, desc: "তুর ডাল, সারা ভারতীয় রান্নার জন্য。" },
      { id: "lk5", name: "Chana Dal 1kg", price: 95, desc: "ছোলার ডাল, পুষ্টিকর ও সুস্বাদু。" },
      { id: "lk6", name: "Urad Dal 1kg", price: 105, desc: "উরদ ডাল, dosa ও idliএর জন্য。" },
      { id: "lk7", name: "Masoor Dal 1kg", price: 85, desc: "মসুর ডাল, দ্রুত রান্না হয়。" },
      { id: "lk8", name: "Cooking Oil 1L", price: 180, desc: "সূর্যমুখী তেল, রান্নার জন্য。" },
      { id: "lk9", name: "Ghee 500g", price: 350, desc: "খাঁটি ঘি, বিশেষ রান্নার জন্য。" },
      { id: "lk10", name: "Besan 500g", price: 60, desc: "বেসনের গুঁড়া, বিভিন্ন পদ তৈরি。" }
    ]
  },
  { 
    id: "16", 
    name: "Nabin Hardware", 
    type: "shop", 
    items: [
      { id: "nh1", name: "Hammer", price: 150, desc: "শক্তিশালী ইস্পাতের হাতুড়ি।" },
      { id: "nh2", name: "Screwdriver Set", price: 120, desc: "বিভিন্ন সাইজের স্ক্রুড্রাইভার।" },
      { id: "nh3", name: "Nails (100pcs)", price: 50, desc: "বিভিন্ন কাজের জন্য পেরেক।" },
      { id: "nh4", name: "Pliers", price: 100, desc: "বিভিন্ন ধরনের pliers, কাজের জন্য。" },
      { id: "nh5", name: "Measuring Tape", price: 80, desc: "5m measuring tape, measurementএর জন্য。" },
      { id: "nh6", name: "Wrench Set", price: 200, desc: "বিভিন্ন sizeএর wrench set。" },
      { id: "nh7", name: "Drill Machine", price: 800, desc: "ইলেকট্রিক drill machine。" },
      { id: "nh8", name: "Drill Bits Set", price: 150, desc: "বিভিন্ন sizeএর drill bits。" },
      { id: "nh9", name: "Safety Gloves", price: 60, desc: "কাজের সময় safety gloves。" },
      { id: "nh10", name: "Safety Goggles", price: 40, desc: "চোখ protectionএর জন্য goggles。" }
    ]
  },
  { 
    id: "17", 
    name: "Madhav Dairy", 
    type: "shop", 
    items: [
      { id: "md1", name: "Cow Milk 1L", price: 60, desc: "তাজা গরুর দুধ।" },
      { id: "md2", name: "Curd 500g", price: 40, desc: "টক দই, ঘরে তৈরি।" },
      { id: "md3", name: "Butter 200g", price: 80, desc: "তাজা মাখন।" },
      { id: "md4", name: "Paneer 250g", price: 120, desc: "তাজা পনির, homemade quality。" },
      { id: "md5", name: "Ghee 500g", price: 380, desc: "খাঁটি ঘি, pure quality。" },
      { id: "md6", name: "Buttermilk 1L", price: 35, desc: "ছাঁচ, গরমে refreshing。" },
      { id: "md7", name: "Milk Cream 200g", price: 70, desc: "দুধের মালাই, dessertএর জন্য。" },
      { id: "md8", name: "Cheese Block 200g", price: 150, desc: "চিজ block, cookingএর জন্য。" },
      { id: "md9", name: "Flavored Milk 200ml", price: 25, desc: "চকলেট milk, বাচ্চাদের জন্য。" },
      { id: "md10", name: "Yogurt Drink", price: 30, desc: "দইয়ের drink, probiotic。" }
    ]
  },
  { 
    id: "18", 
    name: "Sobha Boutique", 
    type: "shop", 
    items: [
      { id: "sb1", name: "Saree Blouse", price: 250, desc: "শাড়ির ব্লাউজ সেলাই।" },
      { id: "sb2", name: "Kurta Design", price: 400, desc: "ডিজাইনার কুর্তা সেলাই।" },
      { id: "sb3", name: "Dress Alteration", price: 80, desc: "যেকোনো ড্রেস ঠিক করা।" },
      { id: "sb4", name: "Salwar Kameez", price: 600, desc: "সম্পূর্ণ সালোয়ার কামিজ সেলাই。" },
      { id: "sb5", name: "Lehenga Stitching", price: 1200, desc: "বিয়ের lehenga stitching service。" },
      { id: "sb6", name: "Blouse Design Work", price: 350, desc: "বিশেষ design work সহ ব্লাউজ。" },
      { id: "sb7", name: "Saree Pleating", price: 50, desc: "শাড়ি pleating service。" },
      { id: "sb8", name: "Neckline Design", price: 120, desc: "ব্লাউজ neckline design change。" },
      { id: "sb9", name: "Sleeve Design", price: 100, desc: "ব্লাউজ sleeve design change。" },
      { id: "sb10", name: "Embroidery Work", price: 300, desc: "হাতে করা embroidery work。" }
    ]
  },
  { 
    id: "19", 
    name: "Rohit Photo Studio", 
    type: "service", 
    items: [
      { id: "rp1", name: "Passport Photo", price: 50, desc: "পাসপোর্ট সাইজের ছবি।" },
      { id: "rp2", name: "Photo Printing", price: 15, desc: "ডিজিটাল ফটো প্রিন্ট।" },
      { id: "rp3", name: "Frame Making", price: 100, desc: "ছবির ফ্রেম তৈরি।" },
      { id: "rp4", name: "Family Photo Session", price: 500, desc: "পরিবারের group photo session。" },
      { id: "rp5", name: "Portrait Photography", price: 300, desc: "ব্যক্তিগত portrait photography。" },
      { id: "rp6", name: "Wedding Photography", price: 2000, desc: "বিয়ের photography service。" },
      { id: "rp7", name: "Photo Editing", price: 80, desc: "ফটো editing ও retouching。" },
      { id: "rp8", name: "Photo Album", price: 400, desc: "বিয়ের photo album তৈরি。" },
      { id: "rp9", name: "Digital Copy", price: 30, desc: "ফটোর digital copy তৈরি。" },
      { id: "rp10", name: "ID Card Photo", price: 40, desc: "ID cardএর জন্য বিশেষ photo。" }
    ]
  },
  { 
    id: "20", 
    name: "Anil Pharmacy", 
    type: "shop", 
    items: [
      { id: "ap1", name: "Paracetamol", price: 10, desc: "জ্বর ও ব্যথার ওষুধ।" },
      { id: "ap2", name: "Bandage", price: 25, desc: "জখমের জন্য ব্যান্ডেজ।" },
      { id: "ap3", name: "Vitamins", price: 150, desc: "মাল্টিভিটামিন ট্যাবলেট।" },
      { id: "ap4", name: "Cough Syrup", price: 85, desc: "কাশির syrup, instant relief。" },
      { id: "ap5", name: "Antacid", price: 45, desc: "অম্লতার medicine, quick relief。" },
      { id: "ap6", name: "Pain Relief Spray", price: 120, desc: "ব্যথার spray, topical application。" },
      { id: "ap7", name: "Digestion Tablets", price: 35, desc: "হজমের tablets, after meal。" },
      { id: "ap8", name: "First Aid Kit", price: 200, desc: "প্রাথমিক চিকিৎসার kit。" },
      { id: "ap9", name: "Thermometer", price: 80, desc: "ডিজিটাল thermometer, জ্বর check。" },
      { id: "ap10", name: "Hand Sanitizer", price: 40, desc: "হ্যান্ড sanitizer, 70% alcohol。" }
    ]
  },
  { 
    id: "21", 
    name: "Chandan Furniture", 
    type: "shop", 
    items: [
      { id: "cf1", name: "Wooden Chair", price: 800, desc: "শক্ত কাঠের চেয়ার।" },
      { id: "cf2", name: "Study Table", price: 1200, desc: "ছাত্রদের জন্য স্টাডি টেবিল।" },
      { id: "cf3", name: "Bookshelf", price: 1500, desc: "বই রাখার আলমারি।" },
      { id: "cf4", name: "Dining Table", price: 3500, desc: "6-seater dining table set。" },
      { id: "cf5", name: "Wardrobe", price: 4500, desc: "বড় wardrobe, কাপড় রাখার জন্য。" },
      { id: "cf6", name: "Sofa Set", price: 8000, desc: "3-seater sofa set, living room。" },
      { id: "cf7", name: "Coffee Table", price: 900, desc: "Living room coffee table。" },
      { id: "cf8", name: "Bed Frame", price: 5000, desc: "Queen size bed frame。" },
      { id: "cf9", name: "Dressing Table", price: 1800, desc: "মহিলাদের dressing table。" },
      { id: "cf10", name: "TV Cabinet", price: 2200, desc: "TV রাখার cabinet。" }
    ]
  },
  { 
    id: "22", 
    name: "Puja Gift Center", 
    type: "shop", 
    items: [
      { id: "pg1", name: "Puja Thali", price: 200, desc: "পূজার থালি সেট।" },
      { id: "pg2", name: "Brass Lamp", price: 350, desc: "পিতলের প্রদীপ।" },
      { id: "pg3", name: "Incense Holder", price: 80, desc: "ধূপধুনি রাখার স্ট্যান্ড।" },
      { id: "pg4", name: "Bell", price: 60, desc: "পূজার bell, brass তৈরি。" },
      { id: "pg5", name: "Idol Stand", price: 120, desc: "মূর্তি রাখার stand。" },
      { id: "pg6", name: "Holy Water Pot", price: 90, desc: "পবিত্র জল রাখার pot。" },
      { id: "pg7", name: "Prayer Mat", price: 150, desc: "নামাজের mat, comfortable。" },
      { id: "pg8", name: "Religious Books", price: 100, desc: "ধর্মীয় books collection。" },
      { id: "pg9", name: "Candle Stand", price: 70, desc: "মোমবাতি রাখার stand。" },
      { id: "pg10", name: "Sacred Thread", price: 25, desc: "পবিত্র thread, ritualsএর জন্য。" }
    ]
  },
  { 
    id: "23", 
    name: "Mohan Baker", 
    type: "shop", 
    items: [
      { id: "mb1", name: "Bread Loaf", price: 35, desc: "তাজা পাউরুটি।" },
      { id: "mb2", name: "Bun (4pcs)", price: 20, desc: "নরম বান।" },
      { id: "mb3", name: "Cake Slice", price: 25, desc: "স্পঞ্জ কেকের টুকরো।" },
      { id: "mb4", name: "Cookies (10pcs)", price: 40, desc: "বাটার cookies, crispy。" },
      { id: "mb5", name: "Donuts (4pcs)", price: 60, desc: "সুগন্ধি donuts, various flavors。" },
      { id: "mb6", name: "Pastry", price: 45, desc: "ক্রিম pastry, fresh daily。" },
      { id: "mb7", name: "Muffins (4pcs)", price: 50, desc: "চকলেট muffins, soft。" },
      { id: "mb8", name: "Croissant", price: 30, desc: "বাটার croissant, flaky。" },
      { id: "mb9", name: "Garlic Bread", price: 55, desc: "গার্লিক bread, Italian style。" },
      { id: "mb10", name: "Whole Wheat Bread", price: 40, desc: "সাস্থ্যকর whole wheat bread。" }
    ]
  },
  { 
    id: "24", 
    name: "Sita Beauty Products", 
    type: "shop", 
    items: [
      { id: "sb1", name: "Aloe Vera Gel", price: 120, desc: "প্রাকৃতিক অ্যালোভেরা জেল।" },
      { id: "sb2", name: "Face Cream", price: 80, desc: "ত্বকের ক্রিম।" },
      { id: "sb3", name: "Hair Oil", price: 90, desc: "চুলের তেল, প্রাকৃতিক উপাদানে।" },
      { id: "sb4", name: "Shampoo 200ml", price: 110, desc: "চুলের shampoo, damage repair。" },
      { id: "sb5", name: "Conditioner 200ml", price: 100, desc: "চুলের conditioner, smoothness。" },
      { id: "sb6", name: "Face Wash", price: 85, desc: "ত্বক cleansing face wash。" },
      { id: "sb7", name: "Body Lotion", price: 95, desc: "Body moisturizing lotion。" },
      { id: "sb8", name: "Lip Balm", price: 40, desc: "Lip care balm, natural。" },
      { id: "sb9", name: "Face Pack", price: 70, desc: "ত্বক glowing face pack。" },
      { id: "sb10", name: "Hair Serum", price: 130, desc: "চুল serum, frizz control。" }
    ]
  },
  { 
    id: "25", 
    name: "Ramesh Mechanic", 
    type: "service", 
    items: [
      { id: "rm1", name: "Bike Service", price: 300, desc: "বাইকের সাধারণ সার্ভিস।" },
      { id: "rm2", name: "Oil Change", price: 150, desc: "ইঞ্জিন অয়েল পরিবর্তন।" },
      { id: "rm3", name: "Tyre Repair", price: 50, desc: "টায়ার পাঞ্চার মেরামত।" },
      { id: "rm4", name: "Brake Repair", price: 200, desc: "ব্রেক system repair করা。" },
      { id: "rm5", name: "Chain Repair", price: 80, desc: "চেইন repair ও lubrication。" },
      { id: "rm6", name: "Headlight Fix", price: 60, desc: "হেডলাইট repair করা。" },
      { id: "rm7", name: "Battery Check", price: 40, desc: "ব্যাটারি check ও service。" },
      { id: "rm8", name: "Engine Tune-up", price: 250, desc: "ইঞ্জিন tune-up service。" },
      { id: "rm9", name: "Wheel Alignment", price: 100, desc: "চাকা alignment করা。" },
      { id: "rm10", name: "Spark Plug Change", price: 70, desc: "স্পার্ক plug change করা。" }
    ]
  },
  { 
    id: "26", 
    name: "Krishna Book Store", 
    type: "shop", 
    items: [
      { id: "kb1", name: "Story Book", price: 60, desc: "শিশুদের গল্পের বই।" },
      { id: "kb2", name: "Dictionary", price: 200, desc: "ইংরেজি-বাংলা ডিকশনারি।" },
      { id: "kb3", name: "Drawing Copy", price: 35, desc: "আঁকার খাতা।" },
      { id: "kb4", name: "Novel", price: 150, desc: "Bengali novel, popular authors。" },
      { id: "kb5", name: "Text Book", price: 120, desc: "স্কুল text book, various subjects。" },
      { id: "kb6", name: "Comic Book", price: 40, desc: "বাচ্চাদের comic book。" },
      { id: "kb7", name: "Poetry Book", price: 80, desc: "কবিতা collection book。" },
      { id: "kb8", name: "Science Book", price: 110, desc: "বিজ্ঞান related books。" },
      { id: "kb9", name: "History Book", price: 95, desc: "ইতিহাস related books。" },
      { id: "kb10", name: "Magazine", price: 25, desc: "Current affairs magazine。" }
    ]
  },
  { 
    id: "27", 
    name: "Bina Tailoring", 
    type: "service", 
    items: [
      { id: "bt1", name: "Shirt Stitching", price: 180, desc: "পুরুষদের শার্ট সেলাই।" },
      { id: "bt2", name: "Pant Stitching", price: 220, desc: "ফুল প্যান্ট সেলাই।" },
      { id: "bt3", name: "Kids Dress", price: 150, desc: "শিশুদের পোশাক সেলাই।" },
      { id: "bt4", name: "Blouse Stitching", price: 200, desc: "মহিলাদের blouse stitching。" },
      { id: "bt5", name: "Kurta Stitching", price: 250, desc: "পুরুষদের kurta stitching。" },
      { id: "bt6", name: "Salwar Stitching", price: 180, desc: "Salwar stitching service。" },
      { id: "bt7", name: "Saree Fall Stitching", price: 60, desc: "শাড়ি fall stitching service。" },
      { id: "bt8", name: "Dress Alteration", price: 80, desc: "পোশাক alteration service。" },
      { id: "bt9", name: "Neck Design", price: 120, desc: "ব্লাউজ neck design change。" },
      { id: "bt10", name: "Sleeve Work", price: 90, desc: "ব্লাউজ sleeve design work。" }
    ]
  },
   { 
    id: "28", 
    name: "Hari Farm Supplies", 
    type: "shop", 
    items: [
      { id: "hf1", name: "Seeds Packet", price: 40, desc: "বিভিন্ন সবজির বীজ।" },
      { id: "hf2", name: "Fertilizer 1kg", price: 60, desc: "জৈব সার।" },
      { id: "hf3", name: "Garden Tools", price: 200, desc: "বাগানের যন্ত্রপাতি।" },
      { id: "hf4", name: "Watering Can", price: 150, desc: "গাছের জন্য পানি দেওয়ার ক্যান।" },
      { id: "hf5", name: "Garden Gloves", price: 45, desc: "বাগান করার গ্লাভস।" },
      { id: "hf6", name: "Plant Pots Set", price: 120, desc: "বিভিন্ন সাইজের গাছের টব।" },
      { id: "hf7", name: "Spade", price: 80, desc: "মাটি খোড়ার সরঞ্জাম।" },
      { id: "hf8", name: "Rake", price: 70, desc: "মাটি সমান করার রেক।" },
      { id: "hf9", name: "Pruning Shears", price: 110, desc: "গাছ কাটার কাঁচি।" },
      { id: "hf10", name: "Garden Hose", price: 250, desc: "বাগানে পানি দেওয়ার হোস।" },
      { id: "hf11", name: "Spray Bottle", price: 35, desc: "কীটনাশক স্প্রেয়ার।" },
      { id: "hf12", name: "Compost Bin", price: 300, desc: "জৈব সার তৈরির বিন।" }
    ]
  },
  { 
    id: "29", 
    name: "Mitali Jewelry", 
    type: "shop", 
    items: [
      { id: "mj1", name: "Silver Earrings", price: 500, desc: "রূপার ইয়াররিং।" },
      { id: "mj2", name: "Gold Chain", price: 2500, desc: "সোনার চেইন।" },
      { id: "mj3", name: "Bangles Set", price: 300, desc: "কাঁচের চুড়ি সেট।" },
      { id: "mj4", name: "Silver Necklace", price: 800, desc: "রূপার হার, traditional design।" },
      { id: "mj5", name: "Gold Earrings", price: 1200, desc: "সোনার ইয়াররিং, light weight।" },
      { id: "mj6", name: "Silver Bracelet", price: 450, desc: "রূপার ব্রেসলেট, elegant look।" },
      { id: "mj7", name: "Nose Pin", price: 150, desc: "নাকের পিন, simple design।" },
      { id: "mj8", name: "Anklet", price: 200, desc: "পায়ের খাড়ু, traditional style।" },
      { id: "mj9", name: "Toe Ring", price: 80, desc: "পায়ের আঙুলের রিং।" },
      { id: "mj10", name: "Gold Bangle", price: 1800, desc: "সোনার চুড়ি, wedding collection।" },
      { id: "mj11", name: "Silver Ring", price: 180, desc: "রূপার আংটি, various designs।" },
      { id: "mj12", name: "Jewelry Box", price: 120, desc: "গহনা রাখার বাক্স।" }
    ]
  },
  { 
    id: "30", 
    name: "Sanjay Computer Repair", 
    type: "service", 
    items: [
      { id: "sc1", name: "PC Format", price: 200, desc: "কম্পিউটার ফরম্যাট ও সেটআপ।" },
      { id: "sc2", name: "Virus Removal", price: 150, desc: "ভাইরাস রিমুভাল সার্ভিস।" },
      { id: "sc3", name: "Software Installation", price: 100, desc: "সফটওয়্যার ইন্সটলেশন।" },
      { id: "sc4", name: "Hardware Repair", price: 300, desc: "কম্পিউটার হার্ডওয়্যার repair।" },
      { id: "sc5", name: "Data Recovery", price: 400, desc: "ডেটা recovery service।" },
      { id: "sc6", name: "Laptop Screen Repair", price: 800, desc: "ল্যাপটপ স্ক্রিন repair।" },
      { id: "sc7", name: "Keyboard Replacement", price: 250, desc: "কীবোর্ড replacement।" },
      { id: "sc8", name: "Motherboard Repair", price: 600, desc: "মাদারবোর্ড repair service।" },
      { id: "sc9", name: "RAM Upgrade", price: 350, desc: "RAM upgrade service।" },
      { id: "sc10", name: "Printer Repair", price: 280, desc: "প্রিন্টার repair service।" },
      { id: "sc11", name: "Network Setup", price: 180, desc: "হোম network setup।" },
      { id: "sc12", name: "PC Cleaning", price: 120, desc: "কম্পিউটার cleaning service।" }
    ]
  },
  { 
    id: "31", 
    name: "Laxman Poultry", 
    type: "shop", 
    items: [
      { id: "lp1", name: "Country Chicken", price: 200, desc: "দেশি মুরগি, তাজা।" },
      { id: "lp2", name: "Eggs (6pcs)", price: 36, desc: "তাজা ডিম।" },
      { id: "lp3", name: "Chicken Curry Cut", price: 180, desc: "মুরগি কারি কাট।" },
      { id: "lp4", name: "Broiler Chicken", price: 160, desc: "ব্রয়লার মুরগি, soft meat।" },
      { id: "lp5", name: "Chicken Leg Piece", price: 120, desc: "মুরগির রানের piece।" },
      { id: "lp6", name: "Chicken Breast", price: 140, desc: "মুরগির breast piece।" },
      { id: "lp7", name: "Chicken Wings", price: 100, desc: "মুরগির wings, fry করার জন্য।" },
      { id: "lp8", name: "Chicken Liver", price: 80, desc: "মুরগির liver, nutritious।" },
      { id: "lp9", name: "Chicken Mince", price: 130, desc: "কিমা করা মুরগির মাংস।" },
      { id: "lp10", name: "Eggs (12pcs)", price: 65, desc: "ডজন ডিম, fresh।" },
      { id: "lp11", name: "Quail Eggs (10pcs)", price: 40, desc: "কোয়েল পাখির ডিম।" },
      { id: "lp12", name: "Chicken Soup Pack", price: 90, desc: "সুপ তৈরির জন্য chicken pack।" }
    ]
  },
  { 
    id: "32", 
    name: "Gita Boutique", 
    type: "shop", 
    items: [
      { id: "gb1", name: "Designer Saree", price: 800, desc: "ডিজাইনার শাড়ি।" },
      { id: "gb2", name: "Salwar Kameez", price: 600, desc: "সালোয়ার কামিজ সেট।" },
      { id: "gb3", name: "Kurti", price: 350, desc: "মেয়েদের কুর্তি।" },
      { id: "gb4", name: "Cotton Saree", price: 450, desc: "সুতি শাড়ি, comfortable।" },
      { id: "gb5", name: "Silk Saree", price: 1200, desc: "রেশমি শাড়ি, special occasions।" },
      { id: "gb6", name: "Lehenga", price: 1500, desc: "বিয়ের lehenga, heavy work।" },
      { id: "gb7", name: "Dupatta", price: 150, desc: "ম্যাচিং dupatta, various designs।" },
      { id: "gb8", name: "Gown", price: 700, desc: "পার্টির gown, western style।" },
      { id: "gb9", name: "Palazzo Suit", price: 500, desc: "Palazzo suit set, trendy।" },
      { id: "gb10", name: "Blouse Piece", price: 100, desc: "শাড়ির জন্য blouse piece।" },
      { id: "gb11", name: "Kids Frock", price: 280, desc: "বাচ্চাদের frock, colorful।" },
      { id: "gb12", name: "Traditional Jewelry Set", price: 400, desc: "Traditional jewelry, matching set।" }
    ]
  },
  { 
    id: "33", 
    name: "Babu Cement Store", 
    type: "shop", 
    items: [
      { id: "bc1", name: "Cement Bag", price: 350, desc: "উচ্চমানের সিমেন্ট।" },
      { id: "bc2", name: "Sand (1 truck)", price: 2000, desc: "নির্মাণ বালু।" },
      { id: "bc3", name: "Bricks (100pcs)", price: 800, desc: "লাল ইট।" },
      { id: "bc4", name: "Gravel (1 truck)", price: 1800, desc: "construction gravel, different sizes।" },
      { id: "bc5", name: "White Cement", price: 400, desc: "সাদা সিমেন্ট, finishing work।" },
      { id: "bc6", name: "Tile Adhesive", price: 280, desc: "টাইলস adhesive, strong bond।" },
      { id: "bc7", name: "Wall Putty", price: 220, desc: "দেয়াল putty, smooth finish।" },
      { id: "bc8", name: "Construction Tools", price: 500, desc: "বিভিন্ন construction tools।" },
      { id: "bc9", name: "Waterproofing Chemical", price: 320, desc: "ওয়াটারপ্রুফিং chemical।" },
      { id: "bc10", name: "Paint Brushes Set", price: 150, desc: "রং করার brushes set।" },
      { id: "bc11", name: "Safety Helmet", price: 80, desc: "construction safety helmet।" },
      { id: "bc12", name: "Measuring Tape", price: 60, desc: "construction measuring tape।" }
    ]
  },
  { 
    id: "34", 
    name: "Mina Snacks Corner", 
    type: "shop", 
    items: [
      { id: "ms1", name: "Chowmein", price: 40, desc: "চাইনিজ চাউমিন।" },
      { id: "ms2", name: "Egg Roll", price: 30, desc: "ডিমের রোল।" },
      { id: "ms3", name: "Pakora", price: 20, desc: "মিক্সড পাকোরা।" },
      { id: "ms4", name: "Spring Roll", price: 35, desc: "ক্রিস্পি spring roll।" },
      { id: "ms5", name: "French Fries", price: 25, desc: "ক্রিস্পি french fries।" },
      { id: "ms6", name: "Cutlet", price: 30, desc: "ভেজিটেবল cutlet।" },
      { id: "ms7", name: "Samosa", price: 15, desc: "আলুর samosa, spicy।" },
      { id: "ms8", name: "Kachori", price: 18, desc: "মটর dal kachori।" },
      { id: "ms9", name: "Bread Pakora", price: 20, desc: "ব্রেড pakora, tasty snack।" },
      { id: "ms10", name: "Pattice", price: 22, desc: "আলুর pattice, soft inside।" },
      { id: "ms11", name: "Cold Coffee", price: 35, desc: "আইস cold coffee।" },
      { id: "ms12", name: "Snacks Platter", price: 100, desc: "বিভিন্ন snacksএর platter।" }
    ]
  },
  { 
    id: "35", 
    name: "Rohit Sports", 
    type: "shop", 
    items: [
      { id: "rs1", name: "Cricket Bat", price: 500, desc: "উইলো কাঠের ব্যাট।" },
      { id: "rs2", name: "Football", price: 400, desc: "স্ট্যান্ডার্ড ফুটবল।" },
      { id: "rs3", name: "Badminton Set", price: 300, desc: "ব্যাডমিন্টন র্যাকেট ও শাটল।" },
      { id: "rs4", name: "Cricket Ball", price: 80, desc: "লেদার cricket ball।" },
      { id: "rs5", name: "Volleyball", price: 350, desc: "স্ট্যান্ডার্ড volleyball।" },
      { id: "rs6", name: "Tennis Racket", price: 450, desc: "টেনিস racket, professional।" },
      { id: "rs7", name: "Basketball", price: 380, desc: "স্ট্যান্ডার্ড basketball।" },
      { id: "rs8", name: "Carrom Board", price: 600, desc: "ক্যারাম board, family game।" },
      { id: "rs9", name: "Chess Set", price: 120, desc: "কাঠের chess set।" },
      { id: "rs10", name: "Sports Shoes", price: 800, desc: "স্পোর্টস shoes, comfortable।" },
      { id: "rs11", name: "Cricket Gloves", price: 200, desc: "ক্রিকেট gloves, protection।" },
      { id: "rs12", name: "Sports Kit Bag", price: 250, desc: "স্পোর্টস equipment bag।" }
    ]
  },
  { 
    id: "36", 
    name: "Suman Beauty Salon", 
    type: "beauty", 
    items: [
      { id: "ss1", name: "Hair Cut Ladies", price: 100, desc: "মহিলাদের চুল কাটা।" },
      { id: "ss2", name: "Facial Cleanup", price: 200, desc: "ফেসিয়াল ক্লিনআপ।" },
      { id: "ss3", name: "Threading", price: 50, desc: "চোখের ভ্রু থ্রেডিং।" },
      { id: "ss4", name: "Hair Wash & Blow Dry", price: 80, desc: "চুল ধোয়া ও blow dry।" },
      { id: "ss5", name: "Hair Treatment", price: 350, desc: "চুলের বিশেষ treatment।" },
      { id: "ss6", name: "Manicure", price: 120, desc: "হাতের nail care।" },
      { id: "ss7", name: "Pedicure", price: 150, desc: "পায়ের nail care।" },
      { id: "ss8", name: "Waxing Full Arms", price: 100, desc: "হাতের waxing service।" },
      { id: "ss9", name: "Waxing Full Legs", price: 180, desc: "পায়ের waxing service।" },
      { id: "ss10", name: "Face Massage", price: 130, desc: "ত্বকের massage, relaxation।" },
      { id: "ss11", name: "Hair Coloring", price: 300, desc: "চুল coloring service।" },
      { id: "ss12", name: "Bridal Package", price: 1200, desc: "বিয়ের special package।" }
    ]
  },
  { 
    id: "37", 
    name: "Kartik Electronics", 
    type: "shop", 
    items: [
      { id: "ke1", name: "LED Bulb", price: 80, desc: "এনার্জি সেভিং LED বাল্ব।" },
      { id: "ke2", name: "Extension Board", price: 250, desc: "বৈদ্যুতিক এক্সটেনশন বোর্ড।" },
      { id: "ke3", name: "Mobile Charger", price: 150, desc: "স্মার্টফোন চার্জার।" },
      { id: "ke4", name: "Table Fan", price: 600, desc: "টেবিল fan, summer use।" },
      { id: "ke5", name: "Ceiling Fan", price: 1200, desc: "সিলিং fan, high speed।" },
      { id: "ke6", name: "Electric Kettle", price: 550, desc: "ইলেকট্রিক kettle, quick boiling।" },
      { id: "ke7", name: "Iron Box", price: 400, desc: "ইলেকট্রিক iron, clothes ironing।" },
      { id: "ke8", name: "Adapter", price: 120, desc: "মোবাইল adapter, charging।" },
      { id: "ke9", name: "Battery", price: 90, desc: "ইলেকট্রিক equipment battery।" },
      { id: "ke10", name: "Switch Board", price: 70, desc: "বৈদ্যুতিক switch board।" },
      { id: "ke11", name: "Wire Roll", price: 200, desc: "ইলেকট্রিক wire roll।" },
      { id: "ke12", name: "Multimeter", price: 300, desc: "ইলেকট্রিক multimeter, testing।" }
    ]
  },
  { 
    id: "38", 
    name: "Laxmi Fruits", 
    type: "shop", 
    items: [
      { id: "lf1", name: "Apple (1kg)", price: 120, desc: "তাজা আপেল।" },
      { id: "lf2", name: "Banana (1dozen)", price: 40, desc: "পাকা কলা।" },
      { id: "lf3", name: "Orange (1kg)", price: 80, desc: "মিষ্টি কমলা।" },
      { id: "lf4", name: "Mango (1kg)", price: 100, desc: "সিজনাল mango, various types।" },
      { id: "lf5", name: "Grapes (1kg)", price: 90, desc: "তাজা আঙ্গুর, seedless।" },
      { id: "lf6", name: "Pomegranate (1kg)", price: 150, desc: "বেদানা, healthy fruit।" },
      { id: "lf7", name: "Pineapple (1pc)", price: 60, desc: "তাজা আনারস, juicy।" },
      { id: "lf8", name: "Watermelon (1pc)", price: 70, desc: "বড় তরমুজ, summer special।" },
      { id: "lf9", name: "Papaya (1pc)", price: 45, desc: "পেঁপে, digestive fruit।" },
      { id: "lf10", name: "Guava (1kg)", price: 55, desc: "পেয়ারা, vitamin C rich।" },
      { id: "lf11", name: "Kiwi (4pcs)", price: 80, desc: "কিউই ফল, exotic fruit।" },
      { id: "lf12", name: "Fruit Basket", price: 300, desc: "মিশ্র ফলের basket, gift item।" }
    ]
  },
  { 
    id: "39", 
    name: "Bhola Plumbing", 
    type: "service", 
    items: [
      { id: "bp1", name: "Tap Repair", price: 100, desc: "নলের মেরামত।" },
      { id: "bp2", name: "Pipe Installation", price: 200, desc: "নতুন পাইপ বসানো।" },
      { id: "bp3", name: "Water Tank Clean", price: 300, desc: "পানি ট্যাংক পরিষ্কার।" },
      { id: "bp4", name: "Bathroom Fitting", price: 400, desc: "বাথরুম fitting installation।" },
      { id: "bp5", name: "Kitchen Sink Repair", price: 180, desc: "রান্নাঘরের sink repair।" },
      { id: "bp6", name: "Water Pump Repair", price: 250, desc: "পানি pump repair service।" },
      { id: "bp7", name: "Pipe Leakage Fix", price: 150, desc: "পাইপ leakage repair।" },
      { id: "bp8", name: "Shower Installation", price: 220, desc: "শাওয়ার installation service।" },
      { id: "bp9", name: "Drain Cleaning", price: 120, desc: "ড্রেন cleaning service।" },
      { id: "bp10", name: "Geyser Installation", price: 350, desc: "গিজার installation service।" },
      { id: "bp11", name: "Water Filter Fix", price: 130, desc: "পানি filter repair।" },
      { id: "bp12", name: "Emergency Plumbing", price: 200, desc: "জরুরি plumbing service।" }
    ]
  },
  { 
    id: "40", 
    name: "Rina Handicrafts", 
    type: "shop", 
    items: [
      { id: "rh1", name: "Clay Pot", price: 150, desc: "হাতে তৈরি মাটির হাঁড়ি।" },
      { id: "rh2", name: "Bamboo Basket", price: 80, desc: "বাঁশের ঝুড়ি।" },
      { id: "rh3", name: "Jute Bag", price: 60, desc: "পাটের ব্যাগ।" },
      { id: "rh4", name: "Wooden Carving", price: 300, desc: "কাঠের carving, decorative।" },
      { id: "rh5", name: "Terracotta Jewelry", price: 120, desc: "মাটির jewelry, traditional।" },
      { id: "rh6", name: "Handmade Paper Items", price: 45, desc: "হাতে তৈরি paper products।" },
      { id: "rh7", name: "Embroidery Work", price: 180, desc: "হাতে করা embroidery।" },
      { id: "rh8", name: "Cane Furniture", price: 800, desc: "বেতের furniture, lightweight।" },
      { id: "rh9", name: "Pottery Items", price: 200, desc: "মাটির pottery, various designs।" },
      { id: "rh10", name: "Handwoven Shawl", price: 250, desc: "হাতে বোনা shawl, warm।" },
      { id: "rh11", name: "Decorative Wall Hanging", price: 90, desc: "সজ্জা wall hanging।" },
      { id: "rh12", name: "Handicraft Gift Set", price: 400, desc: "হস্তশিল্প gift set।" }
    ]
  },
  { 
    id: "41", 
    name: "Mohan Grocery", 
    type: "shop", 
    items: [
      { id: "mg1", name: "Cooking Oil 1L", price: 180, desc: "রান্নার তেল।" },
      { id: "mg2", name: "Spices Pack", price: 100, desc: "মশলার প্যাকেট।" },
      { id: "mg3", name: "Lentils 1kg", price: 110, desc: "বিভিন্ন ডাল।" },
      { id: "mg4", name: "Rice 5kg", price: 250, desc: "বাসমতি rice, premium quality।" },
      { id: "mg5", name: "Wheat 5kg", price: 180, desc: "গম, আটা তৈরির জন্য।" },
      { id: "mg6", name: "Sugar 2kg", price: 80, desc: "সাদা চিনি, cooking purpose।" },
      { id: "mg7", name: "Salt 1kg", price: 20, desc: "আয়োডিন salt, essential।" },
      { id: "mg8", name: "Tea Powder 500g", price: 150, desc: "চা powder, strong flavor।" },
      { id: "mg9", name: "Coffee Powder 200g", price: 120, desc: "কফি powder, instant।" },
      { id: "mg10", name: "Biscuits Pack", price: 35, desc: "বিভিন্ন ধরনের biscuits।" },
      { id: "mg11", name: "Noodles Pack", price: 25, desc: "ইনস্ট্যান্ট noodles।" },
      { id: "mg12", name: "Canned Food", price: 65, desc: "ক্যানড food, emergency stock।" }
    ]
  },
  { 
    id: "42", 
    name: "Sita Boutique", 
    type: "shop", 
    items: [
      { id: "sb1", name: "Embroidery Work", price: 300, desc: "হাতে করা এমব্রয়ডারি।" },
      { id: "sb2", name: "Zari Border", price: 150, desc: "জরির বর্ডার কাজ।" },
      { id: "sb3", name: "Design Stitching", price: 400, desc: "বিশেষ ডিজাইন সেলাই।" },
      { id: "sb4", name: "Saree Draping", price: 50, desc: "শাড়ি draping service।" },
      { id: "sb5", name: "Blouse Design", price: 200, desc: "ব্লাউজ design service।" },
      { id: "sb6", name: "Kurta Stitching", price: 250, desc: "কুর্তা stitching service।" },
      { id: "sb7", name: "Salwar Alteration", price: 100, desc: "সালোয়ার alteration service।" },
      { id: "sb8", name: "Dress Fitting", price: 80, desc: "পোশাক fitting service।" },
      { id: "sb9", name: "Neck Design", price: 120, desc: "ব্লাউজ neck design change।" },
      { id: "sb10", name: "Sleeve Work", price: 90, desc: "ব্লাউজ sleeve design work।" },
      { id: "sb11", name: "Fall Stitching", price: 60, desc: "শাড়ি fall stitching।" },
      { id: "sb12", name: "Custom Tailoring", price: 350, desc: "কাস্টম tailoring service।" }
    ]
  },
  { 
    id: "43", 
    name: "Raju Electric Goods", 
    type: "shop", 
    items: [
      { id: "re1", name: "Electric Kettle", price: 600, desc: "বৈদ্যুতিক কেটলি।" },
      { id: "re2", name: "Mixer Grinder", price: 1200, desc: "মিক্সি গ্রাইন্ডার।" },
      { id: "re3", name: "Iron Box", price: 400, desc: "ইলেকট্রিক ইস্ত্রি।" },
      { id: "re4", name: "Toaster", price: 350, desc: "ব্রেড toaster, automatic।" },
      { id: "re5", name: "Water Heater", price: 1500, desc: "ইলেকট্রিক water heater।" },
      { id: "re6", name: "Room Heater", price: 800, desc: "রুম heater, winter use।" },
      { id: "re7", name: "Electric Cooker", price: 1000, desc: "ইলেকট্রিক rice cooker।" },
      { id: "re8", name: "Blender", price: 450, desc: "জুস blender, multipurpose।" },
      { id: "re9", name: "Food Processor", price: 1800, desc: "খাবার processor, advanced।" },
      { id: "re10", name: "Electric Oven", price: 2000, desc: "ইলেকট্রিক oven, baking।" },
      { id: "re11", name: "Chimney", price: 2500, desc: "কিচেন chimney, smoke removal।" },
      { id: "re12", name: "Electric Wiring Kit", price: 300, desc: "ইলেকট্রিক wiring kit।" }
    ]
  },
  { 
    id: "44", 
    name: "Kamal Hardware", 
    type: "shop", 
    items: [
      { id: "kh1", name: "Paint Brush", price: 40, desc: "রং করার ব্রাশ।" },
      { id: "kh2", name: "Wall Paint 1L", price: 250, desc: "দেয়াল রং।" },
      { id: "kh3", name: "Putty Knife", price: 60, desc: "পুটি করার ছুরি।" },
      { id: "kh4", name: "Paint Roller", price: 80, desc: "রং করার roller, smooth finish।" },
      { id: "kh5", name: "Sandpaper Pack", price: 30, desc: "স্যান্ডপেপার, surface preparation।" },
      { id: "kh6", name: "Paint Thinner", price: 90, desc: "পেইন্ট thinner, cleaning।" },
      { id: "kh7", name: "Wood Polish", price: 120, desc: "কাঠের polish, shine increase।" },
      { id: "kh8", name: "Paint Tray", price: 50, desc: "পেইন্ট tray, roller use।" },
      { id: "kh9", name: "Masking Tape", price: 25, desc: "মাস্কিং tape, painting protection।" },
      { id: "kh10", name: "Primer Coat", price: 180, desc: "প্রাইমার coat, base preparation।" },
      { id: "kh11", name: "Varnish", price: 140, desc: "কাঠের varnish, protection।" },
      { id: "kh12", name: "Painting Kit", price: 400, desc: "সম্পূর্ণ painting kit।" }
    ]
  },
  { 
    id: "45", 
    name: "Bina Beauty Care", 
    type: "beauty", 
    items: [
      { id: "bb1", name: "Manicure", price: 150, desc: "হাতের যত্ন।" },
      { id: "bb2", name: "Pedicure", price: 200, desc: "পায়ের যত্ন।" },
      { id: "bb3", name: "Waxing", price: 180, desc: "বডি ওয়্যাক্সিং।" },
      { id: "bb4", name: "Facial", price: 300, desc: "ত্বক facial, deep cleaning।" },
      { id: "bb5", name: "Threading", price: 50, desc: "ভ্রু threading, shaping।" },
      { id: "bb6", name: "Hair Spa", price: 400, desc: "চুল spa, conditioning।" },
      { id: "bb7", name: "Bleach", price: 120, desc: "ত্বক bleach, brightening।" },
      { id: "bb8", name: "Makeup", price: 500, desc: "বিশেষ occasion makeup।" },
      { id: "bb9", name: "Hair Cut", price: 100, desc: "চুল cutting service।" },
      { id: "bb10", name: "Hair Color", price: 350, desc: "চুল coloring service।" },
      { id: "bb11", name: "Skin Treatment", price: 450, desc: "ত্বক treatment, acne removal।" },
      { id: "bb12", name: "Bridal Package", price: 1500, desc: "বিয়ের complete package।" }
    ]
  },
  { 
    id: "46", 
    name: "Hari Tea Stall", 
    type: "shop", 
    items: [
      { id: "ht1", name: "Special Tea", price: 12, desc: "বিশেষ চা।" },
      { id: "ht2", name: "Biscuit Packet", price: 10, desc: "বিস্কুট প্যাকেট।" },
      { id: "ht3", name: "Toast", price: 15, desc: "বাটার টোস্ট।" },
      { id: "ht4", name: "Egg Roll", price: 25, desc: "ডিমের roll, fresh vegetables।" },
      { id: "ht5", name: "Vegetable Roll", price: 20, desc: "ভেজিটেবল roll, healthy option।" },
      { id: "ht6", name: "Coffee", price: 15, desc: "সাধারণ coffee, instant।" },
      { id: "ht7", name: "Cold Coffee", price: 30, desc: "আইস cold coffee, refreshing।" },
      { id: "ht8", name: "Lemon Tea", price: 10, desc: "লেবু চা, light flavor।" },
      { id: "ht9", name: "Ginger Tea", price: 14, desc: "আদা চা, medicinal benefits।" },
      { id: "ht10", name: "Masala Tea", price: 16, desc: "মসলা চা, strong flavor।" },
      { id: "ht11", name: "Samosa", price: 12, desc: "আলুর samosa, spicy filling।" },
      { id: "ht12", name: "Pakora", price: 18, desc: "মিক্সড vegetable pakora।" }
    ]
  },
  { 
    id: "47", 
    name: "Gopal Vegetable", 
    type: "shop", 
    items: [
      { id: "gv1", name: "Cabbage (1pc)", price: 25, desc: "তাজা বাঁধাকপি।" },
      { id: "gv2", name: "Cauliflower", price: 30, desc: "ফুলকপি।" },
      { id: "gv3", name: "Green Chili", price: 20, desc: "কাঁচা মরিচ।" },
      { id: "gv4", name: "Potato (1kg)", price: 28, desc: "তাজা আলু, cooking purpose।" },
      { id: "gv5", name: "Tomato (1kg)", price: 42, desc: "লাল টমেটো, fresh।" },
      { id: "gv6", name: "Onion (1kg)", price: 35, desc: "পেঁয়াজ, essential vegetable।" },
      { id: "gv7", name: "Carrot (1kg)", price: 48, desc: "গাজর, salad making।" },
      { id: "gv8", name: "Beans (500g)", price: 38, desc: "সবুজ beans, stir fry।" },
      { id: "gv9", name: "Brinjal (1kg)", price: 34, desc: "বেগুন, various dishes।" },
      { id: "gv10", name: "Cucumber (4pcs)", price: 22, desc: "শসা, salad ও raita।" },
      { id: "gv11", name: "Spinach (1bunch)", price: 15, desc: "পালং শাক, nutritious।" },
      { id: "gv12", name: "Mixed Vegetable Pack", price: 60, desc: "মিশ্র সবজির pack।" }
    ]
  },
  { 
    id: "48", 
    name: "Madhav Sweets", 
    type: "shop", 
    items: [
      { id: "ms1", name: "Milk Cake", price: 200, desc: "দুধের কেক।" },
      { id: "ms2", name: "Jalebi (250g)", price: 80, desc: "তাজা জিলেপি।" },
      { id: "ms3", name: "Laddu (1pc)", price: 20, desc: "বেসনের লাড্ডু।" },
      { id: "ms4", name: "Rasgulla (1pc)", price: 16, desc: "স্পঞ্জি rasgulla, juicy।" },
      { id: "ms5", name: "Sandesh (1pc)", price: 14, desc: "ছানার sandesh, soft।" },
      { id: "ms6", name: "Gulab Jamun (1pc)", price: 18, desc: "গোলাপ jamun, sweet syrup।" },
      { id: "ms7", name: "Rasmalai (1pc)", price: 22, desc: "রসমালাই, creamy delight।" },
      { id: "ms8", name: "Cham Cham (1pc)", price: 17, desc: "চমচম, traditional sweet।" },
      { id: "ms9", name: "Barfi (1pc)", price: 15, desc: "বিভিন্ন flavor barfi।" },
      { id: "ms10", name: "Kalakand (1pc)", price: 19, desc: "কালাকান্দ, milk based।" },
      { id: "ms11", name: "Mysore Pak (1pc)", price: 16, desc: "মাইসোর pak, gram flour sweet।" },
      { id: "ms12", name: "Sweet Box (500g)", price: 180, desc: "মিশ্র মিষ্টির box।" }
    ]
  },
  { 
    id: "49", 
    name: "Nabin Stationery", 
    type: "shop", 
    items: [
      { id: "ns1", name: "Geometry Box", price: 80, desc: "জ্যামিতি বক্স।" },
      { id: "ns2", name: "School Bag", price: 400, desc: "স্কুল ব্যাগ।" },
      { id: "ns3", name: "Water Bottle", price: 100, desc: "পানি রাখার বোতল।" },
      { id: "ns4", name: "Notebook Set", price: 120, desc: "বিভিন্ন subject notebook set।" },
      { id: "ns5", name: "Pen Set", price: 50, desc: "বিভিন্ন color pen set।" },
      { id: "ns6", name: "Pencil Box", price: 60, desc: "পেন্সিল box, storage।" },
      { id: "ns7", name: "Eraser Pack", price: 15, desc: "ইরেজার pack, multiple pieces।" },
      { id: "ns8", name: "Sharpener", price: 10, desc: "পেন্সিল sharpener, durable।" },
      { id: "ns9", name: "Scale Set", price: 25, desc: "বিভিন্ন size scale set।" },
      { id: "ns10", name: "Drawing Book", price: 45, desc: "আঁকার book, quality paper।" },
      { id: "ns11", name: "Color Pencils", price: 70, desc: "রঙিন পেন্সিল set।" },
      { id: "ns12", name: "School Kit", price: 250, desc: "সম্পূর্ণ school kit।" }
    ]
  },
  { 
    id: "50", 
    name: "Sukesh Barber", 
    type: "saloon", 
    items: [
      { id: "sb1", name: "Hair Wash", price: 40, desc: "চুল ধোয়ার সার্ভিস।" },
      { id: "sb2", name: "Head Massage", price: 80, desc: "মাথার মালিশ।" },
      { id: "sb3", name: "Beard Trim", price: 30, desc: "দাড়ি কাটা।" },
      { id: "sb4", name: "Hair Cut", price: 70, desc: "চুল cutting service।" },
      { id: "sb5", name: "Shaving", price: 50, desc: "পরিষ্কার shaving service।" },
      { id: "sb6", name: "Face Massage", price: 60, desc: "মুখ massage, relaxation।" },
      { id: "sb7", name: "Hair Color", price: 200, desc: "চুল coloring service।" },
      { id: "sb8", name: "Beard Styling", price: 40, desc: "দাড়ি styling service।" },
      { id: "sb9", name: "Hair Treatment", price: 250, desc: "চুল treatment, damage repair।" },
      { id: "sb10", name: "Scalp Treatment", price: 120, desc: "স্ক্যাল্প treatment, dandruff removal।" },
      { id: "sb11", name: "Kids Haircut", price: 50, desc: "বাচ্চাদের hair cut service।" },
      { id: "sb12", name: "Senior Citizen Discount", price: 0, desc: "বয়স্কদের বিশেষ discount।" }
    ]
  },
  { 
    id: "51", 
    name: "Rohit Mobile Accessories", 
    type: "shop", 
    items: [
      { id: "rm1", name: "Earphones", price: 200, desc: "হেডফোন ও ইয়ারফোন।" },
      { id: "rm2", name: "Power Bank", price: 600, desc: "মোবাইল পাওয়ার ব্যাংক।" },
      { id: "rm3", name: "Selfie Stick", price: 150, desc: "সেলফি স্টিক।" },
      { id: "rm4", name: "Mobile Cover", price: 120, desc: "বিভিন্ন model mobile cover।" },
      { id: "rm5", name: "Screen Guard", price: 50, desc: "মোবাইল screen protector।" },
      { id: "rm6", name: "Charger Cable", price: 180, desc: "মোবাইল charger cable।" },
      { id: "rm7", name: "Adapter", price: 100, desc: "মোবাইল charging adapter।" },
      { id: "rm8", name: "Bluetooth Speaker", price: 450, desc: "পোর্টেবল bluetooth speaker।" },
      { id: "rm9", name: "Memory Card", price: 350, desc: "32GB memory card।" },
      { id: "rm10", name: "OTG Cable", price: 80, desc: "USB OTG cable।" },
      { id: "rm11", name: "Mobile Stand", price: 90, desc: "ফোন রাখার stand।" },
      { id: "rm12", name: "Car Charger", price: 110, desc: "গাড়ির জন্য mobile charger।" }
    ]
  },
  { 
    id: "52", 
    name: "Mina Fashion", 
    type: "shop", 
    items: [
      { id: "mf1", name: "Designer Dupatta", price: 180, desc: "ডিজাইনার ওড়না।" },
      { id: "mf2", name: "Handbag", price: 300, desc: "মহিলাদের হ্যান্ডব্যাগ।" },
      { id: "mf3", name: "Scarf", price: 120, desc: "রঙিন স্কার্ফ।" },
      { id: "mf4", name: "Sunglasses", price: 150, desc: "ফ্যাশন sunglasses, UV protection।" },
      { id: "mf5", name: "Hair Accessories", price: 60, desc: "চুলের accessories set।" },
      { id: "mf6", name: "Jewelry Set", price: 250, desc: "ফ্যাশন jewelry set।" },
      { id: "mf7", name: "Waist Belt", price: 90, desc: "কোমরের belt, stylish।" },
      { id: "mf8", name: "Evening Gown", price: 800, desc: "ইভিনিং gown, party wear।" },
      { id: "mf9", name: "Designer Saree", price: 900, desc: "ডিজাইনার শাড়ি, exclusive।" },
      { id: "mf10", name: "Kurti Set", price: 400, desc: "কুর্তি set, matching bottom।" },
      { id: "mf11", name: "Western Dress", price: 600, desc: "ওয়েস্টার্ন dress, trendy।" },
      { id: "mf12", name: "Fashion Combo", price: 500, desc: "ফ্যাশন combo, multiple items।" }
    ]
  },
  { 
    id: "53", 
    name: "Babu Construction", 
    type: "service", 
    items: [
      { id: "bc1", name: "Room Painting", price: 2000, desc: "ঘর রং করার সার্ভিস।" },
      { id: "bc2", name: "Tiles Work", price: 1500, desc: "টাইলস বসানো।" },
      { id: "bc3", name: "Small Repair", price: 500, desc: "ছোট মেরামত কাজ।" },
      { id: "bc4", name: "Wall Construction", price: 3000, desc: "নতুন দেয়াল construction।" },
      { id: "bc5", name: "Flooring Work", price: 2500, desc: "ফ্লোরিং work, different materials।" },
      { id: "bc6", name: "Roof Repair", price: 1800, desc: "ছাদ repair service।" },
      { id: "bc7", name: "Bathroom Renovation", price: 4000, desc: "বাথরুম renovation service।" },
      { id: "bc8", name: "Kitchen Setup", price: 3500, desc: "রান্নাঘর setup service।" },
      { id: "bc9", name: "Door Installation", price: 1200, desc: "দরজা installation service।" },
      { id: "bc10", name: "Window Fixing", price: 900, desc: "জানালা fixing service।" },
      { id: "bc11", name: "Waterproofing", price: 2200, desc: "ওয়াটারপ্রুফিং service।" },
      { id: "bc12", name: "Full House Construction", price: 10000, desc: "সম্পূর্ণ বাড়ি construction service।" }
    ]
  },
  { 
    id: "54", 
    name: "Laxmi Tailoring", 
    type: "service", 
    items: [
      { id: "lt1", name: "Blouse Design", price: 350, desc: "ব্লাউজের বিশেষ ডিজাইন।" },
      { id: "lt2", name: "Saree Fall", price: 100, desc: "শাড়িতে ফল বসানো।" },
      { id: "lt3", name: "Neck Design", price: 120, desc: "ব্লাউজের নেক ডিজাইন।" },
      { id: "lt4", name: "Sleeve Work", price: 90, desc: "ব্লাউজ sleeve design work।" },
      { id: "lt5", name: "Kurta Stitching", price: 280, desc: "পুরুষদের kurta stitching।" },
      { id: "lt6", name: "Salwar Stitching", price: 200, desc: "সালোয়ার stitching service।" },
      { id: "lt7", name: "Kids Dress", price: 180, desc: "বাচ্চাদের dress stitching।" },
      { id: "lt8", name: "Dress Alteration", price: 80, desc: "পোশাক alteration service।" },
      { id: "lt9", name: "Embroidery Work", price: 300, desc: "হাতে করা embroidery work।" },
      { id: "lt10", name: "Zari Work", price: 250, desc: "জরির work, traditional।" },
      { id: "lt11", name: "Bridal Blouse", price: 600, desc: "বিয়ের blouse stitching।" },
      { id: "lt12", name: "Custom Fitting", price: 150, desc: "কাস্টম fitting service।" }
    ]
  },
  { 
    id: "55", 
    name: "Hari Snacks", 
    type: "shop", 
    items: [
      { id: "hs1", name: "Vegetable Puff", price: 15, desc: "ভেজিটেবল পাফ।" },
      { id: "hs2", name: "Chicken Puff", price: 20, desc: "চিকেন পাফ।" },
      { id: "hs3", name: "Cold Drink", price: 25, desc: "ঠান্ডা পানীয়।" },
      { id: "hs4", name: "Samosa", price: 12, desc: "আলুর samosa, spicy।" },
      { id: "hs5", name: "Kachori", price: 16, desc: "মটর dal kachori।" },
      { id: "hs6", name: "Bread Pakora", price: 18, desc: "ব্রেড pakora, crispy।" },
      { id: "hs7", name: "Cutlet", price: 22, desc: "ভেজিটেবল cutlet, soft inside।" },
      { id: "hs8", name: "Spring Roll", price: 28, desc: "চাইনিজ spring roll।" },
      { id: "hs9", name: "French Fries", price: 30, desc: "ক্রিস্পি french fries।" },
      { id: "hs10", name: "Chowmein", price: 35, desc: "চাইনিজ chowmein, noodles।" },
      { id: "hs11", name: "Momos", price: 25, desc: "চিকেন momos, steamed।" },
      { id: "hs12", name: "Snacks Combo", price: 80, desc: "বিভিন্ন snacks combo pack।" }
    ]
  },
  { 
    id: "56", 
    name: "Gita Beauty Products", 
    type: "shop", 
    items: [
      { id: "gb1", name: "Lipstick", price: 120, desc: "দীর্ঘস্থায়ী লিপস্টিক।" },
      { id: "gb2", name: "Nail Polish", price: 60, desc: "রঙিন নেইল পলিশ।" },
      { id: "gb3", name: "Face Powder", price: 80, desc: "ফেস পাউডার।" },
      { id: "gb4", name: "Kajal", price: 40, desc: "আইলাইনার kajal, dark।" },
      { id: "gb5", name: "Foundation", price: 150, desc: "ত্বক foundation, even tone।" },
      { id: "gb6", name: "Mascara", price: 110, desc: "আইল্যাশ mascara, volume increase।" },
      { id: "gb7", name: "Blush", price: 90, desc: "গাল blush, natural glow।" },
      { id: "gb8", name: "Eye Shadow", price: 100, desc: "আই shadow, various colors।" },
      { id: "gb9", name: "Makeup Remover", price: 70, desc: "মেকআপ remover, gentle।" },
      { id: "gb10", name: "Beauty Blender", price: 50, desc: "মেকআপ beauty blender।" },
      { id: "gb11", name: "Makeup Kit", price: 400, desc: "সম্পূর্ণ makeup kit।" },
      { id: "gb12", name: "Skin Care Set", price: 350, desc: "ত্বক care set, multiple products।" }
    ]
  },
  { 
    id: "57", 
    name: "Ramesh Furniture", 
    type: "shop", 
    items: [
      { id: "rf1", name: "Wooden Bed", price: 5000, desc: "কাঠের খাট।" },
      { id: "rf2", name: "Dining Table", price: 3500, desc: "ডাইনিং টেবিল সেট।" },
      { id: "rf3", name: "Sofa Set", price: 8000, desc: "৩ সিটের সোফা সেট।" },
      { id: "rf4", name: "Wardrobe", price: 4500, desc: "বড় wardrobe, storage।" },
      { id: "rf5", name: "Study Table", price: 1200, desc: "স্টাডি table, students use।" },
      { id: "rf6", name: "Bookshelf", price: 1500, desc: "বই রাখার shelf।" },
      { id: "rf7", name: "Coffee Table", price: 900, desc: "লিভিং রুম coffee table।" },
      { id: "rf8", name: "TV Cabinet", price: 2200, desc: "TV রাখার cabinet।" },
      { id: "rf9", name: "Dressing Table", price: 1800, desc: "মহিলাদের dressing table।" },
      { id: "rf10", name: "Shoe Rack", price: 800, desc: "জুতো রাখার rack।" },
      { id: "rf11", name: "Center Table", price: 700, desc: "লিভিং রুম center table।" },
      { id: "rf12", name: "Furniture Polish", price: 120, desc: "ফার্নিচার polish, shine increase।" }
    ]
  },
  { 
    id: "58", 
    name: "Suman Pharmacy", 
    type: "shop", 
    items: [
      { id: "sp1", name: "Cough Syrup", price: 85, desc: "কাশির সিরাপ।" },
      { id: "sp2", name: "Antiseptic Cream", price: 45, desc: "জীবাণুনাশক ক্রিম।" },
      { id: "sp3", name: "Digestion Tablet", price: 30, desc: "হজমের ওষুধ।" },
      { id: "sp4", name: "Pain Killer", price: 25, desc: "ব্যথার ওষুধ, quick relief।" },
      { id: "sp5", name: "Vitamin Tablets", price: 150, desc: "ভিটামিন tablets, health boost।" },
      { id: "sp6", name: "Bandage Roll", price: 35, desc: "ব্যান্ডেজ roll, wound care।" },
      { id: "sp7", name: "Cotton Roll", price: 20, desc: "কটন roll, medical use।" },
      { id: "sp8", name: "Thermometer", price: 80, desc: "ডিজিটাল thermometer।" },
      { id: "sp9", name: "First Aid Kit", price: 200, desc: "প্রাথমিক চিকিৎসার kit।" },
      { id: "sp10", name: "Hand Sanitizer", price: 40, desc: "হ্যান্ড sanitizer, 70% alcohol।" },
      { id: "sp11", name: "Face Mask", price: 50, desc: "সurgical face mask pack।" },
      { id: "sp12", name: "Health Drink", price: 120, desc: "স্বাস্থ্য drink, protein rich।" }
    ]
  },
  { 
    id: "59", 
    name: "Kartik Gift Shop", 
    type: "shop", 
    items: [
      { id: "kg1", name: "Birthday Card", price: 50, desc: "বার্থডে কার্ড।" },
      { id: "kg2", name: "Photo Frame", price: 100, desc: "ছবির ফ্রেম।" },
      { id: "kg3", name: "Soft Toy", price: 150, desc: "নরম খেলনা।" },
      { id: "kg4", name: "Chocolate Box", price: 120, desc: "বিভিন্ন flavor chocolate box।" },
      { id: "kg5", name: "Flower Bouquet", price: 200, desc: "তাজা ফুলের bouquet।" },
      { id: "kg6", name: "Perfume", price: 180, desc: "সুগন্ধি perfume, long lasting।" },
      { id: "kg7", name: "Candle Set", price: 80, desc: "সুগন্ধি candle set।" },
      { id: "kg8", name: "Keychain", price: 40, desc: "সুন্দর keychain, various designs।" },
      { id: "kg9", name: "Mug", price: 60, desc: "স্পেশাল design mug।" },
      { id: "kg10", name: "Greeting Card", price: 30, desc: "বিভিন্ন occasion greeting card।" },
      { id: "kg11", name: "Gift Wrapping", price: 20, desc: "উপহার wrapping service।" },
      { id: "kg12", name: "Gift Hamper", price: 500, desc: "বিভিন্ন item gift hamper।" }
    ]
  },
  { 
    id: "60", 
    name: "Bina Catering", 
    type: "service", 
    items: [
      { id: "bc1", name: "Party Food", price: 1500, desc: "পার্টির খাবার।" },
      { id: "bc2", name: "Wedding Catering", price: 5000, desc: "বিয়ের ক্যাটারিং।" },
      { id: "bc3", name: "Small Event", price: 2500, desc: "ছোট অনুষ্ঠানের খাবার।" },
      { id: "bc4", name: "Office Party", price: 2000, desc: "অফিস party catering।" },
      { id: "bc5", name: "Birthday Party", price: 1800, desc: "বার্থডে party catering।" },
      { id: "bc6", name: "Anniversary Event", price: 2200, desc: "বার্ষিকী event catering।" },
      { id: "bc7", name: "Vegetarian Menu", price: 1200, desc: "শুধুমাত্র vegetarian menu।" },
      { id: "bc8", name: "Non-Veg Menu", price: 1600, desc: "Non-vegetarian menu options।" },
      { id: "bc9", name: "Snacks Package", price: 800, desc: "শুধুমাত্র snacks package।" },
      { id: "bc10", name: "Full Meal Package", price: 3000, desc: "সম্পূর্ণ meal package।" },
      { id: "bc11", name: "Dessert Package", price: 600, desc: "শুধুমাত্র dessert items।" },
      { id: "bc12", name: "Custom Menu", price: 3500, desc: "কাস্টম menu according to preference।" }
    ]
  }
];

// ✅ API routes
app.get("/", (req, res) => res.send("✅ HaatBazar Backend is Running..."));
app.get("/shops", (req, res) => res.json(shops));
app.get("/shops/:id", (req, res) => {
  const shop = shops.find(s => s.id === req.params.id);
  if (!shop) return res.status(404).json({ message: "Shop not found" });
  res.json(shop);
});
app.post("/order", (req, res) => {
  const { items, total } = req.body;
  res.json({ message: "✅ Order received!", items, total });
});

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));