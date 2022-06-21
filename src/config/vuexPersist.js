import VuexPersistence from "vuex-persist";

/**
 * Vuex 数据持久化
 *
 * key	            string	                            在存储中存储状态的密钥 默认值：“vuex”
 * storage	        Storage (Web API)	                localStorage、sessionStorage、localforage 或自定义 Storage 对象。必须实现 getItem，setItem，clear etc.
 * saveState        function(key, state[, storage])     如果不使用存储，此自定义函数将处理将状态保存到持久性
 * restoreState     function(key[, storage]) => state   如果不使用存储，此自定义函数将处理从存储中检索状态
 * reducer          function(state) => object           状态减速器。将状态减少到仅要保存的值。默认情况下，保存整个状态
 * filter           function(mutation) => boolean       突变过滤器。查看并仅对那些您希望触发持久性写入的那些返回 true。默认值对所有突变返回 truemutation.type
 * modules          string[]                            要保留的模块列表。（如果你想使用它，不要写你自己的化简器）
 * asyncStorage     boolean                             表示存储是否使用 Promise（如 localforage）或不使用 Promise（使用 localforage 之类的内容时，必须将其设置为 true） 默认值：false
 * supportCircular  boolean                             表示状态是否具有对自身的任何循环引用 （state.x === state） 默认值：false
 */

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default vuexLocal;
