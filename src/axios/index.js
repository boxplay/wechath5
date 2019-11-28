import axios from 'axios'
import qs from 'qs'
import store from '@/store'
axios.defaults.changeOrigin = true;
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
	const token = store.state.user.access_token
	if(token){
		// config.url+='?access-token='+token
		config.headers.common['Authorization'] = 'Bearer '+token
	}

	config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
	if(config.method === 'post'){
		config.data = qs.stringify(config.data);
	}
	return config;
}, function (error) {
	alert(errot)
	// Do something with request error
	return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
	// Do something with response data
	if(response.status == '200'){
		return response.data.data;
	}else{
		return null;
	}
}, function (error) {
	// alert(error)
	// Do something with response error
	return Promise.reject(error);
});

export default{
	get(url,data){
		return new Promise(function(resolve,reject){
			axios.get(url,{'params':data}).then(function (response) {
			   	 resolve(response)
			  })
			  .catch(function (error) {
			     reject(error)
			  });
		})
	},
	post(url,data){
		return new Promise(function(resolve,reject){
			axios.post(url,data).then(function (response) {
			   	 resolve(response)
			  })
			  .catch(function (error) {
			     reject(error)
			  });
		})
	},
}
