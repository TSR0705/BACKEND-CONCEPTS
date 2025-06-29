//testing 3

const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: String,
  content: String,
  hashtags: [String],
  mentions: [String],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("post", postSchema);

/* 
    The following commented-out code is kept intentionally for learning purposes. 
    It represents a basic version of the login/register system with no design, 
    useful for beginners to understand functionality before applying proper UI styling.

    The currently active code implements a modern, user-friendly design.
*/

// const mongoose = require("mongoose");

// const postSchema = mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "user",
//   },

//   date: {
//     type: Date,
//     default: Date.now,
//   },

//   content: String,
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
// });

// module.exports = mongoose.model("post", postSchema);

//testing 2
// const mongoose = require("mongoose");

// const postSchema = mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "user",
//   },

//   date: {
//     type: Date,
//     default: Date.now,
//   },

//   title: {
//     type: String,
//     trim: true,
//     maxlength: 150,
//   },

//   content: {
//     type: String,
//     required: true,
//     trim: true,
//   },

//   hashtags: [
//     {
//       type: String,
//       trim: true,
//       lowercase: true,
//     }
//   ],

//   mentions: [
//     {
//       type: String,
//       trim: true,
//     }
//   ],

//   likes: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "user"
//   }],
// });

// module.exports = mongoose.model("post", postSchema);
