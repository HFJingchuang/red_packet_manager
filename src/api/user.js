/*
 * @Description:
 * @Author: gwang
 * @Date: 2021-03-18 11:05:27
 * @LastEditors: gwang
 * @LastEditTime: 2021-03-18 11:10:43
 */
import request from "@/plugins/axios";

export function loginIn(params) {
  return request({
    url: "api/login",
    method: "get",
    params
  });
}

export function checkLogin() {
  return request({
    url: "api/checkLogin",
    method: "post"
  });
}
export function logout() {
  return request({
    url: "api/logout",
    method: "get"
  });
}
