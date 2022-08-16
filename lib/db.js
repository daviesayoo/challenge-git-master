const levelup = require('levelup')
const config = require('../config')

const engine = {
  test: require('memdown'),
  production: require('mongodown'),
  development: require('leveldown')
}[process.env.NODE_ENV]

const db = module.exports = levelup(config.level.location, {
  db: engine,
  valueEncoding: 'json'
})

db.healthCheck = function (cb) {
  const now = Date.now()
  db.put('!healthCheck', now, function (err) {
    if (err) return cb(err)
    db.get('!healthCheck', function (err, then) {
      if (err) return cb(err)
      if (now !== then) return cb(new Error('DB write failed'))
      cb()
    })
  })
}
