(function initializeApplication(global) {
  "use strict";

  const MILDA = global.MILDA = global.MILDA || {};

  const {
    ANALYSIS_TYPES,
    COMMUNITY_STATES,
    DEMO_CLAIMS,
    LESSON_OBJECTIVES,
    ROLES,
    ROLE_VIEWS,
    TIMING,
    VIEW_INFO
  } = MILDA.CONSTANTS;

  const {
    addListener,
    capitalize,
    getById,
    queryAll,
    setText,
    toast
  } = MILDA.utils;

  const {
    renderCommunity,
    renderModules,
    updateCourseProgress
  } = MILDA.renderers;

  function canAccessView(viewId) {
    const allowedViews = ROLE_VIEWS[MILDA.state.activeRole];

    return !allowedViews || allowedViews.includes(viewId);
  }

  function applyRolePermissions(role) {
    queryAll("[data-roles]").forEach((element) => {
      const allowedRoles = element.dataset.roles.split(/\s+/);

      element.classList.toggle("role-hidden", !allowedRoles.includes(role));
    });
  }

  function showView(viewId) {
    if (!canAccessView(viewId)) {
      toast("This page is not available for the selected role");

      return;
    }

    queryAll(".view").forEach((view) => {
      view.classList.toggle("active", view.id === viewId);
    });

    queryAll("[data-view]").forEach((button) => {
      button.classList.toggle("active", button.dataset.view === viewId);
    });

    const viewText = VIEW_INFO[viewId] || ["MILDA", ""];

    setText("pageHeading", viewText[0]);
    setText("pageSubheading", viewText[1]);

    getById("sidebar")?.classList.remove("open");

    global.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function enterRole(role) {
    if (!ROLE_VIEWS[role]) {
      return;
    }

    MILDA.state.activeRole = role;
    applyRolePermissions(role);
    getById("introScreen")?.classList.add("dismissed");

    if (role === ROLES.INSTRUCTOR) {
      showView("instructor");
    } else if (role === ROLES.ADMIN) {
      showView("admin");
    } else {
      showView("dashboard");
    }

    toast(`${capitalize(role)} prototype loaded`);
  }

  function exitRole() {
    MILDA.state.activeRole = null;

    getById("introScreen")?.classList.remove("dismissed");
    getById("sidebar")?.classList.remove("open");

    queryAll(".modal-backdrop.open").forEach((modal) => {
      modal.classList.remove("open");
    });

    closeNotificationDrawer();
    queryAll("[data-enter]")[0]?.focus();
  }

  function openLesson(index) {
    const module = MILDA.state.modules[index];

    if (!module) {
      toast("The selected module could not be loaded.");

      return;
    }

    MILDA.state.activeModule = index;

    setText("lessonTitle", `${index + 1}. ${module.title}`);
    setText("lessonSubtitle", module.description);

    const lessonStatus =
      module.progress === 100
        ? "Completed module"
        : module.progress > 0
          ? "In progress"
          : "Module preview";

    setText("lessonStatus", lessonStatus);

    const objectives = getById("lessonObjectives");

    if (objectives) {
      objectives.innerHTML = LESSON_OBJECTIVES.map(
        (objective) => `
          <div class="objective">
            <strong>${objective.title}</strong><br>
            <span class="muted">${objective.description}</span>
          </div>
        `
      ).join("");
    }

    setText(
      "completeModule",
      module.progress === 100 ? "Completed" : "Mark Module Complete"
    );

    getById("lessonModal")?.classList.add("open");
  }

  function completeActiveModule() {
    const module = MILDA.state.modules[MILDA.state.activeModule];

    if (!module) {
      return;
    }

    if (module.progress === 100) {
      toast("This module is already complete");

      return;
    }

    module.progress = 100;

    renderModules();
    updateCourseProgress();
    getById("lessonModal")?.classList.remove("open");

    toast(`Module ${MILDA.state.activeModule + 1} marked complete`);
  }

  function determineAnalysisType(claim) {
    const normalizedClaim = claim.toLowerCase();

    if (
      normalizedClaim.includes("ai-generated") ||
      normalizedClaim.includes("deepfake") ||
      normalizedClaim.includes("edited image")
    ) {
      return ANALYSIS_TYPES.MEDIA;
    }

    if (
      normalizedClaim.includes("scholarship") ||
      normalizedClaim.includes("registrar")
    ) {
      return ANALYSIS_TYPES.VERIFIED;
    }

    return ANALYSIS_TYPES.REVIEW;
  }

  function runAnalysis() {
    const claim = [
      getById("verifyClaim")?.value,
      getById("quickClaim")?.value,
      getById("urlContext")?.value
    ].find((value) => value && value.trim()) || "";

    const analysisType = determineAnalysisType(claim);
    const result = MILDA.DATA.ANALYSIS_SCENARIOS[analysisType];

    const resultTag = getById("resultTag");

    if (resultTag) {
      resultTag.className = `tag ${result.tagClass}`;
      resultTag.textContent = result.tag;
    }

    setText("resultTitle", result.title);
    setText("resultSummary", result.summary);
    setText("aiScore", result.aiScore);
    setText("recordScore", result.recordCount);
    setText("sourceScore", result.sourceCount);
    setText("analysisText", result.guidance);

    const resultPanel = getById("resultPanel");

    if (resultPanel) {
      resultPanel.classList.remove("hidden");
      resultPanel.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    toast("Guided analysis completed");
  }

  function clearAnalysis() {
    [
      "verifyClaim",
      "verifyUrl",
      "urlContext",
      "quickClaim",
      "quickUrl"
    ].forEach((id) => {
      const element = getById(id);

      if (element) {
        element.value = "";
      }
    });

    getById("resultPanel")?.classList.add("hidden");
  }

  function openNotificationDrawer() {
    getById("notificationDrawer")?.classList.add("open");
    getById("drawerBackdrop")?.classList.add("open");
  }

  function closeNotificationDrawer() {
    getById("notificationDrawer")?.classList.remove("open");
    getById("drawerBackdrop")?.classList.remove("open");
  }

  function closeModal(button) {
    button.closest(".modal-backdrop")?.classList.remove("open");
  }

  function bindNavigationEvents() {
    queryAll("[data-enter]").forEach((button) => {
      button.addEventListener("click", () => enterRole(button.dataset.enter));
    });

    queryAll("[data-view]").forEach((button) => {
      button.addEventListener("click", () => showView(button.dataset.view));
    });

    queryAll("[data-go]").forEach((button) => {
      button.addEventListener("click", () => showView(button.dataset.go));
    });

    addListener("exitRoleBtn", "click", exitRole);

    addListener("mobileMenu", "click", () => {
      getById("sidebar")?.classList.toggle("open");
    });
  }

  function bindDrawerAndModalEvents() {
    addListener("notificationBtn", "click", openNotificationDrawer);
    addListener("closeDrawer", "click", closeNotificationDrawer);
    addListener("drawerBackdrop", "click", closeNotificationDrawer);

    queryAll(".modal-close").forEach((button) => {
      button.addEventListener("click", () => closeModal(button));
    });

    queryAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop) {
          backdrop.classList.remove("open");
        }
      });
    });

    addListener("tourBtn", "click", () => {
      getById("tourModal")?.classList.add("open");
    });

    addListener("startTour", "click", () => {
      getById("tourModal")?.classList.remove("open");
      showView("dashboard");
      toast("Tour started: begin with the student dashboard");
    });

    addListener("badgeInfo", "click", () => {
      getById("policyModal")?.classList.add("open");
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") {
        return;
      }

      queryAll(".modal-backdrop.open").forEach((modal) => {
        modal.classList.remove("open");
      });

      closeNotificationDrawer();
    });
  }

  function bindCourseEvents() {
    addListener("openNextLesson", "click", () => openLesson(6));
    addListener("completeModule", "click", completeActiveModule);

    addListener("moduleGrid", "click", (event) => {
      const button = event.target.closest(".module-open");

      if (button) {
        openLesson(Number(button.dataset.module));
      }
    });

    queryAll(".quiz-option").forEach((button) => {
      button.addEventListener("click", () => {
        queryAll(".quiz-option").forEach((option) => {
          option.classList.remove("correct");
        });

        if (button.classList.contains("correct-answer")) {
          button.classList.add("correct");
          toast("Correct: verify with credible evidence");
        } else {
          toast("Try again: popularity is not evidence");
        }
      });
    });

    queryAll("#moduleFilters .filter-chip").forEach((button) => {
      button.addEventListener("click", () => {
        MILDA.state.moduleFilter = button.dataset.filter;

        queryAll("#moduleFilters .filter-chip").forEach((chip) => {
          chip.classList.remove("active");
        });

        button.classList.add("active");
        renderModules();
      });
    });
  }

  function bindCommunityEvents() {
    queryAll("#communityFilters .filter-chip").forEach((button) => {
      button.addEventListener("click", () => {
        MILDA.state.communityFilter =
          button.dataset.status || COMMUNITY_STATES.ALL;

        queryAll("#communityFilters .filter-chip").forEach((chip) => {
          chip.classList.remove("active");
        });

        button.classList.add("active");
        renderCommunity();
      });
    });

    addListener("communityGrid", "click", (event) => {
      const voteButton = event.target.closest("[data-vote]");

      if (voteButton) {
        const [itemIndex, voteIndex] = voteButton.dataset.vote
          .split("-")
          .map(Number);

        const item = MILDA.state.communityItems[itemIndex];

        if (item && Number.isInteger(voteIndex)) {
          item.votes[voteIndex] += 1;
          renderCommunity();
          toast("Vote recorded for prototype demonstration");
        }

        return;
      }

      if (event.target.closest(".add-source")) {
        toast("Trusted-source form opened in the full system");
      }
    });
  }

  function bindVerificationEvents() {
    queryAll(".tab").forEach((button) => {
      button.addEventListener("click", () => {
        queryAll(".tab").forEach((tab) => tab.classList.remove("active"));
        button.classList.add("active");

        queryAll(".verify-tab").forEach((tabPanel) => {
          tabPanel.classList.add("hidden");
        });

        getById(`tab-${button.dataset.tab}`)?.classList.remove("hidden");
      });
    });

    addListener("loadDemoClaim", "click", () => {
      const quickClaim = getById("quickClaim");

      if (quickClaim) {
        quickClaim.value = DEMO_CLAIMS.SUSPENSION;
      }

      toast("Demonstration claim loaded");
    });

    addListener("loadVerifyDemo", "click", () => {
      const verifyClaim = getById("verifyClaim");

      if (verifyClaim) {
        verifyClaim.value = DEMO_CLAIMS.SUSPENSION;
      }
    });

    queryAll(".analyze-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const verifyClaim = getById("verifyClaim");
        const quickClaim = getById("quickClaim");

        if (verifyClaim && quickClaim) {
          verifyClaim.value = quickClaim.value;
        }

        showView("verify");
        global.setTimeout(runAnalysis, TIMING.ANALYSIS_DELAY_MS);
      });
    });

    addListener("runAnalysis", "click", runAnalysis);
    addListener("clearAnalysis", "click", clearAnalysis);

    addListener("saveCommunity", "click", () => {
      showView("community");
      toast("Submission added to the community review queue");
    });
  }

  function bindPrototypeActions() {
    queryAll(".review-btn").forEach((button) => {
      button.addEventListener("click", () => {
        toast("Review workspace opened in the full system");
      });
    });
  }

  function init() {
    MILDA.injectIcons();

    renderModules();
    renderCommunity();
    updateCourseProgress();

    bindNavigationEvents();
    bindDrawerAndModalEvents();
    bindCourseEvents();
    bindCommunityEvents();
    bindVerificationEvents();
    bindPrototypeActions();
  }

  MILDA.APP = Object.freeze({
    init,
    showView,
    enterRole,
    exitRole,
    openLesson,
    runAnalysis
  });

  document.addEventListener("DOMContentLoaded", init);
})(window);
