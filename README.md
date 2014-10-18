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
* `'tags'` *(object)* Meta data object with key value pairs. These tags and values are administred from the aws console.
* `'online'` *(boolean)* `true` if the instance is online, otherwise `false`.

## USAGE
```js
var opts = {
  accessKeyId: 'LKSJO32I4809SAAOJ2L3M34',
  secretAccessKey: '234p900esdrgfwklok342o98er09g34ol5j345lj'
}
var getInstances = require('aws-instances')(opts)
getInstances(function(err, instances) {
  console.log(JSON.stringify(instances, null, 2))
})
```

Outputs:

```json
[
  {
    "ipAddress": "xyz.xyz.xyz.xyz",
    "privateIpAddress": "zyx.zyx.zyx.zyx",
    "tags": {
      "name": "My Instance"
    },
    "online": true
  }
]
```

## License

Copyright (c) 2014 Mic Network, Inc

This software is released under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
