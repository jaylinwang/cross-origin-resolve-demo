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

// JSONP
var valForServerB = 'a'
router.get('/jsonp/run', (ctx) => {
  let script = `
    alert('我来自服务器b，我的值是${valForServerB}')
  `
  ctx.body = script
})

router.get('/jsonp/call', (ctx) => {
  let val = ctx.query.val
  let callback = ctx.query.callback
  let script
  if (val === 'a') {
    script = `
      ${callback}(0)
    `
  } else {
    script = `
      ${callback}(1)
    `
  }
  ctx.body = script
})

router.get('/jsonp/define', (ctx) => {
  let call = ctx.query.call
  let script = `
    function ${call} (a) {
      alert('我来自服务器b，我的值来自服务器a：' + a)
    }
  `
  ctx.body = script
})

router.get('/jsonp/run-random', (ctx) => {
  var random = Math.random()
  if (random >= 0.5) {
    let script = `
      var a = 1
      console.log('我来自服务器b，我的值是' + a)
    `
    ctx.body = script
  } else {
    ctx.status = 500
    ctx.body = 'error'
  }
})

app.listen(4000, function () {
  console.log(`server b start on port 4000`)
})