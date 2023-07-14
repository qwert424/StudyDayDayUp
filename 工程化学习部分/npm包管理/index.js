const Mock = require('mockjs')
const x = Mock.mock({
    name: '@cname'
})
console.log(x);
const _ = require('lodash')
const arr = _.chunk([1, 2, 3, 4, 5], 2)
console.log(arr)

require('lodash').chunk()
