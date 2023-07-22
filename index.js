const toolbarOptions = {
  // container: true,
  handlers: {
    ccc: function (value) {
      if (value) {
        alert(value);
        const href = prompt("Enter the URL");
        this.quill.format("link", href);
      } else {
        alert(value);
        this.quill.format("link", false);
      }
    },
    link: function (value) {
      if (value) {
        alert(value);
        const href = prompt("Enter the URL");
        this.quill.format("link", href);
      } else {
        alert(value);
        this.quill.format("link", false);
      }
    },
  },
};

// const toolbarOptions = [
//   ["bold", "italic", "underline", "strike"], // toggled buttons
//   ["blockquote", "code-block"],

//   [{ header: 1 }, { header: 2 }], // custom button values
//   [{ list: "ordered" }, { list: "bullet" }],
//   [{ script: "sub" }, { script: "super" }], // superscript/subscript
//   [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
//   [{ direction: "rtl" }], // text direction

//   [{ size: ["small", false, "large", "huge"] }], // custom dropdown
//   [{ header: [1, 2, 3, 4, 5, 6, false] }],

//   [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//   [{ font: [] }],
//   [{ align: [] }],

//   ["clean"], // remove formatting button
// ];

// const toolbarOptions = [
//   { header: [3, 4] },
//   { header: 2 },
//   // 유일한 키값을 가진 기능을 넘겨주면 커스텀 value를 가진 버튼이 생김.
//   "bold",
//   "italic",
//   "underline",
//   "code",
//   { font: "serif" },
//   { size: ["small", false, "large", "huge"] },
//   // 버튼이 생기긴 하는데 버튼에 그림이 없어서 안 보임.
// ];
/*
- [[...], [...]] 
  - 이런 식으로 그룹화할 수 있음. 그룹 간에 약간의 공간이 생김.
  - 그룹화된 각 공간은 <span class="ql-formats">로 태그화되어 해당 클래스의 css를 적용받음. 
**/

const options = {
  debug: "info",
  // levels: error, warn, log, info
  // passing true = passing log
  // passing false = disable al messages
  modules: {
    // toolbar: toolbarOptions,
    toolbar: toolbarOptions,
    // container: "#toolbar",

    // 툴바에 컨테이너 같은 키를 받으려면 다시 객체를 지정해줘야 함.
    // toolbar: ['bold'] 이렇게 하면 볼드만 활성화.
    // container: "#toolbar",
    // 이건 html로 커스텀 툴바를 만들 때 쓰는 듯. 툴바 위치 지정을 위해서.
    // 없애면 기본 툴바가 적용됨.

    // {
    //   // container: "#toolbar",
    //   handlers: {
    //     bold: customBoldHandler,
    //   },
    // },
    /*
      - value
        - true
        : 기본 툴바 표시
        - false
        : 툴바 표시 X
      - 배열
      : 특정 툴바 버튼 표시
        - ex) [["bold", "italic"], ["align"]]
      - container: '#editor'
      : 툴바가 주입될 요소 설정
    */
    history: {
      delay: 2500,
      userOnly: true,
    },
    syntax: true,
    // - 기본으로 활성화되어 있음.
  },
  formats: [
    "bold",
    "italic",
    "underline",
    "code",
    "header",
    "font",
    "link",
    "ddd",
  ],

  // formats: ["bold", "italic", "underline", "code", "header", "font"],
  /*
  formats:
  : formats key가 없으면 default로 모든 기능이 활성화된다.
    - value 
      - true, false, null...
      : format을 설정해주지 않으면 모든 기능이 다 활성화됨.
      - 배열
      : 배열에 활성화할 기능을 설정해주면 표시된 버튼의 종류와 상관없이 그 기능만 활성화됨.
        - ex) bold 기능만 활성화
          formats: ['bold'],
            - italic 버튼을 눌러도 변화 없음.
        
        - ex) 모든 기능 비활성화
          formtats: [],
            - 어떤 버튼을 눌러도 변화 없음.
  */
  placeholder: "하이루",
  // readOnly: true,
  theme: "snow",
};

const quill = new Quill("#editor", options);

const customButton = document.querySelector("#custom-button");
customButton.addEventListener("click", function () {
  console.log("click");
});

// const target = document.querySelector('#editor');
// const quill = new Quill(target, option)
