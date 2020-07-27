const Koa = require('koa')

const app = new Koa()
const routes = require('./routes')
const config = require('./config.json')
const svcPort = process.env.PORT || config.PORT || 3000

app.use(routes.ipsw.middleware())
app.use(routes.ipsw.routes())
app.use(routes.ipsw.allowedMethods())

app.listen(svcPort, () => {
  console.log(`ipswAPI가 포트 ${svcPort}를 개방하였습니다.`)
})
