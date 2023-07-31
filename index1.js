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

  // 얘는 돔 요소의 포멧을 파악하는 데 쓰임.
  // 포맷을 긁어보고 href가 있네? 그럼 a 태그 link인가 보네.
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

class ImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    // 생성할 노드의 특성(BlockEmbed)을 고려해 기본 노드를 만듦.
    // img 태그겠지.
    node.setAttribute("alt", value.alt);
    node.setAttribute("src", value.url);

    return node;
    // 이 img 태그로 생성된 노드엔 alt 속성과 src 속성이 담겨 있음.
    // 이렇게 blot을 기반으로 만들어진 dom 노드가 반환되어 dom에 삽입됨.
  }

  static value(node) {
    // value 메서드는 커서가 셀렉한 노드가 어떤 노드인지를 판별함.
    return {
      alt: node.getAttribute("alt"),
      url: node.getAttribute("src"),
    };
  }
}

ImageBlot.blotName = "image";
ImageBlot.tagName = "img";

class VideoBlot extends BlockEmbed {
  static create(url) {
    let node = super.create();
    // 동영상이라는 서식과 관련된 속성.
    node.setAttribute("src", url);
    // 이 두 가지 속성은 동영상이 아닌 동영상이 보여지는 틀, 즉 iframe 요소를 설정하는 속성.
    // 왜 이렇게 해놓은 걸까??? 이 뒤에는 요소 속성 설정하는 절차가 없나?
    node.setAttribute("frameborder", 0);
    node.setAttribute("allowfullscreen", true);
    // width가 지정됨.

    return node;
  }

  static formats(node) {
    let format = {};

    if (node.hasAttribute("height")) {
      format.height = node.getAttribute("height");
    }

    if (node.hasAttribute("width")) {
      format.width = node.getAttribute("width");
    }

    return format;
  }

  static value(node) {
    return node.getAttribute("src");
  }

  format(name, value) {
    // 부여하려는 서식이 width나 height면 value에 맞게 적용시킨다.
    if (name === "height" || name === "width") {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name, value);
      }
      // 그 두 가지 속성이 아니라면 그냥 서식을 적용시킨다.
      // bold를 적용하면 strong이 iframe 태그를 감쌈.
      // 기울게를 넣어도 마찬가지.
      // 왜냐면 적용하려는 서식이 width나 height가 아니기 때문.
    } else {
      super.format(name, value);
    }
  }
}

VideoBlot.blotName = "video";
VideoBlot.tagName = "iframe";

Quill.register(BoldBlot);
Quill.register(ItalicBlot);
Quill.register(LinkBlot);
Quill.register(BlockquoteBlot);
Quill.register(HeaderBlot);
Quill.register(DividerBlot);
Quill.register(ImageBlot);
Quill.register(VideoBlot);

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

$("#image-button").click(function () {
  let range = quill.getSelection(true);
  // quill 에디터에서 셀렉된 상태의 인덱스와 레인지를 가져옴.
  // true는 왜 쓰는지 모르겠음.

  // 실제로는 alt과 url을 받아와서 할당해주면 됨.
  // url은 이미지를 올리고 서버에서 url로 받아오면 될 듯.
  quill.insertText(range.index, "\n", Quill.sources.USER);
  quill.insertEmbed(
    range.index + 1,
    "image",
    {
      alt: "Quill Cloud",
      url: "https://quilljs.com/0.20/assets/images/cloud.png",
    },
    Quill.sources.USER
  );
  quill.setSelection(range.index + 2, Quill.sources.SILENT);
});

$("#video-button").click(function () {
  // true를 매개 변수로 주면 깊은 복사가 일어남.
  // Quill에서 getSelection(true)을 사용하는 이유는 선택 영역 정보를 얻을 때, 선택 영역을 복사하여 원본과 복사된 객체 간의 의도치 않은 상호작용을 방지하기 위해서입니다. 사용자가 선택 영역을 변경한 후에도 기존에 얻었던 선택 영역 정보를 사용해야 할 때가 있을 수 있으므로, 깊은 복사를 통해 정보의 보존과 독립성을 유지합니다.
  // 즉, 나중에 쓸 일이 있을지도 모르니까.
  // 근데 나중에 사용했을 때 기존의 참조값을 가지고 있다면 그게 어떤 식으로 바뀌어버리는 결과가 나올 수도 있으니까.
  let range = quill.getSelection(true);
  quill.insertText(range.index, "\n", Quill.sources.USER);
  let url = "https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0";
  quill.insertEmbed(range.index + 1, "video", url, Quill.sources.USER);
  quill.formatText(range.index + 1, 1, { height: "170", width: "400" });
  quill.setSelection(range.index + 2, Quill.sources.SILENT);
});

// 텍스트 서식인 굵게(Bold)나 이탤릭(Italic)과 같은 서식은 기존에 있던 텍스트 요소에 태그를 추가하거나 기존 요소의 속성을 변경하여 적용할 수 있으므로, format 메서드를 사용하여 선택한 위치에 서식을 적용합니다. 선택한 텍스트가 이미 존재하는 부분에 서식을 적용하는 것이기 때문에 해당 위치에 서식을 적용하면 됩니다.

// 하지만 이미지나 동영상과 같은 블록 요소는 기존에 있던 텍스트에 태그를 추가하는 것이 아니라 새로운 요소를 삽입하는 것입니다. 이 경우, 선택한 위치가 요소 자체가 삽입되는 위치가 아니라, 삽입된 요소의 속성을 설정해야 합니다. 따라서 formatText 메서드를 사용하여 요소가 삽입된 위치 다음의 글자에 서식을 적용하게 됩니다. 이로써 이미지나 동영상이 삽입된 위치 다음의 글자에 텍스트 서식을 지정할 수 있습니다.

// 요약하자면, format 메서드는 선택한 위치에 서식을 적용하는 데 사용되며, 이미지나 동영상과 같은 블록 요소는 formatText 메서드를 사용하여 요소가 삽입된 위치 다음의 글자에 서식을 적용할 수 있습니다. 이를 통해 텍스트 서식과 블록 요소를 유연하게 다룰 수 있습니다.

// quill에 정의되어 있는 class(객체 생성 함수)를 가져와 적절히 가공하고
// register로 Quill에 등록하고
// 리스너를 걸어서 어떻게 작동시킬지 작성한다
// 이 과정에서 quill.method를 사용해 해당 blot을 매개변수로 가져온다.
