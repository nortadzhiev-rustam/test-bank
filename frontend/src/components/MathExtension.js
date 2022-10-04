import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import Mathblock from "./Mathblock";
import MathBlockPreview from "./MathBlockPreview";


export default Node.create({
  name: "mathBlock",

  group: "block",

  // content: "inline*",

  addAttributes() {
    return {
      content: {
        default: "",
        renderHTML: (attributes) => {
          return {
            content: attributes.content,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "math-block",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["math-block", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    console.log(this.options);
    return ReactNodeViewRenderer(<MathBlockPreview equation={this.options.equation}/>);
  },

  addCommands() {
    return {
      addMathBlock:
        (attrs) =>
        ({ tr, commands }) => {
          commands.insertContent({
            type: this.name,
            attrs,
          });

          return commands.exitCode();
        },
      // addMathBlock: (attrs) => ({ tr, state, dispatch }) => {
      //   const { selection } = state;
      //   console.log(selection, selection.$cursor);
      //   const position = selection.$cursor
      //     ? selection.$cursor.pos
      //     : selection.$to.pos;
      //   const node = this.type.create(attrs);
      //   const transaction = tr.insert(position, node);
      //   // tr.setSelection()
      //   tr.setSelection(TextSelection.create(tr.doc, 7, 8));

      //   return dispatch(transaction);
      // }
    };
  },

  addKeyboardShortcuts() {
    return {};
  },
});
