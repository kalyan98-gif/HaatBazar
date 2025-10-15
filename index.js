// index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ All Shops with their items
const shops = [
  { id: "1", name: "Usha Store", type: "shop", items: [
      { id: "p1", name: "Basmati Rice 1kg", price: 90, desc: "উচ্চ মানের সুগন্ধি চাল, দৈনন্দিন রান্নার জন্য উপযুক্ত।" },
      { id: "p2", name: "Moong Dal 1kg", price: 120, desc: "প্রোটিনসমৃদ্ধ মুগ ডাল, খিচুড়ি বা তরকারির জন্য আদর্শ।" },
      { id: "p3", name: "Mustard Oil 1L", price: 150, desc: "বিশুদ্ধ সরিষার তেল, রান্না ও মালিশ দুইয়ের জন্যই ভালো।" },
    ]
  },
  { id: "2", name: "Sukesh Saloon", type: "saloon", items: [
      { id: "s1", name: "Hair Cut", price: 80, desc: "দক্ষ হস্তের দ্বারা চুল কাটার সার্ভিস।" },
      { id: "s2", name: "Shaving", price: 50, desc: "পরিষ্কার ও নিখুঁত শেভ।" },
      { id: "s3", name: "Hair Colour", price: 250, desc: "চুল রঙ করার সার্ভিস।" },
    ]
  },
  { id: "3", name: "Babu Restaurant", type: "shop", items: [
      { id: "f1", name: "Chicken Biryani", price: 180, desc: "মশলাদার চিকেন বিরিয়ানি।" },
      { id: "f2", name: "Paneer Butter Masala", price: 160, desc: "নরম পনির, মাখন ও মশলার সঙ্গে রান্না।" },
    ]
  },
  { id: "4", name: "Kamal Fish Stall", type: "shop", items: [
      { id: "kf1", name: "Rohu Fish (1kg)", price: 280, desc: "তাজা নদীর রুই মাছ।" },
      { id: "kf2", name: "Katla Fish (1kg)", price: 300, desc: "বড় সাইজের কাতলা মাছ।" },
      { id: "kf3", name: "Small Prawn (500g)", price: 250, desc: "গ্রামীণ পুকুরের ছোট চিংড়ি।" },
    ]
  },
  { id: "5", name: "Rina Tailors", type: "shop", items: [
      { id: "rt1", name: "Blouse Stitching", price: 200, desc: "মেয়েদের ব্লাউজ সেলাই সার্ভিস।" },
      { id: "rt2", name: "Petticoat Stitching", price: 150, desc: "কাস্টম মাপে পেটিকোট।" },
      { id: "rt3", name: "Kurta Alteration", price: 100, desc: "পুরুষদের কুর্তা কাটিং ও ঠিক করা হয়।" },
    ]
  },
  { id: "6", name: "Gopal Stationery", type: "shop", items: [
      { id: "gs1", name: "Notebook", price: 40, desc: "স্কুল-কলেজের জন্য ভালো মানের নোটবুক।" },
      { id: "gs2", name: "Blue Pen (Pack of 5)", price: 30, desc: "স্মুথ লিখনের পেন সেট।" },
      { id: "gs3", name: "Glue Bottle", price: 25, desc: "শিশুদের হস্তশিল্পের জন্য নিরাপদ গ্লু।" },
    ]
  },
  { id: "7", name: "Hari Cycle Repair", type: "shop", items: [
      { id: "hc1", name: "Tube Change", price: 60, desc: "সাইকেলের টিউব পরিবর্তন ও বাতাস দেওয়া।" },
      { id: "hc2", name: "Brake Cable", price: 40, desc: "সাইকেলের ব্রেকের তার।" },
      { id: "hc3", name: "Full Service", price: 150, desc: "সম্পূর্ণ সাইকেল চেকআপ ও মেরামত।" },
    ]
  },
  { id: "8", name: "Kali Mandir Flowers", type: "shop", items: [
      { id: "km1", name: "Lotus Flower", price: 20, desc: "পুজোর জন্য সতেজ পদ্মফুল।" },
      { id: "km2", name: "Garland", price: 50, desc: "তাজা ফুলের মালা।" },
      { id: "km3", name: "Incense Sticks (Packet)", price: 15, desc: "সুগন্ধি ধূপ, দৈনিক পূজার জন্য।" },
    ]
  },
  { id: "9", name: "Raju Tea Stall", type: "shop", items: [
      { id: "rt1", name: "Milk Tea", price: 10, desc: "তাজা দুধ ও চা পাতা দিয়ে তৈরি।" },
      { id: "rt2", name: "Lemon Tea", price: 8, desc: "লেবুর হালকা চা, রিফ্রেশিং।" },
      { id: "rt3", name: "Samosa", price: 10, desc: "গরম আলুর সামোসা।" },
    ]
  },
  { id: "10", name: "Bapi Mobile Center", type: "shop", items: [
      { id: "bm1", name: "Mobile Cover", price: 120, desc: "সব মডেলের জন্য স্টাইলিশ কভার।" },
      { id: "bm2", name: "Screen Guard", price: 50, desc: "স্মার্টফোন স্ক্রিন সুরক্ষা।" },
      { id: "bm3", name: "Charger Cable", price: 180, desc: "উচ্চমানের ডেটা কেবল।" },
    ]
  },
  // ==================== 11-20 ====================
  { id: "11", name: "Mina Beauty Parlor", type: "beauty", items: [
      { id: "mb1", name: "Bridal Makeup", price: 1500, desc: "বিয়ের জন্য বিশেষ মেকআপ সার্ভিস।" },
      { id: "mb2", name: "Facial", price: 300, desc: "ত্বক পরিষ্কার ও উজ্জ্বল করার ফেসিয়াল।" },
      { id: "mb3", name: "Hair Spa", price: 400, desc: "চুলের বিশেষ যত্নের সার্ভিস।" },
    ]
  },
  { id: "12", name: "Shyam Vegetable Shop", type: "shop", items: [
      { id: "sv1", name: "Potato (1kg)", price: 25, desc: "তাজা আলু, রান্নার জন্য উপযুক্ত।" },
      { id: "sv2", name: "Tomato (1kg)", price: 40, desc: "লাল টমেটো, তরকারি ও স্যালাডের জন্য।" },
      { id: "sv3", name: "Onion (1kg)", price: 30, desc: "মশলাদার পেঁয়াজ, প্রতিদিনের রান্নার জন্য।" },
    ]
  },
  { id: "13", name: "Gouranga Sweet House", type: "shop", items: [
      { id: "gs1", name: "Rasgulla (1pc)", price: 15, desc: "তাজা স্পঞ্জি রসগোল্লা।" },
      { id: "gs2", name: "Sandesh (1pc)", price: 12, desc: "সুগন্ধি ছানার সন্দেশ।" },
      { id: "gs3", name: "Gulab Jamun (1pc)", price: 18, desc: "মিষ্টি গোলাপ জামুন।" },
    ]
  },
  { id: "14", name: "Bhola Electrician", type: "service", items: [
      { id: "be1", name: "Switch Repair", price: 100, desc: "বৈদ্যুতিক সুইচ মেরামত।" },
      { id: "be2", name: "Fan Installation", price: 200, desc: "নতুন ফ্যান বসানো।" },
      { id: "be3", name: "Wiring Checkup", price: 300, desc: "পুরো ঘরের ওয়্যারিং চেকআপ।" },
    ]
  },
  { id: "15", name: "Laxmi Kirana Store", type: "shop", items: [
      { id: "lk1", name: "Wheat Flour 1kg", price: 45, desc: "শতভাগ বিশুদ্ধ আটার ময়দা।" },
      { id: "lk2", name: "Sugar 1kg", price: 42, desc: "পরিশোধিত চিনি।" },
      { id: "lk3", name: "Salt 1kg", price: 20, desc: "আয়োডিনযুক্ত লবণ।" },
    ]
  },
  { id: "16", name: "Nabin Hardware", type: "shop", items: [
      { id: "nh1", name: "Hammer", price: 150, desc: "শক্তিশালী ইস্পাতের হাতুড়ি।" },
      { id: "nh2", name: "Screwdriver Set", price: 120, desc: "বিভিন্ন সাইজের স্ক্রুড্রাইভার।" },
      { id: "nh3", name: "Nails (100pcs)", price: 50, desc: "বিভিন্ন কাজের জন্য পেরেক।" },
    ]
  },
  { id: "17", name: "Madhav Dairy", type: "shop", items: [
      { id: "md1", name: "Cow Milk 1L", price: 60, desc: "তাজা গরুর দুধ।" },
      { id: "md2", name: "Curd 500g", price: 40, desc: "টক দই, ঘরে তৈরি।" },
      { id: "md3", name: "Butter 200g", price: 80, desc: "তাজা মাখন।" },
    ]
  },
  { id: "18", name: "Sobha Boutique", type: "shop", items: [
      { id: "sb1", name: "Saree Blouse", price: 250, desc: "শাড়ির ব্লাউজ সেলাই।" },
      { id: "sb2", name: "Kurta Design", price: 400, desc: "ডিজাইনার কুর্তা সেলাই।" },
      { id: "sb3", name: "Dress Alteration", price: 80, desc: "যেকোনো ড্রেস ঠিক করা।" },
    ]
  },
  { id: "19", name: "Rohit Photo Studio", type: "service", items: [
      { id: "rp1", name: "Passport Photo", price: 50, desc: "পাসপোর্ট সাইজের ছবি।" },
      { id: "rp2", name: "Photo Printing", price: 15, desc: "ডিজিটাল ফটো প্রিন্ট।" },
      { id: "rp3", name: "Frame Making", price: 100, desc: "ছবির ফ্রেম তৈরি।" },
    ]
  },
  { id: "20", name: "Anil Pharmacy", type: "shop", items: [
      { id: "ap1", name: "Paracetamol", price: 10, desc: "জ্বর ও ব্যথার ওষুধ।" },
      { id: "ap2", name: "Bandage", price: 25, desc: "জখমের জন্য ব্যান্ডেজ।" },
      { id: "ap3", name: "Vitamins", price: 150, desc: "মাল্টিভিটামিন ট্যাবলেট।" },
    ]
  },
  // ==================== 21-30 ====================
  { id: "21", name: "Chandan Furniture", type: "shop", items: [
      { id: "cf1", name: "Wooden Chair", price: 800, desc: "শক্ত কাঠের চেয়ার।" },
      { id: "cf2", name: "Study Table", price: 1200, desc: "ছাত্রদের জন্য স্টাডি টেবিল।" },
      { id: "cf3", name: "Bookshelf", price: 1500, desc: "বই রাখার আলমারি।" },
    ]
  },
  { id: "22", name: "Puja Gift Center", type: "shop", items: [
      { id: "pg1", name: "Puja Thali", price: 200, desc: "পূজার থালি সেট।" },
      { id: "pg2", name: "Brass Lamp", price: 350, desc: "পিতলের প্রদীপ।" },
      { id: "pg3", name: "Incense Holder", price: 80, desc: "ধূপধুনি রাখার স্ট্যান্ড।" },
    ]
  },
  { id: "23", name: "Mohan Baker", type: "shop", items: [
      { id: "mb1", name: "Bread Loaf", price: 35, desc: "তাজা পাউরুটি।" },
      { id: "mb2", name: "Bun (4pcs)", price: 20, desc: "নরম বান।" },
      { id: "mb3", name: "Cake Slice", price: 25, desc: "স্পঞ্জ কেকের টুকরো।" },
    ]
  },
  { id: "24", name: "Sita Beauty Products", type: "shop", items: [
      { id: "sb1", name: "Aloe Vera Gel", price: 120, desc: "প্রাকৃতিক অ্যালোভেরা জেল।" },
      { id: "sb2", name: "Face Cream", price: 80, desc: "ত্বকের ক্রিম।" },
      { id: "sb3", name: "Hair Oil", price: 90, desc: "চুলের তেল, প্রাকৃতিক উপাদানে।" },
    ]
  },
  { id: "25", name: "Ramesh Mechanic", type: "service", items: [
      { id: "rm1", name: "Bike Service", price: 300, desc: "বাইকের সাধারণ সার্ভিস।" },
      { id: "rm2", name: "Oil Change", price: 150, desc: "ইঞ্জিন অয়েল পরিবর্তন।" },
      { id: "rm3", name: "Tyre Repair", price: 50, desc: "টায়ার পাঞ্চার মেরামত।" },
    ]
  },
  { id: "26", name: "Krishna Book Store", type: "shop", items: [
      { id: "kb1", name: "Story Book", price: 60, desc: "শিশুদের গল্পের বই।" },
      { id: "kb2", name: "Dictionary", price: 200, desc: "ইংরেজি-বাংলা ডিকশনারি।" },
      { id: "kb3", name: "Drawing Copy", price: 35, desc: "আঁকার খাতা।" },
    ]
  },
  { id: "27", name: "Bina Tailoring", type: "service", items: [
      { id: "bt1", name: "Shirt Stitching", price: 180, desc: "পুরুষদের শার্ট সেলাই।" },
      { id: "bt2", name: "Pant Stitching", price: 220, desc: "ফুল প্যান্ট সেলাই।" },
      { id: "bt3", name: "Kids Dress", price: 150, desc: "শিশুদের পোশাক সেলাই।" },
    ]
  },
  { id: "28", name: "Hari Farm Supplies", type: "shop", items: [
      { id: "hf1", name: "Seeds Packet", price: 40, desc: "বিভিন্ন সবজির বীজ।" },
      { id: "hf2", name: "Fertilizer 1kg", price: 60, desc: "জৈব সার।" },
      { id: "hf3", name: "Garden Tools", price: 200, desc: "বাগানের যন্ত্রপাতি।" },
    ]
  },
  { id: "29", name: "Mitali Jewelry", type: "shop", items: [
      { id: "mj1", name: "Silver Earrings", price: 500, desc: "রূপার ইয়াররিং।" },
      { id: "mj2", name: "Gold Chain", price: 2500, desc: "সোনার চেইন।" },
      { id: "mj3", name: "Bangles Set", price: 300, desc: "কাঁচের চুড়ি সেট।" },
    ]
  },
  { id: "30", name: "Sanjay Computer Repair", type: "service", items: [
      { id: "sc1", name: "PC Format", price: 200, desc: "কম্পিউটার ফরম্যাট ও সেটআপ।" },
      { id: "sc2", name: "Virus Removal", price: 150, desc: "ভাইরাস রিমুভাল সার্ভিস।" },
      { id: "sc3", name: "Software Installation", price: 100, desc: "সফটওয়্যার ইন্সটলেশন।" },
    ]
  },
  // ==================== 31-40 ====================
  { id: "31", name: "Laxman Poultry", type: "shop", items: [
      { id: "lp1", name: "Country Chicken", price: 200, desc: "দেশি মুরগি, তাজা।" },
      { id: "lp2", name: "Eggs (6pcs)", price: 36, desc: "তাজা ডিম।" },
      { id: "lp3", name: "Chicken Curry Cut", price: 180, desc: "মুরগি কারি কাট।" },
    ]
  },
  { id: "32", name: "Gita Boutique", type: "shop", items: [
      { id: "gb1", name: "Designer Saree", price: 800, desc: "ডিজাইনার শাড়ি।" },
      { id: "gb2", name: "Salwar Kameez", price: 600, desc: "সালোয়ার কামিজ সেট।" },
      { id: "gb3", name: "Kurti", price: 350, desc: "মেয়েদের কুর্তি।" },
    ]
  },
  { id: "33", name: "Babu Cement Store", type: "shop", items: [
      { id: "bc1", name: "Cement Bag", price: 350, desc: "উচ্চমানের সিমেন্ট।" },
      { id: "bc2", name: "Sand (1 truck)", price: 2000, desc: "নির্মাণ বালু।" },
      { id: "bc3", name: "Bricks (100pcs)", price: 800, desc: "লাল ইট।" },
    ]
  },
  { id: "34", name: "Mina Snacks Corner", type: "shop", items: [
      { id: "ms1", name: "Chowmein", price: 40, desc: "চাইনিজ চাউমিন।" },
      { id: "ms2", name: "Egg Roll", price: 30, desc: "ডিমের রোল।" },
      { id: "ms3", name: "Pakora", price: 20, desc: "মিক্সড পাকোরা।" },
    ]
  },
  { id: "35", name: "Rohit Sports", type: "shop", items: [
      { id: "rs1", name: "Cricket Bat", price: 500, desc: "উইলো কাঠের ব্যাট।" },
      { id: "rs2", name: "Football", price: 400, desc: "স্ট্যান্ডার্ড ফুটবল।" },
      { id: "rs3", name: "Badminton Set", price: 300, desc: "ব্যাডমিন্টন র্যাকেট ও শাটল।" },
    ]
  },
  { id: "36", name: "Suman Beauty Salon", type: "beauty", items: [
      { id: "ss1", name: "Hair Cut Ladies", price: 100, desc: "মহিলাদের চুল কাটা।" },
      { id: "ss2", name: "Facial Cleanup", price: 200, desc: "ফেসিয়াল ক্লিনআপ।" },
      { id: "ss3", name: "Threading", price: 50, desc: "চোখের ভ্রু থ্রেডিং।" },
    ]
  },
  { id: "37", name: "Kartik Electronics", type: "shop", items: [
      { id: "ke1", name: "LED Bulb", price: 80, desc: "এনার্জি সেভিং LED বাল্ব।" },
      { id: "ke2", name: "Extension Board", price: 250, desc: "বৈদ্যুতিক এক্সটেনশন বোর্ড।" },
      { id: "ke3", name: "Mobile Charger", price: 150, desc: "স্মার্টফোন চার্জার।" },
    ]
  },
  { id: "38", name: "Laxmi Fruits", type: "shop", items: [
      { id: "lf1", name: "Apple (1kg)", price: 120, desc: "তাজা আপেল।" },
      { id: "lf2", name: "Banana (1dozen)", price: 40, desc: "পাকা কলা।" },
      { id: "lf3", name: "Orange (1kg)", price: 80, desc: "মিষ্টি কমলা।" },
    ]
  },
  { id: "39", name: "Bhola Plumbing", type: "service", items: [
      { id: "bp1", name: "Tap Repair", price: 100, desc: "নলের মেরামত।" },
      { id: "bp2", name: "Pipe Installation", price: 200, desc: "নতুন পাইপ বসানো।" },
      { id: "bp3", name: "Water Tank Clean", price: 300, desc: "পানি ট্যাংক পরিষ্কার।" },
    ]
  },
  { id: "40", name: "Rina Handicrafts", type: "shop", items: [
      { id: "rh1", name: "Clay Pot", price: 150, desc: "হাতে তৈরি মাটির হাঁড়ি।" },
      { id: "rh2", name: "Bamboo Basket", price: 80, desc: "বাঁশের ঝুড়ি।" },
      { id: "rh3", name: "Jute Bag", price: 60, desc: "পাটের ব্যাগ।" },
    ]
  },
  // ==================== 41-50 ====================
  { id: "41", name: "Mohan Grocery", type: "shop", items: [
      { id: "mg1", name: "Cooking Oil 1L", price: 180, desc: "রান্নার তেল।" },
      { id: "mg2", name: "Spices Pack", price: 100, desc: "মশলার প্যাকেট।" },
      { id: "mg3", name: "Lentils 1kg", price: 110, desc: "বিভিন্ন ডাল।" },
    ]
  },
  { id: "42", name: "Sita Boutique", type: "shop", items: [
      { id: "sb1", name: "Embroidery Work", price: 300, desc: "হাতে করা এমব্রয়ডারি।" },
      { id: "sb2", name: "Zari Border", price: 150, desc: "জরির বর্ডার কাজ।" },
      { id: "sb3", name: "Design Stitching", price: 400, desc: "বিশেষ ডিজাইন সেলাই।" },
    ]
  },
  { id: "43", name: "Raju Electric Goods", type: "shop", items: [
      { id: "re1", name: "Electric Kettle", price: 600, desc: "বৈদ্যুতিক কেটলি।" },
      { id: "re2", name: "Mixer Grinder", price: 1200, desc: "মিক্সি গ্রাইন্ডার।" },
      { id: "re3", name: "Iron Box", price: 400, desc: "ইলেকট্রিক ইস্ত্রি।" },
    ]
  },
  { id: "44", name: "Kamal Hardware", type: "shop", items: [
      { id: "kh1", name: "Paint Brush", price: 40, desc: "রং করার ব্রাশ।" },
      { id: "kh2", name: "Wall Paint 1L", price: 250, desc: "দেয়াল রং।" },
      { id: "kh3", name: "Putty Knife", price: 60, desc: "পুটি করার ছুরি।" },
    ]
  },
  { id: "45", name: "Bina Beauty Care", type: "beauty", items: [
      { id: "bb1", name: "Manicure", price: 150, desc: "হাতের যত্ন।" },
      { id: "bb2", name: "Pedicure", price: 200, desc: "পায়ের যত্ন।" },
      { id: "bb3", name: "Waxing", price: 180, desc: "বডি ওয়্যাক্সিং।" },
    ]
  },
  { id: "46", name: "Hari Tea Stall", type: "shop", items: [
      { id: "ht1", name: "Special Tea", price: 12, desc: "বিশেষ চা।" },
      { id: "ht2", name: "Biscuit Packet", price: 10, desc: "বিস্কুট প্যাকেট।" },
      { id: "ht3", name: "Toast", price: 15, desc: "বাটার টোস্ট।" },
    ]
  },
  { id: "47", name: "Gopal Vegetable", type: "shop", items: [
      { id: "gv1", name: "Cabbage (1pc)", price: 25, desc: "তাজা বাঁধাকপি।" },
      { id: "gv2", name: "Cauliflower", price: 30, desc: "ফুলকপি।" },
      { id: "gv3", name: "Green Chili", price: 20, desc: "কাঁচা মরিচ।" },
    ]
  },
  { id: "48", name: "Madhav Sweets", type: "shop", items: [
      { id: "ms1", name: "Milk Cake", price: 200, desc: "দুধের কেক।" },
      { id: "ms2", name: "Jalebi (250g)", price: 80, desc: "তাজা জিলেপি।" },
      { id: "ms3", name: "Laddu (1pc)", price: 20, desc: "বেসনের লাড্ডু।" },
    ]
  },
  { id: "49", name: "Nabin Stationery", type: "shop", items: [
      { id: "ns1", name: "Geometry Box", price: 80, desc: "জ্যামিতি বক্স।" },
      { id: "ns2", name: "School Bag", price: 400, desc: "স্কুল ব্যাগ।" },
      { id: "ns3", name: "Water Bottle", price: 100, desc: "পানি রাখার বোতল।" },
    ]
  },
  { id: "50", name: "Sukesh Barber", type: "saloon", items: [
      { id: "sb1", name: "Hair Wash", price: 40, desc: "চুল ধোয়ার সার্ভিস।" },
      { id: "sb2", name: "Head Massage", price: 80, desc: "মাথার মালিশ।" },
      { id: "sb3", name: "Beard Trim", price: 30, desc: "দাড়ি কাটা।" },
    ]
  },
  // ==================== 51-60 ====================
  { id: "51", name: "Rohit Mobile Accessories", type: "shop", items: [
      { id: "rm1", name: "Earphones", price: 200, desc: "হেডফোন ও ইয়ারফোন।" },
      { id: "rm2", name: "Power Bank", price: 600, desc: "মোবাইল পাওয়ার ব্যাংক।" },
      { id: "rm3", name: "Selfie Stick", price: 150, desc: "সেলফি স্টিক।" },
    ]
  },
  { id: "52", name: "Mina Fashion", type: "shop", items: [
      { id: "mf1", name: "Designer Dupatta", price: 180, desc: "ডিজাইনার ওড়না।" },
      { id: "mf2", name: "Handbag", price: 300, desc: "মহিলাদের হ্যান্ডব্যাগ।" },
      { id: "mf3", name: "Scarf", price: 120, desc: "রঙিন স্কার্ফ।" },
    ]
  },
  { id: "53", name: "Babu Construction", type: "service", items: [
      { id: "bc1", name: "Room Painting", price: 2000, desc: "ঘর রং করার সার্ভিস।" },
      { id: "bc2", name: "Tiles Work", price: 1500, desc: "টাইলস বসানো।" },
      { id: "bc3", name: "Small Repair", price: 500, desc: "ছোট মেরামত কাজ।" },
    ]
  },
  { id: "54", name: "Laxmi Tailoring", type: "service", items: [
      { id: "lt1", name: "Blouse Design", price: 350, desc: "ব্লাউজের বিশেষ ডিজাইন।" },
      { id: "lt2", name: "Saree Fall", price: 100, desc: "শাড়িতে ফল বসানো।" },
      { id: "lt3", name: "Neck Design", price: 120, desc: "ব্লাউজের নেক ডিজাইন।" },
    ]
  },
  { id: "55", name: "Hari Snacks", type: "shop", items: [
      { id: "hs1", name: "Vegetable Puff", price: 15, desc: "ভেজিটেবল পাফ।" },
      { id: "hs2", name: "Chicken Puff", price: 20, desc: "চিকেন পাফ।" },
      { id: "hs3", name: "Cold Drink", price: 25, desc: "ঠান্ডা পানীয়।" },
    ]
  },
  { id: "56", name: "Gita Beauty Products", type: "shop", items: [
      { id: "gb1", name: "Lipstick", price: 120, desc: "দীর্ঘস্থায়ী লিপস্টিক।" },
      { id: "gb2", name: "Nail Polish", price: 60, desc: "রঙিন নেইল পলিশ।" },
      { id: "gb3", name: "Face Powder", price: 80, desc: "ফেস পাউডার।" },
    ]
  },
  { id: "57", name: "Ramesh Furniture", type: "shop", items: [
      { id: "rf1", name: "Wooden Bed", price: 5000, desc: "কাঠের খাট।" },
      { id: "rf2", name: "Dining Table", price: 3500, desc: "ডাইনিং টেবিল সেট।" },
      { id: "rf3", name: "Sofa Set", price: 8000, desc: "৩ সিটের সোফা সেট।" },
    ]
  },
  { id: "58", name: "Suman Pharmacy", type: "shop", items: [
      { id: "sp1", name: "Cough Syrup", price: 85, desc: "কাশির সিরাপ।" },
      { id: "sp2", name: "Antiseptic Cream", price: 45, desc: "জীবাণুনাশক ক্রিম।" },
      { id: "sp3", name: "Digestion Tablet", price: 30, desc: "হজমের ওষুধ।" },
    ]
  },
  { id: "59", name: "Kartik Gift Shop", type: "shop", items: [
      { id: "kg1", name: "Birthday Card", price: 50, desc: "বার্থডে কার্ড।" },
      { id: "kg2", name: "Photo Frame", price: 100, desc: "ছবির ফ্রেম।" },
      { id: "kg3", name: "Soft Toy", price: 150, desc: "নরম খেলনা।" },
    ]
  },
  { id: "60", name: "Bina Catering", type: "service", items: [
      { id: "bc1", name: "Party Food", price: 1500, desc: "পার্টির খাবার।" },
      { id: "bc2", name: "Wedding Catering", price: 5000, desc: "বিয়ের ক্যাটারিং।" },
      { id: "bc3", name: "Small Event", price: 2500, desc: "ছোট অনুষ্ঠানের খাবার।" },
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