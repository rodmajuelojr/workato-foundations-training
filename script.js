// Tab switching + setup checklist — no framework, persists per-browser via localStorage.
(function () {
  var TAB_KEY = "workato-foundations-tab";
  var CHECK_KEY = "workato-foundations-checklist";

  /* ---------------- Tabs ---------------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var panels = Array.prototype.slice.call(
    document.querySelectorAll(".tabpanel"),
  );

  function activate(tabId) {
    tabs.forEach(function (tab) {
      var selected = tab.id === tabId;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
    });
    panels.forEach(function (panel) {
      var owner = panel.getAttribute("aria-labelledby");
      panel.hidden = owner !== tabId;
    });
    try {
      localStorage.setItem(TAB_KEY, tabId);
    } catch (e) {
      /* ignore */
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      activate(tab.id);
    });
  });

  var savedTab = null;
  try {
    savedTab = localStorage.getItem(TAB_KEY);
  } catch (e) {
    /* ignore */
  }
  if (savedTab && document.getElementById(savedTab)) {
    activate(savedTab);
  }

  /* ---------------- Checklist ---------------- */
  var boxes = document.querySelectorAll("[data-check]");
  var progress = document.getElementById("progress");

  function readState() {
    try {
      return JSON.parse(localStorage.getItem(CHECK_KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function writeState(state) {
    try {
      localStorage.setItem(CHECK_KEY, JSON.stringify(state));
    } catch (e) {
      /* private browsing / storage disabled — still works, just won't persist */
    }
  }

  function updateProgress() {
    if (!progress) return;
    var checked = 0;
    boxes.forEach(function (box) {
      if (box.checked) checked += 1;
    });
    progress.textContent = checked + " of " + boxes.length + " checked in";
  }

  var state = readState();
  boxes.forEach(function (box) {
    var key = box.getAttribute("data-check");
    if (state[key]) box.checked = true;
    box.addEventListener("change", function () {
      var current = readState();
      current[key] = box.checked;
      writeState(current);
      updateProgress();
    });
  });
  updateProgress();
})();
