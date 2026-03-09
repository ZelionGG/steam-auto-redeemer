const hasKeyInUrl = () => {
  const url = new URL(window.location.href);
  return Boolean(url.searchParams.get("key"));
};

let closeRequested = false;

const isReceiptVisible = () => {
  const receipt = document.getElementById("receipt_form");

  if (!(receipt instanceof HTMLElement)) {
    return false;
  }

  return receipt.style.display !== "none" && receipt.offsetParent !== null;
};

const requestTabClose = () => {
  if (closeRequested || !isReceiptVisible()) {
    return;
  }

  closeRequested = true;
  chrome.runtime.sendMessage({ type: "closeCurrentTab" });
};

const watchForSuccess = () => {
  requestTabClose();

  if (closeRequested) {
    return;
  }

  const observer = new MutationObserver(() => {
    requestTabClose();

    if (closeRequested) {
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
  });

  window.setTimeout(() => {
    observer.disconnect();
  }, 30000);
};

const injectPageScript = () => {
  if (!hasKeyInUrl()) {
    return false;
  }

  const checkbox = document.getElementById("accept_ssa");
  const button = document.getElementById("register_btn");

  if (!(checkbox instanceof HTMLInputElement) || !(button instanceof HTMLElement)) {
    return false;
  }

  if (document.getElementById("steam-auto-redeemer-page-script")) {
    return true;
  }

  const script = document.createElement("script");
  script.id = "steam-auto-redeemer-page-script";
  script.src = chrome.runtime.getURL("page-script.js");
  script.onload = () => {
    script.remove();
  };

  (document.head || document.documentElement).appendChild(script);

  return true;
};

if (!injectPageScript()) {
  const observer = new MutationObserver(() => {
    if (injectPageScript()) {
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  window.setTimeout(() => {
    observer.disconnect();
  }, 10000);
}

watchForSuccess();
