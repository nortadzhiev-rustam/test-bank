import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import InlineMathView from "./InlineMathView";



export default Node.create({
  name: "inlineMath",

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  // content: "inline*",

  addAttributes() {
    return {
      content: {
        default: "",
        renderHTML: (attributes) => {
          return {
            content: attributes.content
          };
        }
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: `span[data-type="${this.name}"]`
      }
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(
        { "data-type": this.name },
        this.options.HTMLAttributes,
        HTMLAttributes
      )
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(InlineMathView);
  },

  addCommands() {
    return {
      addInlineMath: (attrs) => ({ tr, commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs
        });
      }
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
  }
});
