document
  .querySelector("#submit")
  .addEventListener("click", submitButtonHandler);

function submitButtonHandler(e) {
  e.preventDefault();
  const inputValue = document.querySelector(".one").value;
  console.log(inputValue);
  if (!/\S+@\S+\.\S+/.test(inputValue)) {
    console.log(/\S+@\S+\.\S/.test(inputValue));
    alert("이메일 형식이 올바르지 않습니다.");
    return;
  }
}
