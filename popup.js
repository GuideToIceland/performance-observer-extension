document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getLongTasks" }, (response) => {
      const value = response?.data || 0;
      document.getElementById("longTaskValue").textContent = value.toFixed(2);
    });
  });
});