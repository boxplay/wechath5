import config from '@/wxconfig/index'
import axios from '@/axios';
// import wxjs from 'weixin-js-sdk';
let Wechat = {};
Wechat.getCode = function(url){
	const code = Wechat.getQuery('code')
	if(code){
		return code;
	}else{
		const appid = config.appid;
		const secret = config.secret;
		if(url == null) url = 'http://dubin.ngrok.wdevelop.cn/'
		var wurl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
		window.location.href = wurl
	}

}
Wechat.getQuery = name => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
      return unescape(r[2]);
  }
  return null;
}
Wechat.getWxSign = (url)=>{
	axios.get('/uploads/get-wechat-sign',{'params':{'url':url}}).then(res=>{
		const data = res.data
		wx.config({
		    debug: true, // 开启调试模式,
		    appId: data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
		    timestamp: data.timestamp, // 必填，生成签名的时间戳
		    nonceStr: data.nonceStr, // 必填，生成签名的随机串
		    signature: data.signature,// 必填，签名，见附录1
		    jsApiList: [
			    'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'chooseImage',

				'previewImage',

				'uploadImage',

				'downloadImage'
		    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		  });
	})
}
export default Wechat;
