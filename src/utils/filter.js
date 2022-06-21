/**
 * Vue全局过滤器
 */
import Vue from 'vue'

const filter = {
  //过滤富文本标签，提取text     <p>123456</p> => 123456
  htmlToText: function(html) {
    if (!html) return ''
    return html
      .replace(/<[^>]+?>/g, '')
      .replace(/\s+/g, ' ')
      .replace(/ /g, ' ')
      .replace(/>/g, ' ')
      .replace(/&nbsp;/gi, '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&ldquo;/g, '“')
      .replace(/&rdquo;/g, '”')
  },
  //秒转换为分钟  60=>1   90=>2   1800=>30
  secondToMinute: function(second) {
    return Math.ceil(second / 60)
  }
}
Object.keys(filter).forEach(key => {
  const fun = filter[key]
  Vue.filter(key, fun)
})
