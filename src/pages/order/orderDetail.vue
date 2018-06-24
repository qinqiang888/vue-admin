<template>  
    <el-main class="main">	
    <!--主体模块-->
        <el-row :gutter="16" class="orderDetail">
        <el-col :span="24" class="titleinfo"> <el-col :span="24"><div>订单详情</div></el-col></el-col>
        <el-col :span="24" class="titleinfo"> <el-col :span="18"><div style="border-bottom:1px solid #000">订单基本信息</div></el-col></el-col>

        <el-col :span="8"><div class="qq_detailInfo">订单号：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">下单时间：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">申报时间：</div></el-col>

        <el-col :span="8"><div class="qq_detailInfo">订单状态：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">订单备注：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">申报状态：</div></el-col>

        <el-col :span="8"><div class="qq_detailInfo">客户姓名：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">店铺名称：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">订单最后修改时间：</div></el-col>

        <el-col :span="8"><div class="qq_detailInfo">批次号：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">海关回执时间：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">是否调用出库单接口：</div></el-col>

        <el-col :span="24" class="titleinfo"> <el-col :span="18"><div style="border-bottom:1px solid #000">财务信息</div></el-col></el-col>

        <el-col :span="8"><div class="qq_detailInfo">订单总金额：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">商品总金额：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">运费：</div></el-col>

        <el-col :span="8"><div class="qq_detailInfo">支付总金额：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">优惠金额：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">税费：</div></el-col>

        <el-col :span="8"><div class="qq_detailInfo">支付方式：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">支付时间：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">支付账号：</div></el-col>

        <el-col :span="24" class="titleinfo"> <el-col :span="18"><div style="border-bottom:1px solid #000">物流信息</div></el-col></el-col>

        <el-col :span="8"><div class="qq_detailInfo">快递公司：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">快递单号：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">快递状态：</div></el-col>

        <el-col :span="8"><div class="qq_detailInfo">收件人姓名：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">收件人电话：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">联系人身份证号：</div></el-col>

        <el-col :span="8"><div class="qq_detailInfo">邮编：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo">详细地址：</div></el-col>
        <el-col :span="8"><div class="qq_detailInfo"></div></el-col>

        <el-col :span="24" class="titleinfo"> <el-col :span="18"><div style="border-bottom:1px solid #000">商品信息</div></el-col></el-col>

        </el-row>
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
            console.log(this.$route.params.id)
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
    .orderDetail{
        background:#fff;
        text-align: left;
    }
   .qq_detailInfo{
       padding:10px 0px;
   }
</style>
