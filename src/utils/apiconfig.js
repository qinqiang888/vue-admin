import es from "./fetch";

const env = ((process && process.env.NODE_ENV == 'development') || location.href.indexOf('dev') > -1) ? 'dev' : 'pro';
const port = process.env.NODE_ENV == 'development' ? '11990' : '80';
let shopUrlConfig = {
  //登录
  login: {
    dev: '10.50.8.13',
    pro: 'ark-api',
    path: 'account/slogin'
  },
  // 获取列表
  listProductSkus: {
    dev: '10.50.8.13',
    pro: 'ark-api',
    path: 'record/listProductSkus'
  },
  // 导出excel
  exportRecordExcel: {
    dev: '10.50.8.13',
    pro: 'ark-api',
    path: 'record/exportRecordExcel'
  },
  
  //导入excel
  importRecordExcel: {
    dev: '10.50.8.13',
    pro: 'ark-api',
    path: 'record/importRecordExcel.do'
  },
  //批量设置通过
  makeSkusPassBatch: {
    dev: '10.50.8.13',
    pro: 'ark-api',
    path: 'record/makeSkusPassBatch'
  },
  //订单申报查询
  declaration: {
    dev: '10.50.8.13',
    pro: 'ark-api',
    path: 'order/declaration'
  },
  //清关确认成功
  updateIns: {
    dev: '10.50.8.13',
    pro: 'ark-api',
    path: 'order/updateIns'
  },
  //清关确认失败
  updateInf: {
    dev: '10.50.8.13',
    pro: 'ark-api',
    path: 'order/updateInf'
  },
};

let getShopApiByName = (name) => {
  let apiObj = shopUrlConfig[name];
  let requestUrl;
  if (env == 'dev') {
    // if(process && process.env.NODE_ENV == 'development'){
    //   requestUrl = `/${apiObj.dev}/cctuser/login`
    // }else{
    requestUrl = `http://${apiObj.dev}:${port}/${apiObj['path']}`
    // }
  } else {
    requestUrl = `https://${apiObj.pro}.daweixinke.com:${port}/${apiObj['path']}`
  }
  return requestUrl;
}


export {
  getShopApiByName

};
