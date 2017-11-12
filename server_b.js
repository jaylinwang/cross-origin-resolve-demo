const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const view = require('./middlewares/view')

const port = 3000
const app = new Koa()
const router = new Router()

app.use(view())
app.use(static(__dirname + 'assets'))
app.use(router.routes())

// 跨域表现
router.get('/count', (ctx) => {
  console.log('get count ok~')
  ctx.body = {
    errcode: 0,
    count: 1
  }
})

// 借用src/href的单向检测
router.get('/check', (ctx) => {
  let status = Math.random()
  console.log('get check ok~')
  console.log(status)
  // console.log(ctx.cookies)

  // 模仿大概率成功，小概率失败
  if (status < 0.6) {
    ctx.status = 200
    ctx.body = '成功'
  } else {
    ctx.status = 500
    ctx.body = '失败'
  }
})

app.listen(4000, function () {
  console.log(`server b start on port 4000`)
})