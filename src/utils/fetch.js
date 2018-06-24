import {getShopApiByName} from './apiconfig';
import axios from 'axios';
import fns from "./apiconfig";
let md5 = require('md5');

/**
 * 请求商城团队接口（dwxk）
 * @param method [post||get]
 * @param data [参数]
 * @param path [apiName]
 * @param responseType []
 * @returns {Promise<AxiosResponse<any>>}
 */
//业务接口
let shopApi = ({method = 'post', data = {}, path, responseType = 'json',headers}) => {
  if (!path) {
    throw new Error('缺少请求地址');
  }
  let requestUrl = getShopApiByName(path);
  let header=headers ? headers : {'Content-Type': 'application/x-www-form-urlencoded;'}
//   let commonParams = setCommonParams(data);
  if (method.toUpperCase() === 'GET') {
    requestUrl = requestUrl.indexOf('?') > -1 ? requestUrl + '&' + new URLSearchParams({...data})
      : requestUrl + '?' + new URLSearchParams({...data});
  }
  //导出excel
  if(path=='exportRecordExcel'){
    return window.location.href=requestUrl;
  }
  return axios({
    method: method,
    url: requestUrl,
    data: method.toUpperCase() === 'GET' ? null : data,
    responseType: responseType,
    // headers:{
    //   // 'Content-Type': 'application/x-www-form-urlencoded;'
    //   "Content-type":"application/json; charset=utf-8"
    // },
    headers:header,
    // withCredentials: true
  }).then(res => {
    return res.data;
  }, error => {
    throw error
  })
};
//上传文件接口
let uploadApi = (method = 'post', data = {}, path,responseType='json') => {
  if (!path) {
    throw new Error('缺少请求地址');
  }
  let requestUrl = getShopApiByName(path);
//   let commonParams = setCommonParams(data);
  if (method.toUpperCase() === 'GET') {
    requestUrl = requestUrl.indexOf('?') > -1 ? requestUrl + '&' + new URLSearchParams({...data})
      : requestUrl + '?' + new URLSearchParams({...data});
  }
  return axios({
    method: method,
    url: requestUrl,
    data: method.toUpperCase() === 'GET' ? null : data,
    responseType: responseType,
    headers:{
      "Content-type":"multipart/form-data"
    },
    // withCredentials: true
  }).then(res => {
    return res.data;
  }, error => {
    throw error
  })
};

const es = {
  shopApi,
  uploadApi
};
export default es;
