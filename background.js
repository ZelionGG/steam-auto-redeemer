chrome.runtime.onMessage.addListener((message, sender) => {
  if (message?.type !== "closeCurrentTab") {
    return;
  }

  if (typeof sender.tab?.id !== "number") {
    return;
  }

  chrome.tabs.remove(sender.tab.id);
});
