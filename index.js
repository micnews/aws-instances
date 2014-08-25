var aws = require('aws-lib')
var config = require('rc')('aws-instances', {
  accessKeyId: '',
  secretAccessKey: ''
})

function getInstances(options, cb) {

  if (typeof options == 'function') {
    cb = options
    options = config
  }

  if (!options.accessKeyId) throw new Error('missing options.accessKeyId')
  if (!options.secretAccessKey) throw new Error('missing options.secretAccessKey')
  if (typeof cb != 'function') throw new Error('missing callback')

  var ec2 = aws.createEC2Client(
    options.accessKeyId,
    options.secretAccessKey,
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
        var tagSet = getTagSet(instance)
        return {
          ipAddress: instance.ipAddress,
          privateIpAddress: instance.privateIpAddress,
          name: getName(tagSet),
          tagSet: tagSet,
          online: instance.instanceState.name === 'running'
        }
      })
    }

    function getName(tagSet) {
      for (var i = 0; i < tagSet.length; ++i) {
        if (tagSet[i].key.toLowerCase() === 'name') return tagSet[i].value
      }
      return ''
    }

    function getTagSet(instance) {
      if (!instance.tagSet || !instance.tagSet.item) return []
      var item = instance.tagSet.item
      return Array.isArray(item) ? item : [ item ]
    }

  })
}

module.exports = getInstances
