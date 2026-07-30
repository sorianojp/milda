(function initializeConstants(global) {
  "use strict";

  const MILDA = global.MILDA = global.MILDA || {};

  MILDA.CONSTANTS = Object.freeze({
    APP: Object.freeze({
      NAME: "MILDA",
      FULL_NAME: "Media and Information Literacy in the Digital Age",
      TEAM: "Team QuantumX",
      PRIMARY_COLOR: "rgb(5, 5, 106)",
      TAGLINE: "Learn. Verify. Share Responsibly."
    }),

    VIEW_INFO: Object.freeze({
      dashboard: Object.freeze([
        "Student Dashboard",
        "Your learning and verification progress"
      ]),
      learn: Object.freeze([
        "Course Modules",
        "Structured Media and Information Literacy learning"
      ]),
      verify: Object.freeze([
        "Verify Content",
        "AI-assisted guidance and evidence-based verification"
      ]),
      community: Object.freeze([
        "Verification Hub",
        "Reports, trusted sources, reviews, and disputes"
      ]),
      leaderboard: Object.freeze([
        "Leaderboard & Badge",
        "Quality-based recognition for responsible contributors"
      ]),
      instructor: Object.freeze([
        "Instructor Dashboard",
        "Course progress, portfolios, and badge eligibility"
      ]),
      admin: Object.freeze([
        "Admin & Safeguards",
        "Moderation, appeals, privacy, and responsible AI"
      ])
    }),

    ROLES: Object.freeze({
      STUDENT: "student",
      INSTRUCTOR: "instructor",
      ADMIN: "admin"
    }),

    ROLE_VIEWS: Object.freeze({
      student: Object.freeze([
        "dashboard",
        "learn",
        "verify",
        "community",
        "leaderboard"
      ]),
      instructor: Object.freeze(["instructor"]),
      admin: Object.freeze(["admin"])
    }),

    MODULE_STATES: Object.freeze({
      ALL: "all",
      COMPLETED: "completed",
      IN_PROGRESS: "progress",
      LOCKED: "locked"
    }),

    COMMUNITY_STATES: Object.freeze({
      ALL: "all",
      VERIFIED: "verified",
      REVIEW: "review",
      MEDIA: "media"
    }),

    ANALYSIS_TYPES: Object.freeze({
      REVIEW: "review",
      VERIFIED: "verified",
      MEDIA: "media"
    }),

    DEMO_CLAIMS: Object.freeze({
      SUSPENSION:
        "Classes are suspended tomorrow in all schools, according to a viral social media post."
    }),

    TIMING: Object.freeze({
      TOAST_DURATION_MS: 2800,
      ANALYSIS_DELAY_MS: 200
    }),

    LESSON_OBJECTIVES: Object.freeze([
      Object.freeze({
        title: "Understand",
        description: "Explain the key concepts and their importance."
      }),
      Object.freeze({
        title: "Evaluate",
        description: "Apply evidence-based criteria to digital content."
      }),
      Object.freeze({
        title: "Practice",
        description: "Complete a guided real-world verification activity."
      }),
      Object.freeze({
        title: "Reflect",
        description: "Document responsible sharing decisions."
      })
    ])
  });
})(window);
