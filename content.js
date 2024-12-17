// Store long tasks duration per page
const longTaskDurations = new Map();

// Start observing long tasks
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log("Long Task Entry:", entry);
    const currentDuration = longTaskDurations.get(window.location.href) || 0;
    longTaskDurations.set(window.location.href, currentDuration + entry.duration);
  });
});

observer.observe({ type: "longtask", buffered: true });

// Make collected data accessible to the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getLongTasks") {
    sendResponse({ data: longTaskDurations.get(window.location.href) || 0 });
  }
});