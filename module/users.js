const mongoose = require('./db.js')

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    maxLength: [6, '名字太长，3-6个汉字'],
    minLength: 2,
    required: true
  },
  password: {
    type: String,
    minLength: [6, '密码不能小于六位'],
    required: true
  },
  job: {
    type: String,
    required: false
  },
  briefIntroduction: {
    type: String,
    maxLength: [100, '个人简介字数应在100字内'],
    required: false
  }
})
const User = mongoose.model('User', userSchema)
module.exports = User