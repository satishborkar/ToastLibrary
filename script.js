import Toast from "./ToastPauseOnHoverPauseOnWindowFocusLoss.js";
let count = 1;
document.querySelector("button").addEventListener("click", () => {
  const toast = new Toast({
    text: `Hello ${count}`,
    position: "top-right",
    pauseOnHover: true,
    pauseOnFocusLoss: true,
  });
  count++;
});
