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
        <el-col :span="5">
          <!-- //侧边栏 -->
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
                <el-input placeholder="请输入班级名称" v-model="search" class="input-with-select" clearable @clear="getclassList" style="border:1px solid #8a8a8a;border-radius:4px;"></el-input>
              </el-col>
              <el-col :span="4" :offset="1">
                <el-button @click="researchList" class="buttonA">查询</el-button>
              </el-col>
              <el-col :span=4 :offset="8">
                <el-button id="add" @click="addDialogVisible = true" class="buttonA">新增</el-button>
                
              </el-col>
            </el-row>
           
                <el-table :data="classList" style="width: 100%" :align="center" border :cell-style="cellStyle" :header-cell-style="rowClass">
                    <el-table-column type="index" label="#" width="100"></el-table-column>
                    <el-table-column prop="classname" label="班级名称" width="130"></el-table-column>
                    <el-table-column prop="cno" label="班级编号" width="130"></el-table-column>
                    <el-table-column prop="stuno" label="班级人数" width="130"></el-table-column>
                    <el-table-column prop="teacher" label="班主任" width="130"></el-table-column>
                    <el-table-column prop="operate" label="操作">
                      <template slot-scope="scope">
                        <!-- //修改按钮 -->
                        <el-button  type="primary" @click="showEditDialog(scope.row.cno)">修改</el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" @click="removeDialog(scope.row.classname)">删除</el-button>
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
        <el-form-item label="班级名称" prop="classname">
          <el-input v-model="addForm.classname"></el-input>
        </el-form-item>
        <el-form-item label="班级编号" prop="cno">
          <el-input v-model="addForm.cno"></el-input>
        </el-form-item>
        <el-form-item label="班级人数" prop="stuno">
          <el-input v-model="addForm.stuno"></el-input>
        </el-form-item>
        <el-form-item label="班主任" prop="teacher">
          <el-input v-model="addForm.teacher"></el-input>
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
         <el-form-item label="班级名称" prop="classname">
          <el-input v-model="editForm.classname"></el-input>
        </el-form-item>
        <el-form-item label="班级编号" prop="cno">
          <el-input v-model="editForm.cno" disabled></el-input>
        </el-form-item>
        <el-form-item label="班级人数" prop="stuno">
          <el-input v-model="editForm.stuno"></el-input>
        </el-form-item>
        <el-form-item label="班主任" prop="teacher">
          <el-input v-model="editForm.teacher"></el-input>
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
    classList:[],
    pagesize:5,
    pageindex:1,
    total:0,
    align:"",
    center:"center",
    pagerCount:"",
    startindex:'',
    endindex:'',
    search:"",
    addForm:{
      classname:'',
      cno:'',
      stuno:'',
      teacher:''
    },
    addFormRules:{
       classname:[
            {required:true, message:"请输入班级名称（**班）",trigger:"blur"},
            {min: 3, max:4, message:"请输入在长度3-4之间", trigger:"blur"}
          ],
        cno:[
          {required:true, message:"请输入班级编号（202003）",trigger:"blur"}
        ],
        stuno:[
          {required:true, message:"请输入班级人数",trigger:"blur"},
          {min: 2, max:3, message:"请输入在班级人数10-100之间", trigger:"blur"}
        ],
        teacher:[
          {required:true, message:"请输入教师名称",trigger:"blur"},
          {min: 2, max:4, message:"请输入在长度2-4之间", trigger:"blur"}
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
    this.getclassList()
  },
  methods:{
    getclassList(){
      axios.get('/api/class',{
        params:{
          pageindex:this.pageindex,
          pagesize:this.pagesize,
          
        }
      }).then(res=>{
        // console.log(res)
        this.classList= res.data.list
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
    researchList(){
    // this.$message({
    //   message:'查询班级名称为'+this.search+'的班级信息',
    //   type:'success'
    // })
    var finder = this.classList.filter(item=>item.classname.includes(this.search))
    this.classList = finder
    // console.log(this.classList.filter(item=>item.classname.includes(this.search)))
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
       axios.get('/api/class ',{
        params:{
          pageindex:this.pageindex,
          pagesize:this.pagesize,
          
        }
      }).then(res=>{
        console.log(res)
        this.classList= res.data.list
        this.total = res.data.total
      })
    },
    //监听
      addDialogClosed(){
      this.$refs.addFormRef.resetFields()
      },
      //新增
      addUser(){
     
      this.$refs.addFormRef.validate(async valid =>{
        // console.log(valid)
        if(!valid) return;
        // 可以发起添加信息的请求
        axios.post('/api/classadd',
        {
          classname:this.addForm.classname,
          cno:this.addForm.cno,
          stuno:this.addForm.stuno,
          teacher:this.addForm.teacher
          }).then(res=>
          {
            console.log(res)
            this.getclassList()
              //重新获取列表里的数据信息
             this.addDialogVisible=false
            
          }
            
        ).catch(error=>{          
            console.log(err)
            })
        })
      },
       // 修改信息的对话框
    showEditDialog(cno){
      // console.log(classname)
      axios.post('/api/classmodify',{
        cno
      }).then(res=>{
        for(var i =0;i<res.data.list.length;i++){
          if(res.data.list[i].cno == cno){
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
        axios.post('/api/classmodified',{
          classname:this.editForm.classname,
          cno:this.editForm.cno,
          stuno:this.editForm.stuno,
          teacher:this.editForm.teacher
        }).then(res=>{
          console.log(res.data)
          this.getclassList()
          this.editDialogVisible = false;
        })
      })
    },
       // 删除功能
    async removeDialog(classname){
      //弹框
      await this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res=>{
          console.log(res)
          axios.post('/api/classdel',{classname}).then(res=>{
            console.log(res)
            this.getclassList()
          }).catch(err=>{
            console.log(err)
          })
          
        }).catch(error => {
        this.$message.error('已取消删除')
        })
    }
  }
}
</script>
<style scoped>
a{
  text-decoration: none;
}
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

.grid-content-aside {
  opacity: 0.5;
  filter:alpha(opacity=50)
}
.grid-content-main{
  height: 448px;
}
.el-menu-item{
  text-align: center;
}
.buttonA{
  width:100%;
  background-image: linear-gradient(#e6e6e6, #cccccc);
  background-image: -o-linear-gradient(#e6e6e6, #cccccc);
  background-image: -moz-linear-gradient(#e6e6e6, #cccccc);
  background-image: -webkit-linear-gradient(#e6e6e6, #cccccc);
}
.el-main{
  width:100%;
  height:90%;
  margin:0 auto;
}
.el-table{
  margin-top:-10px;
}
.block{
  position: relative;
  margin-left:71%;
}
.block >>> button{
  background-size: contain;
  background-image: linear-gradient(#e6e6e6, #cccccc);
  background-image: -o-linear-gradient(#e6e6e6, #cccccc);
  background-image: -moz-linear-gradient(#e6e6e6, #cccccc);
  background-image: -webkit-linear-gradient(#e6e6e6, #cccccc);
} 
.block >>> .el-pager li{
  background-image: linear-gradient(#e6e6e6, #cccccc);
  background-image: -o-linear-gradient(#e6e6e6, #cccccc);
  background-image: -moz-linear-gradient(#e6e6e6, #cccccc);
  background-image: -webkit-linear-gradient(#e6e6e6, #cccccc);
 
}
.block >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0672C4 !important;
}
.el-input:focus{
  outline:none; 
  border:1px solid #8a8a8a;
}
</style>
