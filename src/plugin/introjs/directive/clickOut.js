export default {
  bind (el, binding, vnode) {
    console.log('bind')
    const { value } = binding
    el.clickCb = function cb (e) {
      console.log('bind click')
      if (e.target === el) {
        value && value.call(this)
      }
    }

    el.addEventListener('click', el.clickCb)
  },
  unbind (el, binding, vnode) {
    console.log('unbind')
    console.log(el)
    el.removeListener('click', el.clickCb)
  }
}
