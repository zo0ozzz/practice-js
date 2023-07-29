let Inline = Quill.import("blots/inline");
let Block = Quill.import("blots/block");
let BlockEmbed = Quill.import("blots/embed");

class BoldBlot extends Inline {}

BoldBlot.blotName = "bold";
BoldBlot.tagName = "strong";

class ItalicBlot extends Inline {}

ItalicBlot.blotName = "italic";
ItalicBlot.tagName = "em";
ItalicBlot.className = "it";

class LinkBlot extends Inline {
  // inline을 상속받는 순간 dom 요소 중 inline 속성을 갖는 요소가 된다는 걸 알게 됨.
  // 그래서 inline 요소에 맞는 기본 노드를 생성함. inline 특성에 맞는 노드를 생성.

  static create(value) {
    let node = super.create();

    console.log(super.create);

    node.setAttribute("href", value);
    node.setAttribute("target", "_blank");

    return node;
  }

  static formats(node) {
    return node.getAttribute("href");
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

class DividerBlot extends BlockEmbed {}

DividerBlot.blotName = "divider";
DividerBlot.tagName = "hr";

Quill.register(BoldBlot);
Quill.register(ItalicBlot);
Quill.register(LinkBlot);
Quill.register(BlockquoteBlot);
Quill.register(HeaderBlot);
Quill.register(DividerBlot);

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

$("#divider-button").click(function () {
  let range = quill.getSelection(true);
  quill.insertText(range.index, "\n", Quill.sources.USER);
  quill.insertEmbed(range.index + 1, "divider", true, Quill.sources.USER);
  quill.insertText(range.index + 2, "\n", Quill.sources.USER);
  quill.setSelection(range.index + 3, Quill.sources.SILENT);
});

// quill에 정의되어 있는 class(객체 생성 함수)를 가져와 적절히 가공하고
// register로 Quill에 등록하고
// 리스너를 걸어서 어떻게 작동시킬지 작성한다
// 이 과정에서 quill.method를 사용해 해당 blot을 매개변수로 가져온다.
