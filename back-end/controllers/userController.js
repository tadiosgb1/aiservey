const User = require("../models/User");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const {
  calculateAllocatedMonths,
  getDirectReferralsWithMonths,
  getDescendantsWithMonths,
} = require("../utils/referralUtils");

// Create a new user
const generateReferralCode = () => {
  return "REF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
};

exports.createUser = async (req, res) => {
  try {
    const {
      name,
      birth_date,
      gender,
      country,
      city,
      address,
      email,
      phone_number,
      password,
      referrer_id,
      status,
      educational_level,
      institute_name,
      department,
      field_of_study,
    
      occupation,
      org_name,
      work_country,
      work_city,
      work_department,
      work_description,
   
      english_level,
   
      youtube_url
    } = req.body;

    // Basic validation
    if (!name || !email || !phone_number || !password || !gender || !country || !educational_level || !youtube_url) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle file uploads (if using multer)
    const uploadedFiles = {};
    const imageFields = [
      "cv_url", "tiktok_screenshot", "instagram_screenshot",
      "facebook_screenshot", "x_screenshot", "bot_subscribe_screenshot",
      "other_social_screenshot"
    ];

    imageFields.forEach((field) => {
      if (req.files && req.files[field] && req.files[field][0]) {
        uploadedFiles[field] = `/uploads/${req.files[field][0].filename}`;
      }
    });

    // Generate referral code if not provided
    const referral_code = req.body.referral_code || generateReferralCode();

    // Create user
    const user = await User.create({
      name,
      birth_date,
      gender,
      country,
      city,
      address,
      email,
      phone_number,
      password: hashedPassword,
      referral_code,
      referrer_id: referrer_id || null,
      status: status || "learning",
      educational_level,
      institute_name,
      department,
      field_of_study,
      occupation,
      org_name,
      work_country,
      work_city,
      work_department,
      work_description,
      english_level,
      youtube_url,
      ...uploadedFiles
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        referral_code: user.referral_code,
        youtube_url: user.youtube_url
      }
    });

  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};;

// Get a user with referrals and allocated months
exports.getUserWithReferralsAndMonths = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { allocated, total } = calculateAllocatedMonths(user);
    const directReferrals = await getDirectReferralsWithMonths(id);
    const allDescendants = await getDescendantsWithMonths(id);

    return res.json({
      user,
      allocatedMonths: allocated,
      totalMonths: total,
      directReferrals,
      allDescendants,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Generic update endpoint (PATCH)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields dynamically
    Object.keys(updateData).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(user, key)) {
        user[key] = updateData[key];
      }
    });

    await user.save();

    const { allocated, total } = calculateAllocatedMonths(user);
    const directReferrals = await getDirectReferralsWithMonths(id);
    const allDescendants = await getDescendantsWithMonths(id);

    return res.json({
      user,
      allocatedMonths: allocated,
      totalMonths: total,
      directReferrals,
      allDescendants,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
