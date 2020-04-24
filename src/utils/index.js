/**
 * 定义全局公共方法
 */
// 1.返回promise对象----》外面调用者可以通过async和await的方法获取到resolve的数据
// 2.城市信息存储到本地---》localStorage

import { getCityInfo } from "./api/city";

// 定义存储的键
const CUR_CITY = 'cur_city'
// 封装本地存储方法
export const getLocal = (key) => {
  return localStorage.getItem(key)
}
export const setLocal = (key, val) => {
  localStorage.setItem(key, val)
}
export const removeLocal = (key) => {
  localStorage.removeItem(key)
}
// 根据百度地图API获取定位城市名字
const getCityName = async () => {
  return new Promise((resolve, reject) => {
    var myCity = new window.BMap.LocalCity();
    myCity.get((res) => {
      resolve(res.name)
    })
  })
}
export async function getCurCity() {
  //  先从本地获取之前存储过得定位信息
  let curCity = JSON.parse(getLocal(CUR_CITY))
  // 获取到城市名称，作比对
  let res = await getCityName()
  // console.log(res);
  let reaName = res.substr(0, 2)
  console.log(reaName);

  if (!curCity || reaName !== curCity.label) {
    // 没有---获取定位信息
    return new Promise(async(resolve, reject) => {

      const { status, data } = await getCityInfo(reaName)
      if (status === 200) {
        // 存到本地
        setLocal(CUR_CITY, JSON.stringify(data))
        // 传递数据
        resolve(data)
      } else {
        reject('error')
      }
    })
  } else {
    //有---返回本地存储的定位信息
    return Promise.resolve(curCity)

  }
}