
import { userModel } from '../mongo/models';

const user = {
  logIn: async (ctx, next) => { 

  },
  logOut: async (ctx, next) => { 

  },
  register: async (ctx, next) => { 
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