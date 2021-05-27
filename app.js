const mongoose = require('mongoose')
// 如果数据库（database）不存在就会创建
mongoose.connect('mongodb://localhost/eg', { useNewUrlParser: true, useUnifiedTopology: true }).then(value => {
  console.log('连接成功');
}).catch(err => {
  console.log(err);
})

//创建集合规则
const articleSchema = new mongoose.Schema({
  _id: String,
  title: String,
  createTime: Date,
  content: String,
  type: [String]
})
//创建集合,参数是集合名称和集合规则
// 在数据库中真正创建的集合名称是articles
// model返回的是要创建集合的构造函数
const Article = new mongoose.model('Article', articleSchema)
// 创建文档
// _id防止重复插入
const articles = new Article({
  _id: 1,
  title: 'mongoose的使用',
  createTime: new Date(),
  content: '1. 连接数据库。2. 创建集合规则。3. 创建集合构造函数。4.使用构造函数创建文档',
  type: ['node笔记']
})
// 创建文档方法二
const data = [{
  _id: 2,
  title: 'html释义',
  createTime: new Date(),
  content: '超文本传输协议',
  type: ['html笔记', 'web前端']
}, {
  _id: 3,
  title: 'CSS释义',
  createTime: new Date(),
  content: '层叠样式表',
  type: ['CSS笔记', 'web前端']
}]
// 传进去数组创建多条文档
// 这种方法直接就保存到数据库中了
Article.create(data, (err, doc) => {
  if (!err) {
    console.log('插入多条文档成功');
  } else {
    console.log('ccc');
  }
})
// articles.save()