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
  signed: false
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

// EmbedPing
router.get('/img-use', async (ctx) => {
  await ctx.render('img-use')
})
router.get('/link-use', async (ctx) => {
  await ctx.render('link-use')
})

// JSONP
router.get('/jsonp-run', async (ctx) => {
  await ctx.render('jsonp-run')
})
router.get('/jsonp-call', async (ctx) => {
  await ctx.render('jsonp-call')
})
router.get('/jsonp-define', async (ctx) => {
  await ctx.render('jsonp-define')
})
router.get('/jsonp-error', async (ctx) => {
  await ctx.render('jsonp-error')
})

// CORS
router.get('/cors', async (ctx) => {
  await ctx.render('cors')
})

app.listen(3000, function () {
  console.log(`server a start on port 3000`)
})