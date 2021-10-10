import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './Component.vue'

export default Node.create({
  name: 'infoComponent',

  group: 'block',
  editable: true,
  atom: true,
  content: 'inline*',
  addAttributes() {
    return {
      count: {
        default: 0,
      },
      status:{
        default: 'info'
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'info-component',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['info-component', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})