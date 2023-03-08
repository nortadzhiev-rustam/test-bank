import { mergeAttributes, Node } from "@tiptap/core";

import { ReactNodeViewRenderer } from "@tiptap/react";


import InlineMathView from "./InlineMathView";

export default Node.create({
  name: "inlineMath",

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

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
    return ReactNodeViewRenderer((props) => {
      return <InlineMathView {...props} content={this.options.content} />;
    });
  },

  addCommands() {
    return {
      addInlineMath: (attrs) => ({ tr, commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs
        });
      }
    };
  }
});
