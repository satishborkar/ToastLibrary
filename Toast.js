const DEFAULTS_OPTIONS = {
  autoClose: 5000,
  position: "top-right",
  onClose: () => {},
  canClose: true,
};

export default class Toast {
  //private Variable
  #toastElem;
  #autoCloseInterval;
  #removeBinded;

  constructor(options) {
    this.#toastElem = document.createElement("div");
    this.#toastElem.classList.add("toast");
    this.#removeBinded = this.remove.bind(this);

    //This method will run 2 time on initialization and whenever update function is called.
    this.update({ ...DEFAULTS_OPTIONS, ...options });
  }

  set position(value) {
    const currentContainer = this.#toastElem.parentElement;
    const selector = `.toast-container[data-position="${value}"]`;
    const container =
      document.querySelector(selector) || createContainer(value);
    container.append(this.#toastElem);
    if (currentContainer === null || currentContainer.hasChildNodes()) return;
    currentContainer.remove();
  }

  set text(value) {
    this.#toastElem.textContent = value;
  }

  set autoClose(value) {
    if (value === false) return;
    if (this.#autoCloseInterval != null) clearInterval(this.#autoCloseInterval);
    this.#autoCloseInterval = setTimeout(() => this.remove(), value);
  }

  set canClose(value) {
    this.#toastElem.classList.toggle("can-close", value);
    if (value) {
      this.#toastElem.addEventListener("click", this.#removeBinded);
    } else {
      this.#toastElem.removeEventListener("click", this.#removeBinded);
    }
  }

  update(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  remove() {
    const parentContainer = this.#toastElem.parentElement;
    this.#toastElem.remove();
    this.onClose();
    if (parentContainer.hasChildNodes()) return;
    parentContainer.remove();
  }
}

function createContainer(position) {
  const container = document.createElement("div");
  container.classList.add("toast-container");
  container.dataset.position = position;
  document.body.append(container);
  return container;
}
