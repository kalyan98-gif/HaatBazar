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