"use strict";

(() => {
  const choices = Array.from(document.querySelectorAll("[data-video-choice]"));
  const panels = Array.from(document.querySelectorAll(".video-card"));
  const status = document.querySelector("#video-status");
  const defaultId = "video-1";
  const validId = (id) => panels.some((panel) => panel.id === id);

  // Remember embed URLs so changing selection unloads the previous player.
  panels.forEach((panel) => {
    panel.querySelectorAll("iframe").forEach((frame) => {
      const source = frame.getAttribute("src") || frame.dataset.src;
      if (source) frame.dataset.src = source;
    });
  });

  function selectVideo(id, updateAddress = false) {
    if (!validId(id)) id = defaultId;
    panels.forEach((panel) => {
      const selected = panel.id === id;
      panel.hidden = !selected;
      panel.querySelectorAll("iframe").forEach((frame) => {
        if (selected && frame.dataset.src) {
          if (frame.getAttribute("src") !== frame.dataset.src) {
            frame.setAttribute("src", frame.dataset.src);
          }
        } else if (frame.hasAttribute("src")) {
          // Navigating the old frame to about:blank stops its playback.
          frame.removeAttribute("src");
        }
      });
    });
    choices.forEach((choice) => {
      const selected = choice.getAttribute("aria-controls") === id;
      choice.setAttribute("aria-selected", String(selected));
      choice.tabIndex = selected ? 0 : -1;
      if (selected && status) status.textContent = "Valitud: " + choice.textContent.trim();
    });
    if (updateAddress) {
      try {
        // Update the selected video without scrolling through a list.
        window.history.replaceState(null, "", "#" + id);
      } catch {
        // Local file browsers may restrict history updates; selection still works.
      }
    }
  }

  choices.forEach((choice, index) => {
    choice.addEventListener("click", () => {
      selectVideo(choice.getAttribute("aria-controls"), true);
    });
    choice.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowDown") next = (index + 1) % choices.length;
      else if (event.key === "ArrowUp") next = (index - 1 + choices.length) % choices.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = choices.length - 1;
      else return;
      event.preventDefault();
      choices[next].focus();
      selectVideo(choices[next].getAttribute("aria-controls"), true);
    });
  });

  selectVideo(window.location.hash.slice(1));
  window.addEventListener("hashchange", () => selectVideo(window.location.hash.slice(1)));
})();
