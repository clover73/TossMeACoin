const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creatorSchema = new Schema({
  publicKey: String,
  name: String,
  bio: String,
  createdAt: Date,
  avatarURL: String,
  bannerURL: String,
  Twitter: String,
  Instagram: String,
  YouTube: String,
  TikTok: String,
  LinkedIn: String,
  GitHub: String,
  Website: String,
});

module.exports = mongoose.model('Creator', creatorSchema);
