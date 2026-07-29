(function initializeData(global) {
  "use strict";

  const MILDA = global.MILDA = global.MILDA || {};

  MILDA.DATA = Object.freeze({
    COURSE_MODULES: Object.freeze([
      Object.freeze({
        title: "Introduction to Media and Information Literacy",
        description:
          "Core MIL concepts, information ecosystems, and responsible digital participation.",
        progress: 100
      }),
      Object.freeze({
        title: "Misinformation, Disinformation, and Malinformation",
        description:
          "Identify different forms of information disorder in digital contexts.",
        progress: 100
      }),
      Object.freeze({
        title: "Information Disorder and Online Sharing Behavior",
        description:
          "Understand how misleading content spreads and why people share it.",
        progress: 100
      }),
      Object.freeze({
        title: "Evaluating Online Sources and Claims",
        description:
          "Apply credibility indicators and source-evaluation criteria.",
        progress: 100
      }),
      Object.freeze({
        title: "Fact-Checking and Verification Techniques",
        description:
          "Practice source triangulation, reverse image search, and evidence checking.",
        progress: 100
      }),
      Object.freeze({
        title: "Community Verification and Reporting",
        description:
          "Report suspicious content and contribute trusted references responsibly.",
        progress: 100
      }),
      Object.freeze({
        title: "AI-Generated Content and AI Hallucinations",
        description:
          "Recognize AI limitations, hallucinations, and possible synthetic content.",
        progress: 60
      }),
      Object.freeze({
        title: "Deepfakes and Manipulated Media",
        description:
          "Analyze synthetic media, visual artifacts, and edited images or videos.",
        progress: 25
      }),
      Object.freeze({
        title: "Responsible Sharing and Digital Citizenship",
        description:
          "Develop ethical habits for communication and information sharing.",
        progress: 0
      }),
      Object.freeze({
        title: "Ethics of AI and Online Information",
        description:
          "Examine privacy, bias, transparency, accountability, and intellectual honesty.",
        progress: 0
      }),
      Object.freeze({
        title: "MILDA Practical Verification Activities",
        description:
          "Complete guided verification missions using MILDA digital tools.",
        progress: 0
      }),
      Object.freeze({
        title: "Digital Verification Portfolio",
        description:
          "Prepare and present the final evidence-based verification portfolio.",
        progress: 0
      })
    ]),

    COMMUNITY_ITEMS: Object.freeze([
      Object.freeze({
        status: "review",
        tag: "Needs Verification",
        tagClass: "tag-amber",
        reports: "4 reports",
        title: "“Classes are suspended tomorrow in all schools.”",
        text: "No city or school authority is cited in the original post.",
        note:
          "Evidence needed: official advisory from the school, city government, or disaster office.",
        votes: Object.freeze([12, 48, 17])
      }),
      Object.freeze({
        status: "verified",
        tag: "Community Verified",
        tagClass: "tag-green",
        reports: "3 trusted sources",
        title: "Updated scholarship application deadline",
        text:
          "The date matches the official university announcement and registrar notice.",
        note:
          "Moderation note: supported by two independent official records.",
        votes: Object.freeze([86, 4, 1])
      }),
      Object.freeze({
        status: "media",
        tag: "Possible Edited Media",
        tagClass: "tag-purple",
        reports: "Under review",
        title: "Viral image of a public announcement",
        text:
          "Font alignment and image artifacts require closer examination.",
        note:
          "AI advisory: possible edits detected. This is not a final determination.",
        votes: Object.freeze([8, 39, 23])
      }),
      Object.freeze({
        status: "review",
        tag: "Frequently Reported",
        tagClass: "tag-red",
        reports: "11 reports",
        title: "Unverified medical cure shared in a group chat",
        text:
          "The claim provides no clinical source or health-agency guidance.",
        note:
          "High-impact claims require qualified, authoritative evidence.",
        votes: Object.freeze([3, 31, 54])
      }),
      Object.freeze({
        status: "verified",
        tag: "Community Verified",
        tagClass: "tag-green",
        reports: "2 official sources",
        title: "Campus registration schedule",
        text:
          "The dates match the registrar and official university channels.",
        note:
          "Verified through original institutional announcements.",
        votes: Object.freeze([64, 2, 0])
      }),
      Object.freeze({
        status: "media",
        tag: "Possible AI-Generated",
        tagClass: "tag-purple",
        reports: "AI analysis available",
        title: "Synthetic-looking portrait used in a fake endorsement",
        text:
          "The source account and original image cannot yet be confirmed.",
        note:
          "Manual source tracing is required before any final status.",
        votes: Object.freeze([6, 44, 21])
      })
    ]),

    ANALYSIS_SCENARIOS: Object.freeze({
      review: Object.freeze({
        tag: "Needs Verification",
        tagClass: "tag-amber",
        title: "Additional evidence is required",
        summary:
          "The claim does not clearly identify an authoritative source.",
        aiScore: "72%",
        recordCount: "2",
        sourceCount: "1",
        guidance:
          "Search for the original announcement, confirm the date, location, and context, and compare at least two credible references."
      }),
      verified: Object.freeze({
        tag: "Community Verified",
        tagClass: "tag-green",
        title: "Evidence supports the submitted claim",
        summary:
          "Matching official records were found in this prototype scenario.",
        aiScore: "88%",
        recordCount: "4",
        sourceCount: "3",
        guidance:
          "The claim matches multiple official records. A moderator should still confirm source authenticity and context before final publication."
      }),
      media: Object.freeze({
        tag: "Possible Manipulated Media",
        tagClass: "tag-purple",
        title: "Manual media review is recommended",
        summary:
          "Possible synthetic or edited-media indicators were detected.",
        aiScore: "79%",
        recordCount: "1",
        sourceCount: "0",
        guidance:
          "Trace the original media, inspect metadata when available, and compare the visual with authoritative or earlier versions."
      })
    })
  });
})(window);
