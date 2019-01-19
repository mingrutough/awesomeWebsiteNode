
import db, { Schema } from '../index';

/**
 * Schema 的一大特色就是其methods. 我们可以通过定义其methods,之后在model的实例上访问到定义的所有方法.
 * ex: userSchema.methods.fn = fn; (注意方法的定义必须在生成Model之前)
 *
 * 可以在userSchema的 statics属性上定义方法，之后在userModel上而非model的实例上可以直接访问该方法。
 * ex: userSchema.statics.fn = fn;
 *
 * Mongoose还有一个很牛逼的特性就是  virtual property 。该属性是直接设置在Schema上的，但是，需要注意的是，VR并不会真正的存放在db中，它只是一个提取数据的方法。
 * ex:
 * var personSchema = new Schema({
      name: {
        first: String,
        last: String
      }
    });
    //现在我们有个需求,即,需要将first和last结合输出.
    //一种方法是,使用methods来实现
    //schema 添加方法
    personSchema.methods.getName = function(){
        return this.name.first+" "+this.name.last;
    }
    // 实际上完全可以使用虚拟属性来实现。经检测，虚拟属性的返回结果速度是写函数的几十倍
    //schema 添加虚拟属性
    personSchema.virtual('fullName').get(function(){
        return this.name.first+" "+this.name.last;
    })
    //调用
    bad.fullName;  //和上面的方法的结果是完全一致的

 *
 *
 *
 *
 *
 *
 *
 *
 */




/**
 * 实际上, mongoose.model里面定义的第一个参数,比如’user’, 并不是数据库中的collection. 他只是collection的单数形式, 实际上在db中的collection是’users’.
 *
 * mongoose的validate功能很强大，很多参数验证的逻辑可以直接写在schema里面
 */
const UserSchema = new Schema({
  phoneNumber: {
    type: String,
    required: [true, '请输入手机号']
  },
  nickName: {
    type: String,
    required: [true, '请输入昵称']    
  },
  passWord: {
    type: String,
    default: 'paic1234',
  },
  role: {
    type: String,
    default: 'user',
  },
  avatar:  {
    type: String,
    default: '',
  },
  creator: { // 用户的创建者，user为自己注册，admin为管理员创建
    type: String,
    default: 'user',
  },
  likeList: [ // 喜爱的文章列表
    {
      type:Schema.Types.ObjectId,
    }
  ],
});

UserSchema.virtual('userInfo').get(function () {
  return {
    phoneNumber: this.phoneNumber,
    nickName: this.nickName,
    role: this.role,
    avatar: this.avatar,
    creator: this.creator,
    likeList: this.likeList,
  };
});
UserSchema
	.path('phoneNumber')
	.validate({
		isAsync: true,
		validator: function(v, cb) {
      const self = this;
			self.constructor.findOne({ phoneNumber: v }, function(err, user) {
				if (user) {
					cb(false)
				}
				cb(true)
			})
		},
		message: '这个手机号已经被注册!',
	})
UserSchema
	.path('nickName')
	.validate({
		isAsync: true,
		validator: function(v, cb) {
      const self = this;
			self.constructor.findOne({ nickName: v }, function(err, user) {
				if (user) {
					cb(false)
				}
				cb(true)
			})
		},
		message: '这个呢称已经被使用!',
	})

const userModel = db.model('user', UserSchema);

export default userModel;