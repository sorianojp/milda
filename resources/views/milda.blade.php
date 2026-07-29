<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta content="MILDA is a Media and Information Literacy ecosystem for structured learning, AI-assisted guidance, and evidence-based community verification." name="description"/>
<title>MILDA — Learn. Verify. Share Responsibly.</title>

<link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&amp;display=swap" rel="stylesheet"/>
@vite(['resources/css/milda.css', 'resources/js/milda.js'])
</head>
<body>



<section class="intro-screen" id="introScreen">
<div class="intro-card">
<div class="intro-copy">
<div class="intro-logo"><div class="intro-logo-mark">M</div><div><strong>MILDA</strong><div style="font-size:12px;color:rgba(255,255,255,.62)">Team QuantumX · UNESCO Youth Hackathon 2026</div></div></div>
<h1>Learn to verify.<br/>Build digital trust.</h1>
<p>MILDA is a course-centered Media and Information Literacy ecosystem that combines structured learning, AI-assisted guidance, and evidence-based community verification.</p>
<div class="intro-tags"><span class="intro-tag">Course Program</span><span class="intro-tag">Browser Extension</span><span class="intro-tag">Web App</span><span class="intro-tag">Mobile App</span></div>
</div>
<div class="role-panel">
<h2>Explore the prototype</h2>
<p>Select a role to preview the MILDA experience.</p>
<div class="role-grid">
<button class="role-card" data-enter="student"><div class="role-icon"><svg><use href="#i-book"></use></svg></div><div><strong>Student</strong><span>Learn, verify, complete missions, and earn a badge</span></div><div class="role-arrow">→</div></button>
<button class="role-card" data-enter="instructor"><div class="role-icon"><svg><use href="#i-chart"></use></svg></div><div><strong>Instructor</strong><span>Monitor progress and review verification portfolios</span></div><div class="role-arrow">→</div></button>
<button class="role-card" data-enter="admin"><div class="role-icon"><svg><use href="#i-shield"></use></svg></div><div><strong>Administrator</strong><span>Moderate reports, sources, appeals, and safeguards</span></div><div class="role-arrow">→</div></button>
</div>
<div class="intro-note">High-fidelity clickable prototype · Sample data only</div>
</div>
</div>
</section>
<div class="app-shell">
<aside class="sidebar" id="sidebar">
<div class="brand"><div class="brand-mark">M</div><div><h1>MILDA</h1><p>Learn. Verify. Share Responsibly.</p></div></div>
<div class="nav-label">Learning</div>
<nav class="nav">
<button class="active" data-view="dashboard"><svg><use href="#i-home"></use></svg>Dashboard</button>
<button data-view="learn"><svg><use href="#i-book"></use></svg>Course Modules</button>
<button data-view="verify"><svg><use href="#i-check"></use></svg>Verify Content</button>
</nav>
<div class="nav-label">Community</div>
<nav class="nav">
<button data-view="community"><svg><use href="#i-users"></use></svg>Verification Hub</button>
<button data-view="leaderboard"><svg><use href="#i-award"></use></svg>Leaderboard &amp; Badge</button>
</nav>
<div class="nav-label">Management</div>
<nav class="nav">
<button data-view="instructor"><svg><use href="#i-chart"></use></svg>Instructor</button>
<button data-view="admin"><svg><use href="#i-shield"></use></svg>Admin &amp; Safeguards</button>
</nav>
<div class="sidebar-progress"><strong>Badge readiness · 58%</strong><div class="line"><span></span></div><p>Complete all course modules and the Digital Verification Portfolio.</p></div>
</aside>
<main class="main">
<header class="topbar">
<div class="top-left"><button aria-label="Open navigation" class="mobile-menu" id="mobileMenu"><svg><use href="#i-menu"></use></svg></button><div class="page-title"><h2 id="pageHeading">Student Dashboard</h2><p id="pageSubheading">Your learning and verification progress</p></div></div>
<div class="top-actions"><button class="btn btn-outline prototype-label" id="tourBtn"><svg><use href="#i-spark"></use></svg>Demo Tour</button><select aria-label="Preview role" class="role-select" id="roleSelect"><option value="student">Student View</option><option value="instructor">Instructor View</option><option value="admin">Admin View</option></select><button aria-label="Notifications" class="icon-btn" id="notificationBtn"><svg><use href="#i-bell"></use></svg><span class="dot"></span></button><div class="avatar">JC</div></div>
</header>
<div class="content">
<section class="view active" id="dashboard">
<div class="hero">
<div class="hero-copy"><span class="eyebrow"><svg><use href="#i-spark"></use></svg>MILDA Course Program</span><h3>Welcome back, Juan.<br/>Verify before you share.</h3><p>Continue your course, complete a real-world verification mission, and build the evidence-based habits required to become a Verified MILDA Contributor.</p><div class="hero-actions"><button class="btn btn-primary" data-go="learn"><svg><use href="#i-book"></use></svg>Continue Course</button><button class="btn btn-ghost" data-go="verify"><svg><use href="#i-check"></use></svg>Start Verification</button></div></div>
<div class="hero-progress"><div class="progress-ring" id="courseRing" style="--p:58"><strong id="coursePercent">58%</strong><span>course complete</span></div><div><h4>Next: AI-Generated Content</h4><p>Learn how AI hallucinations happen and how to verify AI-assisted outputs.</p><button class="btn btn-ghost" id="openNextLesson" style="margin-top:12px">Open Module 7</button></div></div>
</div>
<div class="stats-grid">
<div class="card stat"><div class="stat-icon"><svg><use href="#i-award"></use></svg></div><div class="stat-label">Trusted Score</div><div class="stat-value">824</div><div class="stat-delta">↑ 42 this week</div></div>
<div class="card stat"><div class="stat-icon"><svg><use href="#i-check"></use></svg></div><div class="stat-label">Verification Missions</div><div class="stat-value">18</div><div class="stat-delta">3 awaiting review</div></div>
<div class="card stat"><div class="stat-icon"><svg><use href="#i-link"></use></svg></div><div class="stat-label">Accepted Sources</div><div class="stat-value">27</div><div class="stat-delta">92% acceptance rate</div></div>
<div class="card stat"><div class="stat-icon"><svg><use href="#i-users"></use></svg></div><div class="stat-label">Helpful Reviews</div><div class="stat-value">44</div><div class="stat-delta">Quality contributor</div></div>
</div>
<div class="grid-2">
<div class="card">
<div class="card-header"><div><h3>Quick Verification</h3><div class="muted small">Paste a claim or URL to begin a guided check.</div></div><span class="tag tag-purple">AI-assisted</span></div>
<label for="quickClaim">Claim, caption, or article excerpt</label><textarea id="quickClaim" placeholder="Paste suspicious digital content here..."></textarea>
<button class="demo-claim" id="loadDemoClaim"><svg><use href="#i-spark"></use></svg>Load a demonstration claim</button>
<div class="input-row"><input id="quickUrl" placeholder="https://example.com/source" type="url"/><button class="btn btn-dark analyze-btn"><svg><use href="#i-search"></use></svg>Analyze</button></div>
<p class="tiny muted">AI guidance is advisory. Final status requires credible evidence and moderation.</p>
</div>
<div class="card"><div class="card-header"><div><h3>Recent Community Activity</h3><div class="muted small">Live-style sample records</div></div><button class="btn btn-outline" data-go="community">View hub</button></div><div class="feed">
<div class="feed-item"><div class="feed-meta"><span class="tag tag-amber">Needs Verification</span><span class="tiny muted">12 min ago</span></div><h4>Claim about a school suspension</h4><p>Official evidence has not yet been attached to the original post.</p></div>
<div class="feed-item"><div class="feed-meta"><span class="tag tag-green">Community Verified</span><span class="tiny muted">1 hr ago</span></div><h4>Updated scholarship application schedule</h4><p>Supported by an official university announcement and registrar notice.</p></div>
<div class="feed-item"><div class="feed-meta"><span class="tag tag-purple">Possible AI-Generated</span><span class="tiny muted">3 hrs ago</span></div><h4>Viral image with inconsistent details</h4><p>AI signal detected; original-source tracing is recommended.</p></div>
</div></div>
</div>
</section>
<section class="view" id="learn">
<div class="section-heading"><div><h2>MILDA Course Modules</h2><p>Complete the structured course and Digital Verification Portfolio to earn the contributor badge.</p></div><div class="filter-row" id="moduleFilters"><button class="filter-chip active" data-filter="all">All</button><button class="filter-chip" data-filter="completed">Completed</button><button class="filter-chip" data-filter="progress">In progress</button><button class="filter-chip" data-filter="locked">Locked</button></div></div>
<div class="module-grid" id="moduleGrid"></div>
</section>
<section class="view" id="verify">
<div class="section-heading"><div><h2>Verify Digital Content</h2><p>Use AI-assisted guidance, source evaluation, and moderated community review.</p></div><span class="tag tag-blue">Guided workflow</span></div>
<div class="verify-layout">
<div class="card">
<div class="tab-row"><button class="tab active" data-tab="text">Text / Claim</button><button class="tab" data-tab="url">URL</button><button class="tab" data-tab="image">Image</button></div>
<div class="verify-tab" id="tab-text"><label for="verifyClaim">Claim or caption</label><textarea id="verifyClaim" placeholder="Paste the claim, caption, or text you want to examine..."></textarea><button class="demo-claim" id="loadVerifyDemo"><svg><use href="#i-spark"></use></svg>Use demo: school suspension claim</button></div>
<div class="verify-tab hidden" id="tab-url"><label for="verifyUrl">Article or post URL</label><input id="verifyUrl" placeholder="https://..." type="url"/><div style="height:12px"></div><label for="urlContext">Optional context</label><textarea id="urlContext" placeholder="What part of the page should be checked?"></textarea></div>
<div class="verify-tab hidden" id="tab-image"><div class="upload-zone"><svg><use href="#i-upload"></use></svg><h3 style="margin:8px 0 4px">Upload a screenshot or image</h3><div class="small muted">PNG, JPG, or WEBP · Prototype preview only</div><input accept="image/*" style="margin-top:12px" type="file"/></div></div>
<div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:14px"><button class="btn btn-dark" id="runAnalysis"><svg><use href="#i-search"></use></svg>Run Guided Analysis</button><button class="btn btn-outline" id="clearAnalysis">Clear</button></div>
</div>
<div class="card"><h3>Five-step verification process</h3><div class="workflow">
<div class="workflow-step"><div class="step-n">1</div><div><strong>Check existing records</strong><p>Search for prior reviews, reports, and trusted sources.</p></div></div>
<div class="workflow-step"><div class="step-n">2</div><div><strong>AI-assisted guidance</strong><p>Extract claims and identify verification questions or manipulation signals.</p></div></div>
<div class="workflow-step"><div class="step-n">3</div><div><strong>Evaluate evidence</strong><p>Compare primary sources, official records, and independent references.</p></div></div>
<div class="workflow-step"><div class="step-n">4</div><div><strong>Community review</strong><p>Contributors may report, vote, add sources, or dispute results.</p></div></div>
<div class="workflow-step"><div class="step-n">5</div><div><strong>Moderated status</strong><p>Community voting alone never establishes factual accuracy.</p></div></div>
</div></div>
</div>
<div class="result-panel hidden" id="resultPanel">
<div class="result-head"><div><span class="tag tag-amber" id="resultTag">Needs Verification</span><h2 id="resultTitle" style="margin:10px 0 4px">Guided verification result</h2><div class="small muted" id="resultSummary">The content requires additional evidence.</div></div><button class="btn btn-outline" id="saveCommunity">Submit for Community Review</button></div>
<div class="result-body"><div><h3>Advisory assessment</h3><div class="score-box"><div><span class="tiny muted">AI confidence</span><strong id="aiScore">72%</strong></div><div><span class="tiny muted">Records found</span><strong id="recordScore">2</strong></div><div><span class="tiny muted">Sources found</span><strong id="sourceScore">1</strong></div></div><p class="small muted" id="analysisText">Search for the original announcement, confirm the date and location, and compare at least two credible references.</p><div class="notice"><strong>Important:</strong> This AI-assisted output is advisory and not a final determination.</div></div><div><h3>Recommended checks</h3><div class="checklist"><div class="check"><div class="mark">✓</div><div><strong>Identify the original publisher</strong><div class="tiny muted">Find who first issued the claim.</div></div></div><div class="check"><div class="mark">✓</div><div><strong>Check date and context</strong><div class="tiny muted">Old or unrelated information can mislead.</div></div></div><div class="check"><div class="mark">✓</div><div><strong>Compare official sources</strong><div class="tiny muted">Prefer primary and independent evidence.</div></div></div></div></div></div>
</div>
</section>
<section class="view" id="community">
<div class="section-heading"><div><h2>Community Verification Hub</h2><p>Participate through evidence, responsible feedback, and moderated review.</p></div><div class="filter-row" id="communityFilters"><button class="filter-chip active" data-status="all">All</button><button class="filter-chip" data-status="verified">Verified</button><button class="filter-chip" data-status="review">Needs Review</button><button class="filter-chip" data-status="media">Manipulated Media</button></div></div>
<div class="grid-3" id="communityGrid"></div>
</section>
<section class="view" id="leaderboard">
<div class="grid-2">
<div class="card"><div class="card-header"><div><h2>Quality-based Leaderboard</h2><div class="small muted">Scores reward accepted evidence, helpful reviews, and responsible participation—not report volume alone.</div></div><select class="role-select" style="display:block"><option>This Semester</option><option>This Month</option></select></div><div class="leaderboard-wrap"><table><thead><tr><th>Rank</th><th>Contributor</th><th>Recognition</th><th>Evidence Quality</th><th>Trusted Score</th></tr></thead><tbody><tr><td>1</td><td>Alex D.</td><td><span class="tag tag-green">Verified Contributor</span></td><td>96%</td><td>1,420</td></tr><tr><td>2</td><td>Jamie C.</td><td><span class="tag tag-green">Verified Contributor</span></td><td>94%</td><td>1,315</td></tr><tr><td>3</td><td>Yvonne I.</td><td><span class="tag tag-green">Verified Contributor</span></td><td>91%</td><td>1,207</td></tr><tr><td>4</td><td>Luigi B.</td><td><span class="tag tag-blue">Course Participant</span></td><td>88%</td><td>1,080</td></tr><tr><td>5</td><td>Angela M.</td><td><span class="tag tag-blue">Course Participant</span></td><td>85%</td><td>972</td></tr></tbody></table></div></div>
<div class="card badge-panel"><div><div class="badge-seal"><svg><use href="#i-award"></use></svg></div><h2>Verified MILDA Contributor</h2><p class="muted small">A course-completion badge showing that the user finished MILDA training and the final Digital Verification Portfolio.</p><div class="requirement-list"><div class="requirement done">✓ Complete Modules 1–6</div><div class="requirement">○ Complete Modules 7–11</div><div class="requirement">○ Submit Digital Verification Portfolio</div><div class="requirement">○ Pass instructor review</div></div><button class="btn btn-outline" id="badgeInfo" style="margin-top:16px">View Badge Policy</button></div></div>
</div>
</section>
<section class="view" id="instructor">
<div class="stats-grid"><div class="card stat"><div class="stat-icon"><svg><use href="#i-users"></use></svg></div><div class="stat-label">Enrolled Students</div><div class="stat-value">126</div><div class="stat-delta">Across 4 sections</div></div><div class="card stat"><div class="stat-icon"><svg><use href="#i-chart"></use></svg></div><div class="stat-label">Course Completion</div><div class="stat-value">68%</div><div class="stat-delta">↑ 9% this month</div></div><div class="card stat"><div class="stat-icon"><svg><use href="#i-file"></use></svg></div><div class="stat-label">Portfolio Reviews</div><div class="stat-value">31</div><div class="stat-delta">12 pending</div></div><div class="card stat"><div class="stat-icon"><svg><use href="#i-check"></use></svg></div><div class="stat-label">Missions Submitted</div><div class="stat-value">842</div><div class="stat-delta">91% include evidence</div></div></div>
<div class="grid-2"><div class="card"><div class="card-header"><div><h3>Badge Eligibility Queue</h3><div class="small muted">Review course completion and final portfolios.</div></div><span class="tag tag-amber">12 pending</span></div><div class="queue"><div class="queue-item"><div><strong>Student 2026-0182</strong><p>12 modules completed · Portfolio submitted</p></div><button class="btn btn-outline review-btn">Review</button></div><div class="queue-item"><div><strong>Student 2026-0214</strong><p>11 modules completed · 1 mission pending</p></div><button class="btn btn-outline review-btn">Review</button></div><div class="queue-item"><div><strong>Student 2026-0251</strong><p>Portfolio resubmitted after feedback</p></div><button class="btn btn-outline review-btn">Review</button></div></div></div><div class="card"><h3>Section Progress</h3><div class="feed"><div class="feed-item"><div class="feed-meta"><strong>BSIT Section A</strong><span>82%</span></div><div class="linear-progress"><span style="width:82%"></span></div></div><div class="feed-item"><div class="feed-meta"><strong>BSCS Section A</strong><span>74%</span></div><div class="linear-progress"><span style="width:74%"></span></div></div><div class="feed-item"><div class="feed-meta"><strong>Senior High Pilot</strong><span>63%</span></div><div class="linear-progress"><span style="width:63%"></span></div></div><div class="feed-item"><div class="feed-meta"><strong>Cross-program Elective</strong><span>58%</span></div><div class="linear-progress"><span style="width:58%"></span></div></div></div></div></div>
</section>
<section class="view" id="admin">
<div class="notice"><strong>Responsible AI, Privacy, and Community Safeguards</strong><br/>AI analysis is advisory; evidence is required; reports and sources are moderated; users may dispute or appeal results; personal information must be protected; and community voting alone does not establish factual accuracy.</div>
<div class="grid-2"><div class="card"><div class="card-header"><div><h3>Moderation Queue</h3><div class="small muted">Priority items requiring evidence-based review</div></div><span class="tag tag-red">8 urgent</span></div><div class="queue"><div class="queue-item"><div><strong>Possible manipulated image</strong><p>6 reports · 2 sources · appeal submitted</p></div><button class="btn btn-outline review-btn">Open</button></div><div class="queue-item"><div><strong>Unsupported medical claim</strong><p>11 reports · no primary source</p></div><button class="btn btn-outline review-btn">Open</button></div><div class="queue-item"><div><strong>Source credibility dispute</strong><p>Contributor requested re-evaluation</p></div><button class="btn btn-outline review-btn">Open</button></div></div></div><div class="card"><h3>Safeguard Status</h3><div class="feed"><div class="feed-item"><div class="feed-meta"><strong>Evidence requirement</strong><span class="tag tag-green">Enabled</span></div><p>Verified status requires credible references and moderator review.</p></div><div class="feed-item"><div class="feed-meta"><strong>Community vote limitation</strong><span class="tag tag-green">Enabled</span></div><p>Votes inform review but cannot independently determine accuracy.</p></div><div class="feed-item"><div class="feed-meta"><strong>Appeals and disputes</strong><span class="tag tag-green">Enabled</span></div><p>Users may request a second moderated evaluation.</p></div><div class="feed-item"><div class="feed-meta"><strong>Course-finisher badge</strong><span class="tag tag-green">Enabled</span></div><p>Only qualified course finishers receive the Verified MILDA Contributor Badge.</p></div></div></div></div>
<div class="grid-2"><div class="card"><h3>Audit Log</h3><div class="audit-log"><div class="audit-item"><span class="audit-dot"></span><div><strong>Moderator updated content status</strong><div class="tiny muted">Needs Verification → Under Review</div></div><span class="tiny muted">10:42</span></div><div class="audit-item"><span class="audit-dot"></span><div><strong>New appeal submitted</strong><div class="tiny muted">Case #MILDA-2041</div></div><span class="tiny muted">09:18</span></div><div class="audit-item"><span class="audit-dot"></span><div><strong>Trusted source accepted</strong><div class="tiny muted">Official university advisory</div></div><span class="tiny muted">Yesterday</span></div></div></div><div class="card"><h3>Privacy Controls</h3><div class="checklist"><div class="check"><div class="mark">✓</div><div><strong>Minimize stored personal data</strong><div class="tiny muted">Only information required for learning and moderation is retained.</div></div></div><div class="check"><div class="mark">✓</div><div><strong>Protect uploaded content</strong><div class="tiny muted">Access is restricted to authorized reviewers.</div></div></div><div class="check"><div class="mark">✓</div><div><strong>Maintain moderation logs</strong><div class="tiny muted">Status changes and appeals remain auditable.</div></div></div></div></div></div>
</section>
<footer class="footer">Team QuantumX · Universidad de Dagupan · UNESCO Youth Hackathon 2026<br/><strong>Learn. Verify. Share Responsibly.</strong></footer>
</div>
</main>
</div>
<div class="drawer-backdrop" id="drawerBackdrop"></div>
<aside class="drawer" id="notificationDrawer"><div class="drawer-head"><div><h3>Notifications</h3><div class="tiny muted">Recent learning and verification updates</div></div><button class="close-btn" id="closeDrawer"><svg><use href="#i-close"></use></svg></button></div><div class="notification"><strong>Your trusted source was accepted</strong><p>The official registrar advisory was added to a Community Verified record.</p></div><div class="notification"><strong>Module 7 is ready</strong><p>Continue AI-Generated Content and AI Hallucinations.</p></div><div class="notification"><strong>Portfolio feedback received</strong><p>Your instructor requested one additional source for Item 3.</p></div></aside>
<div class="modal-backdrop" id="lessonModal"><div class="modal"><div class="modal-head"><div><span class="tag tag-blue" id="lessonStatus">Course Module</span><h2 id="lessonTitle">Module Title</h2><div class="small muted" id="lessonSubtitle"></div></div><button class="close-btn modal-close"><svg><use href="#i-close"></use></svg></button></div><div class="lesson-objectives" id="lessonObjectives"></div><div class="notice"><strong>Practical activity:</strong> Apply the lesson to a real or simulated online post and document the evidence used.</div><div class="quiz-box"><strong>Knowledge check</strong><div class="small muted" style="margin-top:3px">Which action best supports responsible verification?</div><div class="quiz-options"><button class="quiz-option">Share immediately if the claim has many likes.</button><button class="quiz-option correct-answer">Compare the claim with credible primary and independent sources.</button><button class="quiz-option">Trust the first AI-generated answer without checking evidence.</button></div></div><div style="display:flex;justify-content:flex-end;gap:9px;margin-top:16px"><button class="btn btn-outline modal-close">Close</button><button class="btn btn-dark" id="completeModule">Mark Module Complete</button></div></div></div>
<div class="modal-backdrop" id="tourModal"><div class="modal"><div class="modal-head"><div><span class="tag tag-purple">Pitch-friendly guided tour</span><h2>How MILDA works</h2><div class="small muted">A four-part story you can demonstrate during the hackathon pitch.</div></div><button class="close-btn modal-close"><svg><use href="#i-close"></use></svg></button></div><div class="tour-step"><div class="icon"><svg><use href="#i-book"></use></svg></div><div><h4>1. Students learn</h4><p>Structured modules teach source evaluation, fact-checking, AI literacy, manipulated media, ethics, and digital citizenship.</p></div></div><div class="tour-step"><div class="icon"><svg><use href="#i-check"></use></svg></div><div><h4>2. Students verify</h4><p>The web app guides users through claim extraction, source checking, evidence comparison, and reflection.</p></div></div><div class="tour-step"><div class="icon"><svg><use href="#i-users"></use></svg></div><div><h4>3. Communities contribute</h4><p>Users may report content, add trusted sources, review evidence, and dispute results under moderation.</p></div></div><div class="tour-step"><div class="icon"><svg><use href="#i-award"></use></svg></div><div><h4>4. Course finishers are recognized</h4><p>Qualified finishers earn the Verified MILDA Contributor Badge after completing the course and portfolio review.</p></div></div><div style="display:flex;justify-content:flex-end;margin-top:15px"><button class="btn btn-dark" id="startTour">Start with Dashboard</button></div></div></div>
<div class="modal-backdrop" id="policyModal"><div class="modal"><div class="modal-head"><div><span class="tag tag-green">Badge policy</span><h2>Verified MILDA Contributor Badge</h2></div><button class="close-btn modal-close"><svg><use href="#i-close"></use></svg></button></div><p class="muted">This badge identifies users who successfully complete the MILDA Course Program and final portfolio. It does not make their contributions automatically correct.</p><div class="checklist"><div class="check"><div class="mark">1</div><div><strong>Complete required modules</strong><div class="tiny muted">Finish structured learning activities and assessments.</div></div></div><div class="check"><div class="mark">2</div><div><strong>Submit the Digital Verification Portfolio</strong><div class="tiny muted">Demonstrate source evaluation, verification methods, and responsible reflection.</div></div></div><div class="check"><div class="mark">3</div><div><strong>Pass instructor review</strong><div class="tiny muted">The course finisher must meet the minimum quality criteria.</div></div></div><div class="check"><div class="mark">4</div><div><strong>Remain subject to moderation</strong><div class="tiny muted">Badge holders may receive higher credibility weight, but evidence and safeguards still apply.</div></div></div></div></div></div>
<div class="toast-container" id="toastContainer"></div>

</body>
</html>
