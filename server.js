const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const session = require('koa-session')
const next = require('next')
const Redis = require('ioredis')
const auth = require('./server/auth')
const api = require('./server/api')

const RedisSessionStore = require('./server/session-store')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// 创建 redis client
const redis = new Redis()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  server.keys = ['dong develop github app']

  server.use(koaBody())

  const SESSION_CONFIG = {
    key: 'dong',
    maxAge: 12 * 60 * 60 * 1000,
    store: new RedisSessionStore(redis)
  }

  server.use(session(SESSION_CONFIG, server))

  // 配置 github Oauth 登录
  auth(server)
  api(server)

  router.get('/api/user/info', async (ctx) => {
    const user = ctx.session.userInfo
    if (!user) {
      ctx.status = 401
      ctx.body = 'need login'
    } else {
      ctx.body = user
      ctx.set('Content-Type', 'application/json')
    }
  })

  server.use(async (ctx, next) => {
    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(3000, () => {
    console.log('server 3000')
  })
})