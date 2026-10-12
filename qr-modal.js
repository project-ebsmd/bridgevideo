"use strict";

(() => {
  const dialog = document.querySelector("#qr-modal");
  const openButton = document.querySelector("[data-qr-open]");
  const closeButton = document.querySelector("[data-qr-close]");
  if (!dialog || !openButton || !closeButton) return;
  let previousFocus;

  openButton.addEventListener("click", () => {
    previousFocus = document.activeElement;
    dialog.showModal();
    document.body.classList.add("qr-open");
    closeButton.focus();
  });

  closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      dialog.close();
    }
  });

  // Native modal dialogs trap focus, make the background inert, and support Escape.
  dialog.addEventListener("close", () => {
    document.body.classList.remove("qr-open");
    previousFocus?.focus();
  });
})();
