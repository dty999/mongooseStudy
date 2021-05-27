const mongoose = require('./db')

const commentSchema = new mongoose.Schema({
  authId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  createTime: Date,
  content: {
    type: String,
    required: true
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true

  }
})

module.exports = mongoose.model('Comment', commentSchema)