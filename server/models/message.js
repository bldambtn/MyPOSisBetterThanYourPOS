const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
