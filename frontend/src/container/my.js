import "./styles.css";
import { useEffect } from "react";
import { MathfieldElement, makeSharedVirtualKeyboard } from "mathlive";

const HIGH_SCHOOL_KEYBOARD_LAYER = {
  "high-school-layer": {
    styles: "",
    rows: [
      [
        {
          latex: "switch",
          command: ["switchKeyboardLayer", "test"]
        },
        { latex: "a", class: "my-test" },
        { latex: "a", class: "my-test" },
        { latex: "a", class: "my-test" },
        { latex: "a", class: "my-test" },
        { latex: "a", class: "my-test" },
        { latex: "a", class: "my-test" },
        { latex: "a", class: "my-test" },
        { latex: "a", class: "my-test" },
        { latex: "a", class: "my-test" },
        { latex: "a", class: "my-test" },
        { latex: "a", class: "my-test" },
        { latex: "a", class: "my-test" },
        { latex: "a", class: "my-test" },
        { latex: "a", class: "my-test" },
        { latex: "a", class: "my-test" },
        { latex: "a" },
        { latex: "a" },
        { latex: "a" },
        { latex: "x" },
        { class: "separator w5" },
        { label: "7", key: "7" },
        // Will display the label using the system font. To display
        // with the TeX font, use:
        // { class: "tex", label: "7", key: "7" },
        // or
        // { latex: "7"},
        { label: "8", key: "8" },
        { label: "9", key: "9" },
        { latex: "\\div" },
        { class: "separator w5" },
        {
          class: "tex small",
          label: "<span><i>x</i>&thinsp;²</span>",
          insert: "$$#@^{2}$$"
        },
        {
          class: "tex small",
          label: "<span><i>x</i><sup>&thinsp;<i>n</i></sup></span>",
          insert: "$$#@^{}$$"
        },
        {
          class: "small",
          latex: "\\sqrt{#0}",
          insert: "$$\\sqrt{#0}$$"
        }
      ],
      [
        { class: "tex", latex: "b" },
        { class: "tex", latex: "y" },
        { class: "separator w5" },
        { label: "4", latex: "4" },
        { label: "5", key: "5" },
        { label: "6", key: "6" },
        { latex: "\\times" },
        { class: "separator w5" },
        { class: "small", latex: "\\frac{#0}{#0}" },
        { class: "separator" },
        { class: "separator" }
      ],
      [
        { class: "tex", label: "<i>c</i>" },
        { class: "tex", label: "<i>z</i>" },
        { class: "separator w5" },
        { label: "1", key: "1" },
        { label: "2", key: "2" },
        { label: "3", key: "3" },
        { latex: "-" },
        { class: "separator w5" },
        { class: "separator" },
        { class: "separator" },
        { class: "separator" }
      ],
      [
        { latex: "(" },
        { latex: ")" },

        { class: "separator w5" },
        { label: "0", key: "0" },
        { latex: "." },
        { latex: "\\pi" },
        { latex: "+" },
        { class: "separator w5" },
        {
          class: "action",
          label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
          command: ["performWithFeedback", "moveToPreviousChar"]
        },
        {
          class: "action",
          label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
          command: ["performWithFeedback", "moveToNextChar"]
        },
        {
          class: "action font-glyph bottom right",
          label: "&#x232b;",
          command: ["performWithFeedback", "deleteBackward"]
        }
      ]
    ]
  },
  test: {
    styles: "",
    rows: [
      [
        {
          label: "test",
          command: ["switchKeyboardLayer", "high-school-layer"]
        }
      ]
    ]
  }
};

const HIGH_SCHOOL_KEYBOARD = {
  "high-school-keyboard": {
    label: "hight school", // Label displayed in the Virtual Keyboard Switcher
    tooltip: "High School Level", // Tooltip when hovering over the label
    layer: "high-school-layer"
  },
  _test: {
    label: "test_",
    tooltip: "test",
    layer: "test"
  }
};

export default function App() {
  useEffect(() => {
    // show();
    // document
    //     .querySelector('math-field')
    //     ?.setAttribute('style', 'display: none;');
    // window.addEventListener('keydown', e => {
    //     if (e.code === 'Enter') {
    //         ref.current?.executeCommand('addRowAfter');
    //         console.log(getValue());
    //     }
    // });
    const mathEl = new MathfieldElement();
    const mathEl2 = new MathfieldElement();

    const show = (el) => {
      el.executeCommand("showVirtualKeyboard");

      setTimeout(() => {
        // const ML__keyboards = Array.from(
        //     document.querySelectorAll('.ML__keyboard'),
        // );

        // ML__keyboards.forEach(e => e.remove());

        el.executeCommand("showVirtualKeyboard");

        window.scrollTo({
          top: document.documentElement.scrollHeight
        });
      }, 0);
    };

    makeSharedVirtualKeyboard({
      virtualKeyboardLayout: "dvorak",
      customVirtualKeyboardLayers: HIGH_SCHOOL_KEYBOARD_LAYER,
      customVirtualKeyboards: HIGH_SCHOOL_KEYBOARD,
      virtualKeyboards: "_test high-school-keyboard"
    });

    mathEl.setValue("x=\\frac{-b\\pm \\sqrt{b^2-4ac}}{2a}");
    mathEl2.setValue("x=\\frac{-b\\pm \\sqrt{b^2-4ac}}{2a}");

    mathEl.setOptions({
      mathModeSpace: "\\:",
      useSharedVirtualKeyboard: true,
      onBlur(e) {
        show(mathEl);
        return false;
      },
      onFocus() {
        mathEl2.blur();
        show(mathEl);
      }
      // customVirtualKeyboardLayers: HIGH_SCHOOL_KEYBOARD_LAYER,
      // customVirtualKeyboards: HIGH_SCHOOL_KEYBOARD,
      // virtualKeyboards: "_test high-school-keyboard"
    });

    mathEl.insert("2");

    mathEl2.setOptions({
      mathModeSpace: "\\:",
      useSharedVirtualKeyboard: true,
      onBlur(e) {
        show(mathEl2);
        return false;
      },
      onFocus() {
        mathEl.blur();
        show(mathEl2);
      }
    });

    document.body.append(mathEl, mathEl2);
  }, []);

  return null;
}
