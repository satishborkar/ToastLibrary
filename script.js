import Toast from "./ToastAnimation.js";
let count = 1;
document.querySelector("button").addEventListener("click", () => {
  const toast = new Toast({
    text: `Hello ${count}`,
  });
  count++;

  // setTimeout(() => {
  //   toast.update({ autoClose: 2000 });
  // }, 1000);
});
