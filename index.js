const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection (Simple - no database required for now)
let users = []; // In-memory storage for users (temporary)

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'haatbazar_super_secret_key_2024';

// ✅ Authentication Routes

// User Registration
app.post("/api/register", async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    // Validation
    if (!name || !phone || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'দয়া করে সব ফিল্ড পূরণ করুন' 
      });
    }

    if (phone.length !== 10) {
      return res.status(400).json({
        success: false, 
        message: 'ফোন নম্বর ১০ ডিজিট হতে হবে'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'পাসওয়ার্ড অন্তত ৬ ক্যারেক্টার হতে হবে'
      });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.phone === phone);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'এই ফোন নম্বর দিয়ে ইতিমধ্যেই রেজিস্ট্রেশন করা আছে'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: Date.now().toString(),
      name,
      phone,
      password: hashedPassword,
      walletBalance: 500,
      addresses: [],
      createdAt: new Date()
    };

    users.push(user);

    // Generate token
    const token = jwt.sign(
      { userId: user.id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      message: 'রেজিস্ট্রেশন সফল হয়েছে!',
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        walletBalance: user.walletBalance,
        addresses: user.addresses
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'সার্ভার সমস্যা, পরে চেষ্টা করুন'
    });
  }
});

// User Login
app.post("/api/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Validation
    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'ফোন নম্বর এবং পাসওয়ার্ড দিন'
      });
    }

    // Find user
    const user = users.find(user => user.phone === phone);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'এই ফোন নম্বর দিয়ে কোনো একাউন্ট নেই'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'পাসওয়ার্ড ভুল হয়েছে'
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      message: 'লগইন সফল!',
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        walletBalance: user.walletBalance,
        addresses: user.addresses
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'সার্ভার সমস্যা, পরে চেষ্টা করুন'
    });
  }
});

// Get User Profile
app.get("/api/profile", async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'অনুগ্রহ করে লগইন করুন'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(user => user.id === decoded.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'ইউজার পাওয়া যায়নি'
      });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    res.json({
      success: true,
      user: userWithoutPassword
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'ইনভ্যালিড টোকেন'
    });
  }
});

// Add User Address
app.post("/api/address", async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'অনুগ্রহ করে লগইন করুন'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(user => user.id === decoded.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'ইউজার পাওয়া যায়নি'
      });
    }

    const { name, phone, address, localAddress, city, state, zipCode, country } = req.body;

    if (!name || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: 'দয়া করে নাম, ফোন এবং ঠিকানা পূরণ করুন'
      });
    }

    const newAddress = {
      id: Date.now().toString(),
      name,
      phone,
      address,
      localAddress: localAddress || '',
      city: city || 'Canning',
      state: state || 'West Bengal',
      zipCode: zipCode || '',
      country: country || 'India'
    };

    user.addresses.push(newAddress);

    res.json({
      success: true,
      message: 'ঠিকানা যোগ করা হয়েছে',
      address: newAddress
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'সার্ভার সমস্যা'
    });
  }
});

// ✅ All Shops with Bengali descriptions (Your existing shops data)
const shops = [
  { 
    id: "1", 
    name: "Online Hub", 
    type: "Online Hub", 
    phone: "7872619407",
    owner: "প্রণয় মন্ডল",
    items: []
  },
  { 
    id: "2", 
    name: "I&B Fish Center", 
    type: "shop", 
    items: [
      { id: "f1", name: "রুই মাছ (১ কেজি)", price: 280, desc: "তাজা নদীর রুই মাছ, রান্নার জন্য উপযুক্ত।" },
      { id: "f2", name: "কাতলা মাছ (১ কেজি)", price: 300, desc: "বড় সাইজের কাতলা মাছ, বিশেষ অনুষ্ঠানের জন্য।" },
      { id: "f3", name: "ইলিশ মাছ (১ কেজি)", price: 600, desc: "সিজনাল ইলিশ মাছ, বাঙালির প্রিয় মাছ।" },
      { id: "f4", name: "চিংড়ি মাছ (৫০০ গ্রাম)", price: 250, desc: "তাজা চিংড়ি মাছ, ভাজি ও কারির জন্য।" },
      { id: "f5", name: "পাঙ্গাস মাছ (১ কেজি)", price: 180, desc: "ফার্মের পাঙ্গাস মাছ, কম কাঁটা।" },
      { id: "f6", name: "ট্যাংরা মাছ (২৫০ গ্রাম)", price: 120, desc: "ছোট ট্যাংরা মাছ, ভাজার জন্য উপযুক্ত।" },
      { id: "f7", name: "চিংড়ি বড়া (৪টি)", price: 80, desc: "তাজা চিংড়ির বড়া, স্ন্যাক্স হিসেবে।" },
      { id: "f8", name: "মাছের কাটা টুকরো (৫০০ গ্রাম)", price: 150, desc: "মাছের কাটা টুকরো, সরাসরি রান্নার জন্য।" },
      { id: "f9", name: "কাঁকড়া (৪টি)", price: 200, desc: "তাজা কাঁকড়া, ঝাল রান্নার জন্য।" },
      { id: "f10", name: "শোল মাছ (১ কেজি)", price: 320, desc: "শোল মাছ, স্বাদের জন্য বিখ্যাত।" }
    ]
  },
  // ... (আপনার existing shops data exactly as you have it)
  // আমি shops data টি unchanged রাখছি কারণ আপনি ইতিমধ্যেই সেটা দিয়েছেন
  { 
    id: "3", 
    name: "ঊষা স্টোর", 
    type: "shop", 
    items: [
      { id: "u1", name: "বাসমতি চাল (৫ কেজি)", price: 300, desc: "উচ্চ মানের বাসমতি চাল, দৈনন্দিন রান্নার জন্য।" },
      { id: "u2", name: "সরিষার তেল (১ লিটার)", price: 160, desc: "শুদ্ধ সরিষার তেল, রান্না ও ভাজার জন্য।" },
      { id: "u3", name: "ডাল (১ কেজি)", price: 100, desc: "বিভিন্ন ধরনের ডাল, প্রোটিন সমৃদ্ধ।" },
      { id: "u4", name: "আটা (২ কেজি)", price: 80, desc: "তাজা গমের আটা, রুটি ও পরোটার জন্য।" },
      { id: "u5", name: "চিনি (১ কেজি)", price: 45, desc: "পরিশোধিত সাদা চিনি, চা ও মিষ্টির জন্য।" },
      { id: "u6", name: "লবণ (১ কেজি)", price: 20, desc: "আয়োডিনযুক্ত লবণ, রান্নার জন্য প্রয়োজনীয়।" },
      { id: "u7", name: "হলুদ গুঁড়া (১০০ গ্রাম)", price: 30, desc: "প্রাকৃতিক হলুদ গুঁড়া, রান্নায় রং ও স্বাদের জন্য।" },
      { id: "u8", name: "লাল মরিচ গুঁড়া (১০০ গ্রাম)", price: 35, desc: "তীক্ষ্ণ লাল মরিচ গুঁড়া, ঝাল স্বাদের জন্য।" },
      { id: "u9", name: "জিরা (১০০ গ্রাম)", price: 25, desc: "সুগন্ধি জিরা, তরকারিতে স্বাদ বৃদ্ধির জন্য।" },
      { id: "u10", name: "চা পাতা (২৫০ গ্রাম)", price: 85, desc: "উচ্চ মানের চা পাতা, সকালের সতেজতার জন্য।" }
    ]
  },
  { 
    id: "4", 
    name: "Light House", 
    type: "shop", 
    items: [
      { id: "l1", name: "LED বাল্ব (৯ ওয়াট)", price: 85, desc: "এনার্জি সেভিং LED বাল্ব, লম্বা সময় চলে।" },
      { id: "l2", name: "সিলিং ফ্যান", price: 1200, desc: "হাই স্পিড সিলিং ফ্যান, গ্রীষ্মের জন্য উপযুক্ত।" },
      { id: "l3", name: "টিউব লাইট (২০ ওয়াট)", price: 120, desc: "ব্রাইট টিউব লাইট, ঘর আলোকিত করার জন্য。" },
      { id: "l4", name: "এক্সটেনশন বোর্ড", price: 150, desc: "৩ প্লাগ পয়েন্ট এক্সটেনশন বোর্ড, নিরাপদ。" },
      { id: "l5", name: "ইলেকট্রিক তার (রোল)", price: 180, desc: "উচ্চ মানের ইলেকট্রিক তার, বৈদ্যুতিক কাজের জন্য。" },
      { id: "l6", name: "সুইচ সকেট", price: 35, desc: "ভালো ব্র্যান্ডের সুইচ সকেট, দীর্ঘস্থায়ী。" },
      { id: "l7", name: "টেবিল ফ্যান", price: 650, desc: "পার্সোনাল টেবিল ফ্যান, ছোট জায়গার জন্য。" },
      { id: "l8", name: "বৈদ্যুতিক প্লাগ", price: 25, desc: "সাধারণ বৈদ্যুতিক প্লাগ, সব ধরনের ডিভাইসের জন্য。" },
      { id: "l9", name: "এডাপ্টার", price: 95, desc: "মোবাইল চার্জিং এডাপ্টার, ফাস্ট চার্জিং。" },
      { id: "l10", name: "ইমারজেন্সি লাইট", price: 450, desc: "রিচার্জেবল ইমারজেন্সি লাইট, বিদ্যুৎ চলে গেলে。" }
    ]
  },
  { 
    id: "5", 
    name: "নিউ রেখার ড্রেস", 
    type: "shop", 
    items: [
      { id: "n1", name: "বাচ্চাদের টি-শার্ট", price: 150, desc: "কটন বাচ্চাদের টি-শার্ট, নরম ও আরামদায়ক。" },
      { id: "n2", name: "মেয়েদের সালোয়ার কামিজ", price: 500, desc: "ডিজাইনার সালোয়ার কামিজ, পার্টির জন্য উপযুক্ত。" },
      { id: "n3", name: "ছেলেদের জিন্স", price: 400, desc: "ডেনিম জিন্স, ট্রেন্ডি ও স্টাইলিশ。" },
      { id: "n4", name: "শাড়ি ব্লাউজ", price: 300, desc: "সুতি শাড়ি ব্লাউজ,传统 পোশাক。" },
      { id: "n5", name: "বাচ্চাদের ফ্রক", price: 250, desc: "সুন্দর বাচ্চাদের ফ্রক, বিশেষ অনুষ্ঠানের জন্য。" },
      { id: "n6", name: "পুরুষদের শার্ট", price: 350, desc: "ফর্মাল শার্ট, অফিস ও অনুষ্ঠানের জন্য。" },
      { id: "n7", name: "মেয়েদের ওয়ান পিস", price: 280, desc: "গার্লস ওয়ান পিস ড্রেস, স্কুল ও পার্টির জন্য。" },
      { id: "n8", name: "ছেলেদের ট্রাউজার", price: 320, desc: "ফর্মাল ট্রাউজার, শার্টের সাথে মেলে。" },
      { id: "n9", name: "বাচ্চাদের ট্র্যাকস্যুট", price: 220, desc: "স্পোর্টস ট্র্যাকস্যুট, খেলাধুলার জন্য。" },
      { id: "n10", name: "মেয়েদের লেহেঙ্গা", price: 800, desc: "ডিজাইনার লেহেঙ্গা, বিবাহ ও বিশেষ অনুষ্ঠানের জন্য。" }
    ]
  },
  { 
    id: "6", 
    name: "মামনি সু হাউস", 
    type: "shop", 
    items: [
      { id: "m1", name: "বাচ্চাদের স্যান্ডেল", price: 120, desc: "রাবার স্যান্ডেল, বাচ্চাদের জন্য আরামদায়ক。" },
      { id: "m2", name: "পুরুষদের স্পোর্টস শু", price: 450, desc: "স্পোর্টস শু, জগিং ও খেলাধুলার জন্য。" },
      { id: "m3", name: "মেয়েদের হিল", price: 380, desc: "ফ্যাশনেবল হিল, পার্টি ও অনুষ্ঠানের জন্য。" },
      { id: "m4", name: "স্কুল শু", price: 280, desc: "বাচ্চাদের স্কুল শু, দিনভর পরার জন্য উপযুক্ত。" },
      { id: "m5", name: "স্যান্ডেল (পুরুষ)", price: 220, desc: "কজুয়াল স্যান্ডেল, দৈনন্দিন ব্যবহারের জন্য。" },
      { id: "m6", name: "বুট (মহিলা)", price: 520, desc: "উইন্টার বুট, শীতকালের জন্য উষ্ণ。" },
      { id: "m7", name: "স্লিপার", price: 80, desc: "হোম স্লিপার, ঘরের ভিতর পরার জন্য。" },
      { id: "m8", name: "কজুয়াল শু (মহিলা)", price: 320, desc: "কজুয়াল শু,购物的 জন্য আরামদায়ক。" },
      { id: "m9", name: "ফর্মাল শু (পুরুষ)", price: 480, desc: "ফর্মাল শু, অফিস ও অনুষ্ঠানের জন্য。" },
      { id: "m10", name: "রেইন শু", price: 180, desc: "ওয়াটারপ্রুফ রেইন শু, বর্ষার জন্য。" }
    ]
  },
  { 
    id: "7", 
    name: "মন্ডল ইলেকট্রনিক্স", 
    type: "shop", 
    items: [
      { id: "mo1", name: "এয়ার কুলার", price: 2800, desc: "টাওয়ার এয়ার কুলার, গ্রীষ্মের জন্য শীতলতা。" },
      { id: "mo2", name: "ব্লুটুথ স্পিকার", price: 650, desc: "পোর্টেবল ব্লুটুথ স্পিকার, হাই কুয়ালিটি সাউন্ড。" },
      { id: "mo3", name: "হোম থিয়েটার সিস্টেম", price: 3500, desc: "৫.১ চ্যানেল হোম থিয়েটার, সিনেমা অভিজ্ঞতা。" },
      { id: "mo4", name: "এয়ারটেল সিম", price: 50, desc: "নতুন এয়ারটেল সিম, সঙ্গে ফ্রি টকটাইম。" },
      { id: "mo5", name: "মোবাইল চার্জার", price: 120, desc: "ফাস্ট চার্জিং মোবাইল চার্জার, সব মোবাইলের জন্য。" },
      { id: "mo6", name: "পাওয়ার ব্যাংক", price: 650, desc: "১০০০০mAh পাওয়ার ব্যাংক, লং লাস্টিং。" },
      { id: "mo7", name: "হেডফোন", price: 350, desc: "নয়েস ক্যানসেলিং হেডফোন, ক্লিয়ার সাউন্ড。" },
      { id: "mo8", name: "স্মার্টওয়াচ", price: 1200, desc: "ফিচার রিচ স্মার্টওয়াচ, হেলথ মনিটরিং。" },
      { id: "mo9", name: "ট্যাব", price: 4500, desc: "Android ট্যাব, এন্টারটেইনমেন্ট ও স্টাডির জন্য。" },
      { id: "mo10", name: "রাউটার", price: 950, desc: "হাই-স্পিড রাউটার, uninterrupted ইন্টারনেট。" }
    ]
  },
  { 
    id: "8", 
    name: "অর্পিতা বস্ত্রালয়", 
    type: "shop", 
    items: [
      { id: "a1", name: "বাচ্চাদের পাজামা", price: 120, desc: "সুতি বাচ্চাদের পাজামা, ঘুমের জন্য আরামদায়ক。" },
      { id: "a2", name: "মেয়েদের কুর্তা", price: 280, desc: "এমব্রয়ডারি কুর্তা, traditional look。" },
      { id: "a3", name: "ছেলেদের টি-শар্ট", price: 180, desc: "কটন টি-শার্ট, দৈনন্দিন ব্যবহারের জন্য。" },
      { id: "a4", name: "বাচ্চাদের জ্যাকেট", price: 220, desc: "উইন্টার জ্যাকেট, শীতকালের জন্য উষ্ণ。" },
      { id: "a5", name: "মেয়েদের স্কার্ট", price: 250, desc: "ডিজাইনার স্কার্ট, কলেজ ও পার্টির জন্য。" },
      { id: "a6", name: "পুরুষদের প্যান্ট", price: 320, desc: "ফর্মাল প্যান্ট, অফিস ও অনুষ্ঠানের জন্য。" },
      { id: "a7", name: "বাচ্চাদের সোয়েটার", price: 150, desc: "উলেন সোয়েটার, শীতের জন্য নরম ও উষ্ণ。" },
      { id: "a8", name: "মেয়েদের টপ", price: 130, desc: "কজুয়াল টপ, জিন্সের সাথে পারফেক্ট。" },
      { id: "a9", name: "ছেলেদের হুডি", price: 280, desc: "ট্রেন্ডি হুডি, তরুণদের জন্য স্টাইলিশ。" },
      { id: "a10", name: "বাচ্চাদের ড্রেস সেট", price: 350, desc: "ম্যাচিং ড্রেস সেট, বিশেষ অনুষ্ঠানের জন্য。" }
    ]
  },
  { 
    id: "9", 
    name: "মাতৃ সুইটস", 
    type: "shop", 
    items: [
      { id: "ma1", name: "রসগোল্লা (৬টি)", price: 80, desc: "তাজা রসগোল্লা, স্পঞ্জি ও মিষ্টি。" },
      { id: "ma2", name: "সন্দেশ (৮টি)", price: 75, desc: "সুদেশ, দুধের মিষ্টি, traditional স্বাদ。" },
      { id: "ma3", name: "রসমালাই", price: 95, desc: "রসমালাই, মালাই দিয়ে তৈরি, rich স্বাদ。" },
      { id: "ma4", name: "গুলাব জামুন (৬টি)", price: 70, desc: "গুলাব জামুন, সিরাপে ভেজানো, নরম。" },
      { id: "ma5", name: "চমচম (৬টি)", price: 85, desc: "চমচম, লম্বা মিষ্টি, বিশেষ স্বাদ。" },
      { id: "ma6", name: "কালাকান্ড", price: 110, desc: "কালাকান্ড, দুধের কাটা মিষ্টি, creamy。" },
      { id: "ma7", name: "পান্তুয়া (৬টি)", price: 75, desc: "পান্তুয়া, বাঙালি মিষ্টি, deep fried。" },
      { id: "ma8", name: "লেডিকেনি", price: 90, desc: "লেডিকেনি, ঐতিহ্যবাহী মিষ্টি, royal স্বাদ。" },
      { id: "ma9", name: "মিহিদানা", price: 65, desc: "মিহিদানা, ছোট মিষ্টি দানা, crunchy。" },
      { id: "ma10", name: "সীতাভোগ", price: 70, desc: "সীতাভোগ, চালের গুঁড়ার মিষ্টি, soft。" }
    ]
  },
  { 
    id: "10", 
    name: "ধুম এন্টারপ্রাইজ", 
    type: "shop", 
    items: [
      { id: "d1", name: "চাল (৫ কেজি)", price: 280, desc: "সুবিধামূলক দামে চাল, পাইকারি মূল্য。" },
      { id: "d2", name: "ডাল (১ কেজি)", price: 95, desc: "বিভিন্ন ধরনের ডাল, সুলভ মূল্যে。" },
      { id: "d3", name: "তেল (১ লিটার)", price: 170, desc: "রান্নার তেল, পাইকারি মূল্যে。" },
      { id: "d4", name: "মসলা প্যাকেট", price: 50, desc: "বিভিন্ন মসলার প্যাকেট, রান্নার জন্য。" },
      { id: "d5", name: "সাবান (৪টি)", price: 80, desc: "সুগন্ধি সাবান, ব্যক্তিগত পরিচ্ছন্নতার জন্য。" },
      { id: "d6", name: "টুথপেস্ট", price: 45, desc: "টুথপেস্ট, দাঁতের যত্নের জন্য。" },
      { id: "d7", name: "শ্যাম্পু (১০০ml)", price: 40, desc: "হেয়ার শ্যাম্পু, চুল পরিষ্কারের জন্য。" },
      { id: "d8", name: "বিস্কুট প্যাকেট", price: 30, desc: "বিভিন্ন ধরনের বিস্কুট, স্ন্যাক্স হিসেবে。" },
      { id: "d9", name: "চা পাতা (২৫০ গ্রাম)", price: 80, desc: "উচ্চ মানের চা পাতা, সুলভ মূল্যে。" },
      { id: "d10", name: "সরিষার তেল (১ লিটার)", price: 155, desc: "শুদ্ধ সরিষার তেল, পাইকারি মূল্যে。" }
    ]
  },
  { 
    id: "11", 
    name: "শ্রীকৃষ্ণ ইমিটেশন এন্ড গিফট হাউস", 
    type: "shop", 
    items: [
      { id: "s1", name: "মেয়েদের নেকলেস", price: 120, desc: "ইমিটেশন নেকলেস, পার্টি ও অনুষ্ঠানের জন্য。" },
      { id: "s2", name: "বাচ্চাদের খেলনা", price: 85, desc: "বিভিন্ন ধরনের খেলনা, বাচ্চাদের জন্য。" },
      { id: "s3", name: "গিফট বক্স", price: 150, desc: "সুন্দর গিফট বক্স, বিশেষ উপহারের জন্য。" },
      { id: "s4", name: "ছাতা", price: 180, desc: "রেইন ছাতা, বর্ষা ও রোদের জন্য。" },
      { id: "s5", name: "মেয়েদের ইয়াররিং", price: 65, desc: "ইমিটেশন ইয়াররিং, ফ্যাশনের জন্য。" },
      { id: "s6", name: "ব্যাকপ্যাক", price: 280, desc: "স্কুল ও কলেজ ব্যাকপ্যাক, আরামদায়ক。" },
      { id: "s7", name: "ফটো ফ্রেম", price: 45, desc: "ডেকোরেটিভ ফটো ফ্রেম, স্মৃতির জন্য。" },
      { id: "s8", name: "বাচ্চাদের জুতো", price: 120, desc: "রঙিন বাচ্চাদের জুতো, আরামদায়ক。" },
      { id: "s9", name: "সেন্ট বক্স", price: 95, desc: "সুগন্ধি সেন্ট বক্স, ঘর সাজানোর জন্য。" },
      { id: "s10", name: "মেয়েদের ব্রেসলেট", price: 55, desc: "ইমিটেশন ব্রেসলেট, হ্যান্ড জুয়েলারি。" }
    ]
  },
  { 
    id: "12", 
    name: "বিশ্বাস ভান্ডার", 
    type: "shop", 
    items: [
      { id: "b1", name: "গমের আটা (২ কেজি)", price: 75, desc: "তাজা গমের আটা, রুটি ও পরোটার জন্য。" },
      { id: "b2", name: "সুজি (১ কেজি)", price: 50, desc: "সুজি, হালভা ও উপমার জন্য。" },
      { id: "b3", name: "বেসন (৫০০ গ্রাম)", price: 60, desc: "বেসনের গুঁড়া, বিভিন্ন পদ তৈরি。" },
      { id: "b4", name: "পোহা (৫০০ গ্রাম)", price: 40, desc: "পোহা, সকালের নাস্তার জন্য。" },
      { id: "b5", name: "সেমাই (৫০০ গ্রাম)", price: 55, desc: "সেমাই, মিষ্টি ও নোনতা উভয়ভাবেই রান্না করা যায়。" },
      { id: "b6", name: "ময়দা (১ কেজি)", price: 45, desc: "ময়দা, পিঠা ও baked জিনিসের জন্য。" },
      { id: "b7", name: "ডালডা (১ কেজি)", price: 120, desc: "ভ্যানাস্পতি ডালডা, রান্নার জন্য。" },
      { id: "b8", name: "সয়া bean (৫০০ গ্রাম)", price: 85, desc: "সয়া bean, healthy protein source。" },
      { id: "b9", name: "বাদাম (২৫০ গ্রাম)", price: 180, desc: "কাজু বাদাম, healthy snack。" },
      { id: "b10", name: "কিসমিস (২৫০ গ্রাম)", price: 90, desc: "কিসমিস, dried grapes, cooking ও snacking এর জন্য。" }
    ]
  },
  { 
    id: "13", 
    name: "আরাধ্যা সু হাউস", 
    type: "shop", 
    items: [
      { id: "ar1", name: "বাচ্চাদের স্কুল শু", price: 250, desc: "কমফোর্টেবল স্কুল শু, বাচ্চাদের জন্য。" },
      { id: "ar2", name: "পুরুষদের ফর্মাল শু", price: 450, desc: "লেদার ফর্মাল শু, অফিসের জন্য。" },
      { id: "ar3", name: "মেয়েদের স্যান্ডেল", price: 180, desc: "ফ্যাশনেবল স্যান্ডেল, casual look。" },
      { id: "ar4", name: "স্পোর্টস শু (পুরুষ)", price: 420, desc: "স্পোর্টস শু, exercise ও jogging এর জন্য。" },
      { id: "ar5", name: "বাচ্চাদের রেইন বুট", price: 150, desc: "ওয়াটারপ্রুফ রেইন বুট, বর্ষার জন্য。" },
      { id: "ar6", name: "মেয়েদের হিল", price: 350, desc: "হাই হিল, পার্টি ও অনুষ্ঠানের জন্য。" },
      { id: "ar7", name: "পুরুষদের কজুয়াল শু", price: 280, desc: "কজুয়াল শু, দৈনন্দিন ব্যবহারের জন্য。" },
      { id: "ar8", name: "বাচ্চাদের ফ্যান্সি শু", price: 200, desc: "রঙিন ফ্যান্সি শু, বাচ্চাদের পছন্দ。" },
      { id: "ar9", name: "মেয়েদের ফ্ল্যাট", price: 220, desc: "কমফোর্টেবল ফ্ল্যাট, লং ওয়াকের জন্য。" },
      { id: "ar10", name: "পুরুষদের বুট", price: 520, desc: "উইন্টার বুট, শীতকালের জন্য。" }
    ]
  },
  { 
    id: "14", 
    name: "লক্ষ্মী টেইলার", 
    type: "shop", 
    items: [
      { id: "la1", name: "শার্ট সেলাই", price: 250, desc: "পুরুষদের ফুল শার্ট সেলাই, custom measurement。" },
      { id: "la2", name: "প্যান্ট সেলাই", price: 300, desc: "পুরুষদের প্যান্ট সেলাই, perfect fit。" },
      { id: "la3", name: "কুর্তা সেলাই", price: 200, desc: "পুরুষদের কুর্তা সেলাই, traditional look。" },
      { id: "la4", name: "শার্ট alteration", price: 100, desc: "শার্ট alteration, size correction。" },
      { id: "la5", name: "প্যান্ট alteration", price: 80, desc: "প্যান্ট alteration, length adjustment。" },
      { id: "la6", name: "ব্লাউজ সেলাই", price: 180, desc: "মেয়েদের ব্লাউজ সেলাই, custom design。" },
      { id: "la7", name: "সেলাই থ্রেড", price: 15, desc: "সেলাই থ্রেড, বিভিন্ন colors。" },
      { id: "la8", name: "বাটন প্যাক", price: 12, desc: "বিভিন্ন ধরনের বাটন, সেলাই কাজের জন্য。" },
      { id: "la9", name: "জিপার", price: 15, desc: "জিপার, different sizes ও colors。" },
      { id: "la10", name: "সেলাই সুই", price: 8, desc: "সেলাই সুই, different sizes。" }
    ]
  },
  { 
    id: "15", 
    name: "বাবুজি রেস্টুরেন্ট", 
    type: "shop", 
    items: [
      { id: "ba1", name: "চিকেন বিরিয়ানি", price: 180, desc: "মশলাদার চিকেন বিরিয়ানি, aromatic rice。" },
      { id: "ba2", name: "এগ রোল", price: 25, desc: "এগ রোল, তাজা vegetables সহ, quick snack。" },
      { id: "ba3", name: "চিকেন চপ", price: 40, desc: "ক্রিস্পি চিকেন চপ, spicy filling সহ。" },
      { id: "ba4", name: "চাওমিন (ফুল প্লেট)", price: 70, desc: "চাইনিজ চাওমিন, vegetables সহ。" },
      { id: "ba5", name: "চাওমিন (হাফ প্লেট)", price: 50, desc: "হাফ প্লেট চাওমিন, light meal。" },
      { id: "ba6", name: "এগ চাওমিন (হাফ প্লেট)", price: 30, desc: "এগ দিয়ে বানানো চাওমিন, হাফ প্লেট。" },
      { id: "ba7", name: "চিংড়ি চপ", price: 45, desc: "চিংড়ি চপ, seafood lovers এর জন্য。" },
      { id: "ba8", name: "চিকেন হাফ প্লেট", price: 90, desc: "চিকেন হাফ প্লেট, with rice বা roti。" },
      { id: "ba9", name: "ভেজ থালি", price: 120, desc: "সম্পূর্ণ vegetarian থালি, ডাল, ভাত, সবজি, সালাদ সহ。" },
      { id: "ba10", name: "চিকেন কারি", price: 140, desc: "মশলাদার চিকেন কারি, ভাত বা রুটির সাথে。" }
    ]
  },
{
  id: "16",
  name: "Sakaru Imitation House",
  type: "shop",
  items: [
    { id: "i1", name: "মেয়েদের গোল্ড প্লেটেড চুড়ি", price: 180, desc: "উচ্চমানের গোল্ড প্লেটেড চুড়ি।" },
    { id: "i2", name: "স্টোন বালা", price: 220, desc: "রঙিন স্টোনের বালা সেট।" },
    { id: "i3", name: "টিপ প্যাক (৫০ পিস)", price: 50, desc: "বিভিন্ন ডিজাইনের টিপ প্যাক।" },
    { id: "i4", name: "নাকের নথ (ইমিটেশন)", price: 40, desc: "ছোট নথ, প্রতিদিন ব্যবহারের জন্য।" },
    { id: "i5", name: "চেইন সেট (মেটাল)", price: 150, desc: "স্টাইলিশ মেটাল চেইন সেট।" },
    { id: "i6", name: "কানের দুল (স্টোন)", price: 60, desc: "স্টোন কানের দুল, লাইটওয়েট।" },
    { id: "i7", name: "হাতের बाजুবন্দ", price: 240, desc: "মেটালিক ডিজাইনের বাজুবন্দ।" },
    { id: "i8", name: "ম্যাঙ্গলসূত্র", price: 90, desc: "বিয়ের ও দৈনিক ব্যবহারের উপযোগী।" },
    { id: "i9", name: "বিড়ি নেকলেস", price: 110, desc: "ট্র্যাডিশনাল বিড়ি নেকলেস।" },
    { id: "i10", name: "চুড়ির সেট (১০ পিস)", price: 130, desc: "রঙিন চুড়ির কম্বো সেট।" }
  ]
},
{
  id: "17",
  name: "New Style Garments",
  type: "shop",
  items: [
    { id: "g1", name: "টি-শার্ট (পুরুষ)", price: 250, desc: "১০০% কটন টি-শার্ট।" },
    { id: "g2", name: "টপস (মহিলা)", price: 280, desc: "ফ্রি সাইজ স্টাইলিশ টপস।" },
    { id: "g3", name: "শার্ট (পুরুষ)", price: 450, desc: "প্রিমিয়াম কোয়ালিটির শার্ট।" },
    { id: "g4", name: "লেগিংস", price: 180, desc: "স্ট্রেচেবল এবং আরামদায়ক।" },
    { id: "g5", name: "জিন্স প্যান্ট", price: 750, desc: "ডেনিম কোয়ালিটি এক্সপোর্ট।" },
    { id: "g6", name: "শাড়ি", price: 650, desc: "কটন প্রিন্টেড শাড়ি।" },
    { id: "g7", name: "বেবি ড্রেস", price: 220, desc: "সফ্ট ফেব্রিক, বাচ্চাদের জন্য।" },
    { id: "g8", name: "নাইট ড্রেস", price: 300, desc: "আরামদায়ক নাইট ড্রেস।" },
    { id: "g9", name: "হাফ প্যান্ট", price: 150, desc: "দৈনিক ব্যবহারের জন্য উপযোগী।" },
    { id: "g10", name: "স্কার্ফ", price: 120, desc: "মহিলাদের স্টাইলিশ স্কার্ফ।" }
  ]
},
{
  id: "18",
  name: "Fresh Meat Point",
  type: "shop",
  items: [
    { id: "m1", name: "মুরগির মাংস (১ কেজি)", price: 180, desc: "ফার্ম তাজা দেশি মুরগি।" },
    { id: "m2", name: "গরুর মাংস (১ কেজি)", price: 650, desc: "হাড় কম, মাংস বেশি।" },
    { id: "m3", name: "খাসির মাংস (১ কেজি)", price: 820, desc: "তাজা খাসির মাংস।" },
    { id: "m4", name: "মুরগির লিভার", price: 120, desc: "ফ্রেশ লিভার পিস।" },
    { id: "m5", name: "মুরগির উইংস", price: 200, desc: "বারবিকিউ এর জন্য অসাধারণ।" },
    { id: "m6", name: "মুরগির লেগ পিস", price: 240, desc: "বড় সাইজ লেগ পিস।" },
    { id: "m7", name: "মুরগির গিজার্ড", price: 100, desc: "সুস্বাদু গিজার্ড।" },
    { id: "m8", name: "বিফ লিভার", price: 300, desc: "তাজা বিফ লিভার।" },
    { id: "m9", name: "মুরগির স্কিনলেস", price: 230, desc: "স্কিন ছাড়াই পরিষ্কার মাংস।" },
    { id: "m10", name: "ডিম (হাফ ডজন)", price: 45, desc: "ফার্ম ফ্রেশ ডিম।" }
  ]
},
{
  id: "19",
  name: "City Fruits & Vegetables",
  type: "shop",
  items: [
    { id: "v1", name: "আলু (১ কেজি)", price: 30, desc: "তাজা আলু।" },
    { id: "v2", name: "টমেটো (১ কেজি)", price: 40, desc: "রসালো লাল টমেটো।" },
    { id: "v3", name: "কলা (১২ পিস)", price: 60, desc: "দেশি পাকা কলা।" },
    { id: "v4", name: "আপেল (১ কেজি)", price: 140, desc: "ফ্রেশ আমদানিকৃত আপেল।" },
    { id: "v5", name: "পেঁপে (১ কেজি)", price: 35, desc: "মিষ্টি দেশি পেঁপে।" },
    { id: "v6", name: "পেঁয়াজ (১ কেজি)", price: 45, desc: "রাধুনী পেঁয়াজ।" },
    { id: "v7", name: "লাউ", price: 50, desc: "তাজা সবুজ লাউ।" },
    { id: "v8", name: "বেগুন (১ কেজি)", price: 55, desc: "মসৃণ বেগুন।" },
    { id: "v9", name: "সবুজ লঙ্কা (১০০ গ্রাম)", price: 20, desc: "ঝাল লঙ্কা।" },
    { id: "v10", name: "কাকড় (১ কেজি)", price: 40, desc: "তাজা কাকড়।" }
  ]
},
{
  id: "20",
  name: "Gadget Point",
  type: "shop",
  items: [
    { id: "gp1", name: "মোবাইল কভার", price: 120, desc: "স্মার্টফোন বিশেষ কভার।" },
    { id: "gp2", name: "টাইপ-C চার্জার", price: 250, desc: "ফাস্ট চার্জিং সাপোর্ট।" },
    { id: "gp3", name: "ইয়ারফোন", price: 150, desc: "স্টেরিও সাউন্ড কোয়ালিটি।" },
    { id: "gp4", name: "পাওয়ার ব্যাংক (১০,০০০ mAh)", price: 750, desc: "হাই ব্যাকআপ পাওয়ার।" },
    { id: "gp5", name: "মোবাইল স্ট্যান্ড", price: 90, desc: "মেটালিক ফোন স্ট্যান্ড।" },
    { id: "gp6", name: "ব্লুটুথ স্পিকার", price: 450, desc: "উচ্চমানের সাউন্ড।" },
    { id: "gp7", name: "হেডফোন", price: 350, desc: "কমফোর্টেবল ওয়্যারিং।" },
    { id: "gp8", name: "মেমরি কার্ড (৩২GB)", price: 300, desc: "হাই স্পিড স্টোরেজ।" },
    { id: "gp9", name: "মাউস", price: 180, desc: "অপটিক্যাল ওয়ার্ড।" },
    { id: "gp10", name: "কীবোর্ড", price: 280, desc: "ফুল সাইজ কীবোর্ড।" }
  ]
},
{
  id: "21",
  name: "Daily Needs Mart",
  type: "shop",
  items: [
    { id: "d1", name: "চিনি (১ কেজি)", price: 55, desc: "পরিষ্কার চিনির দানা।" },
    { id: "d2", name: "লবণ (১ কেজি)", price: 25, desc: "আয়োডিনযুক্ত লবণ।" },
    { id: "d3", name: "চা পাতা (৫০০ গ্রাম)", price: 180, desc: "ঘ্রাণ সমৃদ্ধ চা।" },
    { id: "d4", name: "মশলা প্যাক", price: 150, desc: "মিশ্র মশলার প্যাক।" },
    { id: "d5", name: "ডাল (মসুর, ১ কেজি)", price: 75, desc: "লাল মসুর ডাল।" },
    { id: "d6", name: "তেল (১ লিটার)", price: 135, desc: "রিফাইন্ড কুকিং অয়েল।" },
    { id: "d7", name: "টয়লেট টিস্যু", price: 30, desc: "২-লেয়ার সফট টিস্যু।" },
    { id: "d8", name: "সাবান", price: 35, desc: "ফ্রেশ ফ্লেভার সাবান।" },
    { id: "d9", name: "শ্যাম্পু (স্যাচেট প্যাক)", price: 10, desc: "চুলের যত্ন।" },
    { id: "d10", name: "ডিটারজেন্ট পাউডার", price: 45, desc: "ওয়াশিং পাউডার।" }
  ]
},
{
  id: "22",
  name: "Beauty & Care Shop",
  type: "shop",
  items: [
    { id: "b1", name: "ফেসওয়াশ", price: 120, desc: "অয়েল কন্ট্রোল ফেসওয়াশ।" },
    { id: "b2", name: "ফেয়ারনেস ক্রিম", price: 90, desc: "স্কিন ব্রাইটেনিং।" },
    { id: "b3", name: "হেয়ার অয়েল", price: 80, desc: "চুল পড়া কমায়।" },
    { id: "b4", name: "পারফিউম", price: 150, desc: "দীর্ঘস্থায়ী সুবাস।" },
    { id: "b5", name: "লিপস্টিক", price: 130, desc: "ম্যাট ফিনিশ লিপস্টিক।" },
    { id: "b6", name: "কমপ্যাক্ট পাউডার", price: 110, desc: "স্কিন টোন সেটিং।" },
    { id: "b7", name: "কাজল", price: 40, desc: "স্মাজপ্রুফ কাজল।" },
    { id: "b8", name: "হেয়ার কালার", price: 95, desc: "ন্যাচারাল লুক।" },
    { id: "b9", name: "স্কিন লোশন", price: 140, desc: "শুকনো ত্বকের যত্ন।" },
    { id: "b10", name: "ফেস ক্রিম", price: 100, desc: "ডেইলি ইউজ ক্রিম।" }
  ]
},
{
  id: "23",
  name: "Modern Stationery House",
  type: "shop",
  items: [
    { id: "s1", name: "নোটবুক (৮০ পাতা)", price: 35, desc: "স্মুথ রাইটিং।" },
    { id: "s2", name: "জেল পেন", price: 10, desc: "স্মুথ ফ্লো ইঙ্ক।" },
    { id: "s3", name: "মার্কার", price: 25, desc: "হোয়াইটবোর্ড মার্কার।" },
    { id: "s4", name: "ফাইল", price: 20, desc: "ডকুমেন্ট রাখার ফাইল।" },
    { id: "s5", name: "স্কেল", price: 10, desc: "প্লাস্টিক স্কেল।" },
    { id: "s6", name: "কালার বক্স", price: 60, desc: "১২ রঙের সেট।" },
    { id: "s7", name: "স্ট্যাপলার", price: 40, desc: "মিনি স্ট্যাপলার।" },
    { id: "s8", name: "আঠা", price: 15, desc: "স্কুল প্রজেক্টের জন্য।" },
    { id: "s9", name: "নোটপ্যাড", price: 30, desc: "ছোট আকার নোটপ্যাড।" },
    { id: "s10", name: "কলম স্ট্যান্ড", price: 50, desc: "পেন অর্গানাইজার।" }
  ]
},
{
  id: "24",
  name: "Home & Kitchen Store",
  type: "shop",
  items: [
    { id: "hk1", name: "কড়াই", price: 350, desc: "মজবুত ননস্টিক কড়াই।" },
    { id: "hk2", name: "প্লেট সেট (৬ পিস)", price: 220, desc: "মেলামাইন প্লেট।" },
    { id: "hk3", name: "গ্লাস সেট (৬ পিস)", price: 180, desc: "ট্রান্সপারেন্ট গ্লাস।" },
    { id: "hk4", name: "চামচ সেট", price: 60, desc: "স্টেইনলেস স্টিল চামচ।" },
    { id: "hk5", name: "কাটিং বোর্ড", price: 90, desc: "হেভি ডিউটি প্লাস্টিক।" },
    { id: "hk6", name: "জগ", price: 85, desc: "১.৫ লিটার জগ।" },
    { id: "hk7", name: "ডাস্টবিন", price: 180, desc: "প্লাস্টিক ডাস্টবিন।" },
    { id: "hk8", name: "টিফিন বক্স", price: 70, desc: "এয়ারটাইট টিফিন।" },
    { id: "hk9", name: "ফ্লাস্ক", price: 220, desc: "গরম পানি রাখার ফ্লাস্ক।" },
    { id: "hk10", name: "নাইফ সেট", price: 110, desc: "৩ পিস ছুরি সেট।" }
  ]
},
{
  id: "25",
  name: "Kids Toy Galaxy",
  type: "shop",
  items: [
    { id: "t1", name: "ছোট গাড়ি", price: 60, desc: "রঙিন টয় কার।" },
    { id: "t2", name: "টেডি বিয়ার", price: 180, desc: "সফট টেডি।" },
    { id: "t3", name: "বিল্ডিং ব্লক", price: 150, desc: "সৃজনশীল খেলার জন্য।" },
    { id: "t4", name: "ডল সেট", price: 200, desc: "ডল + ড্রেস সেট।" },
    { id: "t5", name: "টoy গান", price: 120, desc: "সেফ প্লাস্টিক গান।" },
    { id: "t6", name: "রিমোট কার", price: 350, desc: "হাই স্পিড কার।" },
    { id: "t7", name: "পাজল", price: 90, desc: "৬৪ পিস পাজল সেট।" },
    { id: "t8", name: "ড্রয়িং বুক", price: 40, desc: "শিশুদের আঁকার বই।" },
    { id: "t9", name: "ক্রেয়ন বক্স", price: 50, desc: "২৪ রঙের ক্রেয়ন।" },
    { id: "t10", name: "স্পোর্টস বল", price: 110, desc: "সফট কিডস বল।" }
  ]
},
    {
      "id": "26",
      "name": "RAMMOHAN BILDERS",
      "type": "shop",
      "items": [
        { "id": "rb1", "name": "সিমেন্ট (৫০ কেজি)", "price": 420, "desc": "বাড়ি নির্মাণের জন্য উচ্চমানের সিমেন্ট।" },
        { "id": "rb2", "name": "বালি (১ ঘনফুট)", "price": 45, "desc": "মসৃণ কাজের জন্য পরিষ্কার নদীর বালি।" },
        { "id": "rb3", "name": "ইট (প্রতি ১টি)", "price": 10, "desc": "মজবুত লাল ইট।" },
        { "id": "rb4", "name": "রড (১০ মিমি)", "price": 720, "desc": "উচ্চমানের স্টিল রড।" },
        { "id": "rb5", "name": "রড (১২ মিমি)", "price": 880, "desc": "স্ট্রং বিল্ডিং ম্যাটেরিয়াল।" },
        { "id": "rb6", "name": "টিন শিট", "price": 1150, "desc": "ছাদের টিন শিট।" },
        { "id": "rb7", "name": "পাথর (১ ঘনফুট)", "price": 55, "desc": "নির্মাণের কাজে ব্যবহৃত কঠিন পাথর।" },
        { "id": "rb8", "name": "সারফেস পেইন্ট", "price": 650, "desc": "দেয়াল এবং ছাদের জন্য মানসম্মত পেইন্ট।" },
        { "id": "rb9", "name": "ইলেকট্রিক তার", "price": 380, "desc": "বাড়ির জন্য নিরাপদ কপার তার।" },
        { "id": "rb10", "name": "বাথরুম ফিটিংস সেট", "price": 1250, "desc": "ট্যাপ ও শাওয়ার সহ পূর্ণ সেট।" }
      ]
    },
    {
      "id": "27",
      "name": "RNR BASTRALOY",
      "type": "shop",
      "items": [
        { "id": "rnr1", "name": "ছেলেদের হাফ প্যান্ট", "price": 180, "desc": "আরামদায়ক হাফ প্যান্ট।" },
        { "id": "rnr2", "name": "মেয়েদের লেগিংস", "price": 160, "desc": "স্ট্রেচেবল লেগিংস।" },
        { "id": "rnr3", "name": "বাচ্চাদের জামা", "price": 220, "desc": "সুন্দর বেবি ড্রেস।" },
        { "id": "rnr4", "name": "মশারি", "price": 350, "desc": "মশা প্রতিরোধী মশারি।" },
        { "id": "rnr5", "name": "মেয়েদের ব্লাউজ", "price": 250, "desc": "তিন সাইজ ব্লাউজ।" },
        { "id": "rnr6", "name": "আন্ডারওয়্যার (মহিলা)", "price": 120, "desc": "কটন আন্ডারওয়্যার।" },
        { "id": "rnr7", "name": "আন্ডারওয়্যার (পুরুষ)", "price": 130, "desc": "সফট কটন।" },
        { "id": "rnr8", "name": "পুরুষদের প্যান্ট", "price": 480, "desc": "ডেনিম প্যান্ট।" },
        { "id": "rnr9", "name": "মেয়েদের টপ্স", "price": 220, "desc": "স্টাইলিশ টপস।" },
        { "id": "rnr10", "name": "শার্ট (পুরুষ)", "price": 390, "desc": "ক্যাজুয়াল শার্ট।" }
      ]
    },
    {
      "id": "28",
      "name": "Radha Gobinda Variety Stores",
      "type": "shop",
      "items": [
        { "id": "rg1", "name": "ধুনো", "price": 20, "desc": "পূজার্চনার অপরিহার্য সামগ্রী।" },
        { "id": "rg2", "name": "ধূপকাঠি", "price": 35, "desc": "সুগন্ধি ধূপ।" },
        { "id": "rg3", "name": "প্রসাদ বাটি", "price": 15, "desc": "পিতলের ছোট বাটি।" },
        { "id": "rg4", "name": "ঘি বাটি", "price": 40, "desc": "পূজার জন্য ঘি রাখার পাত্র।" },
        { "id": "rg5", "name": "মালা", "price": 20, "desc": "গাঁদা/জবা মালা।" },
        { "id": "rg6", "name": "কালি-সিঁদুর", "price": 25, "desc": "পূজার সামগ্রী।" },
        { "id": "rg7", "name": "ঘণ্টা", "price": 120, "desc": "পিতলের ঘণ্টা।" },
        { "id": "rg8", "name": "আরতি থালা", "price": 150, "desc": "পূর্ণ আরতি সেট।" },
        { "id": "rg9", "name": "তেল বাতি", "price": 10, "desc": "মাটির ছোট বাতি।" },
        { "id": "rg10", "name": "নারকেল", "price": 40, "desc": "পূজার কাজে ব্যবহৃত।" }
      ]
    },
    {
      "id": "29",
      "name": "সুন্দরবন কাঁকড়া আড়ৎ",
      "type": "shop",
      "items": [
        { "id": "cr1", "name": "ছোট কাঁকড়া (Female)", "price": 380, "desc": "তাজা নদীর কাঁকড়া।" },
        { "id": "cr2", "name": "ছোট কাঁকড়া (Male)", "price": 400, "desc": "হালকা নোনা স্বাদ।" },
        { "id": "cr3", "name": "বড় কাঁকড়া (Female)", "price": 650, "desc": "উচ্চমানের কাঁকড়া।" },
        { "id": "cr4", "name": "বড় কাঁকড়া (Male)", "price": 720, "desc": "রেস্তোরাঁ মানের।" },
        { "id": "cr5", "name": "সুপার সাইজ কাঁকড়া", "price": 890, "desc": "এক্সট্রা বড়।" },
        { "id": "cr6", "name": "মেডিয়াম কাঁকড়া", "price": 520, "desc": "রোজকার রান্নার উপযুক্ত।" },
        { "id": "cr7", "name": "হার্ড শেল কাঁকড়া", "price": 600, "desc": "কঠিন খোলস।" },
        { "id": "cr8", "name": "সফট শেল কাঁকড়া", "price": 560, "desc": "নরম খোলস।" },
        { "id": "cr9", "name": "মিক্সড কাঁকড়া (১ কেজি)", "price": 500, "desc": "বিভিন্ন সাইজ মিক্স।" },
        { "id": "cr10", "name": "সজীব কাঁকড়া (লাইভ)", "price": 950, "desc": "একদম লাইভ কাঁকড়া।" }
      ]
    },
    {
      "id": "30",
      "name": "আরতি সবুজ সবজি",
      "type": "shop",
      "items": [
        { "id": "vg1", "name": "আলু (১ কেজি)", "price": 25, "desc": "টাটকা দেশি আলু।" },
        { "id": "vg2", "name": "বেগুন (১ কেজি)", "price": 45, "desc": "চাষের বেগুন।" },
        { "id": "vg3", "name": "ঢেঁড়স (১ কেজি)", "price": 50, "desc": "তাজা ঢেঁড়স।" },
        { "id": "vg4", "name": "পটল (১ কেজি)", "price": 60, "desc": "গ্রামের পটল।" },
        { "id": "vg5", "name": "চিচিঙ্গা (১ কেজি)", "price": 45, "desc": "টাটকা সবজি।" },
        { "id": "vg6", "name": "কপি (১ কেজি)", "price": 35, "desc": "মৌসুমি কপি।" },
        { "id": "vg7", "name": "ফুলকপি (১ কেজি)", "price": 50, "desc": "ফার্মের ফুলকপি।" },
        { "id": "vg8", "name": "পেঁয়াজ (১ কেজি)", "price": 30, "desc": "দেশি পেঁয়াজ।" },
        { "id": "vg9", "name": "রসুন (১ কেজি)", "price": 90, "desc": "উচ্চমানের রসুন।" },
        { "id": "vg10", "name": "আদা (১ কেজি)", "price": 120, "desc": "সুগন্ধি আদা।" }
      ]
    },
    {
      "id": "31",
      "name": "Fresh Fruit",
      "type": "shop",
      "items": [
        { "id": "ff1", "name": "আপেল (১ কেজি)", "price": 180, "desc": "আমদানীকৃত লাল আপেল।" },
        { "id": "ff2", "name": "কমলা (১ কেজি)", "price": 120, "desc": "মিষ্টি কমলা।" },
        { "id": "ff3", "name": "আঙ্গুর (১ কেজি)", "price": 150, "desc": "বীজবিহীন আঙ্গুর।" },
        { "id": "ff4", "name": "পেঁপে (১ কেজি)", "price": 45, "desc": "টাটকা পেঁপে।" },
        { "id": "ff5", "name": "কলা (১২টি)", "price": 60, "desc": "দেশি কলা।" },
        { "id": "ff6", "name": "ড্রাগন ফল (১ কেজি)", "price": 250, "desc": "আমদানীকৃত।" },
        { "id": "ff7", "name": "কিউই (১ কেজি)", "price": 300, "desc": "নিউজিল্যান্ড কিউই।" },
        { "id": "ff8", "name": "আম (১ কেজি)", "price": 90, "desc": "মৌসুমি আম।" },
        { "id": "ff9", "name": "আনারস (১টি)", "price": 45, "desc": "সুগন্ধি আনারস।" },
        { "id": "ff10", "name": "বেদানা (১ কেজি)", "price": 220, "desc": "লাল বেদানা।" }
      ]
    },
    {
      "id": "32",
      "name": "Sarkar টেলিকম",
      "type": "shop",
      "items": [
        { "id": "st1", "name": "Samsung Mobile", "price": 8999, "desc": "অরিজিনাল স্মার্টফোন।" },
        { "id": "st2", "name": "Redmi Mobile", "price": 7499, "desc": "বাজেট স্মার্টফোন।" },
        { "id": "st3", "name": "Bluetooth Speaker", "price": 999, "desc": "লাউড সাউন্ড।" },
        { "id": "st4", "name": "Refrigerator", "price": 14500, "desc": "ফিমেলি ফ্রিজ।" },
        { "id": "st5", "name": "AC (1 Ton)", "price": 26000, "desc": "ইনভার্টার AC।" },
        { "id": "st6", "name": "Power Bank", "price": 699, "desc": "১০০০০ mAh।" },
        { "id": "st7", "name": "Charger", "price": 250, "desc": "ফাস্ট চার্জার।" },
        { "id": "st8", "name": "Earphone", "price": 150, "desc": "কান–ফোন।" },
        { "id": "st9", "name": "Smart Watch", "price": 999, "desc": "অল ফিচার।" },
        { "id": "st10", "name": "Feature Phone", "price": 1200, "desc": "বাটন ফোন।" }
      ]
    },
    {
      "id": "33",
      "name": "সজলের মাছের দোকান",
      "type": "shop",
      "items": [
        { "id": "fs1", "name": "রুই (১ কেজি)", "price": 280, "desc": "তাজা নদীর রুই।" },
        { "id": "fs2", "name": "কাতলা (১ কেজি)", "price": 300, "desc": "চাষের কাতলা।" },
        { "id": "fs3", "name": "ইলিশ (১ কেজি)", "price": 1400, "desc": "নদীর ইলিশ।" },
        { "id": "fs4", "name": "পাবদা (১ কেজি)", "price": 550, "desc": "টাটকা পাবদা।" },
        { "id": "fs5", "name": "চিংড়ি (১ কেজি)", "price": 750, "desc": "নোনা জলের চিংড়ি।" },
        { "id": "fs6", "name": "মাগুর (১ কেজি)", "price": 400, "desc": "লাইভ মাগুর।" },
        { "id": "fs7", "name": "ট্যাংরা (১ কেজি)", "price": 350, "desc": "দেশি ট্যাংরা।" },
        { "id": "fs8", "name": "পাঙ্গাস (১ কেজি)", "price": 180, "desc": "চাষের পাঙ্গাস।" },
        { "id": "fs9", "name": "শ্যোল (১ কেজি)", "price": 500, "desc": "বড় সাইজ।" },
        { "id": "fs10", "name": "পুটি (১ কেজি)", "price": 200, "desc": "মিশ্র পুটি মাছ।" }
      ]
    },
    {
      "id": "34",
      "name": "কাকিমা ফুচকা",
      "type": "shop",
      "items": [
        { "id": "fp1", "name": "ফুচকা (৭ পিস)", "price": 10, "desc": "মশলাদার ফুচকা।" },
        { "id": "fp2", "name": "ফুচকা (১০ পিস)", "price": 15, "desc": "টেস্টি ফুচকা।" },
        { "id": "fp3", "name": "ফুচকা (১৫ পিস)", "price": 20, "desc": "অতিরিক্ত টক জলসহ।" },
        { "id": "fp4", "name": "চানা-মাসলা", "price": 10, "desc": "ফুচকার পুরের জন্য।" },
        { "id": "fp5", "name": "টক জল", "price": 5, "desc": "টক-মশলাদার জল।" },
        { "id": "fp6", "name": "দই ফুচকা (৬ পিস)", "price": 25, "desc": "দই সহ বিশেষ।" },
        { "id": "fp7", "name": "সুইট ফুচকা", "price": 20, "desc": "মিষ্টি পুর সহ।" },
        { "id": "fp8", "name": "স্পেশাল ফুচকা (১০ পিস)", "price": 25, "desc": "চাট-মশলা সহ।" },
        { "id": "fp9", "name": "প্লেইন ফুচকা", "price": 6, "desc": "শুধুমাত্র খোলস।" },
        { "id": "fp10", "name": "প্যানি ফুচকা স্পেশাল", "price": 30, "desc": "এক্সট্রা টক জল ও মশলা সহ।" }
      ]
    },
    {
      "id": "35",
      "name": "Sakaru Imitation",
      "type": "shop",
      "items": [
        { "id": "si1", "name": "চুরি (মহিলা)", "price": 45, "desc": "রঙিন চুরি।" },
        { "id": "si2", "name": "টিপ", "price": 10, "desc": "বিভিন্ন রঙে।" },
        { "id": "si3", "name": "নাকফুল", "price": 25, "desc": "ইমিটেশন নাকফুল।" },
        { "id": "si4", "name": "কানের দুল", "price": 40, "desc": "স্টাইলিশ ডিজাইন।" },
        { "id": "si5", "name": "নেকলেস সেট", "price": 120, "desc": "ম্যাচিং সেট।" },
        { "id": "si6", "name": "পায়ের নূপুর", "price": 60, "desc": "হালকা মেটাল।" },
        { "id": "si7", "name": "বালা", "price": 80, "desc": "মহিলাদের বালা সেট।" },
        { "id": "si8", "name": "ম্যাঙ্গটিকা", "price": 55, "desc": "পার্টি ওয়্যার।" },
        { "id": "si9", "name": "ব্রেসলেট", "price": 70, "desc": "ফ্যান্সি ব্রেসলেট।" },
        { "id": "si10", "name": "অ্যান্টিক নেকলেস", "price": 150, "desc": "অ্যান্টিক ডিজাইন।" }
      ]
    }
];

// ✅ API routes (Your existing routes + new authentication routes)
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