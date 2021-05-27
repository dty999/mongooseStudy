const mongoose = require('./db.js')

const articleSchema = new mongoose.Schema({

  title: String,
  authId: {
    type: mongoose.Schema.Types.ObjectId
  },
  createTime: Date,
  tag: ['string'],
  content: {
    type: String,
    required: true
  },
  comments: [mongoose.Schema.Types.ObjectId]
})

module.exports = mongoose.model('Article', articleSchema)