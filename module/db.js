const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/eg', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (!err)
    console.log('连接数据库成功...');
})
module.exports = mongoose