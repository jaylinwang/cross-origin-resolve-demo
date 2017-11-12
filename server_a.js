const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const session = require('koa-session')
const view = require('./middlewares/view')

const app = new Koa()
const router = new Router()

app.use(view(__dirname + '/server_a/views'))
app.use(static(__dirname + '/server_a/assets'))

app.use(session({
  key: 'koa:sess', 
  httpOnly: true,
  signed: true
}, app))

app.use(router.routes())

app.use(async (ctx, next) => {
  ctx.session.temp = '123'
  await next()
})

// 基本现象
router.get('/basic-phenomenon', async (ctx) => {
  await ctx.render('index')
})

router.get('/img-use', async (ctx) => {
  await ctx.render('img-use')
})

app.listen(3000, function () {
  console.log(`server a start on port 3000`)
})