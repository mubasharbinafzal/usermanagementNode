const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const STRINGS = require("../utils/texts");

const UserSchema = new Schema({
  id: Number,
  name: String,
  username: String,
  email: String,
  address: {
      street: String,
      suite: String,
      city: String,
      zipcode: String,
      geo: {
          lat: String,
          lng: String
      }
  },
  phone: String,
  website: String,
  company: {
      name: String,
      catchPhrase: String,
      bs: String
  }

});

module.exports = mongoose.model(STRINGS.MODALS.USER, UserSchema);