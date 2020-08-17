import Vue from 'vue'

export default function create (Component, props) {
  const CompCtr = Vue.extend(Component)
  const comp = new CompCtr({
    propsData: props
  })
  comp.$mount()
  document.body.appendChild(comp.$el)
  comp.remove = function () {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }
  return comp
}
