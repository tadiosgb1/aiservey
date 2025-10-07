const crypto = require("crypto");
const User = require("../models/User");

/**
 * Generate a random referral code
 * Format: 8 alphanumeric characters
 */
function generateReferralCode() {
  return crypto.randomBytes(4).toString("hex").toUpperCase(); // 8 chars
}

/**
 * Generate a unique referral code (checks database)
 */
async function generateUniqueReferralCode() {
  let code;
  let exists = true;

  while (exists) {
    code = generateReferralCode();
    const user = await User.findOne({ where: { referral_code: code } });
    if (!user) exists = false; // unique code found
  }

  return code;
}

module.exports = {
  generateReferralCode: generateUniqueReferralCode,
};
