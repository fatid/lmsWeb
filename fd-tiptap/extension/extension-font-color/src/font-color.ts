import { Extension } from '@tiptap/core'
import '@tiptap/extension-text-style'

type FontColorOptions = {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontColor: {
      /**
       * Set the font size
       */
      setFontColor: (color: string) => ReturnType,
      /**
       * Unset the font size
       */
      unsetFontColor: () => ReturnType,
    }
  }
}

export const FontColor = Extension.create<FontColorOptions>({
  name: 'fontColor',

  defaultOptions: {
    types: ['textStyle'],
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontColor: {
            default: null,
            renderHTML: attributes => {
              if (!attributes.fontColor) {
                return {}
              }

              return {
                style: `color: ${attributes.fontColor}`,
              }
            },
            parseHTML: element => ({
              fontColor: element.style.color ? element.style.color.replace(/['"]+/g, '') : element.style.color,
            }),
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontColor: fontColor => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontColor })
          .run()
      },
      unsetFontColor: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontColor: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})
 