import { Head } from '@inertiajs/react';
import {
    Award,
    BarChart3,
    Bell,
    BookOpen,
    Check,
    FileText,
    Home,
    Link,
    Menu,
    Search,
    ShieldCheck,
    Sparkles,
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
    lessonObjectives,
} from '@/data/milda';
import type { AnalysisScenario, CommunityItem } from '@/data/milda';
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
type CommunityFilter = 'all' | 'verified' | 'review' | 'media';
type VerifyTab = 'text' | 'url' | 'image';
type ModalName = 'lesson' | 'tour' | 'policy' | null;

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
                        <div className="intro-logo-mark">M</div>
                        <div>
                            <strong>MILDA</strong>
                            <div className="intro-team">
                                Team QuantumX · UNESCO Youth Hackathon 2026
                            </div>
                        </div>
                    </div>
                    <h1>
                        Learn to verify.
                        <br />
                        Build digital trust.
                    </h1>
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
                    <h2>Explore the prototype</h2>
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
        <section className="view active">
            <div className="hero">
                <div className="hero-copy">
                    <span className="eyebrow">
                        <Sparkles />
                        MILDA Course Program
                    </span>
                    <h3>
                        Welcome back, Juan.
                        <br />
                        Verify before you share.
                    </h3>
                    <p>
                        Continue your course, complete a real-world verification
                        mission, and build the evidence-based habits required to
                        become a Verified MILDA Contributor.
                    </p>
                    <div className="hero-actions">
                        <button
                            className="btn btn-primary"
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
                        <span>course complete</span>
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
                            <h3>Quick Verification</h3>
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
                            <h3>Recent Community Activity</h3>
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
                            <h4>Claim about a school suspension</h4>
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
                            <h4>Updated scholarship application schedule</h4>
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
                            <h4>Viral image with inconsistent details</h4>
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
                <div>
                    <h2>MILDA Course Modules</h2>
                    <p>
                        Complete the structured course and Digital Verification
                        Portfolio to earn the contributor badge.
                    </p>
                </div>
                <div className="filter-row">
                    <a
                        className="btn btn-dark download-link"
                        download
                        href={syllabusUrl}
                    >
                        <FileText />
                        Download Course Syllabus
                    </a>
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
                            <h3>{module.title}</h3>
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
                    <h3>Five-step verification process</h3>
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

function CommunityView({
    items,
    filter,
    setFilter,
    vote,
    toast,
}: {
    items: CommunityItem[];
    filter: CommunityFilter;
    setFilter: (filter: CommunityFilter) => void;
    vote: (itemIndex: number, voteIndex: number) => void;
    toast: (message: string) => void;
}) {
    return (
        <section className="view active">
            <div className="section-heading">
                <div>
                    <h2>Community Verification Hub</h2>
                    <p>
                        Participate through evidence, responsible feedback, and
                        moderated review.
                    </p>
                </div>
                <div className="filter-row">
                    {(
                        [
                            ['all', 'All'],
                            ['verified', 'Verified'],
                            ['review', 'Needs Review'],
                            ['media', 'Manipulated Media'],
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
                        <article
                            className="card community-card"
                            key={item.title}
                        >
                            <div className="card-header">
                                <span className={`tag ${item.tagClass}`}>
                                    {item.tag}
                                </span>
                                <span className="tiny muted">
                                    {item.reports}
                                </span>
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                            <div className="evidence-note">{item.note}</div>
                            <div className="vote-row">
                                {['Reliable', 'Needs Review', 'Misleading'].map(
                                    (label, voteIndex) => (
                                        <button
                                            className="vote-btn"
                                            key={label}
                                            onClick={() =>
                                                vote(index, voteIndex)
                                            }
                                            type="button"
                                        >
                                            {label}{' '}
                                            <strong>
                                                {item.votes[voteIndex]}
                                            </strong>
                                        </button>
                                    ),
                                )}
                                <button
                                    className="vote-btn"
                                    onClick={() =>
                                        toast(
                                            'Trusted-source form opened in the full system',
                                        )
                                    }
                                    type="button"
                                >
                                    Add Source
                                </button>
                            </div>
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
                            <h2>Quality-based Leaderboard</h2>
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
                        <h2>Verified MILDA Contributor</h2>
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
    const [communityFilter, setCommunityFilter] =
        useState<CommunityFilter>('all');
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
    const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(
        null,
    );
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

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
        setSelectedQuizAnswer(null);
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
        setCommunity((current) =>
            current.map((item, index) => {
                if (index !== itemIndex) {
                    return item;
                }

                const votes: [number, number, number] = [...item.votes];
                votes[voteIndex] += 1;

                return { ...item, votes };
            }),
        );
        toast('Vote recorded for prototype demonstration');
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

    return (
        <>
            <Head title="MILDA — Learn. Verify. Share Responsibly.">
                <meta
                    content="MILDA is a Media and Information Literacy ecosystem for structured learning, AI-assisted guidance, and evidence-based community verification."
                    name="description"
                />
                <link href="https://fonts.googleapis.com" rel="preconnect" />
                <link
                    crossOrigin=""
                    href="https://fonts.gstatic.com"
                    rel="preconnect"
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
                        <div className="brand-mark">M</div>
                        <div>
                            <h1>MILDA</h1>
                            <p>Learn. Verify. Share Responsibly.</p>
                        </div>
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
                                {activeModule + 1}. {activeLesson.title}
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
                        {lessonObjectives.map((objective) => (
                            <div className="objective" key={objective.title}>
                                <strong>{objective.title}</strong>
                                <br />
                                <span className="muted">
                                    {objective.description}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="notice">
                        <strong>Practical activity:</strong> Apply the lesson to
                        a real or simulated online post and document the
                        evidence used.
                    </div>
                    <div className="quiz-box">
                        <strong>Knowledge check</strong>
                        <div className="small muted quiz-question">
                            Which action best supports responsible verification?
                        </div>
                        <div className="quiz-options">
                            {[
                                'Share immediately if the claim has many likes.',
                                'Compare the claim with credible primary and independent sources.',
                                'Trust the first AI-generated answer without checking evidence.',
                            ].map((answer, index) => (
                                <button
                                    className={`quiz-option ${selectedQuizAnswer === index && index === 1 ? 'correct' : ''}`}
                                    key={answer}
                                    onClick={() => {
                                        setSelectedQuizAnswer(index);
                                        toast(
                                            index === 1
                                                ? 'Correct: verify with credible evidence'
                                                : 'Try again: popularity is not evidence',
                                        );
                                    }}
                                    type="button"
                                >
                                    {answer}
                                </button>
                            ))}
                        </div>
                    </div>
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
                            onClick={completeModule}
                            type="button"
                        >
                            {activeLesson.progress === 100
                                ? 'Completed'
                                : 'Mark Module Complete'}
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

            <div className="toast-container">
                {toasts.map((notification) => (
                    <div className="toast" key={notification.id}>
                        {notification.message}
                    </div>
                ))}
            </div>
        </>
    );
}
