<template>  
    <el-main class="main">	
    <!--主体模块-->
        <el-col :span="24" class="titleinfo"> <el-col :span="6"><div>商品备案信息</div></el-col></el-col>
	    <el-col :span="24">
			<el-form :inline="true" :model="filters"  label-width="80px" label-position="left"  class="findbox">
				<el-form-item label="商品id：">
					<el-input v-model="filters.skusId" placeholder="商品id"></el-input>
				</el-form-item>
				<el-form-item label="品牌：">
					<el-input v-model="filters.brand" placeholder="品牌"></el-input>
				</el-form-item>
                <el-form-item label="备案状态：" label-width="100px">
                    <el-select v-model="filters.record" placeholder="请选择备案状态">
                    <el-option label="所有" value=""></el-option>
                    <el-option label="已备案" value="1"></el-option>
                    <el-option label="未备案" value="0"></el-option>
                    <el-option label="备案失败" value="2"></el-option>
                    </el-select>
                </el-form-item>
			</el-form>
		</el-col>
        <el-col :span="24">
			<el-form :inline="true" label-width="100px" label-position="left"  class="findbox">
             <el-form-item > <el-button type="primary" v-on:click="serach">查询</el-button></el-form-item>
            <el-form-item > <el-button type="primary" @click="reset">重置</el-button></el-form-item>
            <el-form-item ><el-button type="primary" v-on:click="makeSkusPassBatch" :disabled="multipleSelection.length==0" >批量设置案例通过</el-button></el-form-item>
            <el-form-item ><el-button type="primary" v-on:click="exportInfo">商品备案信息excel导出</el-button></el-form-item>
             <el-form-item ><el-button type="primary" style="position:relative">
            <input type="file"  v-on:change="importInfo"  style="opacity:0; width:100%;height:100%;position:absolute; top:0;left:0"/>商品备案信息Excel上传
            </el-button></el-form-item>
            </el-form>
         </el-col>
        <el-col :span="24" style="padding:10px 0"> 
            <el-table
                ref="multipleTable"
                :data="tableData"
                v-loading.body="loading" 
                tooltip-effect="dark"
                :disabled="multipleSelection.length==0"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55"
                :selectable='checkboxInit'
                >
                </el-table-column>
                <el-table-column
                label="商品ID"
                width="120">
                <template slot-scope="scope">{{ scope.row.skuId }}</template>
                </el-table-column>
                <el-table-column
                prop="description"
                label="商品名称"
                width="300">
                </el-table-column>
                <el-table-column
                prop="brandName"
                label="品牌"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="price"
                label="备案价格"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="hsCode"
                label="HS编码"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="packType"
                label="包装类型"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="unitType"
                label="计量单位"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="recordStatusStr"
                label="备案状态"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                label="备案通过时间"
                prop="ptime"
                :formatter="FormDataTime"
                show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </el-col>
        <!--分页-->
        <template v-if="pageData.total>0">
        <el-col :span="24">
           <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageData.page"
            :page-size="pageData.rows"
            :page-sizes="[10, 15, 20]"
            layout="total,sizes, prev, pager, next, jumper"
            :total="pageData.total">
            </el-pagination>
        </el-col>
        </template>
    </el-main>

</template>

<script>
    export default {
        name: "home",
        data() {
			return {
				filters: {
					skusId:  '',
                    brand: '',
                    record:''
				},
                sysName:'admin',
				loading: false,
				users: [
				],
                //上传的文件
                file:'',
                tableData: [],
                 multipleSelection: [],
                 skuIdData:[],//批量通过skuId数据
                 //分页相关数据
                 pageData:{
                    page:1,//当前页
                    rows:10,//..每页显示条目,
                    total:''
                 }
			}
		},
        created(){
          this.getproductList()
        },
        methods: {
            //查找
            serach() {
                this.pageData.page=1;
                this.getproductList()
            },
            //重置
            reset() {
                this.filters.skusId='';
                this.filters.brand='';
                this.filters.record='';
            },
            //获取商品列表
            getproductList() {
                let that=this;
                let data={
                    skusId:this.filters.skusId,
                    brandName:this.filters.brand,
                    recordStatus:this.filters.record,
                    page:this.pageData.page,
                    rows:this.pageData.rows
                }
                this.$fetch.shopApi({
                    method:'get',
                    data,
                    path:'listProductSkus'

                }).then(res => {
                    if(0==res.status){
                        that.tableData=res.data.rows
                        that.pageData.total=res.data.total
                    }
                })
            },
            //导出
            exportInfo(){
                let data={
                    skusId:this.filters.skusId,
                    brandName:encodeURI(encodeURI(this.filters.brand)),
                    recordStatus:this.filters.record,
                }
                if(!this.filters.skusId && !this.filters.brand && !this.filters.record){
                     this.$message({
                        message: '请选择要导出的记录',
                        type: 'error'
                    });
                    return 
                }
                 this.$fetch.shopApi({
                    method:'get',
                    data,
                    path:'exportRecordExcel'
                    

                }).then(res => {
                    console.log(res)
                })
                // window.location.href = 'http://10.50.8.13:11990/' + "/record/exportRecordExcel?skuId=" + this.filters.skusId + "&brandName=" + encodeURI(encodeURI(this.filters.brand)) + "&recordStatus=" + this.filters.record;
            },
    
            //导入
            importInfo(e){
                let file = e.target.files[0];           
                let param = new FormData(); //创建form对象
                param.append('file',file,file.name);//通过append向form对象添加数据
                if(!file){
                    this.$message({
                    message: '请选择要上传的文件',
                    type: 'error'
                    });
                    return;
                }
                 this.$fetch.uploadApi(
                    'post',
                     param,
                    'importRecordExcel'

                ).then(res => {
                    if(res.status==0){
                         this.$message({
                        message: '上传成功',
                        type: 'success'
                        });
                    }
                }) 
            },
            //批量设置通过
            makeSkusPassBatch(){
                let that=this,data=[];
                that.multipleSelection.forEach(function(v,i){
                    data.push(v.skuId)
                   
                })
                data=JSON.stringify(data)
                this.$fetch.shopApi({
                    method:'post',
                    data,
                    path:'makeSkusPassBatch',
                    headers:{"Content-type":"application/json; charset=utf-8"}
                }).then(res => {
                    if(0==res.status){
                        this.$message({
                        message: res.data.message,
                        type: 'success'
                        });
                    }
                })
            },
            status(i,r){
                console.log(i,r)
            },
            handleSelectionChange(val) {
                console.log(1111111111)
                this.multipleSelection = val;
                console.log(this.multipleSelection.length)
            },
            //分页
             handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageData.rows=val;
                this.getproductList();
            },
            // 分页--当前页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageData.page=val;
                this.getproductList();
            },
            //时间转换
            FormDataTime(row, column){
                let timeStamp = row[column.property];  
                if (timeStamp == undefined) {  
                    return  "";  
                }  
                let date = new Date();  
                date.setTime(timeStamp * 1000);  
                let y = date.getFullYear();      
                let m = date.getMonth() + 1;      
                m = m < 10 ? ('0' + m) : m;      
                let d = date.getDate();      
                d = d < 10 ? ('0' + d) : d;  
                return y + '-' + m + '-' + d
            },
            //是否备案通过，初始化控制选项框
            checkboxInit(row,index){
                return row.recordStatus!=1
            }
        }
    }
    
</script>

<style scoped>
	.header {
        height: 60px;
        line-height: 60px;
        background: #312f2f;
        color:#fff;
    }
    .logo {
        width:100%;
        height:60px;
        line-height:60px;
        font-size: 22px;
        text-align:center;
        background:#312f2f;
        color:#fff;
    }
    .userInfo{
        color:#fff;
      
    }
    .findbox{
        float:left;
    }
     .myCell{
           opacity:0;
        }
</style>
