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

router.get('/count', (ctx) => {
  console.log('get count ok~')
  ctx.body = {
    errcode: 0,
    count: 1
  }
})

app.listen(4000, function () {
  console.log(`server b start on port 4000`)
})