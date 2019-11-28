import axios from '@/axios'
const baseApiUrl = 'http://mac.ngrok.wdevelop.cn';
const restVersion = '/back';
const fullApiUrl = restVersion;
let httpReq = {}
export default httpReq = {
  getActivityList(data){
      return axios.get(fullApiUrl+'/activity/index',data)
  },
  //修改活动状态
  updateStatus(data){
    return axios.post(fullApiUrl+'/activity/update-status',data)
  },
  // 上传活动图片
  uploadImg(data){
    return axios.post(fullApiUrl+'/upload/upload-image',data)
  }
}
