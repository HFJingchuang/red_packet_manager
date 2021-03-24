import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";
// import store from "@/store";
import paths from "./paths";
import { Message } from "element-ui";
import { checkLogin } from "@/api/user";

function route(path, view, name, meta) {
  return {
    name: name || view,
    path,
    meta,
    component: () => import(`@/views/${view}`)
  };
}

const originalPush = Router.prototype.push;

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(Router);

// Create a new router
const router = new Router({
  routes: paths
    .map((path) => route(path.path, path.view, path.name, path.meta))
    .concat([{ path: "*", redirect: "/404" }]),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

router.beforeEach(async (to, from, next) => {
  //TODO 此处判断用户是否拥有某菜单的权限，根据实际情况修改
  let res = await checkLogin();
  if (to.path === "/") {
    next("/login");
  } else if (to.meta.unCheck) {
    next();
  } else if (res.data.status === 0) {
    next();
  } else {
    let message = "暂未登录";
    Message({
      message: message,
      type: "error",
      duration: 3 * 1000
    });
    next(from.path);
  }
});

Vue.use(Meta);

export default router;
