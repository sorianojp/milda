(function initializeUtilities(global) {
  "use strict";

  const MILDA = global.MILDA = global.MILDA || {};

  function getById(id) {
    return document.getElementById(id);
  }

  function queryAll(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function capitalize(value) {
    if (!value) {
      return "";
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function toast(message) {
    const container = getById("toastContainer");

    if (!container) {
      return;
    }

    const element = document.createElement("div");
    element.className = "toast";
    element.textContent = message;
    container.appendChild(element);

    global.setTimeout(
      () => element.remove(),
      MILDA.CONSTANTS.TIMING.TOAST_DURATION_MS
    );
  }

  function setText(id, value) {
    const element = getById(id);

    if (element) {
      element.textContent = value;
    }
  }

  function addListener(id, eventName, listener) {
    const element = getById(id);

    if (element) {
      element.addEventListener(eventName, listener);
    }
  }

  MILDA.utils = Object.freeze({
    getById,
    queryAll,
    capitalize,
    escapeHTML,
    toast,
    setText,
    addListener
  });
})(window);
