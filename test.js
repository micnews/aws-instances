var getInstances = require('./index')
var test = require('tap').test

test('we can get some data from aws', function (t) {
  var opts = {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  }
  getInstances(opts, function(err, instances) {
    t.ok(!err, 'got some instances from aws')
    t.ok(Array.isArray(instances), 'result should be an array of instances')
    t.ok(instances.length > 0, 'and it should contain at least one element')
    var instance = instances[0]
    t.ok(instance.ipAddress, 'an instance has an ip address property')
    t.ok(instance.privateIpAddress, 'an instance has a private ip address property')
    t.ok(instance.name, 'an instance has a type')
    var tagSet = instance.tagSet
    t.ok(tagSet, 'an instance has a tagSet property')
    t.ok(Array.isArray(tagSet), 'a tag set should be an array')
    t.ok(typeof instance.online != 'undefined', 'an instance has an online property')
    t.end()
  })
})
