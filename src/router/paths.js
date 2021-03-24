/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 *
 * meta内的参数：
 * noLayout  不显示菜单及toolbar
 * unCheck   不进行权限check
 */
export default [
  {
    path: "/"
  },
  {
    path: "/index",
    name: "红包列表",
    view: "business/homepage/index"
  },
  {
    path: "/detail",
    name: "红包列表",
    view: "business/homepage/detail",
    meta: {
      parentTitle: "红包列表",
      parentPath: "/index"
    }
  },
  {
    path: "/login",
    name: "登录",
    view: "login/Login",
    meta: {
      noLayout: true,
      unCheck: true
    }
  },
  {
    path: "/404",
    name: "404",
    view: "error/404",
    meta: {
      noLayout: true,
      unCheck: true
    }
  },
  {
    path: "/403",
    name: "403",
    view: "error/403",
    meta: {
      noLayout: true,
      unCheck: true
    }
  }
];
