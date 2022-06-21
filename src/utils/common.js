/**
 * 计算百分比
 * @param {Number} num 数量
 * @param {Number} total 总数
 * @returns {Number} 百分比
 */
export function percentage(num, total) {
  if (num && total) {
    return (num / total) * 100;
  }
  console.log("percentage函数参数异常: :>> ", num, total);
  return 0;
}

/**
 * 比较两个日期大小
 * @param d1 {dateString} 第一个日期
 * @param d2 {dateString} 第二个日期
 *
 * @return Boolean
 * */
export const compareDate = (d1, d2) => {
  let date1 = new Date(Date.parse(d1));
  let date2 = new Date(Date.parse(d2));
  return date1 > date2;
};

/**
 * 时间转换工具函数
 * @param {Number} time 当前时间数字
 * @param {String} targetUnit 当前时间单位(时H&h|分M&m|S*s秒)
 * @param {String} resultUnit 转换结果时间单位(时H&h|分M&m|S*s秒)
 * @returns 返回转换时间结果
 */
export const timeConversion = (time, targetUnit, resultUnit) => {
  switch (targetUnit) {
    case "H":
    case "h":
      if (resultUnit === "H" || resultUnit === "h") {
        return time;
      }
      if (resultUnit === "M" || resultUnit === "m") {
        return time * 60;
      }
      if (resultUnit === "S" || resultUnit === "s") {
        return time * 60 * 60;
      }
      console.log("日期转换函数resultUnit参数不合法 :>> ");
      break;
    case "M":
    case "m":
      if (resultUnit === "H" || resultUnit === "h") {
        return time / 60;
      }
      if (resultUnit === "M" || resultUnit === "m") {
        return time;
      }
      if (resultUnit === "S" || resultUnit === "s") {
        return time * 60;
      }
      console.log("日期转换函数resultUnit参数不合法 :>> ");
      break;
    case "S":
    case "s":
      if (resultUnit === "H" || resultUnit === "h") {
        return time / 60 / 60;
      }
      if (resultUnit === "M" || resultUnit === "m") {
        return time / 60;
      }
      if (resultUnit === "S" || resultUnit === "s") {
        return time;
      }
      console.log("日期转换函数resultUnit参数不合法 :>> ");
      break;

    default:
      console.log("日期转换函数targetUnit参数不合法 :>>");
      break;
  }
};

/**
 * 处理搜索逻辑
 * @param {Array,Object} list 被搜索的数据源列表
 * @param {String} keyword 关键字
 * @param {String} keyname 要搜索的关键字字段名称,默认为name
 * @returns 返回过滤之后的列表
 */
export const handleSearch = (list, keyword, keyname = "name") => {
  const newList = [];
  list.forEach((item) => {
    const hashVal = item[keyname].indexOf(keyword);
    if (hashVal > -1) {
      newList.push(item);
    }
  });
  return newList;
};

/**
 * 隐藏手机号
 * @param {String} phone 手机号
 * @returns 隐藏过后的手机号
 */
export const handlePhoneHidden = (phone) => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
};

/**
 * 排序 反向排序
 * @param {Object} obj obj对象
 */
export const handleSortReverse = (obj) => {
  const arr = [];
  for (const key in obj) {
    arr.push(obj[key]);
  }
  return arr.reverse();
};

/**
 * 判断当前所属平台(福建/古田)环境
 * @param {String} importType 源类型
 * @param {String} targretType 目标类型
 * @returns 是否是当前需要的类型
 */
export const hashDomain = (importType, targretType) => {
  console.log("importType :>> ", importType);
  let sourceType = "";
  if (importType === "default" || importType === "a") {
    sourceType = "fj";
  }

  if (importType === "gt") {
    sourceType = "gt";
  }

  return sourceType === targretType;
};

/**
 * 获取显示区域等级
 * @param {String} modelType 当前区域等级
 * @returns 返回当前区域的下级区域等级
 */
export const handleAreaLevel = (modelType) => {
  switch (modelType) {
    case "province":
      return "city";
    case "city":
      return "district";
    case "district":
      return "street";
    case "street":
      return "street";

    default:
      break;
  }
};
