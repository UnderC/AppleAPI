const Router = require('koa-router')
const router = new Router()

const config = require('../config.json')
const libs = require('../libs')
const cache = new libs.cache(config.IPSW, 86400)

router.get('/firmwares/:identifier', (ctx, next) => {
  const result = cache.get(ctx.params.identifier)
  ctx.body = result ? result.firmwares : { error: 404 }
  next()
})

module.exports = router
