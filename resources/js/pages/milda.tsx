import { Head } from '@inertiajs/react';
import {
    Award,
    BadgeCheck,
    Bell,
    BookOpen,
    Bookmark,
    Bot,
    Building2,
    Check,
    ChevronRight,
    CircleCheck,
    CirclePlay,
    ClipboardList,
    Clock3,
    Download,
    ExternalLink,
    FileText,
    Flame,
    Flag,
    GraduationCap,
    HelpCircle,
    Home,
    Image,
    Info,
    Link,
    LockKeyhole,
    Menu,
    MessageSquare,
    Plus,
    Search,
    ShieldCheck,
    Sparkles,
    Target,
    ThumbsUp,
    Trophy,
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
    lessonObjectives,
} from '@/data/milda';
import type { AnalysisScenario } from '@/data/milda';
import '../../css/milda.css';

type View =
    | 'dashboard'
    | 'learn'
    | 'verify'
    | 'community'
    | 'contributions'
    | 'leaderboard';
type CommunityFilter = 'all' | 'verified' | 'review' | 'media';
type VerifyTab = 'text' | 'url' | 'image';
type ModalName = 'lesson' | 'policy' | null;

type ToastMessage = {
    id: number;
    message: string;
};

const studentNavigation: {
    view: View;
    label: string;
    icon: LucideIcon;
}[] = [
    { view: 'dashboard', label: 'Dashboard', icon: Home },
    { view: 'learn', label: 'Learn', icon: BookOpen },
    { view: 'verify', label: 'Verify Content', icon: Search },
    { view: 'community', label: 'Community', icon: Users },
    {
        view: 'contributions',
        label: 'My Contributions',
        icon: ClipboardList,
    },
    { view: 'leaderboard', label: 'Leaderboard', icon: Trophy },
];

function StudentStatCard({
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
        <div className="student-stat-card">
            <div className="student-stat-icon">
                <Icon />
            </div>
            <div>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{detail}</small>
            </div>
        </div>
    );
}

function StudentPageTitle({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}) {
    return (
        <div className="student-page-title">
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    );
}

function StudentProgress({ value }: { value: number }) {
    return (
        <div
            aria-label={`${value}% complete`}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={value}
            className="student-progress"
            role="progressbar"
        >
            <span style={{ width: `${value}%` }} />
        </div>
    );
}

function MissionCard({ title = 'Current Mission' }: { title?: string }) {
    return (
        <div className="student-side-card mission-card">
            <h3>
                <Target /> {title}
            </h3>
            <h4>Check Before You Share</h4>
            <p>
                Verify 5 pieces of content this week and help build a safer
                information environment.
            </p>
            <div className="mission-progress-row">
                <StudentProgress value={60} />
                <span>3/5</span>
            </div>
            <small>
                <Clock3 /> Mission resets in 4 days
            </small>
        </div>
    );
}

function ContributorList({
    title = 'Top Contributors',
    onView,
}: {
    title?: string;
    onView?: () => void;
}) {
    return (
        <div className="student-side-card contributor-card">
            <h3>
                <Trophy /> {title}
            </h3>
            {[
                ['1', 'Maya Chen', '1,250'],
                ['2', 'Liam Okafor', '980'],
                ['3', 'Sofia Martinez', '870'],
            ].map(([rank, name, score]) => (
                <div className="contributor-row" key={name}>
                    <span className={`rank rank-${rank}`}>{rank}</span>
                    <span>{name}</span>
                    <strong>{score}</strong>
                </div>
            ))}
            <button
                className="student-text-link"
                onClick={onView}
                type="button"
            >
                View full leaderboard <ChevronRight />
            </button>
        </div>
    );
}

function VerifiedContributorCard() {
    return (
        <div className="student-side-card verified-contributor-card">
            <div className="student-badge-mark">
                <Award />
            </div>
            <div>
                <h3>Verified MILDA Contributor</h3>
                <p>Thank you for making a difference!</p>
            </div>
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

function DashboardView({
    courseProgress,
    quickClaim,
    setQuickClaim,
    showView,
    openLesson,
    analyzeQuickClaim,
}: {
    courseProgress: number;
    quickClaim: string;
    setQuickClaim: (value: string) => void;
    showView: (view: View) => void;
    openLesson: (index: number) => void;
    analyzeQuickClaim: () => void;
}) {
    const [quickTab, setQuickTab] = useState<VerifyTab>('url');

    return (
        <section className="view active student-view student-dashboard">
            <StudentPageTitle
                subtitle="Learn. Verify. Share Responsibly."
                title="Good day, Alex"
            />
            <div className="student-page-layout">
                <div className="student-primary">
                    <div className="student-card dashboard-verify-card">
                        <h2>Verify Content</h2>
                        <div
                            aria-label="Verification input type"
                            className="student-tabs"
                            role="tablist"
                        >
                            {(
                                [
                                    ['url', 'Paste Link', Link],
                                    ['text', 'Enter Text', FileText],
                                    ['image', 'Upload Image', Image],
                                ] as [VerifyTab, string, LucideIcon][]
                            ).map(([tab, label, Icon]) => (
                                <button
                                    aria-selected={quickTab === tab}
                                    className={quickTab === tab ? 'active' : ''}
                                    key={tab}
                                    onClick={() => {
                                        setQuickTab(tab);
                                        setQuickClaim('');
                                    }}
                                    role="tab"
                                    type="button"
                                >
                                    <Icon /> {label}
                                </button>
                            ))}
                        </div>
                        <div
                            className={`student-verify-input ${quickTab}`}
                            role="tabpanel"
                        >
                            {quickTab === 'image' ? (
                                <label className="student-upload-zone">
                                    <input
                                        accept="image/png,image/jpeg,image/webp"
                                        aria-label="Upload an image to verify"
                                        onChange={(event) =>
                                            setQuickClaim(
                                                event.target.files?.[0]?.name ??
                                                    '',
                                            )
                                        }
                                        type="file"
                                    />
                                    <span className="upload-zone-icon">
                                        <Upload />
                                    </span>
                                    <span className="upload-zone-copy">
                                        <strong>
                                            {quickClaim ||
                                                'Choose an image to verify'}
                                        </strong>
                                        <small>
                                            PNG, JPG, or WEBP · Maximum 10 MB
                                        </small>
                                    </span>
                                    <span className="upload-browse-button">
                                        Browse files
                                    </span>
                                </label>
                            ) : (
                                <label className="student-verify-field">
                                    {quickTab === 'url' ? (
                                        <Link />
                                    ) : (
                                        <FileText />
                                    )}
                                    {quickTab === 'url' ? (
                                        <input
                                            aria-label="Link to verify"
                                            onChange={(event) =>
                                                setQuickClaim(
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Paste the full URL of an article or social post"
                                            type="url"
                                            value={quickClaim}
                                        />
                                    ) : (
                                        <textarea
                                            aria-label="Text to verify"
                                            onChange={(event) =>
                                                setQuickClaim(
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Enter the claim, caption, or passage you want to verify"
                                            rows={3}
                                            value={quickClaim}
                                        />
                                    )}
                                </label>
                            )}
                            <button
                                className="student-primary-button"
                                disabled={!quickClaim.trim()}
                                onClick={analyzeQuickClaim}
                                type="button"
                            >
                                <Sparkles /> Analyze Content
                            </button>
                        </div>
                    </div>

                    <div className="student-stats-grid">
                        <StudentStatCard
                            detail="Excellent"
                            icon={ShieldCheck}
                            label="Trusted Score"
                            value="820"
                        />
                        <StudentStatCard
                            detail="On track"
                            icon={GraduationCap}
                            label="Learning Progress"
                            value={`${courseProgress}%`}
                        />
                        <StudentStatCard
                            detail="Total submissions"
                            icon={Users}
                            label="Contributions"
                            value="24"
                        />
                        <StudentStatCard
                            detail="In your library"
                            icon={FileText}
                            label="Verified Sources"
                            value="18"
                        />
                    </div>

                    <div className="dashboard-lower-grid">
                        <div className="student-card dashboard-learning-card">
                            <h2>
                                <BookOpen /> Continue Learning
                            </h2>
                            <div className="learning-preview">
                                <div className="learning-illustration">
                                    <Search />
                                    <Check />
                                </div>
                                <div>
                                    <h3>
                                        Evaluating Online Sources and Claims
                                    </h3>
                                    <p>
                                        Learn how to assess credibility,
                                        identify bias, and evaluate evidence in
                                        online content.
                                    </p>
                                    <small>Lesson 4 of 6</small>
                                    <div className="learning-progress-row">
                                        <StudentProgress value={67} />
                                        <span>67%</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="student-primary-button"
                                onClick={() => openLesson(6)}
                                type="button"
                            >
                                Continue Module <ChevronRight />
                            </button>
                            <button
                                className="student-text-link"
                                onClick={() => showView('learn')}
                                type="button"
                            >
                                View all modules <ChevronRight />
                            </button>
                        </div>

                        <div className="student-card dashboard-reviews-card">
                            <div className="student-card-heading">
                                <h2>
                                    <MessageSquare /> Community Reviews
                                </h2>
                                <button
                                    className="student-text-link"
                                    onClick={() => showView('community')}
                                    type="button"
                                >
                                    View all
                                </button>
                            </div>
                            {[
                                [
                                    'Climate change is a natural cycle',
                                    'bbc.com · 2h ago',
                                    'Reliable',
                                    'green',
                                    '128',
                                    '18',
                                ],
                                [
                                    'Drinking lemon water detoxifies your body',
                                    'wellnessblog.com · 5h ago',
                                    'Needs Verification',
                                    'amber',
                                    '74',
                                    '23',
                                ],
                                [
                                    'Vaccines cause autism',
                                    'misleadinginfo.net · 1d ago',
                                    'Misleading',
                                    'red',
                                    '52',
                                    '31',
                                ],
                            ].map(
                                ([
                                    claim,
                                    meta,
                                    status,
                                    color,
                                    likes,
                                    replies,
                                ]) => (
                                    <div className="review-row" key={claim}>
                                        <span
                                            className={`status-shield ${color}`}
                                        >
                                            {color === 'green'
                                                ? '✓'
                                                : color === 'red'
                                                  ? '×'
                                                  : '?'}
                                        </span>
                                        <div>
                                            <strong>{claim}</strong>
                                            <small>{meta}</small>
                                        </div>
                                        <span
                                            className={`student-status ${color}`}
                                        >
                                            {status}
                                        </span>
                                        <small>
                                            <ThumbsUp /> {likes}
                                        </small>
                                        <small>
                                            <MessageSquare /> {replies}
                                        </small>
                                    </div>
                                ),
                            )}
                            <button
                                className="student-text-link"
                                onClick={() => showView('community')}
                                type="button"
                            >
                                See all reviews <ChevronRight />
                            </button>
                        </div>
                    </div>
                </div>

                <aside className="student-rail">
                    <MissionCard />
                    <ContributorList onView={() => showView('leaderboard')} />
                    <VerifiedContributorCard />
                </aside>
            </div>
        </section>
    );
}

function ModulesView({ openLesson }: { openLesson: (index: number) => void }) {
    const learningTitles = [
        'Introduction to Media and Information Literacy',
        'Misinformation, Disinformation, and Malinformation',
        'Information Disorder and Online Sharing Behavior',
        'Evaluating Online Sources and Claims',
        'Fact-Checking and Verification Techniques',
        'Community Verification and Reporting',
        'AI-Generated Content and AI Hallucinations',
        'Deepfakes and Manipulated Media',
        'Media Literacy in the Age of Social Media',
        'Data Privacy and Digital Well-being',
        'Civic Engagement and Digital Responsibility',
        'Capstone Project: Verify for Impact',
    ];

    return (
        <section className="view active student-view student-learn">
            <StudentPageTitle
                subtitle="Build the skills to verify before you share."
                title="Learning Center"
            />
            <div className="student-page-layout">
                <div className="student-primary">
                    <div className="student-stats-grid">
                        <StudentStatCard
                            detail="On track"
                            icon={GraduationCap}
                            label="Course Progress"
                            value="65%"
                        />
                        <StudentStatCard
                            detail="Modules"
                            icon={ClipboardList}
                            label="Completed Modules"
                            value="7 of 12"
                        />
                        <StudentStatCard
                            detail="Keep it up!"
                            icon={Flame}
                            label="Current Streak"
                            value="5 days"
                        />
                        <StudentStatCard
                            detail="Badges"
                            icon={BadgeCheck}
                            label="Badges Earned"
                            value="4"
                        />
                    </div>

                    <div className="student-card learning-resume-card">
                        <span>Continue Learning</span>
                        <div className="resume-content">
                            <div className="deepfake-preview">
                                <Bot />
                                <CirclePlay />
                            </div>
                            <div>
                                <h2>
                                    Module 8: Deepfakes and Manipulated Media
                                </h2>
                                <p>
                                    Learn how deepfakes are created, how to
                                    detect them, and understand the risks and
                                    real-world impact of manipulated media.
                                </p>
                                <div className="resume-progress">
                                    <StudentProgress value={45} />
                                    <strong>45%</strong>
                                </div>
                            </div>
                            <button
                                className="student-primary-button"
                                onClick={() => openLesson(7)}
                                type="button"
                            >
                                Continue Learning <ChevronRight />
                            </button>
                        </div>
                    </div>

                    <h2 className="student-section-title">
                        Media and Information Literacy in the Digital Age
                    </h2>
                    <div className="learning-module-grid">
                        {learningTitles.map((title, index) => {
                            const state =
                                index < 7
                                    ? 'completed'
                                    : index === 7
                                      ? 'progress'
                                      : 'locked';

                            return (
                                <button
                                    className={`learning-module-card ${state}`}
                                    disabled={state === 'locked'}
                                    key={title}
                                    onClick={() => openLesson(index)}
                                    type="button"
                                >
                                    <span className="module-index">
                                        {index + 1}
                                    </span>
                                    <span>
                                        <strong>{title}</strong>
                                        <small>
                                            {state === 'completed' && (
                                                <>
                                                    <CircleCheck /> Completed
                                                </>
                                            )}
                                            {state === 'progress' &&
                                                'In progress'}
                                            {state === 'locked' && 'Locked'}
                                        </small>
                                    </span>
                                    {state === 'locked' ? (
                                        <LockKeyhole />
                                    ) : state === 'progress' ? (
                                        <span className="module-spinner" />
                                    ) : (
                                        <ChevronRight />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <aside className="student-rail">
                    <MissionCard title="Weekly Mission" />
                    <div className="student-side-card recent-badges-card">
                        <h3>
                            <BadgeCheck /> Recent Badges
                        </h3>
                        {[
                            [
                                'Fact-Checker',
                                'Earned on May 9, 2025',
                                ShieldCheck,
                            ],
                            ['Source Sleuth', 'Earned on Apr 28, 2025', Search],
                            [
                                'Community Contributor',
                                'Earned on Apr 15, 2025',
                                Users,
                            ],
                            ['Streak Starter', 'Earned on Apr 8, 2025', Flame],
                        ].map(([name, date, Icon]) => {
                            const BadgeIcon = Icon as LucideIcon;

                            return (
                                <div
                                    className="recent-badge-row"
                                    key={name as string}
                                >
                                    <span>
                                        <BadgeIcon />
                                    </span>
                                    <div>
                                        <strong>{name as string}</strong>
                                        <small>{date as string}</small>
                                    </div>
                                </div>
                            );
                        })}
                        <button className="student-text-link" type="button">
                            View all badges <ChevronRight />
                        </button>
                    </div>
                    <div className="student-side-card certificate-card">
                        <h3>
                            <FileText /> Course Certificate
                        </h3>
                        <p>
                            Complete all 12 modules to earn your MILDA
                            Certificate.
                        </p>
                        <strong>65%</strong>
                        <span>7 of 12 modules completed</span>
                        <StudentProgress value={65} />
                        <button
                            className="student-outline-button"
                            type="button"
                        >
                            View Certificate Progress <ChevronRight />
                        </button>
                    </div>
                </aside>
            </div>
        </section>
    );
}

function VerificationView({
    tab,
    verifyClaim,
    verifyUrl,
    result,
    setTab,
    setVerifyClaim,
    setVerifyUrl,
    runAnalysis,
    submitForReview,
}: {
    tab: VerifyTab;
    verifyClaim: string;
    verifyUrl: string;
    result: AnalysisScenario;
    setTab: (tab: VerifyTab) => void;
    setVerifyClaim: (value: string) => void;
    setVerifyUrl: (value: string) => void;
    runAnalysis: () => void;
    submitForReview: () => void;
}) {
    const [verifyImageName, setVerifyImageName] = useState('');
    const claim =
        verifyClaim || 'Drinking lemon water removes all toxins from the body.';
    const hasVerifyInput =
        tab === 'url'
            ? Boolean(verifyUrl.trim())
            : tab === 'text'
              ? Boolean(verifyClaim.trim())
              : Boolean(verifyImageName);

    return (
        <section className="view active student-view student-verify">
            <StudentPageTitle
                subtitle="Analyze a claim, link, screenshot, or image."
                title="Verify Content"
            />

            <div className="student-page-layout verify-page-layout">
                <div className="student-primary">
                    <div className="student-card verify-entry-card">
                        <div
                            aria-label="Verification input type"
                            className="student-tabs"
                            role="tablist"
                        >
                            {(
                                [
                                    ['url', 'Paste Link', Link],
                                    ['text', 'Enter Text', FileText],
                                    ['image', 'Upload Image', Image],
                                ] as [VerifyTab, string, LucideIcon][]
                            ).map(([tabName, label, Icon]) => (
                                <button
                                    aria-selected={tab === tabName}
                                    className={tab === tabName ? 'active' : ''}
                                    key={tabName}
                                    onClick={() => setTab(tabName)}
                                    role="tab"
                                    type="button"
                                >
                                    <Icon /> {label}
                                </button>
                            ))}
                        </div>
                        <div
                            className={`student-verify-input ${tab}`}
                            role="tabpanel"
                        >
                            {tab === 'image' ? (
                                <label className="student-upload-zone">
                                    <input
                                        accept="image/*"
                                        aria-label="Upload image"
                                        onChange={(event) => {
                                            const fileName =
                                                event.target.files?.[0]?.name ??
                                                '';

                                            setVerifyImageName(fileName);
                                            setVerifyClaim(
                                                fileName
                                                    ? `Uploaded image: ${fileName}`
                                                    : '',
                                            );
                                        }}
                                        type="file"
                                    />
                                    <span className="upload-zone-icon">
                                        <Upload />
                                    </span>
                                    <span className="upload-zone-copy">
                                        <strong>
                                            {verifyImageName ||
                                                'Choose a screenshot or image'}
                                        </strong>
                                        <small>
                                            PNG, JPG, or WEBP · Maximum 10 MB
                                        </small>
                                    </span>
                                    <span className="upload-browse-button">
                                        Browse files
                                    </span>
                                </label>
                            ) : (
                                <label className="student-verify-field">
                                    {tab === 'url' ? <Link /> : <FileText />}
                                    {tab === 'url' ? (
                                        <input
                                            aria-label="Link to verify"
                                            onChange={(event) =>
                                                setVerifyUrl(event.target.value)
                                            }
                                            placeholder="Paste the full URL of an article or social post"
                                            type="url"
                                            value={verifyUrl}
                                        />
                                    ) : (
                                        <textarea
                                            aria-label="Text to verify"
                                            onChange={(event) =>
                                                setVerifyClaim(
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Enter the claim, caption, or passage you want to verify"
                                            rows={4}
                                            value={verifyClaim}
                                        />
                                    )}
                                </label>
                            )}
                            <button
                                className="student-primary-button"
                                disabled={!hasVerifyInput}
                                onClick={runAnalysis}
                                type="button"
                            >
                                <Sparkles /> Analyze Content
                            </button>
                        </div>
                    </div>

                    <div className="verification-results-grid">
                        <div className="student-card claim-review-card">
                            <h2>Claim Under Review</h2>
                            <h3>{claim}</h3>
                            <dl>
                                <div>
                                    <dt>Type:</dt>
                                    <dd>Text Claim</dd>
                                </div>
                                <div>
                                    <dt>Submitted:</dt>
                                    <dd>May 20, 2025 · 10:32 AM</dd>
                                </div>
                                <div>
                                    <dt>Submitted by:</dt>
                                    <dd>Alex Rivera</dd>
                                </div>
                                <div>
                                    <dt>Source:</dt>
                                    <dd>
                                        wellnessblog.com <ExternalLink />
                                    </dd>
                                </div>
                            </dl>
                            <div className="claim-score-box">
                                <span className="status-shield amber">?</span>
                                <div>
                                    <strong>{result.tag}</strong>
                                    <small>
                                        This claim requires additional credible
                                        evidence.
                                    </small>
                                </div>
                                <div>
                                    <strong>{result.aiScore}</strong>
                                    <small>Confidence</small>
                                </div>
                            </div>
                        </div>

                        <div className="analysis-stack">
                            <div className="student-card analysis-card">
                                <span className="analysis-icon">
                                    <Bot />
                                </span>
                                <div>
                                    <h2>AI-Assisted Analysis</h2>
                                    <small>
                                        Our AI reviewed the claim and related
                                        sources to evaluate its accuracy.
                                    </small>
                                    <p>
                                        The claim is{' '}
                                        <strong>
                                            partially supported but exaggerated.
                                        </strong>{' '}
                                        Lemon water may support hydration and
                                        provide vitamin C, but there is{' '}
                                        <strong>no scientific evidence</strong>{' '}
                                        it removes “all toxins” from the body.
                                    </p>
                                </div>
                            </div>
                            <div className="student-card analysis-card">
                                <span className="analysis-icon">
                                    <Check />
                                </span>
                                <div>
                                    <h2>Key Findings</h2>
                                    <ul>
                                        <li>
                                            No scientific evidence supports that
                                            lemon water removes all toxins.
                                        </li>
                                        <li>
                                            Detoxification is naturally carried
                                            out by the liver, kidneys, and
                                            lungs.
                                        </li>
                                        <li>
                                            Lemon water may aid hydration and
                                            provide vitamin C and antioxidants.
                                        </li>
                                        <li>
                                            “Toxins” is a vague term with no
                                            standard medical definition.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="student-card analysis-card">
                                <span className="analysis-icon">
                                    <ClipboardList />
                                </span>
                                <div>
                                    <h2>Context and Missing Evidence</h2>
                                    <p>
                                        Studies show lemon water can be a
                                        healthy addition to a balanced diet.
                                        However, claims about “detox” effects
                                        lack clinical backing. More high-quality
                                        research is needed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ai-advisory">
                        <ShieldCheck /> AI guidance is advisory. Always verify
                        with trusted sources.
                    </div>
                    <div className="verification-actions">
                        <button
                            className="student-outline-button"
                            onClick={submitForReview}
                            type="button"
                        >
                            <Plus /> Add Trusted Source
                        </button>
                        <button
                            className="student-outline-button"
                            onClick={submitForReview}
                            type="button"
                        >
                            <Flag /> Report Content
                        </button>
                        <button
                            className="student-outline-button"
                            type="button"
                        >
                            <Bookmark /> Save to Portfolio
                        </button>
                    </div>
                </div>

                <aside className="student-rail">
                    <div className="student-side-card trusted-sources-card">
                        <h3>
                            <ShieldCheck /> Trusted Sources to Check
                        </h3>
                        {[
                            [
                                'World Health Organization',
                                'Detox diets and body cleansing',
                                'who.int/news-room/fact-sheets',
                            ],
                            [
                                'Mayo Clinic',
                                'Detox diets: Are they safe?',
                                'mayoclinic.org/healthy-lifestyle/nutrition',
                            ],
                            [
                                'Cochrane Library',
                                'Detoxification diets for toxin elimination',
                                'cochranelibrary.com/cdsr/doi/10.1002',
                            ],
                        ].map(([name, detail, url]) => (
                            <div className="trusted-source-row" key={name}>
                                <span>{name.slice(0, 2).toUpperCase()}</span>
                                <div>
                                    <strong>{name}</strong>
                                    <small>{detail}</small>
                                    <a href={`https://${url}`}>
                                        {url} <ExternalLink />
                                    </a>
                                </div>
                            </div>
                        ))}
                        <button className="student-text-link" type="button">
                            View more trusted sources <ChevronRight />
                        </button>
                    </div>

                    <div className="student-side-card assessment-card">
                        <h3>
                            <Users /> Community Assessment
                        </h3>
                        <p>What do other verified members think?</p>
                        <div className="assessment-options">
                            <div className="green">
                                <span>✓</span>
                                <strong>Reliable</strong>
                                <small>82 (38%)</small>
                            </div>
                            <div className="amber">
                                <span>?</span>
                                <strong>Needs Verification</strong>
                                <small>96 (45%)</small>
                            </div>
                            <div className="red">
                                <span>×</span>
                                <strong>Misleading</strong>
                                <small>34 (17%)</small>
                            </div>
                        </div>
                        <div className="assessment-footer">
                            <span>Total votes: 212</span>
                            <button className="student-text-link" type="button">
                                View discussion <ChevronRight />
                            </button>
                        </div>
                    </div>

                    <div className="student-side-card stop-card">
                        <ShieldCheck />
                        <div>
                            <h3>S.T.O.P. Before You Share</h3>
                            <strong>Stop · Think · Observe · Proceed</strong>
                            <p>Pause to evaluate before sharing information.</p>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}

function CommunityView({
    filter,
    setFilter,
    vote,
    toast,
    showView,
}: {
    filter: CommunityFilter;
    setFilter: (filter: CommunityFilter) => void;
    vote: (itemIndex: number, voteIndex: number) => void;
    toast: (message: string) => void;
    showView: (view: View) => void;
}) {
    const communityRows = [
        {
            title: 'A viral image shows a city flooded yesterday',
            text: 'A photo circulating on social media claims a major city was flooded due to heavy rain yesterday.',
            meta: 'Posted 2 hours ago · Image',
            state: 'review' as const,
            tag: 'Needs Verification',
            evidence: '3',
            votes: '12',
            user: 'Jasmine M.',
        },
        {
            title: 'The university announced classes are suspended tomorrow',
            text: 'An official notice from the university states that all classes are suspended tomorrow due to severe weather.',
            meta: 'Posted 5 hours ago · Text',
            state: 'verified' as const,
            tag: 'Reliable',
            evidence: '5',
            votes: '28',
            user: 'Alex Rivera',
        },
        {
            title: 'A celebrity endorsed this investment platform',
            text: 'A post claims a well-known celebrity is endorsing an investment platform that promises guaranteed returns.',
            meta: 'Posted 8 hours ago · Image',
            state: 'media' as const,
            tag: 'Misleading',
            evidence: '4',
            votes: '18',
            user: 'Sofia C.',
        },
    ];

    return (
        <section className="view active student-view student-community">
            <StudentPageTitle
                subtitle="Review evidence. Share trusted sources. Help the community decide."
                title="Community Verification"
            />
            <div className="student-page-layout">
                <div className="student-primary">
                    <div className="student-card community-toolbar-card">
                        <div className="community-toolbar">
                            <label>
                                <Search />
                                <input
                                    aria-label="Search community reports"
                                    placeholder="Search community reports"
                                />
                            </label>
                            <div className="student-tabs community-tabs">
                                {(
                                    [
                                        ['all', 'All Content'],
                                        ['review', 'Needs Review'],
                                        ['verified', 'Verified'],
                                        ['media', 'Disputed'],
                                    ] as [CommunityFilter, string][]
                                ).map(([value, label]) => (
                                    <button
                                        className={
                                            filter === value ? 'active' : ''
                                        }
                                        key={value}
                                        onClick={() => setFilter(value)}
                                        type="button"
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                            <select aria-label="Sort reports">
                                <option>Newest</option>
                                <option>Most reviewed</option>
                            </select>
                        </div>
                        <div className="community-stat-grid">
                            <StudentStatCard
                                detail="Items need community review"
                                icon={HelpCircle}
                                label="Open Reviews"
                                value="128"
                            />
                            <StudentStatCard
                                detail="Reports confirmed by community"
                                icon={ShieldCheck}
                                label="Verified This Week"
                                value="64"
                            />
                            <StudentStatCard
                                detail="New reliable sources contributed"
                                icon={FileText}
                                label="Trusted Sources Added"
                                value="217"
                            />
                        </div>
                    </div>

                    <div className="community-report-list">
                        {communityRows.map((row, index) => {
                            if (filter !== 'all' && row.state !== filter) {
                                return null;
                            }

                            const color =
                                row.state === 'verified'
                                    ? 'green'
                                    : row.state === 'media'
                                      ? 'red'
                                      : 'amber';

                            return (
                                <article
                                    className="student-card community-report-row"
                                    key={row.title}
                                >
                                    <span
                                        className={`status-shield large ${color}`}
                                    >
                                        {color === 'green'
                                            ? '✓'
                                            : color === 'red'
                                              ? '×'
                                              : '?'}
                                    </span>
                                    <div className="community-claim">
                                        <small>Claim</small>
                                        <h2>{row.title}</h2>
                                        <p>{row.text}</p>
                                        <span>{row.meta}</span>
                                    </div>
                                    <div className="community-evidence">
                                        <span
                                            className={`student-status ${color}`}
                                        >
                                            {row.tag}
                                        </span>
                                        <div>
                                            <span>
                                                <FileText /> Evidence
                                                <strong>{row.evidence}</strong>
                                            </span>
                                            <span>
                                                <Users /> Community Votes
                                                <strong>{row.votes}</strong>
                                            </span>
                                            <span>
                                                <span className="mini-avatar">
                                                    {row.user
                                                        .split(' ')
                                                        .map((part) => part[0])
                                                        .join('')}
                                                </span>
                                                Contributed by
                                                <strong>{row.user}</strong>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="community-actions">
                                        <button
                                            className="student-primary-button"
                                            onClick={() => vote(index, 0)}
                                            type="button"
                                        >
                                            Review Evidence <ChevronRight />
                                        </button>
                                        <button
                                            className="student-outline-button"
                                            onClick={() =>
                                                toast(
                                                    'Trusted-source form opened',
                                                )
                                            }
                                            type="button"
                                        >
                                            Add Source <Plus />
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>

                <aside className="student-rail">
                    <div className="student-side-card guidelines-card">
                        <h3>
                            <ShieldCheck /> Community Guidelines
                        </h3>
                        {[
                            'Be respectful and objective',
                            'Verify before you vote',
                            'Cite credible sources',
                            'No personal information',
                            'Report abuse or spam',
                        ].map((guideline) => (
                            <p key={guideline}>
                                <CircleCheck /> {guideline}
                            </p>
                        ))}
                        <button className="student-text-link" type="button">
                            View full guidelines <ChevronRight />
                        </button>
                    </div>
                    <ContributorList
                        onView={() => showView('leaderboard')}
                        title="Top Reviewers This Week"
                    />
                    <div className="student-side-card impact-card">
                        <span>
                            <Users />
                        </span>
                        <div>
                            <h3>Your Review Impact</h3>
                            <strong>36</strong>
                            <small>people helped</small>
                        </div>
                        <p>
                            Keep it up! Your reviews make the community
                            stronger.
                        </p>
                        <button className="student-text-link" type="button">
                            View your activity <ChevronRight />
                        </button>
                    </div>
                </aside>
            </div>
        </section>
    );
}

function ContributionsView({ toast }: { toast: (message: string) => void }) {
    const activity = [3, 5, 4, 7, 3, 1, 1];
    const history = [
        [
            'Lemon water detox claim',
            'Added trusted source',
            'Accepted',
            '+40',
            'Aug 2',
        ],
        [
            'Viral flood image',
            'Submitted report',
            'Under Review',
            '+10',
            'Aug 1',
        ],
        [
            'Suspension announcement',
            'Community review',
            'Verified',
            '+25',
            'Jul 30',
        ],
        [
            'Investment endorsement',
            'Voted Misleading',
            'Confirmed',
            '+20',
            'Jul 28',
        ],
    ];

    return (
        <section className="view active student-view student-contributions">
            <StudentPageTitle
                subtitle="Track your verification work and build your Digital Verification Portfolio."
                title="My Contributions"
            />
            <div className="student-page-layout">
                <div className="student-primary">
                    <div className="student-stats-grid">
                        <StudentStatCard
                            detail="All time"
                            icon={ClipboardList}
                            label="Total Contributions"
                            value="24"
                        />
                        <StudentStatCard
                            detail="Added to MILDA"
                            icon={ShieldCheck}
                            label="Trusted Sources"
                            value="18"
                        />
                        <StudentStatCard
                            detail="From community"
                            icon={ThumbsUp}
                            label="Helpful Votes"
                            value="142"
                        />
                        <StudentStatCard
                            detail="Excellent"
                            icon={Award}
                            label="Impact Score"
                            value="820"
                        />
                    </div>

                    <div className="student-card contribution-chart-card">
                        <div className="student-card-heading">
                            <h2>Contribution Activity</h2>
                            <select aria-label="Contribution period">
                                <option>This Week</option>
                                <option>This Month</option>
                            </select>
                        </div>
                        <div className="activity-chart">
                            {activity.map((value, index) => (
                                <div className="activity-column" key={index}>
                                    <strong>{value}</strong>
                                    <span
                                        style={{ height: `${value * 15}px` }}
                                    />
                                    <small>
                                        {
                                            [
                                                'Mon',
                                                'Tue',
                                                'Wed',
                                                'Thu',
                                                'Fri',
                                                'Sat',
                                                'Sun',
                                            ][index]
                                        }
                                    </small>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="student-card contribution-history-card">
                        <div className="student-card-heading">
                            <h2>Contribution History</h2>
                            <div className="history-filters">
                                <button className="active" type="button">
                                    All
                                </button>
                                <button type="button">Accepted</button>
                                <button type="button">Under Review</button>
                                <button type="button">Confirmed</button>
                            </div>
                        </div>
                        <div className="student-table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Content</th>
                                        <th>Contribution</th>
                                        <th>Status</th>
                                        <th>Points</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((row, index) => (
                                        <tr key={row[0]}>
                                            <td>
                                                {index === 1 ? (
                                                    <Image />
                                                ) : (
                                                    <Link />
                                                )}
                                                <strong>{row[0]}</strong>
                                            </td>
                                            <td>{row[1]}</td>
                                            <td>
                                                <span
                                                    className={`student-status ${
                                                        row[2] ===
                                                        'Under Review'
                                                            ? 'amber'
                                                            : row[2] ===
                                                                'Verified'
                                                              ? 'blue'
                                                              : 'green'
                                                    }`}
                                                >
                                                    {row[2]}
                                                </span>
                                            </td>
                                            <td>
                                                <strong className="points">
                                                    {row[3]}
                                                </strong>
                                            </td>
                                            <td>{row[4]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <aside className="student-rail">
                    <div className="student-side-card portfolio-progress-card">
                        <h3>Portfolio Progress</h3>
                        <div>
                            <span className="portfolio-ring">70%</span>
                            <p>
                                You’re building a strong verification portfolio.
                                Keep it up!
                            </p>
                        </div>
                    </div>
                    <div className="student-side-card contributor-badge-detail">
                        <VerifiedContributorCard />
                        {[
                            'Trusted by the community',
                            'Improving information quality',
                            'Building a better internet',
                        ].map((item) => (
                            <p key={item}>
                                <CircleCheck /> {item}
                            </p>
                        ))}
                    </div>
                    <div className="student-side-card export-card">
                        <button
                            className="student-primary-button"
                            onClick={() => toast('Portfolio export prepared')}
                            type="button"
                        >
                            <Download /> Export Portfolio
                        </button>
                        <p>
                            Download your verification portfolio as a PDF
                            report.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    );
}

function LeaderboardView({ openPolicy }: { openPolicy: () => void }) {
    const rows = [
        [
            '4',
            'ET',
            'Ethan Thompson',
            'University of Toronto',
            '23',
            '41',
            '760',
        ],
        [
            '5',
            'AL',
            'Aisha Lee',
            'National University of Singapore',
            '21',
            '38',
            '715',
        ],
        [
            '6',
            'JR',
            'Joshua Rivera',
            'University of Cape Town',
            '20',
            '33',
            '670',
        ],
        ['7', 'NW', 'Nina Wu', 'University of Melbourne', '18', '31', '620'],
        [
            '8',
            'DP',
            'Daniel Patel',
            'Indian Institute of Science',
            '17',
            '29',
            '585',
        ],
        ['9', 'SK', 'Sara Kim', 'Seoul National University', '16', '27', '545'],
        [
            '10',
            'TG',
            'Tomás García',
            'Universidad de los Andes',
            '14',
            '24',
            '510',
        ],
    ];

    return (
        <section className="view active student-view student-leaderboard">
            <StudentPageTitle
                subtitle="Recognizing responsible and evidence-based participation."
                title="Leaderboard"
            />
            <div className="student-page-layout">
                <div className="student-primary">
                    <div className="leaderboard-controls">
                        <div className="student-tabs">
                            <button className="active" type="button">
                                This Week
                            </button>
                            <button type="button">This Month</button>
                            <button type="button">All Time</button>
                        </div>
                        <select aria-label="Institution filter">
                            <option>All Institutions</option>
                            <option>University of Toronto</option>
                        </select>
                    </div>

                    <div className="podium-grid">
                        {[
                            ['2', 'LO', 'Liam Okafor', '980'],
                            ['1', 'MC', 'Maya Chen', '1,250'],
                            ['3', 'SM', 'Sofia Martinez', '870'],
                        ].map(([rank, initials, name, score]) => (
                            <div
                                className={`student-card podium-card rank-${rank}`}
                                key={name}
                            >
                                <span className="rank">{rank}</span>
                                <span className="podium-avatar">
                                    {initials}
                                </span>
                                <div>
                                    <strong>{name}</strong>
                                    <span>{score}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="student-card leaderboard-table-card">
                        <div className="student-table-wrap">
                            <table className="leaderboard-table">
                                <colgroup>
                                    <col className="rank-column" />
                                    <col className="contributor-column" />
                                    <col className="institution-column" />
                                    <col className="sources-column" />
                                    <col className="reviews-column" />
                                    <col className="score-column" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Contributor</th>
                                        <th>Institution</th>
                                        <th>Trusted Sources</th>
                                        <th>Reviews</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row) => (
                                        <tr key={row[0]}>
                                            <td>
                                                <span className="table-rank">
                                                    {row[0]}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="leaderboard-person">
                                                    <span className="mini-avatar">
                                                        {row[1]}
                                                    </span>
                                                    <strong>{row[2]}</strong>
                                                </div>
                                            </td>
                                            <td className="institution-cell">
                                                {row[3]}
                                            </td>
                                            <td className="numeric-cell">
                                                {row[4]}
                                            </td>
                                            <td className="numeric-cell">
                                                {row[5]}
                                            </td>
                                            <td className="numeric-cell score-cell">
                                                {row[6]}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="your-rank-card">
                        <div>
                            <span>Your Rank</span>
                            <strong>#12</strong>
                        </div>
                        <span className="podium-avatar">AR</span>
                        <div>
                            <strong>Alex Rivera</strong>
                            <small>University of California, Berkeley</small>
                        </div>
                        <div>
                            <small>Trusted Sources</small>
                            <strong>18</strong>
                        </div>
                        <div>
                            <small>Reviews</small>
                            <strong>18</strong>
                        </div>
                        <div>
                            <small>Score</small>
                            <strong>820</strong>
                        </div>
                        <p>
                            50 points
                            <br />
                            to reach Top 10
                        </p>
                    </div>
                </div>

                <aside className="student-rail">
                    <div className="student-side-card points-card">
                        <h3>
                            How Points Work
                            <button
                                aria-label="View badge and points policy"
                                onClick={openPolicy}
                                type="button"
                            >
                                <Info />
                            </button>
                        </h3>
                        <p>
                            <ShieldCheck /> Trusted source <strong>+40</strong>
                        </p>
                        <p>
                            <MessageSquare /> Helpful review{' '}
                            <strong>+25</strong>
                        </p>
                        <p>
                            <CircleCheck /> Verified report <strong>+20</strong>
                        </p>
                        <small>
                            Keep contributing to help build a safer information
                            environment.
                        </small>
                    </div>
                    <div className="student-side-card institution-card">
                        <span>
                            <Building2 />
                        </span>
                        <div>
                            <h3>Top Institution</h3>
                            <strong>University of Toronto</strong>
                            <p>
                                12,450 points
                                <br />
                                89 active contributors
                            </p>
                        </div>
                        <button className="student-text-link" type="button">
                            View institution leaderboard <ChevronRight />
                        </button>
                    </div>
                    <div className="student-side-card achievements-card">
                        <h3>Recent Achievements</h3>
                        {[
                            [
                                'Source Scout',
                                'Added 20 trusted sources',
                                ShieldCheck,
                            ],
                            [
                                'Review Helper',
                                'Completed 25 helpful reviews',
                                Users,
                            ],
                            [
                                'Fact Builder',
                                'Submitted 10 verified reports',
                                Check,
                            ],
                        ].map(([name, detail, Icon]) => {
                            const AchievementIcon = Icon as LucideIcon;

                            return (
                                <div key={name as string}>
                                    <span>
                                        <AchievementIcon />
                                    </span>
                                    <p>
                                        <strong>{name as string}</strong>
                                        <small>
                                            {detail as string}
                                            <br />
                                            Earned May 10
                                        </small>
                                    </p>
                                </div>
                            );
                        })}
                        <button className="student-text-link" type="button">
                            View all achievements <ChevronRight />
                        </button>
                    </div>
                </aside>
            </div>
        </section>
    );
}

function Modal({
    children,
    className = '',
    onClose,
}: {
    children: ReactNode;
    className?: string;
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
            <div className={`modal ${className}`}>{children}</div>
        </div>
    );
}

export default function Milda() {
    const [view, setView] = useState<View>('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [modal, setModal] = useState<ModalName>(null);
    const [modules, setModules] = useState(initialCourseModules);
    const [activeModule, setActiveModule] = useState(6);
    const [, setCommunity] = useState(initialCommunityItems);
    const [communityFilter, setCommunityFilter] =
        useState<CommunityFilter>('all');
    const [verifyTab, setVerifyTab] = useState<VerifyTab>('url');
    const [quickClaim, setQuickClaim] = useState('');
    const [verifyClaim, setVerifyClaim] = useState('');
    const [verifyUrl, setVerifyUrl] = useState('');
    const [analysisResult, setAnalysisResult] = useState(
        analysisScenarios.review,
    );
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

    const runAnalysis = (claim = verifyClaim || quickClaim || verifyUrl) => {
        setAnalysisResult(determineAnalysis(claim));
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

            <div className="app-shell student-shell">
                <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                    <div className="brand">
                        <span className="student-brand-icon">
                            <Search />
                        </span>
                        <h1>
                            <span>MIL</span>DA
                        </h1>
                    </div>
                    <nav aria-label="Student navigation" className="nav">
                        {studentNavigation.map((item) => (
                            <button
                                aria-current={
                                    view === item.view ? 'page' : undefined
                                }
                                className={view === item.view ? 'active' : ''}
                                key={item.view}
                                onClick={() => showView(item.view)}
                                type="button"
                            >
                                <item.icon />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                    <button
                        className="student-help-link"
                        onClick={() =>
                            toast('Help and support resources opened')
                        }
                        type="button"
                    >
                        <HelpCircle /> Help &amp; Support
                    </button>
                </aside>

                <div
                    className={`sidebar-backdrop ${sidebarOpen ? 'open' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                    role="presentation"
                />

                <main className="main">
                    <header className="topbar">
                        <div className="student-top-search">
                            <button
                                aria-expanded={sidebarOpen}
                                aria-label="Open navigation"
                                className="mobile-menu"
                                onClick={() =>
                                    setSidebarOpen((current) => !current)
                                }
                                type="button"
                            >
                                <Menu />
                            </button>
                            <label>
                                <Search />
                                <input
                                    aria-label="Search verified content"
                                    placeholder={
                                        view === 'community'
                                            ? 'Search community reports'
                                            : 'Search verified content'
                                    }
                                />
                            </label>
                        </div>
                        <div className="student-profile-actions">
                            <button
                                aria-label="Notifications"
                                className="student-notification"
                                onClick={() => setDrawerOpen(true)}
                                type="button"
                            >
                                <Bell />
                                <span>3</span>
                            </button>
                            <div className="student-avatar">AR</div>
                            <button
                                aria-label="Open student profile"
                                className="student-profile"
                                onClick={() => toast('Student profile opened')}
                                type="button"
                            >
                                <span>
                                    <strong>Alex Rivera</strong>
                                    <small>Student Contributor</small>
                                </span>
                                <ChevronRight />
                            </button>
                        </div>
                    </header>

                    <div className="content">
                        {view === 'dashboard' && (
                            <DashboardView
                                analyzeQuickClaim={analyzeQuickClaim}
                                courseProgress={courseProgress}
                                openLesson={openLesson}
                                quickClaim={quickClaim}
                                setQuickClaim={setQuickClaim}
                                showView={showView}
                            />
                        )}
                        {view === 'learn' && (
                            <ModulesView openLesson={openLesson} />
                        )}
                        {view === 'verify' && (
                            <VerificationView
                                result={analysisResult}
                                runAnalysis={() => runAnalysis()}
                                setTab={setVerifyTab}
                                setVerifyClaim={setVerifyClaim}
                                setVerifyUrl={setVerifyUrl}
                                submitForReview={() => {
                                    showView('community');
                                    toast(
                                        'Submission added to the community review queue',
                                    );
                                }}
                                tab={verifyTab}
                                verifyClaim={verifyClaim}
                                verifyUrl={verifyUrl}
                            />
                        )}
                        {view === 'community' && (
                            <CommunityView
                                filter={communityFilter}
                                setFilter={setCommunityFilter}
                                showView={showView}
                                toast={toast}
                                vote={vote}
                            />
                        )}
                        {view === 'contributions' && (
                            <ContributionsView toast={toast} />
                        )}
                        {view === 'leaderboard' && (
                            <LeaderboardView
                                openPolicy={() => setModal('policy')}
                            />
                        )}

                        <footer className="footer">
                            <span>
                                <ShieldCheck /> AI guides. Humans decide.
                                Communities verify.
                            </span>
                            <span>
                                by <strong>QuantumX</strong>
                            </span>
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
                        One additional trusted source is needed for portfolio
                        item 3.
                    </p>
                </div>
            </aside>

            {modal === 'lesson' && activeLesson && (
                <Modal
                    className="student-lesson-modal"
                    onClose={() => setModal(null)}
                >
                    <div className="lesson-modal-topbar">
                        <div className="lesson-breadcrumb">
                            <BookOpen />
                            <span>Learning Center</span>
                            <ChevronRight />
                            <span>Module {activeModule + 1}</span>
                        </div>
                        <button
                            aria-label="Close lesson"
                            className="lesson-modal-close"
                            onClick={() => setModal(null)}
                            type="button"
                        >
                            <X />
                        </button>
                    </div>

                    <header className="lesson-modal-hero">
                        <div className="lesson-modal-number">
                            {activeModule + 1}
                        </div>
                        <div className="lesson-modal-title">
                            <span
                                className={`lesson-state ${
                                    activeLesson.progress === 100
                                        ? 'completed'
                                        : activeLesson.progress > 0
                                          ? 'progress'
                                          : 'preview'
                                }`}
                            >
                                {activeLesson.progress === 100 ? (
                                    <CircleCheck />
                                ) : (
                                    <CirclePlay />
                                )}
                                {activeLesson.progress === 100
                                    ? 'Completed'
                                    : activeLesson.progress > 0
                                      ? 'In progress'
                                      : 'Module preview'}
                            </span>
                            <h2>{activeLesson.title}</h2>
                            <p>{activeLesson.description}</p>
                            <div className="lesson-modal-meta">
                                <span>
                                    <Clock3 /> {activeLesson.duration}
                                </span>
                                <span>
                                    <ClipboardList /> 4 learning items
                                </span>
                                <span>
                                    <Award /> Knowledge check
                                </span>
                            </div>
                        </div>
                    </header>

                    <div className="lesson-modal-progress">
                        <div>
                            <span>Module progress</span>
                            <strong>{activeLesson.progress}%</strong>
                        </div>
                        <StudentProgress value={activeLesson.progress} />
                    </div>

                    <div className="lesson-modal-content">
                        <section className="lesson-objective-panel">
                            <div className="lesson-panel-heading">
                                <span>
                                    <Target />
                                </span>
                                <div>
                                    <h3>Learning objectives</h3>
                                    <p>
                                        What you’ll be able to do after this
                                        module.
                                    </p>
                                </div>
                            </div>
                            <div className="lesson-objectives">
                                {lessonObjectives.map((objective, index) => (
                                    <div
                                        className="objective"
                                        key={objective.title}
                                    >
                                        <span>{index + 1}</span>
                                        <div>
                                            <strong>{objective.title}</strong>
                                            <p>{objective.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="lesson-activity">
                                <span>
                                    <Sparkles />
                                </span>
                                <div>
                                    <strong>Practical activity</strong>
                                    <p>
                                        Apply the lesson to a real or simulated
                                        online post and document the evidence
                                        you used.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="lesson-quiz-panel">
                            <div className="lesson-panel-heading">
                                <span>
                                    <HelpCircle />
                                </span>
                                <div>
                                    <h3>Knowledge check</h3>
                                    <p>Choose the best answer to continue.</p>
                                </div>
                            </div>
                            <h4>
                                Which action best supports responsible
                                verification?
                            </h4>
                            <div className="quiz-options">
                                {[
                                    'Share immediately if the claim has many likes.',
                                    'Compare the claim with credible primary and independent sources.',
                                    'Trust the first AI-generated answer without checking evidence.',
                                ].map((answer, index) => {
                                    const isSelected =
                                        selectedQuizAnswer === index;
                                    const isCorrect = index === 1;

                                    return (
                                        <button
                                            aria-pressed={isSelected}
                                            className={`quiz-option ${
                                                isSelected
                                                    ? isCorrect
                                                        ? 'selected correct'
                                                        : 'selected incorrect'
                                                    : ''
                                            }`}
                                            key={answer}
                                            onClick={() => {
                                                setSelectedQuizAnswer(index);
                                                toast(
                                                    isCorrect
                                                        ? 'Correct: verify with credible evidence'
                                                        : 'Try again: popularity is not evidence',
                                                );
                                            }}
                                            type="button"
                                        >
                                            <span>
                                                {String.fromCharCode(
                                                    65 + index,
                                                )}
                                            </span>
                                            <strong>{answer}</strong>
                                            {isSelected &&
                                                (isCorrect ? <Check /> : <X />)}
                                        </button>
                                    );
                                })}
                            </div>
                            {selectedQuizAnswer !== null && (
                                <div
                                    className={`quiz-feedback ${
                                        selectedQuizAnswer === 1
                                            ? 'correct'
                                            : 'incorrect'
                                    }`}
                                >
                                    {selectedQuizAnswer === 1 ? (
                                        <Check />
                                    ) : (
                                        <Info />
                                    )}
                                    <span>
                                        {selectedQuizAnswer === 1
                                            ? 'Correct. Credible, independent evidence is the foundation of responsible verification.'
                                            : 'Not quite. Popularity and AI confidence are not substitutes for credible evidence.'}
                                    </span>
                                </div>
                            )}
                        </section>
                    </div>

                    <div className="lesson-modal-actions">
                        <button
                            className="student-outline-button"
                            onClick={() => setModal(null)}
                            type="button"
                        >
                            Back to Learning Center
                        </button>
                        <button
                            className="student-primary-button"
                            disabled={activeLesson.progress === 100}
                            onClick={completeModule}
                            type="button"
                        >
                            {activeLesson.progress === 100 ? (
                                <>
                                    <CircleCheck /> Module Completed
                                </>
                            ) : (
                                <>
                                    Mark Module Complete <ChevronRight />
                                </>
                            )}
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
                            title="Pass final portfolio review"
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
