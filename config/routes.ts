export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/welcome', icon: 'smile', component: './Welcome', name: 'Welcome' },
  {
    path: '/account',
    icon: 'crown',
    name: '用户中心',
    routes: [
      { path: '/account', redirect: '/account/user' },
      { icon: 'table', path: '/account/user', component: './Account/User',  access: 'canAdmin', name: '用户管理' },
      { icon: 'table', path: '/account/center', component: './Account/Center', name: '个人中心' },
    ],
  },
  {
    path: '/payment',
    icon: 'PayCircleOutlined',
    name: '缴费管理',
    routes: [
      { path: '/payment', redirect: '/payment/list' },
      { icon: 'table', path: '/payment/list', component: './PaymentItem/List', name: '缴费项目' },
      { icon: 'table', path: '/payment/records', component: './PaymentItem/Records', name: '缴费记录' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
