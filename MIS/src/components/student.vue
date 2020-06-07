<template>
  <div id="app">
    <header>
      <el-row>
        <header-content></header-content>
        
      </el-row>
    </header>
    <main>
    <el-row :gutter="20">
      <aside>
        <!-- 侧边栏 -->
        <el-col :span="5"> 
          <div class="grid-content-aside bg-purple">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
            <router-link to="/">
            <el-menu-item index="1">
              <span slot="title">班级信息</span>
            </el-menu-item>
            </router-link>
            <el-menu-item index="4">
              <span slot="title"><router-link to="/student">学生信息</router-link></span>
            </el-menu-item>
          </el-menu>
          </div>
        </el-col>
      </aside>
        <el-col :span="18">
        <el-card>
        <div class="grid-content-main bg-purple">
          <el-main>  
            <el-row>
              <el-col :span="7">
                <el-input placeholder="请输入学生姓名" v-model="search" class="input-with-select" clearable @clear="getstudentList" style="border:1px solid #8a8a8a;border-radius:4px;"></el-input>
              </el-col>
              <el-col :span="4" :offset="1">
                <el-button @click="researchList" class="buttonA">查询</el-button>
              </el-col>
              <el-col :span=4 :offset="8">
                <el-button id="add" @click="addDialogVisible = true" class="buttonA">新增</el-button> 
              </el-col>
            </el-row>
                <el-table :data="studentList" style="width: 100%" :align="center" border :cell-style="cellStyle" :header-cell-style="rowClass">
                    <el-table-column type="index" label="#" width="100"></el-table-column>
                    <el-table-column prop="stuid" label="学号" width="100"></el-table-column>
                    <el-table-column prop="stuname" label="姓名" width="100"></el-table-column>
                    <el-table-column prop="stusex" label="性别" width="100"></el-table-column>
                    <el-table-column prop="stutel" label="手机号" width="110"></el-table-column>
                    <el-table-column prop="studate" label="出生日期" width="100"></el-table-column>       
                    <el-table-column prop="stuclass" label="所属班级" width="100"></el-table-column>
                    <el-table-column prop="operate" label="操作">
                      <template slot-scope="scope">
                        <!-- //修改按钮 -->
                        <el-button type="primary" @click="showEditDialog(scope.row.stuid)">修改</el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" @click="removeDialog(scope.row.stuid)">删除</el-button>                      
                      </template>
                    </el-table-column>
                </el-table>
            
          </el-main>
              <div class="block">
                <el-pagination
                  small
                  background
                  :page-size="pagesize"
                  :pager-count="5"
                  layout="prev, pager, next"
                  @size-change="sizeChange"
                  @current-change="currentChange"
                  :current-page="pageindex"
                  :total="total">
                </el-pagination>
                <!-- prev上一页 next下一页 pager页码列表 jumper跳页元素 total总条数 size每页显示的页码数量 size-change页码大小 current-change当前页变动的 -->
              </div>
        </div>
      </el-card>
      </el-col>
    </el-row>
</main>
<el-dialog title="添加信息" :visible.sync="addDialogVisible"  width="50%" @close="addDialogClosed"> 
  <!-- 对话框内容 -->
  <el-row>
    <el-col :span="13">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
        <el-form-item label="学号" prop="stuid">
          <el-input v-model="addForm.stuid"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="stuname">
          <el-input v-model="addForm.stuname"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="stusex">
          <el-input v-model="addForm.stusex"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="stutel">
          <el-input v-model="addForm.stutel"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="studate">
            <el-input v-model="addForm.studate"></el-input>
        </el-form-item>
         <el-form-item label="所属班级" prop="stuclass">
            <el-input v-model="addForm.stuclass"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <!-- 添加对话框按钮 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible=false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>
<!-- 修改信息对话框 -->
<el-dialog
  title="修改信息"
  :visible.sync="editDialogVisible"
  width="50%">
  <!-- 修改信息对话框内容 -->
  <el-row>
    <el-col :span="13">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="90px">
        <el-form-item label="学号" prop="stuid">
          <el-input v-model="editForm.stuid" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="stuname">
          <el-input v-model="editForm.stuname"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="stusex">
          <el-input v-model="editForm.stusex"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="stutel">
          <el-input v-model="editForm.stutel"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="studate">
            <el-input v-model="editForm.studate"></el-input>
        </el-form-item>
         <el-form-item label="所属班级" prop="stuclass">
            <el-input v-model="editForm.stuclass"></el-input>
        </el-form-item>
    </el-form>
    </el-col>
  </el-row>
  <!-- 修改信息对话框按钮 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editFormInfo()">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
import '../mock/index.js'

export default {
  
  data(){
    return{
      studentList:[
     
    ],
    // researchList:[],
    pagesize:5,
    pageindex:1,
    total:0,
    align:"",
    center:"center",
    pagerCount:"",
    startindex:'',
    endindex:'',
    //列表搜索数据
    search:"",
    addForm:{
      stuid:'',
      stuname:'',
      stusex:'',
      stutel:'',
      studate:'',
      stuclass:''
    },
    addFormRules:{
       stuid:[
            {required:true, message:"请输入学号（如20220101）",trigger:"blur"},
            {min: 8, max:8, message:"请输入在长度8之间", trigger:"blur"}
          ],
        stuname:[
          {required:true, message:"请输入姓名（王晓红）",trigger:"blur"}
        ],
        stusex:[
          {required:true, message:"请输入性别",trigger:"blur"}
        ],
        stutel:[
          {required:true, message:"请输入手机号",trigger:"blur"},
          {min: 11, max:11, trigger:"blur"}
        ],
        studate:[
          {required:true,message:'请输入如（20200101）',trigger:'blur'}
        ],
        stuclass:[
          {required:true,message:'请输入如（201802）',trigger:'blur'}
        ]
    },
    //添加对话框的显示与隐藏 
      addDialogVisible:false,
      //修改信息
      editForm:{},
      //修改信息的规则
      editFormRules:{},
      //修改对话框的显示与隐藏
      editDialogVisible:false
    }
  },
  created(){
    this.getstudentList()
  },
  methods:{
    getstudentList(){
      axios.get('/api/mis',{
        params:{
          pageindex:this.pageindex,
          pagesize:this.pagesize,
          
        }
      }).then(res=>{
        console.log(res)
        this.studentList= res.data.list
        this.total = res.data.total
      })
    },
     handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
    cellStyle({row,column,rowIndex,columnIndex}){
      return "text-align:center";
    },
    rowClass({row,rowIndex}){
      return "text-align:center";
    },
      //查询
    researchList(){s
      var stufinder = this.studentList.filter(item=>item.stuname.includes(this.search))
    this.studentList = stufinder
      
  },
   //每页数据条数改变事件
    sizeChange(pagesize){
      this.pagesize=pagesize
      console.log(this.pagesize)
    },
  //当前页数据改变事件
    currentChange(pageindex){
      console.log(pageindex)
      console.log(this.pageindex)
      this.pageindex = pageindex
      console.log(this.pageindex)
       axios.get('/api/mis',{
        params:{
          pageindex:this.pageindex,
          pagesize:this.pagesize,
          
        }
      }).then(res=>{
        console.log(res)
        this.studentList= res.data.list
        this.total = res.data.total
      })
    },
    //监听添加对话框的关闭事件
      addDialogClosed(){
      this.$refs.addFormRef.resetFields()
      },
      //新增
      addUser(){
     
      this.$refs.addFormRef.validate(async valid =>{
        // console.log(valid)
        if(!valid) return;
        // 可以发起添加信息的请求
       
        await axios.post('/api/add',
        {
          stuid:this.addForm.stuid,
          stuname:this.addForm.stuname,
          stusex:this.addForm.stusex,
          stutel:this.addForm.stutel,
          studate:this.addForm.studate,
          stuclass:this.addForm.stuclass
          }).then(res=>
          {
            console.log(res)
            this.getstudentList()
            this.addDialogVisible=false
            
          }
            
        ).catch(error=>{          
            console.log(err)
            })
        })
      },
       // 修改信息的对话框
    showEditDialog(stuid){
     
      axios.post('/api/modify',{
        stuid
      }).then(res=>{
        for(var i =0;i<res.data.list.length;i++){
          if(res.data.list[i].stuid == stuid){
            break
            return i
          }
        }
        
        this.editDialogVisible = true
        this.editForm = res.data.list[i]

      }).catch(error=>{
        console.log(error)
      })
      
      
    },
    //修改信息的‘确定’按钮执行
    editFormInfo(){
      this.$refs.editFormRef.validate(valid=>{
        console.log(valid)
        if(!valid) return 
        //发起修改请求
        axios.post('/api/modified',{
          stuid:this.editForm.stuid,
          stuname:this.editForm.stuname,
          stusex:this.editForm.stusex,
          stutel:this.editForm.stutel,
          studate:this.editForm.studate,
          stuclass:this.editForm.stuclass
        }).then(res=>{
          console.log(res.data)
          this.getstudentList()
          this.editDialogVisible = false;
        })
      })
    },
       // 删除功能
    removeDialog(stuid){
      //弹框
       this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res=>{
          // console.log(res)
          axios.post('/api/del',{stuid}).then(res=>{
            console.log(res.data)
            // console.log(stuid)
            this.getstudentList()
          }).catch(err=>{
            console.log(err)
          })
          
        })
        .catch(error => {
        this.$message.error('已取消删除')
        })
    }
  }
}
</script>
<style scoped>
#app{
  /* background: red; */
  width:98%;
  height:100%;
  margin: 0 auto;
}
.el-row {
    margin-bottom: 30px;
  }

.bg-purple-light {
  background: #e5e9f2;
}


.grid-content-main{
  
  height: 448px;
  
}
.el-menu-item{
  text-align: center;
}
.el-main{
  width:100%;
  height:96%;
  margin:0 auto;
  overflow-y: hidden;
}
.el-table{
  margin-top:-10px;
}
.el-input:focus{
  outline:none; 
  border:1px solid #8a8a8a;
}
</style>
