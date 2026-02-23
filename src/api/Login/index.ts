import request from "../../utils/Login/request";
import { getToken } from "../../utils/Login/auth";

export function registerUser(data: any) {
  return request({
    method: "post",
    url: "/user/register",
    headers: {
      smsCode: data.smsCode,
      mobile: data.mobile,
    },
    data: {
      nickName: data.nickName,
      password: data.password,
      name: data.name,
      gender: data.gender,
      roleName: "普通用户",
    },
  });
}

export function loginUsername(data: any) {
  return request({
    method: "post",
    url: "/user/login/username",
    data: {
      userName: data.userName,
      password: data.password,
    },
  });
}

export function smsCodeGet(data: any) {
  return request({
    method: "get",
    url: "/common/code/mobile",
    params: {
      mobile: data.mobile,
    },
  });
}

export function loginMobile(data: any) {
  return request({
    method: "post",
    url: "/user/login/mobile",
    headers: {
      mobile: data.mobile,
      smsCode: data.smsCode,
    },
  });
}

export function logout() {
  return request({
    method: "post",
    url: "/user/logout1",
    headers: {
      token: getToken(),
    },
  });
}

export function getInfo() {
  return request({
    method: "get",
    url: "/customer/list",
    headers: {
      token: getToken(),
    },
  });
}

export function getIP() {
  return request({
    method: "get",
    url: "https://restapi.amap.com/v3/ip",
    params: {
      key: "a97860fb4b6caa184ab1d5c6034a8163",
    },
  });
}

export function getIPCity(city: string) {
  return request({
    method: "get",
    url: `https://restapi.amap.com/v3/weather/weatherInfo`,
    params: {
      key: "a97860fb4b6caa184ab1d5c6034a8163",
      city,
    },
  });
}
