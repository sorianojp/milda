import { Head } from '@inertiajs/react';
import {
    Award,
    BarChart3,
    Bell,
    BookOpen,
    Check,
    CircleCheck,
    CircleHelp,
    FileText,
    Home,
    Link,
    Menu,
    Search,
    ShieldCheck,
    Sparkles,
    TriangleAlert,
    Upload,
    Users,
    X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import {
    analysisScenarios,
    communityItems as initialCommunityItems,
    courseModules as initialCourseModules,
    demoClaim,
} from '@/data/milda';
import type { AnalysisScenario, CommunityItem, CommunityLink } from '@/data/milda';
import '../../css/milda.css';

type View =
    | 'dashboard'
    | 'learn'
    | 'verify'
    | 'community'
    | 'leaderboard'
    | 'instructor'
    | 'admin';
type Role = 'student' | 'instructor' | 'admin';
type ModuleFilter = 'all' | 'completed' | 'progress' | 'locked';
type CommunityFilter = 'all' | 'verified' | 'review' | 'media' | 'reported';
type VerifyTab = 'text' | 'url' | 'image';
type ModalName = 'lesson' | 'tour' | 'policy' | 'submitClaim' | 'addSource' | null;

type MildaProps = {
    syllabusUrl: string;
};

type ToastMessage = {
    id: number;
    message: string;
};

const viewInfo: Record<View, [string, string]> = {
    dashboard: ['Student Dashboard', 'Your learning and verification progress'],
    learn: [
        'Course Modules',
        'Structured Media and Information Literacy learning',
    ],
    verify: [
        'Verify Content',
        'AI-assisted guidance and evidence-based verification',
    ],
    community: [
        'Verification Hub',
        'Reports, trusted sources, reviews, and disputes',
    ],
    leaderboard: [
        'Leaderboard & Badge',
        'Quality-based recognition for responsible contributors',
    ],
    instructor: [
        'Instructor Dashboard',
        'Course progress, portfolios, and badge eligibility',
    ],
    admin: [
        'Admin & Safeguards',
        'Moderation, appeals, privacy, and responsible AI',
    ],
};

const navGroups: {
    label: string;
    items: { view: View; label: string; icon: LucideIcon }[];
}[] = [
    {
        label: 'Learning',
        items: [
            { view: 'dashboard', label: 'Dashboard', icon: Home },
            { view: 'learn', label: 'Course Modules', icon: BookOpen },
            { view: 'verify', label: 'Verify Content', icon: Check },
        ],
    },
    {
        label: 'Community',
        items: [
            { view: 'community', label: 'Verification Hub', icon: Users },
            {
                view: 'leaderboard',
                label: 'Leaderboard & Badge',
                icon: Award,
            },
        ],
    },
    {
        label: 'Management',
        items: [
            { view: 'instructor', label: 'Instructor', icon: BarChart3 },
            {
                view: 'admin',
                label: 'Admin & Safeguards',
                icon: ShieldCheck,
            },
        ],
    },
];

const claimStatusMeta: Record<CommunityItem['status'], { tag: string; tagClass: string }> = {
    review: { tag: 'Needs Verification', tagClass: 'tag-amber' },
    verified: { tag: 'Community Verified', tagClass: 'tag-green' },
    media: { tag: 'Possible Manipulated Media', tagClass: 'tag-purple' },
    reported: { tag: 'Frequently Reported', tagClass: 'tag-red' }, // add this
};

const sourcePlatformOptions: { value: CommunityLink['platform']; label: string }[] = [
    { value: 'facebook', label: 'Facebook Post / Reel' },
    { value: 'instagram', label: 'Instagram Post / Story' },
    { value: 'twitter', label: 'X (Twitter) Post' },
    { value: 'tiktok', label: 'TikTok Video' },
    { value: 'youtube', label: 'YouTube Video' },
    { value: 'web', label: 'Website / News Article' },
];

function detectPlatform(url: string): CommunityLink['platform'] {
    const lower = url.toLowerCase();
    if (lower.includes('facebook.com') || lower.includes('fb.com')) return 'facebook';
    if (lower.includes('instagram.com')) return 'instagram';
    if (lower.includes('twitter.com') || lower.includes('x.com')) return 'twitter';
    if (lower.includes('tiktok.com')) return 'tiktok';
    if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube'; // add this
    return 'web';
}

function StatCard({
    icon: Icon,
    label,
    value,
    detail,
}: {
    icon: LucideIcon;
    label: string;
    value: string;
    detail: string;
}) {
    return (
        <div className="card stat">
            <div className="stat-icon">
                <Icon />
            </div>
            <div className="stat-label">{label}</div>
            <div className="stat-value">{value}</div>
            <div className="stat-delta">{detail}</div>
        </div>
    );
}

function ChecklistItem({
    mark = '✓',
    title,
    detail,
}: {
    mark?: string;
    title: string;
    detail: string;
}) {
    return (
        <div className="check">
            <div className="mark">{mark}</div>
            <div>
                <strong>{title}</strong>
                <div className="tiny muted">{detail}</div>
            </div>
        </div>
    );
}

function IntroScreen({
    onEnter,
    syllabusUrl,
}: {
    onEnter: (role: Role) => void;
    syllabusUrl: string;
}) {
    const roles: {
        role: Role;
        title: string;
        description: string;
        icon: LucideIcon;
    }[] = [
        {
            role: 'student',
            title: 'Student',
            description: 'Learn, verify, complete missions, and earn a badge',
            icon: BookOpen,
        },
        {
            role: 'instructor',
            title: 'Instructor',
            description: 'Monitor progress and review verification portfolios',
            icon: BarChart3,
        },
        {
            role: 'admin',
            title: 'Administrator',
            description: 'Moderate reports, sources, appeals, and safeguards',
            icon: ShieldCheck,
        },
    ];

    return (
        <section className="intro-screen">
            <div className="intro-card">
                <div className="intro-copy">
                    <div className="intro-logo">
                        <img
                            src="/images/milda.png"
                            alt="MILDA"
                            className="intro-logo-image"
                        />
                        <div className="intro-team">
                            Team QuantumX · UNESCO Youth Hackathon 2026
                        </div>
                    </div>
                    <h1><b>
                        Learn to verify.
                        <br />
                        Build digital trust.
                    </b></h1>
                    <p>
                        MILDA is a course-centered Media and Information
                        Literacy ecosystem that combines structured learning,
                        AI-assisted guidance, and evidence-based community
                        verification.
                    </p>
                    <div className="intro-tags">
                        <span className="intro-tag">Course Program</span>
                        <span className="intro-tag">Browser Extension</span>
                        <span className="intro-tag">Web App</span>
                        <span className="intro-tag">Mobile App</span>
                    </div>
                </div>
                <div className="role-panel">
                    <h2><b>Explore the prototype</b></h2>
                    <p>Select a role to preview the MILDA experience.</p>
                    <div className="role-grid">
                        {roles.map(
                            ({ role, title, description, icon: RoleIcon }) => (
                                <button
                                    className="role-card"
                                    key={role}
                                    onClick={() => onEnter(role)}
                                    type="button"
                                >
                                    <div className="role-icon">
                                        <RoleIcon />
                                    </div>
                                    <div>
                                        <strong>{title}</strong>
                                        <span>{description}</span>
                                    </div>
                                    <div className="role-arrow">→</div>
                                </button>
                            ),
                        )}
                    </div>
                    <a
                        className="btn btn-dark download-link intro-download"
                        download
                        href={syllabusUrl}
                    >
                        <FileText />
                        Download MILDA Course Syllabus
                    </a>
                    <div className="intro-note">
                        High-fidelity clickable prototype · Sample data only
                    </div>
                </div>
            </div>
        </section>
    );
}

function DashboardView({
    courseProgress,
    quickClaim,
    quickUrl,
    setQuickClaim,
    setQuickUrl,
    showView,
    openLesson,
    analyzeQuickClaim,
    syllabusUrl,
    toast,
}: {
    courseProgress: number;
    quickClaim: string;
    quickUrl: string;
    setQuickClaim: (value: string) => void;
    setQuickUrl: (value: string) => void;
    showView: (view: View) => void;
    openLesson: (index: number) => void;
    analyzeQuickClaim: () => void;
    syllabusUrl: string;
    toast: (message: string) => void;
}) {
    return (
        <section className="view active dashboard-view">
            <div className="hero">
                <div className="hero-copy">
                    <span className="eyebrow">
                        <Sparkles />
                        MILDA Course Program
                    </span>
                    <h3><b>
                        Welcome back, Juan.
                        
                        Verify before you share.
                    </b></h3><br />
                    <p>
                        Continue your course, complete a real-world verification
                        mission, and build the evidence-based habits required to
                        become a Verified MILDA Contributor.
                    </p>
                    <div className="hero-actions">
                        <button
                            className="btn btn-ghost"
                            onClick={() => showView('learn')}
                            type="button"
                        >
                            <BookOpen />
                            Continue Course
                        </button>
                        <a
                            className="btn btn-ghost download-link"
                            download
                            href={syllabusUrl}
                        >
                            <FileText />
                            Download Syllabus
                        </a>
                        <button
                            className="btn btn-ghost"
                            onClick={() => showView('verify')}
                            type="button"
                        >
                            <Check />
                            Start Verification
                        </button>
                    </div>
                </div>
                <div className="hero-progress">
                    <div className="progress-ring">
                        <strong>{courseProgress}%</strong>
                        <span>progress</span>
                    </div>
                    <div>
                        <h4>Next: AI-Generated Content</h4>
                        <p>
                            Learn how AI hallucinations happen and how to verify
                            AI-assisted outputs.
                        </p>
                        <button
                            className="btn btn-ghost lesson-button"
                            onClick={() => openLesson(6)}
                            type="button"
                        >
                            Open Module 7
                        </button>
                    </div>
                </div>
            </div>
            <div className="stats-grid">
                <StatCard
                    detail="↑ 42 this week"
                    icon={Award}
                    label="Trusted Score"
                    value="824"
                />
                <StatCard
                    detail="3 awaiting review"
                    icon={Check}
                    label="Verification Missions"
                    value="18"
                />
                <StatCard
                    detail="92% acceptance rate"
                    icon={Link}
                    label="Accepted Sources"
                    value="27"
                />
                <StatCard
                    detail="Quality contributor"
                    icon={Users}
                    label="Helpful Reviews"
                    value="44"
                />
            </div>
            <div className="grid-2">
                <div className="card">
                    <div className="card-header">
                        <div>
                            <h3><b>Quick Verification</b></h3>
                            <div className="muted small">
                                Paste a claim or URL to begin a guided check.
                            </div>
                        </div>
                        <span className="tag tag-purple">AI-assisted</span>
                    </div>
                    <label htmlFor="quickClaim">
                        Claim, caption, or article excerpt
                    </label>
                    <textarea
                        id="quickClaim"
                        onChange={(event) => setQuickClaim(event.target.value)}
                        placeholder="Paste suspicious digital content here..."
                        value={quickClaim}
                    />
                    <button
                        className="demo-claim"
                        onClick={() => {
                            setQuickClaim(demoClaim);
                            toast('Demonstration claim loaded');
                        }}
                        type="button"
                    >
                        <Sparkles />
                        Load a demonstration claim
                    </button>
                    <div className="input-row">
                        <input
                            onChange={(event) =>
                                setQuickUrl(event.target.value)
                            }
                            placeholder="https://example.com/source"
                            type="url"
                            value={quickUrl}
                        />
                        <button
                            className="btn btn-dark"
                            onClick={analyzeQuickClaim}
                            type="button"
                        >
                            <Search />
                            Analyze
                        </button>
                    </div>
                    <p className="tiny muted">
                        AI guidance is advisory. Final status requires credible
                        evidence and moderation.
                    </p>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div>
                            <h3><b>Recent Community Activity</b></h3>
                            <div className="muted small">
                                Live-style sample records
                            </div>
                        </div>
                        <button
                            className="btn btn-outline"
                            onClick={() => showView('community')}
                            type="button"
                        >
                            View hub
                        </button>
                    </div>
                    <div className="feed">
                        <div className="feed-item">
                            <div className="feed-meta">
                                <span className="tag tag-amber">
                                    Needs Verification
                                </span>
                                <span className="tiny muted">12 min ago</span>
                            </div>
                            <h4><b>Claim about a school suspension</b></h4>
                            <p>
                                Official evidence has not yet been attached to
                                the original post.
                            </p>
                        </div>
                        <div className="feed-item">
                            <div className="feed-meta">
                                <span className="tag tag-green">
                                    Community Verified
                                </span>
                                <span className="tiny muted">1 hr ago</span>
                            </div>
                            <h4><b>Updated scholarship application schedule</b></h4>
                            <p>
                                Supported by an official university announcement
                                and registrar notice.
                            </p>
                        </div>
                        <div className="feed-item">
                            <div className="feed-meta">
                                <span className="tag tag-purple">
                                    Possible AI-Generated
                                </span>
                                <span className="tiny muted">3 hrs ago</span>
                            </div>
                            <h4><b>Viral image with inconsistent details</b></h4>
                            <p>
                                AI signal detected; original-source tracing is
                                recommended.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ModulesView({
    modules,
    moduleFilter,
    syllabusUrl,
    setModuleFilter,
    openLesson,
}: {
    modules: typeof initialCourseModules;
    moduleFilter: ModuleFilter;
    syllabusUrl: string;
    setModuleFilter: (filter: ModuleFilter) => void;
    openLesson: (index: number) => void;
}) {
    const moduleState = (progress: number): Exclude<ModuleFilter, 'all'> => {
        if (progress === 100) {
            return 'completed';
        }

        return progress > 0 ? 'progress' : 'locked';
    };

    return (
        <section className="view active">
            <div className="section-heading">
                <div className="filter-row">
                    {(
                        [
                            ['all', 'All'],
                            ['completed', 'Completed'],
                            ['progress', 'In progress'],
                            ['locked', 'Locked'],
                        ] as [ModuleFilter, string][]
                    ).map(([filter, label]) => (
                        <button
                            className={`filter-chip ${moduleFilter === filter ? 'active' : ''}`}
                            key={filter}
                            onClick={() => setModuleFilter(filter)}
                            type="button"
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="module-grid">
                {modules.map((module, index) => {
                    const state = moduleState(module.progress);

                    if (moduleFilter !== 'all' && state !== moduleFilter) {
                        return null;
                    }

                    const label =
                        state === 'completed'
                            ? 'Completed'
                            : state === 'progress'
                              ? `${module.progress}% complete`
                              : 'Locked';
                    const action =
                        state === 'completed'
                            ? 'Review'
                            : state === 'progress'
                              ? 'Continue'
                              : 'Preview';
                    const tagClass =
                        state === 'completed'
                            ? 'tag-green'
                            : state === 'progress'
                              ? 'tag-blue'
                              : 'tag-amber';

                    return (
                        <article
                            className="card module-card"
                            key={module.title}
                        >
                            <div className="module-number">{index + 1}</div>
                            <h3><b>{module.title}</b></h3>
                            <p>{module.description}</p>
                            <div className="linear-progress">
                                <span
                                    style={{ width: `${module.progress}%` }}
                                />
                            </div>
                            <div className="module-footer">
                                <span className={`tag ${tagClass}`}>
                                    {label}
                                </span>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => openLesson(index)}
                                    type="button"
                                >
                                    {action}
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

function VerificationView({
    tab,
    verifyClaim,
    verifyUrl,
    urlContext,
    result,
    resultVisible,
    setTab,
    setVerifyClaim,
    setVerifyUrl,
    setUrlContext,
    runAnalysis,
    clearAnalysis,
    submitForReview,
}: {
    tab: VerifyTab;
    verifyClaim: string;
    verifyUrl: string;
    urlContext: string;
    result: AnalysisScenario;
    resultVisible: boolean;
    setTab: (tab: VerifyTab) => void;
    setVerifyClaim: (value: string) => void;
    setVerifyUrl: (value: string) => void;
    setUrlContext: (value: string) => void;
    runAnalysis: () => void;
    clearAnalysis: () => void;
    submitForReview: () => void;
}) {
    const workflow = [
        [
            'Check existing records',
            'Search for prior reviews, reports, and trusted sources.',
        ],
        [
            'AI-assisted guidance',
            'Extract claims and identify verification questions or manipulation signals.',
        ],
        [
            'Evaluate evidence',
            'Compare primary sources, official records, and independent references.',
        ],
        [
            'Community review',
            'Contributors may report, vote, add sources, or dispute results.',
        ],
        [
            'Moderated status',
            'Community voting alone never establishes factual accuracy.',
        ],
    ];

    return (
        <section className="view active">
            <div className="section-heading">
                <div>
                    <h2>Verify Digital Content</h2>
                    <p>
                        Use AI-assisted guidance, source evaluation, and
                        moderated community review.
                    </p>
                </div>
                <span className="tag tag-blue">Guided workflow</span>
            </div>
            <div className="verify-layout">
                <div className="card">
                    <div className="tab-row">
                        {(
                            [
                                ['text', 'Text / Claim'],
                                ['url', 'URL'],
                                ['image', 'Image'],
                            ] as [VerifyTab, string][]
                        ).map(([tabName, label]) => (
                            <button
                                className={`tab ${tab === tabName ? 'active' : ''}`}
                                key={tabName}
                                onClick={() => setTab(tabName)}
                                type="button"
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    {tab === 'text' && (
                        <div className="verify-tab">
                            <label htmlFor="verifyClaim">
                                Claim or caption
                            </label>
                            <textarea
                                id="verifyClaim"
                                onChange={(event) =>
                                    setVerifyClaim(event.target.value)
                                }
                                placeholder="Paste the claim, caption, or text you want to examine..."
                                value={verifyClaim}
                            />
                            <button
                                className="demo-claim"
                                onClick={() => setVerifyClaim(demoClaim)}
                                type="button"
                            >
                                <Sparkles />
                                Use demo: school suspension claim
                            </button>
                        </div>
                    )}
                    {tab === 'url' && (
                        <div className="verify-tab">
                            <label htmlFor="verifyUrl">
                                Article or post URL
                            </label>
                            <input
                                id="verifyUrl"
                                onChange={(event) =>
                                    setVerifyUrl(event.target.value)
                                }
                                placeholder="https://..."
                                type="url"
                                value={verifyUrl}
                            />
                            <div className="field-spacer" />
                            <label htmlFor="urlContext">Optional context</label>
                            <textarea
                                id="urlContext"
                                onChange={(event) =>
                                    setUrlContext(event.target.value)
                                }
                                placeholder="What part of the page should be checked?"
                                value={urlContext}
                            />
                        </div>
                    )}
                    {tab === 'image' && (
                        <div className="verify-tab">
                            <div className="upload-zone">
                                <Upload />
                                <h3>Upload a screenshot or image</h3>
                                <div className="small muted">
                                    PNG, JPG, or WEBP · Prototype preview only
                                </div>
                                <input accept="image/*" type="file" />
                            </div>
                        </div>
                    )}
                    <div className="form-actions">
                        <button
                            className="btn btn-dark"
                            onClick={runAnalysis}
                            type="button"
                        >
                            <Search />
                            Run Guided Analysis
                        </button>
                        <button
                            className="btn btn-outline"
                            onClick={clearAnalysis}
                            type="button"
                        >
                            Clear
                        </button>
                    </div>
                </div>
                <div className="card">
                    <h3><b>Five-step verification process</b></h3>
                    <div className="workflow">
                        {workflow.map(([title, description], index) => (
                            <div className="workflow-step" key={title}>
                                <div className="step-n">{index + 1}</div>
                                <div>
                                    <strong>{title}</strong>
                                    <p>{description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {resultVisible && (
                <div className="result-panel">
                    <div className="result-head">
                        <div>
                            <span className={`tag ${result.tagClass}`}>
                                {result.tag}
                            </span>
                            <h2>{result.title}</h2>
                            <div className="small muted">{result.summary}</div>
                        </div>
                        <button
                            className="btn btn-outline"
                            onClick={submitForReview}
                            type="button"
                        >
                            Submit for Community Review
                        </button>
                    </div>
                    <div className="result-body">
                        <div>
                            <h3>Advisory assessment</h3>
                            <div className="score-box">
                                <div>
                                    <span className="tiny muted">
                                        AI confidence
                                    </span>
                                    <strong>{result.aiScore}</strong>
                                </div>
                                <div>
                                    <span className="tiny muted">
                                        Records found
                                    </span>
                                    <strong>{result.recordCount}</strong>
                                </div>
                                <div>
                                    <span className="tiny muted">
                                        Sources found
                                    </span>
                                    <strong>{result.sourceCount}</strong>
                                </div>
                            </div>
                            <p className="small muted">{result.guidance}</p>
                            <div className="notice">
                                <strong>Important:</strong> This AI-assisted
                                output is advisory and not a final
                                determination.
                            </div>
                        </div>
                        <div>
                            <h3>Recommended checks</h3>
                            <div className="checklist">
                                <ChecklistItem
                                    detail="Find who first issued the claim."
                                    title="Identify the original publisher"
                                />
                                <ChecklistItem
                                    detail="Old or unrelated information can mislead."
                                    title="Check date and context"
                                />
                                <ChecklistItem
                                    detail="Prefer primary and independent evidence."
                                    title="Compare official sources"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

function FacebookIcon() {
    return (
        <svg fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
            <path d="M22 12.06C22 6.53 17.52 2.04 12 2.04S2 6.53 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.45 2.91h-2.33V22c4.78-.81 8.44-4.95 8.44-9.94Z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
            <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.65.3-.42.16-.72.35-1.03.66-.31.31-.5.61-.66 1.03-.12.31-.26.78-.3 1.65C4.27 8.55 4.26 8.87 4.26 12s.01 3.45.06 4.5c.04.87.18 1.34.3 1.65.16.42.35.72.66 1.03.31.31.61.5 1.03.66.31.12.78.26 1.65.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.65-.3.42-.16.72-.35 1.03-.66.31-.31.5-.61.66-1.03.12-.31.26-.78.3-1.65.05-1.05.06-1.37.06-4.5s-.01-3.45-.06-4.5c-.04-.87-.18-1.34-.3-1.65a2.77 2.77 0 0 0-.66-1.03 2.77 2.77 0 0 0-1.03-.66c-.31-.12-.78-.26-1.65-.3-1.05-.05-1.37-.06-4.04-.06Zm0 3.65a4.55 4.55 0 1 1 0 9.1 4.55 4.55 0 0 1 0-9.1Zm0 1.8a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5Zm4.73-1.98a1.06 1.06 0 1 1 0 2.12 1.06 1.06 0 0 1 0-2.12Z" />
        </svg>
    );
}

function XIcon() {
    return (
        <svg fill="currentColor" height="16" viewBox="0 0 24 24" width="16">
            <path d="M18.9 2h3.4l-7.4 8.46L23.5 22h-6.8l-5.33-6.97L5.26 22H1.86l7.92-9.05L1 2h6.97l4.82 6.37Zm-1.2 18h1.88L7.4 3.9H5.38Z" />
        </svg>
    );
}

function TikTokIcon() {
    return (
        <svg fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
            <path d="M16.6 2h-3.3v13.6a2.9 2.9 0 1 1-2.06-2.78V9.5a6.1 6.1 0 1 0 5.36 6.05V8.28a7.8 7.8 0 0 0 4.6 1.48V6.4a4.5 4.5 0 0 1-4.6-4.4Z" />
        </svg>
    );
}

function YouTubeIcon() {
    return (
        <svg fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
            <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.75 15.5v-7l6.27 3.5-6.27 3.5Z" />
        </svg>
    );
}

function CommunityView({
    items,
    filter,
    selectedVotes,
    setFilter,
    vote,
    toast,
    openSubmitClaim,
    openAddSource, // add this
}: {
    items: CommunityItem[];
    filter: CommunityFilter;
    selectedVotes: Record<number, number>;
    setFilter: (filter: CommunityFilter) => void;
    vote: (itemIndex: number, voteIndex: number) => void;
    toast: (message: string) => void;
    openSubmitClaim: () => void;
    openAddSource: (itemIndex: number) => void; // add this
}) {
    return (
        <section className="view active community-view">
            <div className="section-heading">
                <button
                    className="btn btn-dark"
                    onClick={openSubmitClaim}
                    type="button"
                >
                    + Submit New Claim
                </button>
                <div className="filter-row">
                    {(
                        [
                            ['all', 'All'],
                            ['verified', 'Verified'],
                            ['review', 'Needs Review'],
                            ['media', 'Manipulated Media'],
                            ['reported', 'Frequently Reported'], // add this
                        ] as [CommunityFilter, string][]
                    ).map(([status, label]) => (
                        <button
                            className={`filter-chip ${filter === status ? 'active' : ''}`}
                            key={status}
                            onClick={() => setFilter(status)}
                            type="button"
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid-3">
                {items.map((item, index) => {
                    if (filter !== 'all' && item.status !== filter) {
                        return null;
                    }

                    return (
                        <article className="verify-card" key={item.title}>
                            <div className="verify-card-header">
                                <span className={`tag ${item.tagClass}`}>
                                    {item.tag}
                                </span>
                                <span className="tiny muted">{item.reports}</span>
                            </div>
                            <h3 className="verify-card-title">{item.title}</h3>
                            <p className="verify-card-text">{item.text}</p>
                            <div className={`verify-card-note verify-card-note-${item.status}`}>{item.note}</div>
                            <div className="verify-card-votes">
                                {[
                                    { label: 'Reliable', icon: CircleCheck, colorClass: 'verify-vote-reliable' },
                                    { label: 'Needs Review', icon: CircleHelp, colorClass: 'verify-vote-review' },
                                    { label: 'Misleading', icon: TriangleAlert, colorClass: 'verify-vote-misleading' },
                                ].map(({ label, icon: VoteIcon, colorClass }, voteIndex) => {
                                    const isSelected = selectedVotes[index] === voteIndex;

                                    return (
                                        <button
                                            aria-label={label}
                                            className={`verify-vote-btn ${colorClass} ${isSelected ? 'selected' : ''}`}
                                            key={label}
                                            onClick={() => vote(index, voteIndex)}
                                            type="button"
                                        >
                                            <VoteIcon className={`verify-vote-icon verify-vote-icon-${colorClass}`} />
                                            <strong>{item.votes[voteIndex]}</strong>
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="verify-card-links-header">
                                <span>
                                    🔗 REFERENCED SOCIAL LINKS ({item.links.length})
                                </span>
                                <button
                                    className="verify-add-source"
                                    onClick={() => openAddSource(index)}
                                    type="button"
                                >
                                    + Add Source
                                </button>
                            </div>
                            {item.links.map((link) => (
                                <div className="verify-card-link" key={link.url}>
                                    <span className={`verify-link-icon verify-link-icon-${link.platform}`}>
                                        {link.platform === 'facebook' && <FacebookIcon />}
                                        {link.platform === 'instagram' && <InstagramIcon />}
                                        {link.platform === 'twitter' && <XIcon />}
                                        {link.platform === 'tiktok' && <TikTokIcon />}
                                        {link.platform === 'youtube' && <YouTubeIcon />} {/* add this */}
                                        {link.platform === 'web' && '🌐'}
                                    </span>
                                    <div className="verify-link-info">
                                        <strong>{link.label}</strong>
                                        <span>{link.url}</span>
                                    </div>
                                    <span className="verify-link-actions">⧉ ↗</span>
                                </div>
                            ))}
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

function LeaderboardView({ openPolicy }: { openPolicy: () => void }) {
    const rows = [
        ['1', 'Alex D.', 'Verified Contributor', '96%', '1,420'],
        ['2', 'Jamie C.', 'Verified Contributor', '94%', '1,315'],
        ['3', 'Yvonne I.', 'Verified Contributor', '91%', '1,207'],
        ['4', 'Luigi B.', 'Course Participant', '88%', '1,080'],
        ['5', 'Angela M.', 'Course Participant', '85%', '972'],
    ];

    return (
        <section className="view active">
            <div className="grid-2">
                <div className="card">
                    <div className="card-header">
                        <div>
                            <h2><b>Quality-based Leaderboard</b></h2>
                            <div className="small muted">
                                Scores reward accepted evidence, helpful
                                reviews, and responsible participation—not
                                report volume alone.
                            </div>
                        </div>
                        <select
                            aria-label="Leaderboard period"
                            className="role-select leaderboard-period"
                        >
                            <option>This Semester</option>
                            <option>This Month</option>
                        </select>
                    </div>
                    <div className="leaderboard-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Contributor</th>
                                    <th>Recognition</th>
                                    <th>Evidence Quality</th>
                                    <th>Trusted Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row) => (
                                    <tr key={row[1]}>
                                        <td>{row[0]}</td>
                                        <td>{row[1]}</td>
                                        <td>
                                            <span
                                                className={`tag ${row[2] === 'Verified Contributor' ? 'tag-green' : 'tag-blue'}`}
                                            >
                                                {row[2]}
                                            </span>
                                        </td>
                                        <td>{row[3]}</td>
                                        <td>{row[4]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card badge-panel">
                    <div>
                        <div className="badge-seal">
                            <Award />
                        </div>
                        <h2><b>Verified MILDA Contributor</b></h2>
                        <p className="muted small">
                            A course-completion badge showing that the user
                            finished MILDA training and the final Digital
                            Verification Portfolio.
                        </p>
                        <div className="requirement-list">
                            <div className="requirement done">
                                ✓ Complete Modules 1–6
                            </div>
                            <div className="requirement">
                                ○ Complete Modules 7–11
                            </div>
                            <div className="requirement">
                                ○ Submit Digital Verification Portfolio
                            </div>
                            <div className="requirement">
                                ○ Pass instructor review
                            </div>
                        </div>
                        <button
                            className="btn btn-outline policy-button"
                            onClick={openPolicy}
                            type="button"
                        >
                            View Badge Policy
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function InstructorView({ toast }: { toast: (message: string) => void }) {
    const queue = [
        ['Student 2026-0182', '12 modules completed · Portfolio submitted'],
        ['Student 2026-0214', '11 modules completed · 1 mission pending'],
        ['Student 2026-0251', 'Portfolio resubmitted after feedback'],
    ];
    const sections = [
        ['BSIT Section A', 82],
        ['BSCS Section A', 74],
        ['Senior High Pilot', 63],
        ['Cross-program Elective', 58],
    ] as const;

    return (
        <section className="view active">
            <div className="stats-grid">
                <StatCard
                    detail="Across 4 sections"
                    icon={Users}
                    label="Enrolled Students"
                    value="126"
                />
                <StatCard
                    detail="↑ 9% this month"
                    icon={BarChart3}
                    label="Course Completion"
                    value="68%"
                />
                <StatCard
                    detail="12 pending"
                    icon={FileText}
                    label="Portfolio Reviews"
                    value="31"
                />
                <StatCard
                    detail="91% include evidence"
                    icon={Check}
                    label="Missions Submitted"
                    value="842"
                />
            </div>
            <div className="grid-2">
                <div className="card">
                    <div className="card-header">
                        <div>
                            <h3>Badge Eligibility Queue</h3>
                            <div className="small muted">
                                Review course completion and final portfolios.
                            </div>
                        </div>
                        <span className="tag tag-amber">12 pending</span>
                    </div>
                    <div className="queue">
                        {queue.map(([student, detail]) => (
                            <div className="queue-item" key={student}>
                                <div>
                                    <strong>{student}</strong>
                                    <p>{detail}</p>
                                </div>
                                <button
                                    className="btn btn-outline"
                                    onClick={() =>
                                        toast(
                                            'Review workspace opened in the full system',
                                        )
                                    }
                                    type="button"
                                >
                                    Review
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card">
                    <h3>Section Progress</h3>
                    <div className="feed">
                        {sections.map(([section, progress]) => (
                            <div className="feed-item" key={section}>
                                <div className="feed-meta">
                                    <strong>{section}</strong>
                                    <span>{progress}%</span>
                                </div>
                                <div className="linear-progress">
                                    <span style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function AdminView({ toast }: { toast: (message: string) => void }) {
    const moderationQueue = [
        [
            'Possible manipulated image',
            '6 reports · 2 sources · appeal submitted',
        ],
        ['Unsupported medical claim', '11 reports · no primary source'],
        ['Source credibility dispute', 'Contributor requested re-evaluation'],
    ];
    const safeguards = [
        [
            'Evidence requirement',
            'Verified status requires credible references and moderator review.',
        ],
        [
            'Community vote limitation',
            'Votes inform review but cannot independently determine accuracy.',
        ],
        [
            'Appeals and disputes',
            'Users may request a second moderated evaluation.',
        ],
        [
            'Course-finisher badge',
            'Only qualified course finishers receive the Verified MILDA Contributor Badge.',
        ],
    ];

    return (
        <section className="view active">
            <div className="notice">
                <strong>
                    Responsible AI, Privacy, and Community Safeguards
                </strong>
                <br />
                AI analysis is advisory; evidence is required; reports and
                sources are moderated; users may dispute or appeal results;
                personal information must be protected; and community voting
                alone does not establish factual accuracy.
            </div>
            <div className="grid-2">
                <div className="card">
                    <div className="card-header">
                        <div>
                            <h3>Moderation Queue</h3>
                            <div className="small muted">
                                Priority items requiring evidence-based review
                            </div>
                        </div>
                        <span className="tag tag-red">8 urgent</span>
                    </div>
                    <div className="queue">
                        {moderationQueue.map(([title, detail]) => (
                            <div className="queue-item" key={title}>
                                <div>
                                    <strong>{title}</strong>
                                    <p>{detail}</p>
                                </div>
                                <button
                                    className="btn btn-outline"
                                    onClick={() =>
                                        toast(
                                            'Review workspace opened in the full system',
                                        )
                                    }
                                    type="button"
                                >
                                    Open
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card">
                    <h3>Safeguard Status</h3>
                    <div className="feed">
                        {safeguards.map(([title, detail]) => (
                            <div className="feed-item" key={title}>
                                <div className="feed-meta">
                                    <strong>{title}</strong>
                                    <span className="tag tag-green">
                                        Enabled
                                    </span>
                                </div>
                                <p>{detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid-2">
                <div className="card">
                    <h3>Audit Log</h3>
                    <div className="audit-log">
                        {[
                            [
                                'Moderator updated content status',
                                'Needs Verification → Under Review',
                                '10:42',
                            ],
                            [
                                'New appeal submitted',
                                'Case #MILDA-2041',
                                '09:18',
                            ],
                            [
                                'Trusted source accepted',
                                'Official university advisory',
                                'Yesterday',
                            ],
                        ].map(([title, detail, time]) => (
                            <div className="audit-item" key={title}>
                                <span className="audit-dot" />
                                <div>
                                    <strong>{title}</strong>
                                    <div className="tiny muted">{detail}</div>
                                </div>
                                <span className="tiny muted">{time}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card">
                    <h3>Privacy Controls</h3>
                    <div className="checklist">
                        <ChecklistItem
                            detail="Only information required for learning and moderation is retained."
                            title="Minimize stored personal data"
                        />
                        <ChecklistItem
                            detail="Access is restricted to authorized reviewers."
                            title="Protect uploaded content"
                        />
                        <ChecklistItem
                            detail="Status changes and appeals remain auditable."
                            title="Maintain moderation logs"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Modal({
    children,
    onClose,
}: {
    children: ReactNode;
    onClose: () => void;
}) {
    return (
        <div
            className="modal-backdrop open"
            onClick={(event) => {
                if (event.currentTarget === event.target) {
                    onClose();
                }
            }}
            role="presentation"
        >
            <div className="modal">{children}</div>
        </div>
    );
}

export default function Milda({ syllabusUrl }: MildaProps) {
    const [introOpen, setIntroOpen] = useState(true);
    const [role, setRole] = useState<Role>('student');
    const [view, setView] = useState<View>('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [modal, setModal] = useState<ModalName>(null);
    const [modules, setModules] = useState(initialCourseModules);
    const [moduleFilter, setModuleFilter] = useState<ModuleFilter>('all');
    const [activeModule, setActiveModule] = useState(6);
    const [community, setCommunity] = useState(initialCommunityItems);
    const [communityFilter, setCommunityFilter] = useState<CommunityFilter>('all');
    const [verifyTab, setVerifyTab] = useState<VerifyTab>('text');
    const [quickClaim, setQuickClaim] = useState('');
    const [quickUrl, setQuickUrl] = useState('');
    const [verifyClaim, setVerifyClaim] = useState('');
    const [verifyUrl, setVerifyUrl] = useState('');
    const [urlContext, setUrlContext] = useState('');

    const [analysisResult, setAnalysisResult] = useState(
        analysisScenarios.review,
    );

    const [resultVisible, setResultVisible] = useState(false);

    const [quizAnswersByModule, setQuizAnswersByModule] = useState<
        Record<number, Record<number, 'fact' | 'fake'>>
    >({});

    const quizAnswers = quizAnswersByModule[activeModule] ?? {};
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const [selectedVotes, setSelectedVotes] = useState<Record<number, number>>(
        {},
    );

    const [claimForm, setClaimForm] = useState({
        text: '',
        context: '',
        status: 'review' as CommunityItem['status'],
        url: '',
    });

    const [addSourceItemIndex, setAddSourceItemIndex] = useState<number | null>(null);
    const [sourceForm, setSourceForm] = useState({
        platform: 'facebook' as CommunityLink['platform'],
        url: '',
        label: '',
    });

    const courseProgress = useMemo(
        () =>
            Math.round(
                modules.reduce((sum, module) => sum + module.progress, 0) /
                    modules.length,
            ),
        [modules],
    );

    const activeLesson = modules[activeModule];
    const [heading, subheading] = viewInfo[view];
    const visibleNavGroups = navGroups
        .filter(({ label }) =>
            role === 'student'
                ? label !== 'Management'
                : label === 'Management',
        )
        .map((group) => ({
            ...group,
            items:
                group.label === 'Management'
                    ? group.items.filter((item) => item.view === role)
                    : group.items,
        }));

    const toast = (message: string) => {
        const id = Date.now() + Math.random();

        setToasts((current) => [...current, { id, message }]);
        window.setTimeout(() => {
            setToasts((current) =>
                current.filter((notification) => notification.id !== id),
            );
        }, 2800);
    };

    const showView = (nextView: View) => {
        setView(nextView);
        setSidebarOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const enterRole = (nextRole: Role) => {
        setRole(nextRole);
        setIntroOpen(false);
        showView(
            nextRole === 'instructor'
                ? 'instructor'
                : nextRole === 'admin'
                  ? 'admin'
                  : 'dashboard',
        );
        toast(
            `${nextRole.charAt(0).toUpperCase() + nextRole.slice(1)} prototype loaded`,
        );
    };

    const openLesson = (index: number) => {
        setActiveModule(index);
        setModal('lesson');
    };

    const completeModule = () => {
        if (modules[activeModule].progress === 100) {
            toast('This module is already complete');

            return;
        }

        setModules((current) =>
            current.map((module, index) =>
                index === activeModule ? { ...module, progress: 100 } : module,
            ),
        );
        setModal(null);
        toast(`Module ${activeModule + 1} marked complete`);
    };

    const quizPassed = activeLesson.quiz
        ? activeLesson.quiz.statements.every(
            (statement, index) => quizAnswers[index] === statement.answer,
        )
        : true;

    const determineAnalysis = (claim: string) => {
        const normalized = claim.toLowerCase();

        if (
            normalized.includes('ai-generated') ||
            normalized.includes('deepfake') ||
            normalized.includes('edited image')
        ) {
            return analysisScenarios.media;
        }

        if (
            normalized.includes('scholarship') ||
            normalized.includes('registrar')
        ) {
            return analysisScenarios.verified;
        }

        return analysisScenarios.review;
    };

    const runAnalysis = (claim = verifyClaim || quickClaim || urlContext) => {
        setAnalysisResult(determineAnalysis(claim));
        setResultVisible(true);
        toast('Guided analysis completed');
        window.setTimeout(() => {
            document
                .querySelector('.result-panel')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    };

    const analyzeQuickClaim = () => {
        setVerifyClaim(quickClaim);
        showView('verify');
        window.setTimeout(() => runAnalysis(quickClaim), 200);
    };

    const clearAnalysis = () => {
        setVerifyClaim('');
        setVerifyUrl('');
        setUrlContext('');
        setQuickClaim('');
        setQuickUrl('');
        setResultVisible(false);
    };

    const vote = (itemIndex: number, voteIndex: number) => {
        const previousVote = selectedVotes[itemIndex];
        const isDeselecting = previousVote === voteIndex;

        setCommunity((current) =>
            current.map((item, index) => {
                if (index !== itemIndex) {
                    return item;
                }

                const votes: [number, number, number] = [...item.votes];

                if (previousVote !== undefined) {
                    votes[previousVote] -= 1;
                }

                if (!isDeselecting) {
                    votes[voteIndex] += 1;
                }

                return { ...item, votes };
            }),
        );

        setSelectedVotes((current) => {
            if (isDeselecting) {
                const next = { ...current };
                delete next[itemIndex];
                return next;
            }

            return { ...current, [itemIndex]: voteIndex };
        });

        if (isDeselecting) {
                toast('Vote removed');
            } else {
                const labels = ['reliable', 'needs review', 'misleading'];
                toast(`Marked as ${labels[voteIndex]}`);
            }
        };

    useEffect(() => {
        const closeOverlays = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setModal(null);
                setDrawerOpen(false);
            }
        };

        document.addEventListener('keydown', closeOverlays);

        return () => document.removeEventListener('keydown', closeOverlays);
    }, []);

    const openSubmitClaim = () => setModal('submitClaim');

    const publishClaim = () => {
        const trimmedText = claimForm.text.trim();

        if (!trimmedText) {
            return;
        }

        const meta = claimStatusMeta[claimForm.status];
        const trimmedUrl = claimForm.url.trim();

        const newItem: CommunityItem = {
            status: claimForm.status,
            tag: meta.tag,
            tagClass: meta.tagClass,
            reports: 'New submission',
            title: trimmedText,
            text: claimForm.context.trim() || 'Awaiting community context and evidence.',
            note: 'Submitted by you · awaiting moderator review.',
            votes: [0, 0, 0],
            links: trimmedUrl
                ? [{ platform: detectPlatform(trimmedUrl), label: 'Primary Source', url: trimmedUrl }]
                : [],
        };

        setCommunity((current) => [newItem, ...current]);
        setClaimForm({ text: '', context: '', status: 'review', url: '' });
        setCommunityFilter('all');
        setModal(null);
        toast('Claim published to the Verification Hub');
    };

    const openAddSource = (itemIndex: number) => {
        setAddSourceItemIndex(itemIndex);
        setSourceForm({ platform: 'facebook', url: '', label: '' });
        setModal('addSource');
    };

    const saveSource = () => {
        const trimmedUrl = sourceForm.url.trim();
        const trimmedLabel = sourceForm.label.trim();

        if (!trimmedUrl || addSourceItemIndex === null) {
            return;
        }

        const newLink: CommunityLink = {
            platform: sourceForm.platform,
            label: trimmedLabel || 'Additional Source',
            url: trimmedUrl,
        };

        setCommunity((current) =>
            current.map((item, index) =>
                index === addSourceItemIndex
                    ? { ...item, links: [...item.links, newLink] }
                    : item,
            ),
        );

        setModal(null);
        setAddSourceItemIndex(null);
        toast('Source added to the record');
    };

    return (
        <>
            <Head title="MILDA — Learn. Verify. Share Responsibly.">
                <meta
                    content="MILDA is a Media and Information Literacy ecosystem for structured learning, AI-assisted guidance, and evidence-based community verification."
                    name="description"
                />

                <link
                    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&display=swap"
                    rel="stylesheet"
                />
            </Head>

            {introOpen && (
                <IntroScreen onEnter={enterRole} syllabusUrl={syllabusUrl} />
            )}

            <div className="app-shell">
                <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                    <div className="brand">
                        <img src="/images/milda.png" alt="MILDA" className="brand-image" />
                        <p>Learn. Verify. Share Responsibly.</p>
                    </div>
                    {visibleNavGroups.map((group) => (
                        <div className="nav-group" key={group.label}>
                            <div className="nav-label">{group.label}</div>
                            <nav className="nav">
                                {group.items.map((item) => (
                                    <button
                                        className={
                                            view === item.view ? 'active' : ''
                                        }
                                        key={item.view}
                                        onClick={() => showView(item.view)}
                                        type="button"
                                    >
                                        <item.icon />
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    ))}
                    {role === 'student' && (
                        <div className="sidebar-progress">
                            <strong>Badge readiness · {courseProgress}%</strong>
                            <div className="line">
                                <span style={{ width: `${courseProgress}%` }} />
                            </div>
                            <p>
                                Complete all course modules and the Digital
                                Verification Portfolio.
                            </p>
                        </div>
                    )}
                </aside>
                <main className="main">
                    <header className="topbar">
                        <div className="top-left">
                            <button
                                aria-label="Open navigation"
                                className="mobile-menu"
                                onClick={() =>
                                    setSidebarOpen((current) => !current)
                                }
                                type="button"
                            >
                                <Menu />
                            </button>
                            <div className="page-title">
                                <h2>{heading}</h2>
                                <p>{subheading}</p>
                            </div>
                        </div>
                        <div className="top-actions">
                            {role === 'student' && (
                                <button
                                    className="btn btn-outline prototype-label"
                                    onClick={() => setModal('tour')}
                                    type="button"
                                >
                                    <Sparkles />
                                    Demo Tour
                                </button>
                            )}
                            <button
                                aria-label="Exit current role view"
                                className="btn btn-danger exit-role-btn"
                                onClick={() => {
                                    setDrawerOpen(false);
                                    setModal(null);
                                    setSidebarOpen(false);
                                    setIntroOpen(true);
                                }}
                                type="button"
                            >
                                <span
                                    aria-hidden="true"
                                    className="stop-icon"
                                />
                                <span className="exit-role-label">
                                    Exit View
                                </span>
                            </button>
                            <select
                                aria-label="Preview role"
                                className="role-select"
                                onChange={(event) =>
                                    enterRole(event.target.value as Role)
                                }
                                value={role}
                            >
                                <option value="student">Student View</option>
                                <option value="instructor">
                                    Instructor View
                                </option>
                                <option value="admin">Admin View</option>
                            </select>
                            <button
                                aria-label="Notifications"
                                className="icon-btn"
                                onClick={() => setDrawerOpen(true)}
                                type="button"
                            >
                                <Bell />
                                <span className="dot" />
                            </button>
                            <div className="avatar">JC</div>
                        </div>
                    </header>
                    <div className="content">
                        {view === 'dashboard' && (
                            <DashboardView
                                analyzeQuickClaim={analyzeQuickClaim}
                                courseProgress={courseProgress}
                                openLesson={openLesson}
                                quickClaim={quickClaim}
                                quickUrl={quickUrl}
                                setQuickClaim={setQuickClaim}
                                setQuickUrl={setQuickUrl}
                                showView={showView}
                                syllabusUrl={syllabusUrl}
                                toast={toast}
                            />
                        )}
                        {view === 'learn' && (
                            <ModulesView
                                moduleFilter={moduleFilter}
                                modules={modules}
                                openLesson={openLesson}
                                setModuleFilter={setModuleFilter}
                                syllabusUrl={syllabusUrl}
                            />
                        )}
                        {view === 'verify' && (
                            <VerificationView
                                clearAnalysis={clearAnalysis}
                                result={analysisResult}
                                resultVisible={resultVisible}
                                runAnalysis={() => runAnalysis()}
                                setTab={setVerifyTab}
                                setUrlContext={setUrlContext}
                                setVerifyClaim={setVerifyClaim}
                                setVerifyUrl={setVerifyUrl}
                                submitForReview={() => {
                                    showView('community');
                                    toast(
                                        'Submission added to the community review queue',
                                    );
                                }}
                                tab={verifyTab}
                                urlContext={urlContext}
                                verifyClaim={verifyClaim}
                                verifyUrl={verifyUrl}
                            />
                        )}
                        {view === 'community' && (
                            <CommunityView
                                filter={communityFilter}
                                items={community}
                                openAddSource={openAddSource} // add this
                                openSubmitClaim={openSubmitClaim}
                                selectedVotes={selectedVotes}
                                setFilter={setCommunityFilter}
                                toast={toast}
                                vote={vote}
                            />
                        )}
                        {view === 'leaderboard' && (
                            <LeaderboardView
                                openPolicy={() => setModal('policy')}
                            />
                        )}
                        {view === 'instructor' && (
                            <InstructorView toast={toast} />
                        )}
                        {view === 'admin' && <AdminView toast={toast} />}
                        <footer className="footer">
                            Team QuantumX · Universidad de Dagupan · UNESCO
                            Youth Hackathon 2026
                            <br />
                            <strong>Learn. Verify. Share Responsibly.</strong>
                        </footer>
                    </div>
                </main>
            </div>

            <div
                className={`drawer-backdrop ${drawerOpen ? 'open' : ''}`}
                onClick={() => setDrawerOpen(false)}
                role="presentation"
            />
            <aside
                aria-hidden={!drawerOpen}
                className={`drawer ${drawerOpen ? 'open' : ''}`}
            >
                <div className="drawer-head">
                    <div>
                        <h3>Notifications</h3>
                        <div className="tiny muted">
                            Recent learning and verification updates
                        </div>
                    </div>
                    <button
                        aria-label="Close notifications"
                        className="close-btn"
                        onClick={() => setDrawerOpen(false)}
                        type="button"
                    >
                        <X />
                    </button>
                </div>
                <div className="notification">
                    <strong>Your trusted source was accepted</strong>
                    <p>
                        The official registrar advisory was added to a Community
                        Verified record.
                    </p>
                </div>
                <div className="notification">
                    <strong>Module 7 is ready</strong>
                    <p>Continue AI-Generated Content and AI Hallucinations.</p>
                </div>
                <div className="notification">
                    <strong>Portfolio feedback received</strong>
                    <p>
                        Your instructor requested one additional source for Item
                        3.
                    </p>
                </div>
            </aside>

            {modal === 'lesson' && activeLesson && (
                <Modal onClose={() => setModal(null)}>
                    <div className="modal-head">
                        <div>
                            <span className="tag tag-blue">
                                {activeLesson.progress === 100
                                    ? 'Completed module'
                                    : activeLesson.progress > 0
                                      ? 'In progress'
                                      : 'Module preview'}
                            </span>
                            <h2>
                                {activeModule + 1}. <b>{activeLesson.title}</b>
                            </h2>
                            <div className="small muted">
                                {activeLesson.description}
                            </div>
                        </div>
                        <button
                            aria-label="Close lesson"
                            className="close-btn"
                            onClick={() => setModal(null)}
                            type="button"
                        >
                            <X />
                        </button>
                    </div>
                    <div className="lesson-objectives">
                        {activeLesson.objectives.map((objective) => (
                            <div className="objective" key={objective.title}>
                                <strong>{objective.title}</strong>
                                <br />
                                <span className="muted">
                                    {objective.description}
                                </span>
                            </div>
                        ))}
                    </div>

                    {activeLesson.content && (
                        <div className="lesson-content">
                            <div className="lesson-content-box">
                                <div className="lesson-content-label">
                                    {activeLesson.content.objectivesLabel}
                                </div>
                                <ul>
                                    {activeLesson.content.objectives.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <blockquote className="lesson-intro">
                                <p className="lesson-intro-text">
                                    {activeLesson.content.intro}
                                </p>
                                {activeLesson.content.introQuestion && (
                                    <p className="lesson-intro-question">
                                        {activeLesson.content.introQuestion}
                                    </p>
                                )}
                            </blockquote>
                            {activeLesson.content.blocks.map((block, index) => {
                                if (block.type === 'heading') {
                                    return <h4 key={index}>{block.text}</h4>;
                                }
                                if (block.type === 'paragraph') {
                                    return (
                                        <p className={block.indent ? 'lesson-indent' : ''} key={index}>
                                            {block.text}
                                        </p>
                                    );
                                }
                                if (block.type === 'list') {
                                    return (
                                        <ul className="lesson-list" key={index}>
                                            {block.items.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    );
                                }
                                if (block.type === 'terms') {
                                    return (
                                        <ul className="lesson-terms" key={index}>
                                            {block.items.map((term) => (
                                                <li key={term.term}>
                                                    <strong>{term.term}</strong> → {term.definition}
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                }
                                if (block.type === 'table') {
                                    return (
                                        <table className="lesson-table" key={index}>
                                            <thead>
                                                <tr>
                                                    {block.headers.map((header) => (
                                                        <th key={header}>{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {block.rows.map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        {row.map((cell, cellIndex) => (
                                                            <td key={cellIndex}>{cell}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    );
                                }
                                if (block.type === 'section') {
                                    return (
                                        <div className="lesson-section" key={index}>
                                            <div className="lesson-section-title">{block.title}</div>
                                            {block.text.map((paragraph, pIndex) => (
                                                <p
                                                    className={[
                                                        pIndex === 0 ? 'lesson-indent' : '',
                                                        paragraph.italic ? 'lesson-italic' : '',
                                                        paragraph.bold ? 'lesson-bold' : '',
                                                    ]
                                                        .filter(Boolean)
                                                        .join(' ')}
                                                    key={pIndex}
                                                >
                                                    {paragraph.text}
                                                </p>
                                            ))}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    )}

                    <div className="notice">
                        <strong>Practical activity:</strong> {activeLesson.practicalActivity}
                    </div>
                    {activeLesson.quiz && (
                        <div className="fact-fake-quiz">
                            <h3>{activeLesson.quiz.title}</h3>
                            <p>
                                <strong>Directions:</strong> {activeLesson.quiz.directions}
                            </p>
                            {activeLesson.quiz.statements.map((statement, index) => {
                                const selected = quizAnswers[index];

                                return (
                                    <div className="fact-fake-item" key={statement.text}>
                                        <p className="fact-fake-statement">
                                            {index + 1}. {statement.text}
                                        </p>
                                        <div className="fact-fake-options">
                                            <button
                                                className={`fact-fake-btn fact-btn ${selected === 'fact' ? 'selected' : ''}`}
                                                onClick={() => {
                                                    setQuizAnswersByModule((current) => ({
                                                        ...current,
                                                        [activeModule]: {
                                                            ...current[activeModule],
                                                            [index]: 'fact',
                                                        },
                                                    }));
                                                    toast(
                                                        statement.answer === 'fact'
                                                            ? 'Correct!'
                                                            : 'Not quite — try again',
                                                    );
                                                }}
                                                type="button"
                                            >
                                                FACT
                                            </button>
                                            <button
                                                className={`fact-fake-btn fake-btn ${selected === 'fake' ? 'selected' : ''}`}
                                                onClick={() => {
                                                    setQuizAnswersByModule((current) => ({
                                                        ...current,
                                                        [activeModule]: {
                                                            ...current[activeModule],
                                                            [index]: 'fake',
                                                        },
                                                    }));
                                                    toast(
                                                        statement.answer === 'fake'
                                                            ? 'Correct!'
                                                            : 'Not quite — try again',
                                                    );
                                                }}
                                                type="button"
                                            >
                                                FAKE
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <div className="modal-actions">
                        <button
                            className="btn btn-outline"
                            onClick={() => setModal(null)}
                            type="button"
                        >
                            Close
                        </button>
                        <button
                            className="btn btn-dark"
                            disabled={!quizPassed}
                            onClick={completeModule}
                            type="button"
                        >
                            {activeLesson.progress === 100
                                ? 'Completed'
                                : quizPassed
                                ? 'Mark Module Complete'
                                : 'Pass the quiz to continue'}
                        </button>
                    </div>
                </Modal>
            )}

            {modal === 'tour' && (
                <Modal onClose={() => setModal(null)}>
                    <div className="modal-head">
                        <div>
                            <span className="tag tag-purple">
                                Pitch-friendly guided tour
                            </span>
                            <h2>How MILDA works</h2>
                            <div className="small muted">
                                A four-part story you can demonstrate during the
                                hackathon pitch.
                            </div>
                        </div>
                        <button
                            aria-label="Close tour"
                            className="close-btn"
                            onClick={() => setModal(null)}
                            type="button"
                        >
                            <X />
                        </button>
                    </div>
                    {[
                        [
                            BookOpen,
                            '1. Students learn',
                            'Structured modules teach source evaluation, fact-checking, AI literacy, manipulated media, ethics, and digital citizenship.',
                        ],
                        [
                            Check,
                            '2. Students verify',
                            'The web app guides users through claim extraction, source checking, evidence comparison, and reflection.',
                        ],
                        [
                            Users,
                            '3. Communities contribute',
                            'Users may report content, add trusted sources, review evidence, and dispute results under moderation.',
                        ],
                        [
                            Award,
                            '4. Course finishers are recognized',
                            'Qualified finishers earn the Verified MILDA Contributor Badge after completing the course and portfolio review.',
                        ],
                    ].map(([TourIcon, title, detail]) => {
                        const Icon = TourIcon as LucideIcon;

                        return (
                            <div className="tour-step" key={title as string}>
                                <div className="icon">
                                    <Icon />
                                </div>
                                <div>
                                    <h4>{title as string}</h4>
                                    <p>{detail as string}</p>
                                </div>
                            </div>
                        );
                    })}
                    <div className="tour-actions">
                        <button
                            className="btn btn-dark"
                            onClick={() => {
                                setModal(null);
                                showView('dashboard');
                                toast(
                                    'Tour started: begin with the student dashboard',
                                );
                            }}
                            type="button"
                        >
                            Start with Dashboard
                        </button>
                    </div>
                </Modal>
            )}

            {modal === 'policy' && (
                <Modal onClose={() => setModal(null)}>
                    <div className="modal-head">
                        <div>
                            <span className="tag tag-green">Badge policy</span>
                            <h2>Verified MILDA Contributor Badge</h2>
                        </div>
                        <button
                            aria-label="Close policy"
                            className="close-btn"
                            onClick={() => setModal(null)}
                            type="button"
                        >
                            <X />
                        </button>
                    </div>
                    <p className="muted">
                        This badge identifies users who successfully complete
                        the MILDA Course Program and final portfolio. It does
                        not make their contributions automatically correct.
                    </p>
                    <div className="checklist">
                        <ChecklistItem
                            detail="Finish structured learning activities and assessments."
                            mark="1"
                            title="Complete required modules"
                        />
                        <ChecklistItem
                            detail="Demonstrate source evaluation, verification methods, and responsible reflection."
                            mark="2"
                            title="Submit the Digital Verification Portfolio"
                        />
                        <ChecklistItem
                            detail="The course finisher must meet the minimum quality criteria."
                            mark="3"
                            title="Pass instructor review"
                        />
                        <ChecklistItem
                            detail="Badge holders may receive higher credibility weight, but evidence and safeguards still apply."
                            mark="4"
                            title="Remain subject to moderation"
                        />
                    </div>
                </Modal>
            )}

            {modal === 'submitClaim' && (
                <Modal onClose={() => setModal(null)}>
                    <div className="modal-head">
                        <div>
                            <h2>Submit New Claim for Community Review</h2>
                        </div>
                        <button
                            aria-label="Close submission form"
                            className="close-btn"
                            onClick={() => setModal(null)}
                            type="button"
                        >
                            <X />
                        </button>
                    </div>
                    <div className="claim-form">
                        <div>
                            <label htmlFor="claimText">Claim Quote / Statement</label>
                            <input
                                id="claimText"
                                onChange={(event) =>
                                    setClaimForm((current) => ({ ...current, text: event.target.value }))
                                }
                                placeholder='"Classes are suspended tomorrow in all schools."'
                                type="text"
                                value={claimForm.text}
                            />
                        </div>
                        <div>
                            <label htmlFor="claimContext">Initial Context &amp; Findings</label>
                            <textarea
                                id="claimContext"
                                onChange={(event) =>
                                    setClaimForm((current) => ({ ...current, context: event.target.value }))
                                }
                                placeholder="No official city or school authority is cited in the post..."
                                value={claimForm.context}
                            />
                        </div>
                        <div className="claim-form-row">
                            <div>
                                <label htmlFor="claimStatus">Initial Status Badge</label>
                                <select
                                    className="form-control"
                                    id="claimStatus"
                                    onChange={(event) =>
                                        setClaimForm((current) => ({
                                            ...current,
                                            status: event.target.value as CommunityItem['status'],
                                        }))
                                    }
                                    value={claimForm.status}
                                >
                                    <option value="review">Needs Verification</option>
                                    <option value="verified">Community Verified</option>
                                    <option value="media">Possible Manipulated Media</option>
                                    <option value="reported">Frequently Reported</option> {/* add this */}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="claimUrl">Primary Social URL</label>
                                <input
                                    id="claimUrl"
                                    onChange={(event) =>
                                        setClaimForm((current) => ({ ...current, url: event.target.value }))
                                    }
                                    placeholder="https://facebook.com/..."
                                    type="url"
                                    value={claimForm.url}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-actions">
                        <button
                            className="btn btn-outline"
                            onClick={() => setModal(null)}
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-dark"
                            disabled={!claimForm.text.trim()}
                            onClick={publishClaim}
                            type="button"
                        >
                            Publish to Hub
                        </button>
                    </div>
                </Modal>
            )}
            <div className="toast-container">
                {toasts.map((notification) => (
                    <div className="toast" key={notification.id}>
                        {notification.message}
                    </div>
                ))}
            </div>

            {modal === 'addSource' && addSourceItemIndex !== null && (
                <Modal onClose={() => setModal(null)}>
                    <div className="modal-head">
                        <div>
                            <h2>Attach Social Media or News URL</h2>
                        </div>
                        <button
                            aria-label="Close add source form"
                            className="close-btn"
                            onClick={() => setModal(null)}
                            type="button"
                        >
                            <X />
                        </button>
                    </div>
                    <div className="claim-form">
                        <div>
                            <label htmlFor="sourcePlatform">Platform Type</label>
                            <select
                                className="form-control"
                                id="sourcePlatform"
                                onChange={(event) =>
                                    setSourceForm((current) => ({
                                        ...current,
                                        platform: event.target.value as CommunityLink['platform'],
                                    }))
                                }
                                value={sourceForm.platform}
                            >
                                {sourcePlatformOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sourceUrl">Source URL</label>
                            <input
                                id="sourceUrl"
                                onChange={(event) =>
                                    setSourceForm((current) => ({ ...current, url: event.target.value }))
                                }
                                placeholder="https://www.facebook.com/share/p/..."
                                type="url"
                                value={sourceForm.url}
                            />
                        </div>
                        <div>
                            <label htmlFor="sourceLabel">Source Label / Context</label>
                            <input
                                id="sourceLabel"
                                onChange={(event) =>
                                    setSourceForm((current) => ({ ...current, label: event.target.value }))
                                }
                                placeholder="e.g., Original viral post by User123"
                                type="text"
                                value={sourceForm.label}
                            />
                        </div>
                    </div>
                    <div className="modal-actions">
                        <button
                            className="btn btn-outline"
                            onClick={() => setModal(null)}
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-dark"
                            disabled={!sourceForm.url.trim()}
                            onClick={saveSource}
                            type="button"
                        >
                            Save Source
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
}
