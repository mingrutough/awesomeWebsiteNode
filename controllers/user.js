
import { userModel } from '../mongo/models';

const user = {
  logIn: async (ctx, next) => { 
    try {
      const ans = await userModel.userAuth(ctx.request.body);
      if (ans) {
        ctx.data = ans.userInfo;
        ctx.session.id = ans._id;
      } else { 
        ctx.data.error = '请输入正确的用户名或密码';
      }
    } catch (error) {
      ctx.data.error = error.message || error;      
    }
  },
  logOut: async (ctx, next) => { 
    
  },
  register: async (ctx, next) => { 
    if (!ctx.session.id) { 
      ctx.data.error = '未登录';
      return;      
    }
    const { inviteCode, phoneNumber, nickName, passWord } = ctx.request.body;
    if (inviteCode !== 'poppin') { // 邀请码无效
      ctx.data.error = '请输入有效地邀请码';
      return;
    }
    const userEntity = new userModel({
      phoneNumber,
      nickName,
      passWord,
    });

    try {
      await userEntity.save();    
      ctx.data = userEntity.userInfo;
    } catch (error) {
      ctx.data.error = error.message || error;
    }
  },
  isLogIn: async (ctx, next) => { 

  },
  getUserInfo: async (ctx, next) => { 

  },
};

export default user;