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
  // blot은 delta를 구성.
  // delta의 ops 속성의 value 배열은 최소 단위인 blot으로 구성됨.
  // delta는 최종적으로 dom 요소를 만들어 rendering 함.
  // 즉, 클래스로 만드는 blot은 dom 요소로 직접 변환되지만 바로 변환되는 건 아님.
  // delta를 구성하고 그 delta를 거쳐 dom 요소로 변환되기 때문. 즉, 한 단계가 더 있음.
  // 그래서 blot이 dom 요소로 변환된다고 봐도 무방함. 어차피 1:1 대응되니까.
  // blot은 delta 객체의 ops의 값인 배열을 구성하는 요소 1개임.
  // {
  //   "ops": [
  //     { "insert": "Hello, " },
  //     { "insert": "world", "attributes": { "bold": true } },
  //     { "insert": "!" }
  //   ]
  // }
  // 3개의 blot.
  // 맞습니다. LinkBlot 클래스로 만들어진 Blot은 DOM 노드를 생성하기 위해 필요한 정보를 담고 있는 객체입니다. Blot은 Quill 에디터의 내부적인 데이터 구조를 나타내기 위한 객체이며, DOM 노드를 직접 생성하고 조작하기 위해 사용됩니다.
  // 	const delta = {
  //   ops: [
  //     { insert: "Click ", attributes: { link: "https://www.example.com" } },
  //     { insert: "here", attributes: { link: "https://www.example.com" } },
  //     { insert: " to visit our website." }
  //   ]
  // };
  // { insert: "here", attributes: { link: "https://www.example.com" } },
  // 이런 식의 blot이 생성됨
  // 아님. 위의 내용은 틀렸음. quill 에디터는 델타를 생성하고 델타를 해석해 dom 요소를 만드는 class 함수가 바로 블랏.
  // 블랏을 통해 delta에 정의되어 있는 객체가 dom 요소로 변환됨.

  static create(value) {
    let node = super.create();

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
