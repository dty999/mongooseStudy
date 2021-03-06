01.js mongoose初体验
~~~js
function connect(uris: string, options: mongoose.ConnectOptions, callback: (err: MongoError) => void): Promise<typeof mongoose> (+5 overloads)
Opens the default mongoose connection. Options passed take precedence over options included in connection strings.

~~~

- Schema(纲要):并没有实质性的操作集合，只是在程序中设定了一些规则，然后应用规则创建与数据库中集合直接关联的model.
~~~js
const userSchema= new mongoose.Schema({
  // definition：定义,释义,清晰...
  name:String,
  age:Number,
  childs:[childSchema]//对Schema进行嵌套，childSchema必须在使用之前定义
},{
  // [options] 可选参数,详情参考文档
  collection:'name'
})
~~~
- mongoose.model()
- 连接集合，对集合使用schema产生model
- 可以指定要连接的集合名，如果省略第三个参数，会根据modelName连接相应的集合
- 返回Model,Model是和集合关联的，new Model()产生的是一条文档
~~~js
const modelName = mongoose.model(
  'modelName',
  [Schema],
  [collectionName],
  [skipInit])
~~~

## 目录结构
   1. module
      1. db.js
      2. user.ja
   2. app.js

### db.js
~~~js
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/eg', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
  },err => {
  if (!err)
    console.log('连接数据库成功...');
})
module.exports = mongoose
~~~

### users.js

~~~js
const mongoose = require('./db.js')

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    // 预置验证器
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
~~~

### app.js
~~~js
const userModel = require('./module/users.js')

~~~