import store from '@/store/index'
const Storage = window.localStorage;
export default{
	getStorage(){
		var user = Storage.getItem('user');
		if(user != null){
			return JSON.parse(user).user;
		}
		return null;

	},
	setStorage(data){
		if(data){
			if(data.profile.sex){
				if(data.profile.sex == 1){
					data.profile.sex ='男'
				}else if(data.profile.sex == 2){
					data.profile.sex ='女'
				}else{
					data.profile.sex == '未知'
				}
			}
			const userData = {
				user:{
						id:data.id,
						username:data.username,
						profile:{
							headimgurl:data.profile.headimgurl,
							birth_year:data.profile.birth_year,
							birth_month:data.profile.birth_month,
							birth_day:data.profile.birth_day,
							bio:data.profile.bio,
							sex:data.profile.sex,
							occupation:data.profile.occupation
						},
						mobile:data.mobile,
						wechat_id:data.wechat_id,
						access_token:data.access_token

					},
				isLogin:true
			}

			store.commit('setUser',userData.user);
			Storage.setItem('user',JSON.stringify(userData));
			return true;
		}
		return false;
	},
	setUser(data){
		if(data){
			const userData = {
				user:{
						id:data.id,
						username:data.username,
						profile:{
							headimgurl:data.profile.headimgurl,
							birth_year:data.profile.birth_year,
							birth_month:data.profile.birth_month,
							birth_day:data.profile.birth_day,
							bio:data.profile.bio,
							sex:data.profile.sex,
							occupation:data.profile.occupation
						},
						mobile:data.mobile,
						wechat_id:data.wechat_id,
						access_token:data.access_token,
					},
				isLogin:true
			}
			console.log(userData)
			Storage.setItem('user',JSON.stringify(userData));
			return true;
		}
		return false;
	},
	setUrl(type,url){
		type = type.toString()
		var have_url = Storage.getItem(type);
		if(!have_url || have_url ==null){
			Storage.setItem(type,url);
		}
	},
	getUrl(type){
		type = type.toString()
		var url = Storage.getItem(type);
		return url;
	},
	setObj(type,data){
		type = type.toString()
		var have_url = Storage.getItem(type);
		if(!have_url || have_url ==null){
			Storage.setItem(type,JSON.stringify(data));
		}
	},
	getObj(type){
		type = type.toString()
		var url = Storage.getItem(type);
		return JSON.parse(url);
	},
	delUrl(type){
		type = type.toString()
		Storage.removeItem(type);
	}
}
