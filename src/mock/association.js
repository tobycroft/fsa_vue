/**
 * mock-工会相关
 */

import Mock from "mockjs";

// 获取某个工会
Mock.mock(
  `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/association/info/get`,
  "post",
  {
    code: 0,
    data: {
      change_date: "2022-05-02T12:00:09Z",
      date: "2022-03-28T11:58:00Z",
      domain: "127.0.0.1",
      id: 1,
      img: "@IMAGE",
      info: "机构地址",
      logo: "@IMAGE",
      name: "机构名称",
      poster: "@IMAGE",
      uid: 0,
    },
    echo: "成功",
  }
);

// 获取当前工会的ID
Mock.mock(
  `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/association/info/id`,
  "post",
  {
    code: 0,
    data: 1,
    echo: "成功",
  }
);
