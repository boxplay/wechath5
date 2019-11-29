const Collect = () => import('@/components/Collect')
const Tips = () => import('@/components/Tips')
const Someet = () => import('@/components/Someet')
const Add = () => import('@/components/Add')
const Text = () => import('@/components/myCom/richtext/richtext')
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
  },
  {
    path:'/text',
    name:'Text',
    component:Text
  }
]
export default routes;
