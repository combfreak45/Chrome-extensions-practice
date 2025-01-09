document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const themePath = button.getAttribute("data-theme");
    console.log(themePath);

    fetch(themePath)
      .then((response) => response.json())
      .then((theme) => {
        chrome.runtime.sendMessage(
          { type: "applyTheme", theme },
          (response) => {
            if (response.success) {
              console.log("Theme applied successfully");
            } else {
              console.error("Failed to apply theme");
            }
          }
        );
      });
  });
});
