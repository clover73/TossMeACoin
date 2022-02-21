const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creatorSchema = new Schema({
  publicKey: String,
  name: String,
  bio: String,
  createdAt: Date,
  avatarURL: String,
  customLink: String,
});

module.exports = mongoose.model('Creator', creatorSchema);
