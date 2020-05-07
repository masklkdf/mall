import Toast from "./Toast";

const obj ={};

obj.install = function (Vue) {
  //创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  //使用new方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastContrustor();

  //将组件对象，手动的挂载到某一元素上
  toast.$mount(document.createElement('div'));

  document.body.appendChild(toast.$el);

  //往Vue原型插入一个变量
  Vue.prototype.$toast = toast;

};

export default obj;
