var getInstances = require('./index')
var test = require('tap').test

test('we can get some data from aws', function (t) {
  var opts = {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  }
  getInstances(opts, function(err, instances) {
    t.ok(!err, 'got some instances from aws')
    t.ok(Array.isArray(instances), 'got an array that has at least one instance')
    t.ok(instances[0].ipAddress, 'the first instance has an ip address')
    t.ok(instances[0].privateIpAddress, 'the first instance has a private ip address')
    t.ok(instances[0].name, 'the first instance has a type')
    t.end()
  })
})
