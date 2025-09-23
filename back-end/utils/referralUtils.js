const User = require('../models/User');

/**
 * Calculates allocated months for each approved media
 */
function calculateAllocatedMonths(user) {
  const baseMonth = 1.2;
  const mediaList = ['youtube_approval','tiktok_approval','instagram_approval','facebook_approval','x_approval','bot_approval'];
  const allocated = {};
  let total = 0;

  mediaList.forEach(media => {
    if (user[media] === 1) { // approved
      allocated[media] = baseMonth;
      total += baseMonth;
    } else {
      allocated[media] = 0;
    }
  });

  return { allocated, total };
}

/**
 * Direct referrals with allocated months (based on approval)
 */
async function getDirectReferralsWithMonths(userId) {
  const direct = await User.findAll({ where: { referrer_id: userId } });
  return direct.map(u => {
    const { allocated, total } = calculateAllocatedMonths(u);
    return { user: u, depth: 1, allocated, total };
  });
}

/**
 * All descendants recursively
 */
async function getDescendantsWithMonths(userId) {
  const result = [];

  async function recurse(parentId, depth) {
    const children = await User.findAll({ where: { referrer_id: parentId } });
    for (const child of children) {
      const { allocated, total } = calculateAllocatedMonths(child);
      result.push({ user: child, depth, allocated, total });
      await recurse(child.id, depth + 1);
    }
  }

  await recurse(userId, 1);
  return result;
}

module.exports = {
  calculateAllocatedMonths,
  getDirectReferralsWithMonths,
  getDescendantsWithMonths
};
