const Collect = () => import('@/components/Collect')
const Tips = () => import('@/components/Tips')
const Someet = () => import('@/components/Someet')
const Add = () => import('@/components/Add')
var routes = [
	{
	  path: '/',
	  name: 'Someet',
	  component: Someet
	},
	{
	  path:'/collect',
	  name:'Collect',
	  component: Collect
	},
	{
	  path:'/tips',
	  name:'Tips',
	  component: Tips
	},
  {
    path:'/add',
    name:'Add',
    component: Add
  }
]
export default routes;
