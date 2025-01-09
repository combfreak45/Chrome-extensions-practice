chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "applyTheme") {
    chrome.theme.update(message.theme);
    sendResponse({ success: true });
  }
});
