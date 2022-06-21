/**
 * 需要挂载到Vue实例上内容
 */

import Vue from "vue";
import request from "@/config/request";
import Axios from "axios";
import adaptive from "@/utils/adaptive";
import dateFormat from "../config/dateFormat";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

const constant = {
  //oss路径
  $OSS_PATH: process.env.BASE_API + "/oss/oss/view?ossId=",
  //全局请求
  $request: request,
  //第一种排序
  $order1(order) {
    if (typeof order !== "object") return [];
    return Object.keys(order).map((key) => {
      return { orderField: key, orderType: order[key] };
    });
  },
  //第二种排序
  $order2(order) {
    if (typeof order !== "object") return [];
    return Object.keys(order).map((key) => {
      return { column: key, asc: order[key] === "asc" || order[key] === "ASC" };
    });
  },
  // Axios对象
  $axios: Axios,
  // 原型链挂载尺寸兼容函数
  $cpx: adaptive,
  // 原型链挂载日期格式化函数
  $dateFormat: dateFormat,
  // 屏幕截图
  $html2canvas: html2canvas,
  // 生成二维码
  $qrcode: QRCode,
};

Object.keys(constant).forEach((key) => {
  const value = constant[key];
  Vue.prototype[key] = value;
});
