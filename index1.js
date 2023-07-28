let Inline = Quill.import("blots/inline");
let Block = Quill.import("blots/block");

class BoldBlot extends Inline {}

BoldBlot.blotName = "bold";
BoldBlot.tagName = "strong";

class ItalicBlot extends Inline {}

ItalicBlot.blotName = "italic";
ItalicBlot.tagName = "em";
ItalicBlot.className = "it";

class LinkBlot extends Inline {
  static create(value) {
    let node = super.create();

    node.setAttribute("href", value);
    node.setAttribute("target", "_blank");

    return node;
  }

  static formats(node) {
    return node.getAtrribute("href");
  }
}

LinkBlot.blotName = "link";
LinkBlot.tagName = "a";

class BlockquoteBlot extends Block {}

BlockquoteBlot.blotName = "blockquote";
BlockquoteBlot.tagName = "blockquote";

class HeaderBlot extends Block {
  static formats(node) {
    return HeaderBlot.tagName.indexOf(node.tagName) + 1;
  }
}

HeaderBlot.blotName = "header";
HeaderBlot.tagName = ["H1", "H2"];

Quill.register(BoldBlot);
Quill.register(ItalicBlot);
Quill.register(LinkBlot);
Quill.register(BlockquoteBlot);
Quill.register(HeaderBlot);

const quill = new Quill("#editor-container");

// quill.insertText(0, "Test", { bold: true });
// quill.formatText(0, 4, "italic", true);

$("#bold-button").click(function () {
  quill.format("bold", true);
});

$("#italic-button").click(function () {
  quill.format("italic", true);
});

$("#link-button").click(function () {
  let value = prompt("enter link url");
  quill.format("link", value);
});

$("#blockquote-button").click(function () {
  quill.format("blockquote", true);
});

$("#header-1-button").click(function () {
  quill.format("header", 1);
});

$("#header-2-button").click(function () {
  quill.format("header", 2);
});
