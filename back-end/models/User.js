const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  name: { type: DataTypes.STRING(150), allowNull: false },
  birth_date: { type: DataTypes.DATE, allowNull: true },
  gender: { type: DataTypes.ENUM('male','female','other'), allowNull: false },
  country: { type: DataTypes.STRING(100), allowNull: false },
  city: { type: DataTypes.STRING(100), allowNull: true },
  address: { type: DataTypes.TEXT, allowNull: true },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
  phone_number: { type: DataTypes.STRING(30), allowNull: false, unique: true },

  // 🔑 New password field
  password: { type: DataTypes.STRING(255), allowNull: false },

  referral_code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  referrer_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'Users', key: 'id' } },

  status: { type: DataTypes.ENUM('learning','working'), defaultValue: 'learning' },
  educational_level: { type: DataTypes.ENUM(
      'junior secondary school','senior secondary school','preparatory school','high school',
      'vocational diploma','diploma','undergraduate','bachelor','master','doctorate','professor','other'),
      allowNull: false },
  institute_name: { type: DataTypes.STRING(255), allowNull: true },
  department: { type: DataTypes.STRING(150), allowNull: true },
  field_of_study: { type: DataTypes.STRING(150), allowNull: true },

  occupation: { type: DataTypes.STRING(150), allowNull: true },
  org_name: { type: DataTypes.STRING(255), allowNull: true },
  work_country: { type: DataTypes.STRING(100), allowNull: true },
  work_city: { type: DataTypes.STRING(100), allowNull: true },
  work_department: { type: DataTypes.STRING(150), allowNull: true },
  work_description: { type: DataTypes.TEXT, allowNull: true },

  english_level: { type: DataTypes.ENUM('native','professional','intermediate','beginner'), allowNull: true },
 
  cv_url: { type: DataTypes.STRING(255), allowNull: true },
  youtube_screenshot_url: { type: DataTypes.STRING(255), allowNull: false },

  // Social media
  tiktok_screenshot: { type: DataTypes.STRING(255), allowNull: true },
  instagram_screenshot: { type: DataTypes.STRING(255), allowNull: true },
  facebook_screenshot: { type: DataTypes.STRING(255), allowNull: true },
  x_screenshot: { type: DataTypes.STRING(255), allowNull: true },
  bot_subscribe_screenshot: { type: DataTypes.STRING(255), allowNull: true },
  other_social_screenshot: { type: DataTypes.STRING(255), allowNull: true },

  // Approval per media (null=not checked, 1=approved,0=rejected)
  youtube_approval: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
  tiktok_approval: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
  instagram_approval: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
  facebook_approval: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
  x_approval: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
  bot_approval: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },

  // Optional rejection reasons
  youtube_reject_reason: { type: DataTypes.STRING(255), allowNull: true },
  tiktok_reject_reason: { type: DataTypes.STRING(255), allowNull: true },
  instagram_reject_reason: { type: DataTypes.STRING(255), allowNull: true },
  facebook_reject_reason: { type: DataTypes.STRING(255), allowNull: true },
  x_reject_reason: { type: DataTypes.STRING(255), allowNull: true },
  bot_reject_reason: { type: DataTypes.STRING(255), allowNull: true }

}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false
});

// Self-referencing association
User.hasMany(User, { as: 'Referrals', foreignKey: 'referrer_id' });
User.belongsTo(User, { as: 'Referrer', foreignKey: 'referrer_id' });

module.exports = User;
