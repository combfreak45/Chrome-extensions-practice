console.log("hi")

 async function getCurrentTab() {
   let queryOptions = { active: true, lastFocusedWindow: true };
   // `tab` will either be a `tabs.Tab` instance or `undefined`.
   let [tab] = await chrome.tabs.query(queryOptions);
   return tab;
 }

// Load saved colors and night light setting when the popup opens
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["frameColor", "toolbarColor"], (data) => {
    if (data.frameColor) {
      document.getElementById("frameColor").value = data.frameColor;
    }
    if (data.toolbarColor)
      document.getElementById("toolbarColor").value = data.toolbarColor;
  });
});

// Apply theme and save settings
document.getElementById("applyTheme").addEventListener("click", () => {
  const frameColor = document.getElementById("frameColor").value;
  const toolbarColor = document.getElementById("toolbarColor").value;

  console.log(frameColor, toolbarColor);

  const frameRGB = hexToRgb(frameColor);
  const toolbarRGB = hexToRgb(toolbarColor);

  console.log(frameRGB, toolbarRGB);

  const css = `
    html {
      background-color: rgb(${frameRGB.join(",")}) !important;
    }
    body {
      background-color: rgb(${toolbarRGB.join(",")}) !important;
    }
  `;

  console.log(css);

  // Inject the CSS dynamically using chrome.scripting
  chrome.scripting
    .insertCSS({
      target: { tabId:  getCurrentTab(), allFrames: true },
      css: css,
    })
    .then(console.log("Custom theme applied via CSS!"));
});

// // Reset theme to default
// document.getElementById("resetTheme").addEventListener("click", () => {
//   chrome.theme.reset(); // Reset theme
//   chrome.storage.local.clear(); // Clear stored settings
//   chrome.runtime.sendMessage({ type: "toggleNightLight", nightLight: false }); // Disable night light
//   alert("Theme reset to default.");
// });

// Utility function to convert HEX to RGB

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}
