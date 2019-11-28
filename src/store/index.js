import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/axios';
import storage from '@/storage'
// 需要注册vuex到vue中
Vue.use(Vuex);

// 使用 es6 语法把vuex的实例对象输出
export default new Vuex.Store({
	state:{
		user:{
			id:'',
			username:'admin',
			profile:{
				headimgurl:'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq2JQwdQa5mEWKvPvb3oWuChbALnnH5SibsHozDoMc2Yw1KUJoOwDKKiaMLIR5fhEse2Xz1CRHeSSwA/132',
				birth_year:'1992',
				birth_month:'10',
				birth_day:'05',
				bio:'',
                occupation:'',
                sex:''
			},
			mobile:'',
			wechat_id:'',
			access_token:'',
            is_founder:0
		},
		isLogin:false
	},
	mutations: {
        changeUser(state,item){
            var data;
            console.log(item)
        	switch(item.type){
        		case 'id':
        			state.user.id = item.val
        		break;
        		case 'name':
        			state.user.username = item.val
                    data = {
                        username:item.val
                    }
        		break;
        		case 'sex':
        			state.user.profile.sex = item.val
                    data = {
                        sex:item.val
                    }
        		break;
        		case 'mobile':
        			state.user.mobile = item.val
                    data = {
                        mobile:item.val
                    }
        		break;
        		case 'wechat_id':
        			state.user.wechat_id = item.val
                    data = {
                        wechat_id:item.val
                    }
        		break;
        		case 'birth_year':
        			state.user.profile.birth_year = item.val
        		break;
        		case 'birth_month':
        			state.user.profile.birth_month = item.val
        		break;
        		case 'birth_day':
        			state.user.profile.birth_day = item.val
        		break;
        		case 'headimgurl':
        			state.user.profile.headimgurl = item.val
                    data = {
                        headimgurl:item.val
                    }
        		break;
        		case 'bio':
        			state.user.profile.bio = item.val
                    data = {
                        bio:item.val
                    }
        		break;
                case 'occupation':
                    state.user.profile.occupation = item.val
                    data = {
                        occupation:item.val
                    }
                break;
                case 'access_token':
                    state.user.access_token = item.val
                break;
                case 'is_founder':
                    state.user.is_founder = item.val
                break;
        	}
            if(item.type=='birth_year' || item.type=='birth_month' || item.type=='birth_day'){
                item.type='birthday';
                item.val = state.user.profile.birth_year+'-'+state.user.profile.birth_month+'-'+state.user.profile.birth_day;
                data ={
                    birthday:item.val
                }
            }
            if(data){
                axios.post('/profiles/edit-profile',data).then((res)=>{});
            }
            storage.setUser(state.user);
        },
        getUser(state,user){
        	console.log(user)
        },
        setUser(state,user){
            state.user = user;
            state.isLogin = true;
        }
    },
    // 借助actions的手去 执行 mutations ， 通过  this.$store.dispatch 的方式调用
    // 可以用来执行异步操作，可以跟踪异步数据状态变化
    actions: {
        getUser:context =>{
        	context.commit('getUser', user);
        }
    }
})
