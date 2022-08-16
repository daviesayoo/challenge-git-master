process.env.NODE_ENV = 'test'

const tape = require('tape')

const Things = require('../lib/models/things')

tape('should store and retrieve thing', function (t) {
  const key = 'thing-A'
  const value = {cat: 'hat'}
  Things.put(key, value, function (err) {
    t.ifError(err, 'should not error')

    Things.get(key, function (err, doc) {
      t.ifError(err, 'should not error')

      t.deepEqual(doc.cat, value.cat, 'should match')
      t.end()
    })
  })
})
