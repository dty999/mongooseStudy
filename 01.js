const mongoose = require('mongoose')
// 参数一：数据库连接，mongodb://username:password@IPAddress:port/databaseName，默认端口27017
// 参数二：配置信息
// 参数三：回调函数
// 
mongoose.connect('mongodb://localhost:27017/eg', { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true }, function (err) {
  if (err)
    console.log('连接数据库失败');
  else {
    console.log('连接数据库成功');
  }
})
// schema不能操作数据库只是定义了一组规则，
// 相当于是定义了表头，对字段进行一些限制，对集合设置。
var CommentSchema = new mongoose.Schema({
  username: String,
  time: Date,
  content: String,
  _id: String
}, {
  // 选项参数,详情参看文档
})
// 创建集合模型
var Comments = mongoose.model('Comment', CommentSchema)
Comments.create({ username: '小七', time: new Date(), content: '赞', _id: '1' }).then(value => {
  console.log('成功插入');
}).catch(err => {
  console.log(err.code);
})
// var conmments = new Comments()
// conmments.save((err, product) => {
//   console.log(product);
// })
// CommentSchema.eachPath((path, type) => {
//   console.log(path);
// })

// Comments.remove({ username: '小七' }, (err) => {

//   console.log(err);
//   Comments.find({}, (err, doc) => {
//     console.log(doc);
//   })
// })
Comments.updateMany({ username: '小七' }, {
  username: '小九'
}, function (err, raw) {
  console.log(err);
  console.log(raw);
})
