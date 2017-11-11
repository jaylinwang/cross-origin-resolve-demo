const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const view = require('./middlewares/view')

const app = new Koa()
const router = new Router()

app.use(view(__dirname + '/server_a/views'))
app.use(static(__dirname + '/server_a/assets'))

app.use(router.routes())

// 基本现象
router.get('/basic-phenomenon', async (ctx) => {
  await ctx.render('index')
})

app.listen(3000, function () {
  console.log(`server a start on port 3000`)
})