<template>  
    <el-main class="main">	
    <!--主体模块-->
        <el-col :span="24" class="titleinfo"> <el-col :span="24"><div>保税区订单处理</div></el-col></el-col>
	    <el-col :span="16">
			<el-form :inline="true" :model="filters"  label-width="100px" label-position="left"  class="findbox">
				<el-form-item label="订单编号：">
					<el-input v-model="filters.orderSn" placeholder="订单编号"></el-input>
				</el-form-item>
				<el-form-item label="批次编号：">
					<el-input v-model="filters.batchSn" placeholder="批次编号"></el-input>
				</el-form-item>
				<el-form-item label="支付单号：">
					<el-input v-model="filters.paySn" placeholder="支付单号"></el-input>
				</el-form-item>
                <el-form-item label="清关状态：" >
                    <el-select v-model="filters.inStatus" placeholder="请选择清关状态">
                    <el-option label="所有" value="-1"></el-option>
                    <el-option label="清关成功" value="1"></el-option>
                    <el-option label="清关失败" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="快递公司：">
					<el-input v-model="filters.shippingCompay" placeholder="快递公司"></el-input>
				</el-form-item>
                <el-form-item label="物流单号：">
					<el-input v-model="filters.shippingSn" placeholder="物流单号"></el-input>
				</el-form-item>
                 <el-form-item label="是否出库：" >
                    <el-select v-model="filters.outStatus" placeholder="请选择是否出库">
                    <el-option label="所有" value="-1"></el-option>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="开始时间：">
					<el-date-picker v-model="filters.stime" type="date" placeholder="开始时间"  value-format="timestamp"></el-date-picker>
				</el-form-item>
                 <el-form-item label="结束时间：">
					<el-date-picker v-model="filters.etime" type="date" placeholder="结束时间"  value-format="timestamp"></el-date-picker>
				</el-form-item>
                
			</el-form>
		</el-col>
         <el-col :span="18">
			<el-form :inline="true" label-width="100px" label-position="left"  class="findbox">
             <el-form-item > <el-button type="primary" v-on:click="serach">查询</el-button></el-form-item>
            <el-form-item > <el-button type="primary" @click="reset">重置</el-button></el-form-item>
            <el-form-item ><el-button type="primary" v-on:click="updateIns" >清关确认成功</el-button></el-form-item>
             <el-form-item ><el-button type="primary" v-on:click="updateInf">清关确认失败</el-button></el-form-item>
            </el-form>
         </el-col>
        <el-col :span="24" style="padding:10px 0"> 
            <el-table
                ref="multipleTable"
                :data="tableData"
                v-loading.body="loading" 
                tooltip-effect="dark"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55"
                >
                </el-table-column>
                <el-table-column
                label="订单号"
                width="200">
                <template slot-scope="scope"><router-link :to="{name: 'orderDetail',params:{id:scope.row.orderSn}}"><el-button type="text">{{ scope.row.orderSn }}</el-button></router-link></template>
                </el-table-column>
                <el-table-column
                prop="paySn"
                label="支付单号"
                >
                </el-table-column>
                <el-table-column
                prop="transfeTime"
                label="报文传输时间"
                :formatter="FormDataTime"
                >
                </el-table-column>
                <el-table-column
                prop="batchSn"
                label="批次号"
                >
                </el-table-column>
                <el-table-column
                label="清关状态"
                >
                <template slot-scope="scope">{{ scope.row.inStatus==1 ? '清关成功' : '清关失败' }}</template>
                </el-table-column>
                <el-table-column
                prop="inTime"
                label="清关时间"
                 :formatter="FormDataTime"
                >
                </el-table-column>
                <el-table-column
                label="是否出库"
                >
                <template slot-scope="scope">{{ scope.row.outStatus==1 ? '是' : '否' }}</template>
                </el-table-column>
                <el-table-column
                prop="outtime"
                label="出库时间"
                :formatter="FormDataTime"
                >
                </el-table-column>
                <el-table-column
                label="快递公司"
                prop="shippingCompay"
                >
                </el-table-column>
                <el-table-column
                label="物流单号"
                prop="shippingSn"
                >
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
					orderSn:  '',
                    batchSn: '',
                    inStatus:'',
                    paySn:'',
                    shippingCompay:'',
                    shippingSn:'',
                    stime:0,
                    etime:0,
                    outStatus:''
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
                this.filters.orderSn='';
                this.filters.batchSn='';
                this.filters.paySn='';
                this.filters.inStatus=-1;
                this.filters.outStatus=-1;
                this.filters.shippingCompay='';
                this.filters.shippingSn='';
                this.filters.stime=0;
                this.filters.etime=0;
                this.pageData.page=1;
            },
            //获取列表
            getproductList() {
                let that=this;
                let data={
                    orderSn:this.filters.orderSn,
                    batchSn:this.filters.batchSn,
                    paySn:this.filters.paySn,
                    inStatus:this.filters.inStatus||-1,
                    shippingCompay:this.filters.shippingCompay,
                    shippingSn:this.filters.shippingSn,
                    outStatus:this.filters.outStatus||-1,
                    stime:this.filters.stime,
                    etime:this.filters.etime,
                    page:this.pageData.page,
                    rows:this.pageData.rows,
                    customStatus:-1
                }
                data='data='+JSON.stringify(data)
                this.$fetch.shopApi({
                    method:'post',
                    data:data,
                    path:'declaration'

                }).then(res => {
                    if(0==res.status){
                        that.tableData=res.data.resultList
                        that.pageData.total=res.data.total
                    }
                })
            },
            //清关确认失败
            updateInf(){
                let that=this,data=[];
                if(that.multipleSelection.length==0){
                    return this.$message({
                        message: '请勾选对应的订单号',
                        type: 'error'
                    });
                }
                that.multipleSelection.forEach(function(v,i){
                    data.push(v.id)
                   
                })
                 data='data='+JSON.stringify(data)
                 this.$fetch.shopApi({
                    method:'post',
                    data,
                    path:'updateInf'

                }).then(res => {
                    if(0==res.status){
                        this.$message({
                            message: '请求成功',
                            type: 'success'
                        });
                       that. getproductList()
                    }
                })
                
            },
            //清关确认成功
            updateIns(){
                let that=this,data=[];
                if(that.multipleSelection.length==0){
                    return this.$message({
                        message: '请勾选对应的订单号',
                        type: 'error'
                    });
                }
                that.multipleSelection.forEach(function(v,i){
                    data.push(v.id)
                   
                })
                 data='data='+JSON.stringify(data)
                console.log(data)
                this.$fetch.shopApi({
                    method:'post',
                    data,
                    path:'updateIns'

                }).then(res => {
                    if(0==res.status){
                        this.$message({
                            message: '请求成功',
                            type: 'success'
                        });
                        that. getproductList()
                    }
                })
            },
            toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
            },
            status(i,r){
                console.log(i,r)
            },
            handleSelectionChange(val) {
                console.log(val)
                this.multipleSelection = val;
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
