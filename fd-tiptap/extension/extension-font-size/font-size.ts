import { Extension } from '@tiptap/core';
import '@tiptap/extension-text-style';

const FontSize = Extension.create({
    name: 'fontSize',
    defaultOptions: {
        types: ['textStyle'],
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        renderHTML: attributes => {
                            if (!attributes.fontSize) {
                                return {};
                            }
                            return {
                                style: `font-size: ${attributes.fontSize}`,
                            };
                        },
                        parseHTML: element => ({
                            fontSize: element.style.fontSize.replace(/['"]+/g, ''),
                        }),
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setFontSize: fontSize => ({ chain }) => {
                return chain()
                    .setMark('textStyle', { fontSize })
                    .run();
            },
            unsetFontSize: () => ({ chain }) => {
                return chain()
                    .setMark('textStyle', { fontSize: null })
                    .removeEmptyTextStyle()
                    .run();
            },
        };
    },
});

export default FontSize;
export { FontSize };
//# sourceMappingURL=tiptap-extension-font-size.esm.js.map
