export default {
  bind (el, binding, vnode) {
    el.dataset.intro = binding.value
    const { context } = vnode
    const step = {
      el,
      ...binding.value
    }
    if (context.introInstance) {
      context.introInstance.addStep(step)
    } else {
      context.__introSteps = context.__introSteps || []
      context.__introSteps.push(step)
    }
  }
}
