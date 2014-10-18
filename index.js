var aws = require('aws-lib')

module.exports = function(config) {

  config = config || require('./config')

  return function(cb) {

    if (!config.accessKeyId) throw new Error('config missing accessKeyId')
    if (!config.secretAccessKey) throw new Error('config missing secretAccessKey')
    if (typeof cb != 'function') throw new Error('missing callback')

    var ec2 = aws.createEC2Client(
          config.accessKeyId,
          config.secretAccessKey,
          { version: '2014-05-01' }
        )

    ec2.call('DescribeInstances', {}, function(err, result) {
      if (err) return cb(err, [])

      cb(null, filter(getInstancesFromResult()))

      function getInstancesFromResult() {
        var instances = []
        result.reservationSet.item.forEach(function(instance) {
          if (Array.isArray(instance.instancesSet.item)) {
            instance.instancesSet.item.forEach(function(item) {
              instances.push(item)
            })
          } else {
            instances.push(instance.instancesSet.item)
          }
        })
        return instances
      }

      function filter(instances) {
        return instances.map(function(instance) {
          return {
            ipAddress: instance.ipAddress,
            privateIpAddress: instance.privateIpAddress,
            tags: getTags(instance),
            online: instance.instanceState.name === 'running'
          }
        })
      }

      function getTags(instance) {
        var tags = {}
        var tagSet = getTagSet(instance)
        tagSet.forEach(function(tag) {
          tags[tag.key.toLowerCase()] = tag.value.toLowerCase()
        })
        return tags
      }

      function getTagSet(instance) {
        if (!instance.tagSet || !instance.tagSet.item) return []
        var item = instance.tagSet.item
        return Array.isArray(item) ? item : [ item ]
      }

    })
  }
}

if (!module.parent) {
  // node index.js --config=/path/to/some/config.json
  module.exports()(function(err, result) {
    console.log(err, JSON.stringify(result, null, 2))
  })
}
