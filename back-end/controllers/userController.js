const User = require("../models/User");
const {
  calculateAllocatedMonths,
  getDirectReferralsWithMonths,
  getDescendantsWithMonths,
} = require("../utils/referralUtils");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

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
