var config = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
}
var getInstances = require('./index')(config)
var test = require('tap').test

test('we can get some data from aws', function (t) {
  getInstances(function(err, instances) {
    t.ok(!err, 'got some instances from aws')
    t.ok(Array.isArray(instances), 'result should be an array of instances')
    t.ok(instances.length > 0, 'and it should contain at least one element')
    var i = instances[0]
    t.ok(i.ipAddress, 'an instance has an ip address property')
    t.ok(i.privateIpAddress, 'an instance has a private ip address property')
    var tags = i.tags
    t.ok(tags, 'an instance has a tags property')
    t.ok(typeof tags == 'object', 'tags property is an object')
    t.ok(i.tags.name, 'an instance has a name tag (type)')
    t.ok(typeof i.online != 'undefined', 'an instance has an online property')
    t.end()
  })
})
