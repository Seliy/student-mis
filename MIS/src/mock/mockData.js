const Mock = require('mockjs')
let id = Mock.mock('@id')
// console.log(id)

var obj = Mock.mock({
    // id:'@id()',
    // cname:'@cword(2)',//随机生成班级名称
    // cno:'@date("yyyymm")',//随机生成班级编号
    // stuno:'@integer(42, 65)',//随机生成班级人数
    // teacher:'@cname()'//随机生成老师名称
    'stuid':'@date("yyyymmss")',
    'stuname':'@cname()',
    'stusex|1':["男","女"],
    'stutel':/^1[385][1-9]\d{8}/,
    'studate':'@date("yyyymmss")',
    'stuclass':'@date("yyyymm")'
})
console.log(obj)