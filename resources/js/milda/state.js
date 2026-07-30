(function initializeState(global) {
  "use strict";

  const MILDA = global.MILDA = global.MILDA || {};
  const { COURSE_MODULES, COMMUNITY_ITEMS } = MILDA.DATA;
  const { MODULE_STATES, COMMUNITY_STATES } = MILDA.CONSTANTS;

  MILDA.state = {
    modules: COURSE_MODULES.map((module) => ({ ...module })),
    communityItems: COMMUNITY_ITEMS.map((item) => ({
      ...item,
      votes: [...item.votes]
    })),
    activeModule: 6,
    activeRole: null,
    moduleFilter: MODULE_STATES.ALL,
    communityFilter: COMMUNITY_STATES.ALL
  };
})(window);
