/**
 * mock-导师相关
 */

import Mock from "mockjs";
const Random = Mock.Random;
const imgUrl = Random.image("250x250");

// 导师列表
Mock.mock(
  `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/instructor/info/list`,
  "post",
  function (options) {
    const aid = JSON.parse(options.body).aid;
    if (aid && aid === 1) {
      return {
        code: 0,
        data: [
          {
            aid: 1,
            change_date: "2022-05-02T14:08:05Z",
            date: "2022-04-15T16:54:10Z",
            gender: 1,
            id: 1,
            img: imgUrl,
            name: "js1",
            phone: "电话号码1234567",
            status: 1,
            uid: 1,
            area_count: 10,
            lecture_count: 10,
            sum_visitor: 1000,
          },
          {
            aid: 1,
            change_date: "2022-05-02T14:08:05Z",
            date: "2022-04-15T16:54:10Z",
            gender: 1,
            id: 1,
            img: imgUrl,
            name: "js1",
            phone: "电话号码1234567",
            status: 1,
            uid: 1,
            area_count: 10,
            lecture_count: 10,
            sum_visitor: 1000,
          },
          {
            aid: 1,
            change_date: "2022-05-02T14:08:05Z",
            date: "2022-04-15T16:54:10Z",
            gender: 1,
            id: 1,
            img: imgUrl,
            name: "js1",
            phone: "电话号码1234567",
            status: 1,
            uid: 1,
            area_count: 10,
            lecture_count: 10,
            sum_visitor: 1000,
          },
          {
            aid: 1,
            change_date: "2022-05-02T14:08:05Z",
            date: "2022-04-15T16:54:10Z",
            gender: 1,
            id: 1,
            img: imgUrl,
            name: "js1",
            phone: "电话号码1234567",
            status: 1,
            uid: 1,
            area_count: 10,
            lecture_count: 10,
            sum_visitor: 1000,
          },
        ],
        echo: "成功",
      };
    }
    return {
      code: -1,
      data: [],
      echo: "失败",
    };
  }
);
