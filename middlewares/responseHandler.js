/**
 * 接口请求响应处理模块
 * 统一自动添加接口返回的公共字段
 */
async function filterBody (ctx) {
  try {
    if (ctx.data && ctx.data.error) {
      ctx.body = {
        callStatus: 'FAILED',
        data: ctx.data.error
      }
    } else {
      const data = ctx.data
      ctx.body = data ? data : {
        callStatus: 'SUCCEED',
        data: null
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

// 检测接口路径是否包含/api字段，有的话再过滤返回数据
export default async (ctx, next) => {
  const reg = new RegExp('^/api')
  await next()
  if (reg.test(ctx.originalUrl)) {
    filterBody(ctx)
  }
}