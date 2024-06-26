const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const STRINGS = require("../utils/texts");

const PostSchema = new Schema({

  userId: Number,
  id: Number,
  title: String,
  body: String, 
});

module.exports = mongoose.model(STRINGS.MODALS.POST, PostSchema);