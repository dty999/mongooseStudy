const userModel = require('./module/users.js');

const commentModel = require('./module/comments.js');

const articleModel = require('./module/articles');

const mongoose = require('mongoose');

/*
// userModel.create({
//   userName: '黄巢',
//   password: '123456',
//   job: '造反',
//   briefIntroduction: '专杀门阀...'
// }, (err, docs) => {
//   if (err)
//     console.log('添加失败' + err);
//   else {
//     console.log('添加成功' + docs);
//   }
// })


// commentModel.create({
//   authId: mongoose.Types.ObjectId('60ae026ed0b6a04ec8972647'),
//   createTime: new Date(),
//   content: '有被自己感动到',
//   articleId: mongoose.Types.ObjectId('60ae399c0a0f704178845e61')
// }, (err, docs) => {
//   if (err)
//     console.log('添加失败' + err);
//   else {
//     console.log(docs);
//   }
// })


// articleModel.create({
//   title: '不第后赋菊',
//   createTime: new Date(),
//   tag: ['诗歌', '描写菊花'],
//   content: '待到秋来九月八，我花开后百花杀，冲天香阵透长安，满城尽带黄金甲！',
//   comments: [],
//   authId: mongoose.Types.ObjectId('60ae02a2d2ccbe3facfc1b45')
// }, (err, docs) => {
//   console.log(docs);
// })

*/

// 1. 在users表查询匹配的用户名和密码，找到相应记录id
// 2. 根据userId查找此id下的文章
// 3. 聚合此文章下的评论
//登录返回promise,reslove用户文档
const login = function (userName, password) {
  const rtn = new Promise((reslove, reject) => {
    userModel.find({ userName: userName }, (err, docs) => {
      if (err) reject(err)
      if (docs[0].password == password) {
        console.log('登录验证成功');
        // return docs[0]
        reslove(docs[0])
      } else {
        reject(new Error('密码错误'))
      }
    })
  })
  return rtn
}

// 根据用户文档查询用户的文章，返回promise，reslove查询到的文章文档
const findArticle = function (user) {
  const rtn = new Promise((reslove, reject) => {
    articleModel.find({
      authId: user._id,
    }, (err, docs) => {
      if (err)
        reject(err)
      reslove(docs)
    })
  })
  return rtn
}
// 使用async、await优化书写方式
let run = async function () {
  try {
    const isLogin = await login('刘备', '456789')
    const article = await findArticle(isLogin._id)
    console.log(article);
  } catch (error) {
    console.log('error');
    return
  }
}

run()