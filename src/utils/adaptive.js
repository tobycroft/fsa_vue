/**
 * 移动端尺寸比例兼容函数
 */
export default (n) => {
  const vhAdjuster = window.screen.availWidth / 750;
  return n * vhAdjuster;
};
