(function initializeRenderers(global) {
  "use strict";

  const MILDA = global.MILDA = global.MILDA || {};
  const { MODULE_STATES } = MILDA.CONSTANTS;
  const { getById, escapeHTML } = MILDA.utils;

  function getModuleState(module) {
    if (module.progress === 100) {
      return MODULE_STATES.COMPLETED;
    }

    if (module.progress > 0) {
      return MODULE_STATES.IN_PROGRESS;
    }

    return MODULE_STATES.LOCKED;
  }

  function renderModules() {
    const grid = getById("moduleGrid");

    if (!grid) {
      return;
    }

    grid.innerHTML = "";

    MILDA.state.modules.forEach((module, index) => {
      const state = getModuleState(module);

      if (
        MILDA.state.moduleFilter !== MODULE_STATES.ALL &&
        state !== MILDA.state.moduleFilter
      ) {
        return;
      }

      const label =
        state === MODULE_STATES.COMPLETED
          ? "Completed"
          : state === MODULE_STATES.IN_PROGRESS
            ? `${module.progress}% complete`
            : "Locked";

      const tagClass =
        state === MODULE_STATES.COMPLETED
          ? "tag-green"
          : state === MODULE_STATES.IN_PROGRESS
            ? "tag-blue"
            : "tag-amber";

      const actionLabel =
        state === MODULE_STATES.COMPLETED
          ? "Review"
          : state === MODULE_STATES.IN_PROGRESS
            ? "Continue"
            : "Preview";

      grid.insertAdjacentHTML(
        "beforeend",
        `
          <article class="card module-card">
            <div class="module-number">${index + 1}</div>
            <h3>${escapeHTML(module.title)}</h3>
            <p>${escapeHTML(module.description)}</p>
            <div class="linear-progress">
              <span style="width:${module.progress}%"></span>
            </div>
            <div class="module-footer">
              <span class="tag ${tagClass}">${escapeHTML(label)}</span>
              <button
                class="btn btn-outline module-open"
                data-module="${index}"
                type="button"
              >
                ${actionLabel}
              </button>
            </div>
          </article>
        `
      );
    });
  }

  function renderCommunity() {
    const grid = getById("communityGrid");

    if (!grid) {
      return;
    }

    grid.innerHTML = "";

    MILDA.state.communityItems.forEach((item, index) => {
      if (
        MILDA.state.communityFilter !== "all" &&
        item.status !== MILDA.state.communityFilter
      ) {
        return;
      }

      grid.insertAdjacentHTML(
        "beforeend",
        `
          <article class="card community-card">
            <div class="card-header">
              <span class="tag ${item.tagClass}">${escapeHTML(item.tag)}</span>
              <span class="tiny muted">${escapeHTML(item.reports)}</span>
            </div>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.text)}</p>
            <div class="evidence-note">${escapeHTML(item.note)}</div>
            <div class="vote-row">
              <button class="vote-btn" data-vote="${index}-0" type="button">
                Reliable <strong>${item.votes[0]}</strong>
              </button>
              <button class="vote-btn" data-vote="${index}-1" type="button">
                Needs Review <strong>${item.votes[1]}</strong>
              </button>
              <button class="vote-btn" data-vote="${index}-2" type="button">
                Misleading <strong>${item.votes[2]}</strong>
              </button>
              <button class="vote-btn add-source" type="button">
                Add Source
              </button>
            </div>
          </article>
        `
      );
    });
  }

  function updateCourseProgress() {
    const modules = MILDA.state.modules;
    const totalProgress = modules.reduce(
      (sum, module) => sum + module.progress,
      0
    );

    const percentage = Math.round(totalProgress / modules.length);
    const percentElement = getById("coursePercent");
    const ringElement = getById("courseRing");

    if (percentElement) {
      percentElement.textContent = `${percentage}%`;
    }

    if (ringElement) {
      ringElement.style.setProperty("--p", percentage);
    }
  }

  MILDA.renderers = Object.freeze({
    getModuleState,
    renderModules,
    renderCommunity,
    updateCourseProgress
  });
})(window);
