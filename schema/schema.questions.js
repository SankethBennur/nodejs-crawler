const mongoose = require("mongoose");
 
const questionSchema = new mongoose.Schema({
     question: { type: String },
     count: { type: String, required: true, unique: true },
     upvotes: { type: String, required: true },
     answers: { type: String, defaut: "" },
});


module.exports = mongoose.model("Question", questionSchema);