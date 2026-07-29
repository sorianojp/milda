(function initializeIcons(global) {
  "use strict";

  const MILDA = global.MILDA = global.MILDA || {};

  MILDA.ICONS = Object.freeze({
    SPRITE: '<svg aria-hidden="true" class="sr-only">\n<symbol id="i-home" viewbox="0 0 24 24"><path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></symbol>\n<symbol id="i-book" viewbox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5zM4 6.5v13M8 7h8M8 11h7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></symbol>\n<symbol id="i-check" viewbox="0 0 24 24"><path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></symbol>\n<symbol id="i-users" viewbox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></symbol>\n<symbol id="i-award" viewbox="0 0 24 24"><circle cx="12" cy="8" fill="none" r="6" stroke="currentColor" stroke-width="2"></circle><path d="m8.2 13-1.2 8 5-3 5 3-1.2-8" fill="none" stroke="currentColor" stroke-width="2"></path></symbol>\n<symbol id="i-chart" viewbox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path></symbol>\n<symbol id="i-shield" viewbox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path><path d="m9 12 2 2 4-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path></symbol>\n<symbol id="i-bell" viewbox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></symbol>\n<symbol id="i-menu" viewbox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path></symbol>\n<symbol id="i-spark" viewbox="0 0 24 24"><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></symbol>\n<symbol id="i-upload" viewbox="0 0 24 24"><path d="M12 16V4m0 0-4 4m4-4 4 4M4 20h16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></symbol>\n<symbol id="i-link" viewbox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></symbol>\n<symbol id="i-file" viewbox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></symbol>\n<symbol id="i-search" viewbox="0 0 24 24"><circle cx="11" cy="11" fill="none" r="8" stroke="currentColor" stroke-width="2"></circle><path d="m21 21-4.35-4.35" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path></symbol>\n<symbol id="i-close" viewbox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path></symbol>\n<symbol id="i-eye" viewbox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><circle cx="12" cy="12" fill="none" r="3" stroke="currentColor" stroke-width="2"></circle></symbol>\n<symbol id="i-lock" viewbox="0 0 24 24"><rect fill="none" height="11" rx="2" stroke="currentColor" stroke-width="2" width="16" x="4" y="10"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"></path></symbol>\n</svg>'
  });

  MILDA.injectIcons = function injectIcons() {
    if (document.getElementById("i-home")) {
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.innerHTML = MILDA.ICONS.SPRITE;
    const sprite = wrapper.firstElementChild;

    if (sprite) {
      document.body.prepend(sprite);
    }
  };
})(window);
