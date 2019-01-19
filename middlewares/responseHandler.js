/**
 * 接口请求响应处理模块
 * 统一自动添加接口返回的公共字段
 */
  const filterBody = async (ctx) => {
    try {
    if (ctx.data.error) {
      ctx.body = {
        callStatus: 'FAILED',
        data: ctx.data.error
      }
    } else {
      ctx.body = {
        callStatus: 'SUCCEED',
        data: ctx.data,
      }
    }
  } catch (err) {
    ctx.status = 200
    ctx.body = {
      callStatus: 'FAILED',
      data: err && err.message ? err.message : err.toString()
    }
  }
}

const  responseHandler = async (ctx, next) => {
  const reg = new RegExp('^/api');
  ctx.data = {};
  await next()
  if (reg.test(ctx.originalUrl)) {
    filterBody(ctx)
  }
}
// 检测接口路径是否包含/api字段，有的话再过滤返回数据
export default responseHandler;