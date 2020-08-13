export default {
  bind (el, binding, vnode) {
    el.dataset.intro = binding.value
    console.log('intro')
    console.log(vnode)
    const { context: { introInstance } } = vnode
    introInstance.addStep({
      el,
      value: binding.value
    })
  }
}
