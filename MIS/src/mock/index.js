import Mock from 'mockjs'
import {getQueryParameters} from "../util/util"
import Axios from 'axios'

var {classList} = Mock.mock({
    'classList|44-50':[
        {
            classname:'@cword(2)'+'班',//随机生成班级名称
            cno:'@date("yyyymm")',//随机生成班级编号
            stuno:'@integer(42, 65)',//随机生成班级人数
            teacher:'@cname()'//随机生成老师名称
        }
    ]
})

Mock.mock(/\/api\/class/,'get',(options)=>{
    const paramObj = getQueryParameters(options)
    // const totalCount = 80
    //分页设置
    const pageindex = getQuery(options.url,'pageindex')
    const pagesize = getQuery(options.url,'pagesize')
    //数据的起始位置：(pageindex -1)* pagesize，数据的结束位置：pageindex*pagesize -1
    const startindex = (pageindex -1 ) * pagesize;
    const endindex = pageindex * pagesize -1;
    //计算总页数取整
    const totalPage = Math.ceil(classList.length/pagesize)

    const pagelist = pageindex>totalPage?[]:classList.slice(startindex,endindex)
    console.log(pageindex)
    console.log(pagelist)
    return {
        status:200,
        msg:'获取数据成功',
        list:pagelist,
        total:classList.length
    }
})
//add
Mock.mock(/\/api\/classadd/,"post",(options)=>{
    const body = JSON.parse(options.body)
    console.log(body)
    classList.unshift(Mock.mock({
        classname:body.classname,
        cno:body.cno,
        stuno:body.stuno,
        teacher:body.teacher
    }))
    return {
        status:200,
        message:'添加成功',
        list:classList,
        total:classList.length
    }
})
// 修改
Mock.mock(/\/api\/classmodify/,"post",(options)=>{
    console.log(options)
    const body = JSON.parse(options.body)
    console.log(body)
    const index = classList.findIndex(item =>{
        return item.cno === body.cno
    })
    console.log(index)
    var position = index
    return {
        status:200,
        message:'修改请求成功',
        list:classList,
        total:classList.length
    }
})
Mock.mock('/api/classmodified',"post",(options)=>{
    console.log(options)
    const body = JSON.parse(options.body)
    // classList[position].replace(this.editForm)
    const index = classList.findIndex(item =>{
        return item.cno === body.cno
    })
    console.log(index)
    classList[index]=body
    console.log(body)
    return {
        status:200,
        message:'修改成功',
        list:classList,
        total:classList.length
    }
})
//删除
Mock.mock(/\/api\/classdel/,"post",(options)=>{
    // studentList.pop()
    console.log(options)
    const body = JSON.parse(options.body)
    console.log(body)
    const index = classList.findIndex(item =>{
        return item.classname === body.classname
    })
    classList.splice(index,1)
    console.log(index)
    // console.log(classList)
    return {
        status:200,
        message:'删除成功',
        list:classList,
        // list:studentList,
        total:classList.length
    }
})
var {studentList} = Mock.mock({
   'studentList|70-80':[
       {
        'stuid':'@date("yyyymmss")',
        'stuname':'@cname()',
        'stusex|1':["男","女"],
        'stutel':/^1[385][1-9]\d{8}/,
        'studate':'@date("yyyymmss")',
        'stuclass':'@date("yyyymm")'
       }
   ]
})
//获取分页设置，query，封装方法
const getQuery = (url,name)=>{
    console.log(url,name)
    const index = url.indexOf('?')
    if(index !== -1){
        const queryStr = url.substr(index + 1).split('&')
        // console.log(queryStr)
        for(var i =0;i<queryStr.length;i++){
            const item = queryStr[i].split('=')
            // console.log(item)
            if(item[0] === name){
                return item[1]
            }
        }
    }
    // console.log(index)
    return null
}
Mock.mock(/\/api\/mis/,'get',(options)=>{
    const paramObj = getQueryParameters(options)
    // const totalCount = 80
    //分页设置
    const pageindex = getQuery(options.url,'pageindex')
    const pagesize = getQuery(options.url,'pagesize')
    //数据的起始位置：(pageindex -1)* pagesize，数据的结束位置：pageindex*pagesize -1
    const startindex = (pageindex -1 ) * pagesize;
    const endindex = pageindex * pagesize -1;
    //计算总页数取整
    const totalPage = Math.ceil(studentList.length/pagesize)

    const pagelist = pageindex>totalPage?[]:studentList.slice(startindex,endindex)
    // console.log(pageindex)
    // console.log(pagesize)
    return {
        status:200,
        msg:'获取数据成功',
        list:pagelist,
        total:studentList.length
    }
})
//student添加
Mock.mock('/api/add',"post",(options)=>{
    const body = JSON.parse(options.body)
    studentList.unshift(Mock.mock({
        stuid:body.stuid,
        stuname:body.stuname,
        stusex:body.stusex,
        stutel:body.stutel,
        studate:body.studate,
        stuclass:body.stuclass
    }))
    return {
        status:200,
        message:'添加成功',
        list:studentList,
        total:studentList.length
    }
})
// 修改
Mock.mock('/api/modify',"post",(options)=>{
    console.log(options)
    const body = JSON.parse(options.body)
    console.log(body)
    const index = studentList.findIndex(item =>{
        return item.stuid === body.stuid
    })
    // studentList.splice(index,1)
    console.log(index)
    var position = index
    return {
        status:200,
        message:'修改请求成功',
        list:studentList,
        total:studentList.length
    }
})
Mock.mock('/api/modified',"post",(options)=>{
    console.log(options)
    const body = JSON.parse(options.body)
    const index = studentList.findIndex(item =>{
        return item.stuid === body.stuid
    })
    console.log(index)
    studentList[index] = body
    console.log(body)
    return {
        status:200,
        message:'修改成功',
        list:studentList,
        total:studentList.length
    }
})
//删除
Mock.mock('/api/del',"post",(options)=>{
    // studentList.pop()
    console.log(options)
    const body = JSON.parse(options.body)
    console.log(body)
    const index = studentList.findIndex(item =>{
        return item.stuid === body.stuid
    })
    console.log(index)
    studentList.splice(index,1)
    
    return {
        status:200,
        message:'删除成功',
        list:studentList,
        // list:studentList,
        total:studentList.length
    }
})
