// excel 下载问题

// 方案一：拼接好URL，直接打开新的浏览器窗口，让浏览器自行下载。

// 方案二、接口请求，拿到返回的二进制文件流处理。
// 可以合理鉴权，自定义文件名称

// Q&A
// 1、前端取不到返回的数据。
// 后端返回的数据类型问题，改为二进制文件解决。
// 2、取不到resposne 内的content-disposition 参数，无法获取文件名。
// 前后端分离项目，存在跨域。浏览器安全策略拿不到对应参数值，后端设置暴露名单问题解决。
// 3、原接口请求插件  @tencent/mfe-request 无法获取接口response headers信息。
// 插件基于axios 封住的层数过多，导致传递过程中原始response 丢失。改为下载接口，单独封住 axios， 可以拿到接口返回的 response headers,解析处理后，可以获取到文件名以及文件类型。
// 4、保存的excel文件无法打开
// 请求时需要设置 responseType 为 blob，让接口返回二进制文件流。

// ------- 代码实现----- @src/utils/request
// 填充数字，若小于10，则填充0
const fillNumber = (num) => (num < 10 ? `0${num}` : num);

// 格式化日期
export const formateDate = (_date) => {
  const date = new Date(_date || new Date());
  const year = date.getFullYear();
  const month = fillNumber(date.getMonth() + 1);
  const day = fillNumber(date.getDate());
  return `${year}-${month}-${day}`;
};

/**
 * 格式化resposne Header 获取文件名和类型
 * @param {*} headers response headers
 * @returns { fileName: '', fileType: ''}
 */
export const formateHeaders = (headers) => {
  // 通过此参数获取文件名
  const Disposition = headers["content-disposition"];
  const defaultType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8";
  const fileType = headers["content-type"] || defaultType;
  let fileName = "";
  Disposition.split(";").forEach((item) => {
    if (item.includes("filename=")) {
      [, fileName] = item.split("=");
    }
  });
  if (fileName) {
    fileName = decodeURIComponent(fileName);
  } else {
    fileName = `${formateDate(new Date())}.xlsx`;
  }
  return {
    fileName,
    fileType,
  };
};

/**
 * 下载excel
 * @param {*} data 二进制文件流
 * @param {*} fileName 文件名字 xxx.xlsx
 */
export const downloadExcel = (data, fileName, fileType) => {
  const blob = new Blob([data], {
    type: fileType,
  }); // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
  const downloadElement = document.createElement("a");
  const href = window.URL.createObjectURL(blob); // 创建下载的链接
  downloadElement.href = href;
  downloadElement.download = fileName; // 下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); // 点击下载
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
};

// ----- 使用 ------ exportExcelService.js
import request from "@src/utils/request";

async function exportStandard(params) {
  return request({
    url: "",
    method: "get",
    params,
    responseType: "blob", // 设置返回数据类型为二进制文件流
  });
}

export default {
    exportStandard,
};

import downloadService from "exportExcelService";
downloadService
  .exportStandard({
    standardId: id,
  })
  .then((res) => {
    const { fileName, fileType } = formateHeaders(res.headers);
    downloadExcel(res.data, fileName, fileType);
  });
