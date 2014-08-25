[![Build Status](https://travis-ci.org/micnews/aws-instances.svg?branch=master)](https://travis-ci.org/micnews/aws-instances)

## SYNOPSIS
Get a list of aws instances and their meta data. This is merely a convenience wrapper module around the ec2 part of [`aws-lib`](https://github.com/livelycode/aws-lib).

## API
Exposes a function which takes an optional options object and a callback. The object should have the following properties set:

* `'accessKeyId'` *(string)* Your access key id for your aws account.
* `'secretAccessKey'` *(string)* Your secret access key for your aws account.

The function returns an array of meta data for the aws instances. Each object in the array have the following properties:

* `'ipAddress'` *(string)* The public ip address of the instance.
* `'privateIpAddress'` *(string)* The private ip address of the instance.
* `'name'` *(string)* The name of the instance.
* `'tagSet'` *(array)* Meta data in the form of an array of key value pairs. These tags and values are administred from the aws console.

## USAGE
```js
var getInstances = require('aws-instances')
var opts = {
  accessKeyId: 'LKSJO32I4809SAAOJ2L3M34',
  secretAccessKey: '234p900esdrgfwklok342o98er09g34ol5j345lj'
}
getInstances(opts, function(err, instances) {
  console.log(JSON.stringify(instances, null, 2))
})
```

Outputs:

```json
[
  {
    "ipAddress": "xyz.xyz.xyz.xyz",
    "privateIpAddress": "zyx.zyx.zyx.zyx",
    "name": "My Instance",
    "tagSet": [
      {
        "key": "Name",
        "value": "My Instance"
      },
      {
        "key": "foo",
        "value": "bar"
      }
    ]
  }
]
```
