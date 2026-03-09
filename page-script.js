(() => {
  const checkbox = document.getElementById("accept_ssa");

  if (checkbox instanceof HTMLInputElement && !checkbox.checked) {
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event("input", { bubbles: true }));
    checkbox.dispatchEvent(new Event("change", { bubbles: true }));
  }

  if (typeof window.RegisterProductKey === "function") {
    window.RegisterProductKey();
  }
})();
