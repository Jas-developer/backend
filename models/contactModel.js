const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please add your contact name"],
  },
  email: {
    type: String,
    re
  },
});
