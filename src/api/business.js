import request from "@/plugins/axios";

export function getPacketList(params) {
  return request({
    url: "api/manager/getPacketList",
    method: "get",
    params
  });
}

export function getPacketById(id, params) {
  return request({
    url: "api/getPacketById?id=" + id,
    method: "get",
    params
  });
}

export function getPacketCount() {
  return request({
    url: "api/getPacketCount",
    method: "get"
  });
}
export function getPacketRemainderCount() {
  return request({
    url: "api/manager/getPacketRemainderCount",
    method: "get"
  });
}
