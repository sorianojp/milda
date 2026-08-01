export type CommunityItem = {
    status: 'verified' | 'review' | 'media';
    tag: string;
    tagClass: string;
    reports: string;
    title: string;
    text: string;
    note: string;
    votes: [number, number, number];
};

export type AnalysisScenario = {
    tag: string;
    tagClass: string;
    title: string;
    summary: string;
    aiScore: string;
    recordCount: string;
    sourceCount: string;
    guidance: string;
};

export type LessonObjective = {
    title: string;
    description: string;
};

export type CourseModule = {
    title: string;
    description: string;
    progress: number;
    objectives: LessonObjective[];
    practicalActivity: string;
};

export const courseModules: CourseModule[] = [
    {
        title: 'Introduction to Media and Information Literacy',
        description:
            'Core MIL concepts, information ecosystems, and responsible digital participation.',
        progress: 100,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the meaning, importance, and scope of Media and Information Literacy (MIL) and recognize its role in navigating today\'s digital world.',
            },
            {
                title: 'Practice',
                description:
                    'Apply the core competencies of MIL by identifying reliable information sources and distinguishing trustworthy content from misleading information.',
            },
            {
                title: 'Evaluate',
                description:
                    'Assess how Media and Information Literacy helps individuals make informed decisions, avoid misinformation, and use media responsibly.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your own media consumption habits and identify ways to become a more critical, ethical, and responsible consumer and creator of information.',
            },
        ],
        practicalActivity:
            'Analyze the real-life scenario about Maria and answer the question: What did Maria do that demonstrates Media and Information Literacy? Then, describe a similar situation in which you verified information before believing or sharing it, explaining which MIL competencies you used.',
    },
    // ...rest of the modules (2–12) — add `objectives` and `practicalActivity`
    // to each once you're ready to customize them. For now, give them the
    // placeholder below so nothing breaks:
    {
        title: 'Introduction to Media and Information Literacy',
        description:
            'Core MIL concepts, information ecosystems, and responsible digital participation.',
        progress: 100,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the meaning, importance, and scope of Media and Information Literacy (MIL) and recognize its role in navigating today\'s digital world.',
            },
            {
                title: 'Practice',
                description:
                    'Apply the core competencies of MIL by identifying reliable information sources and distinguishing trustworthy content from misleading information.',
            },
            {
                title: 'Evaluate',
                description:
                    'Assess how Media and Information Literacy helps individuals make informed decisions, avoid misinformation, and use media responsibly.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your own media consumption habits and identify ways to become a more critical, ethical, and responsible consumer and creator of information.',
            },
        ],
        practicalActivity:
            'Analyze the real-life scenario about Maria and answer the question: What did Maria do that demonstrates Media and Information Literacy? Then, describe a similar situation in which you verified information before believing or sharing it, explaining which MIL competencies you used.',
    },
    {
        title: 'Introduction to Media and Information Literacy',
        description:
            'Core MIL concepts, information ecosystems, and responsible digital participation.',
        progress: 100,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the meaning, importance, and scope of Media and Information Literacy (MIL) and recognize its role in navigating today\'s digital world.',
            },
            {
                title: 'Practice',
                description:
                    'Apply the core competencies of MIL by identifying reliable information sources and distinguishing trustworthy content from misleading information.',
            },
            {
                title: 'Evaluate',
                description:
                    'Assess how Media and Information Literacy helps individuals make informed decisions, avoid misinformation, and use media responsibly.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your own media consumption habits and identify ways to become a more critical, ethical, and responsible consumer and creator of information.',
            },
        ],
        practicalActivity:
            'Analyze the real-life scenario about Maria and answer the question: What did Maria do that demonstrates Media and Information Literacy? Then, describe a similar situation in which you verified information before believing or sharing it, explaining which MIL competencies you used.',
    },
    {
        title: 'Introduction to Media and Information Literacy',
        description:
            'Core MIL concepts, information ecosystems, and responsible digital participation.',
        progress: 100,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the meaning, importance, and scope of Media and Information Literacy (MIL) and recognize its role in navigating today\'s digital world.',
            },
            {
                title: 'Practice',
                description:
                    'Apply the core competencies of MIL by identifying reliable information sources and distinguishing trustworthy content from misleading information.',
            },
            {
                title: 'Evaluate',
                description:
                    'Assess how Media and Information Literacy helps individuals make informed decisions, avoid misinformation, and use media responsibly.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your own media consumption habits and identify ways to become a more critical, ethical, and responsible consumer and creator of information.',
            },
        ],
        practicalActivity:
            'Analyze the real-life scenario about Maria and answer the question: What did Maria do that demonstrates Media and Information Literacy? Then, describe a similar situation in which you verified information before believing or sharing it, explaining which MIL competencies you used.',
    },
    {
        title: 'Introduction to Media and Information Literacy',
        description:
            'Core MIL concepts, information ecosystems, and responsible digital participation.',
        progress: 100,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the meaning, importance, and scope of Media and Information Literacy (MIL) and recognize its role in navigating today\'s digital world.',
            },
            {
                title: 'Practice',
                description:
                    'Apply the core competencies of MIL by identifying reliable information sources and distinguishing trustworthy content from misleading information.',
            },
            {
                title: 'Evaluate',
                description:
                    'Assess how Media and Information Literacy helps individuals make informed decisions, avoid misinformation, and use media responsibly.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your own media consumption habits and identify ways to become a more critical, ethical, and responsible consumer and creator of information.',
            },
        ],
        practicalActivity:
            'Analyze the real-life scenario about Maria and answer the question: What did Maria do that demonstrates Media and Information Literacy? Then, describe a similar situation in which you verified information before believing or sharing it, explaining which MIL competencies you used.',
    },
    {
        title: 'Introduction to Media and Information Literacy',
        description:
            'Core MIL concepts, information ecosystems, and responsible digital participation.',
        progress: 100,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the meaning, importance, and scope of Media and Information Literacy (MIL) and recognize its role in navigating today\'s digital world.',
            },
            {
                title: 'Practice',
                description:
                    'Apply the core competencies of MIL by identifying reliable information sources and distinguishing trustworthy content from misleading information.',
            },
            {
                title: 'Evaluate',
                description:
                    'Assess how Media and Information Literacy helps individuals make informed decisions, avoid misinformation, and use media responsibly.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your own media consumption habits and identify ways to become a more critical, ethical, and responsible consumer and creator of information.',
            },
        ],
        practicalActivity:
            'Analyze the real-life scenario about Maria and answer the question: What did Maria do that demonstrates Media and Information Literacy? Then, describe a similar situation in which you verified information before believing or sharing it, explaining which MIL competencies you used.',
    },
    {
        title: 'Introduction to Media and Information Literacy',
        description:
            'Core MIL concepts, information ecosystems, and responsible digital participation.',
        progress: 100,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the meaning, importance, and scope of Media and Information Literacy (MIL) and recognize its role in navigating today\'s digital world.',
            },
            {
                title: 'Practice',
                description:
                    'Apply the core competencies of MIL by identifying reliable information sources and distinguishing trustworthy content from misleading information.',
            },
            {
                title: 'Evaluate',
                description:
                    'Assess how Media and Information Literacy helps individuals make informed decisions, avoid misinformation, and use media responsibly.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your own media consumption habits and identify ways to become a more critical, ethical, and responsible consumer and creator of information.',
            },
        ],
        practicalActivity:
            'Analyze the real-life scenario about Maria and answer the question: What did Maria do that demonstrates Media and Information Literacy? Then, describe a similar situation in which you verified information before believing or sharing it, explaining which MIL competencies you used.',
    },
    {
        title: 'Introduction to Media and Information Literacy',
        description:
            'Core MIL concepts, information ecosystems, and responsible digital participation.',
        progress: 100,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the meaning, importance, and scope of Media and Information Literacy (MIL) and recognize its role in navigating today\'s digital world.',
            },
            {
                title: 'Practice',
                description:
                    'Apply the core competencies of MIL by identifying reliable information sources and distinguishing trustworthy content from misleading information.',
            },
            {
                title: 'Evaluate',
                description:
                    'Assess how Media and Information Literacy helps individuals make informed decisions, avoid misinformation, and use media responsibly.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your own media consumption habits and identify ways to become a more critical, ethical, and responsible consumer and creator of information.',
            },
        ],
        practicalActivity:
            'Analyze the real-life scenario about Maria and answer the question: What did Maria do that demonstrates Media and Information Literacy? Then, describe a similar situation in which you verified information before believing or sharing it, explaining which MIL competencies you used.',
    },
    {
        title: 'Introduction to Media and Information Literacy',
        description:
            'Core MIL concepts, information ecosystems, and responsible digital participation.',
        progress: 100,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the meaning, importance, and scope of Media and Information Literacy (MIL) and recognize its role in navigating today\'s digital world.',
            },
            {
                title: 'Practice',
                description:
                    'Apply the core competencies of MIL by identifying reliable information sources and distinguishing trustworthy content from misleading information.',
            },
            {
                title: 'Evaluate',
                description:
                    'Assess how Media and Information Literacy helps individuals make informed decisions, avoid misinformation, and use media responsibly.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your own media consumption habits and identify ways to become a more critical, ethical, and responsible consumer and creator of information.',
            },
        ],
        practicalActivity:
            'Analyze the real-life scenario about Maria and answer the question: What did Maria do that demonstrates Media and Information Literacy? Then, describe a similar situation in which you verified information before believing or sharing it, explaining which MIL competencies you used.',
    },
    {
        title: 'Introduction to Media and Information Literacy',
        description:
            'Core MIL concepts, information ecosystems, and responsible digital participation.',
        progress: 100,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the meaning, importance, and scope of Media and Information Literacy (MIL) and recognize its role in navigating today\'s digital world.',
            },
            {
                title: 'Practice',
                description:
                    'Apply the core competencies of MIL by identifying reliable information sources and distinguishing trustworthy content from misleading information.',
            },
            {
                title: 'Evaluate',
                description:
                    'Assess how Media and Information Literacy helps individuals make informed decisions, avoid misinformation, and use media responsibly.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your own media consumption habits and identify ways to become a more critical, ethical, and responsible consumer and creator of information.',
            },
        ],
        practicalActivity:
            'Analyze the real-life scenario about Maria and answer the question: What did Maria do that demonstrates Media and Information Literacy? Then, describe a similar situation in which you verified information before believing or sharing it, explaining which MIL competencies you used.',
    },
    {
        title: 'Introduction to Media and Information Literacy',
        description:
            'Core MIL concepts, information ecosystems, and responsible digital participation.',
        progress: 100,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the meaning, importance, and scope of Media and Information Literacy (MIL) and recognize its role in navigating today\'s digital world.',
            },
            {
                title: 'Practice',
                description:
                    'Apply the core competencies of MIL by identifying reliable information sources and distinguishing trustworthy content from misleading information.',
            },
            {
                title: 'Evaluate',
                description:
                    'Assess how Media and Information Literacy helps individuals make informed decisions, avoid misinformation, and use media responsibly.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your own media consumption habits and identify ways to become a more critical, ethical, and responsible consumer and creator of information.',
            },
        ],
        practicalActivity:
            'Analyze the real-life scenario about Maria and answer the question: What did Maria do that demonstrates Media and Information Literacy? Then, describe a similar situation in which you verified information before believing or sharing it, explaining which MIL competencies you used.',
    },
    {
        title: 'Introduction to Media and Information Literacy',
        description:
            'Core MIL concepts, information ecosystems, and responsible digital participation.',
        progress: 100,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the meaning, importance, and scope of Media and Information Literacy (MIL) and recognize its role in navigating today\'s digital world.',
            },
            {
                title: 'Practice',
                description:
                    'Apply the core competencies of MIL by identifying reliable information sources and distinguishing trustworthy content from misleading information.',
            },
            {
                title: 'Evaluate',
                description:
                    'Assess how Media and Information Literacy helps individuals make informed decisions, avoid misinformation, and use media responsibly.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your own media consumption habits and identify ways to become a more critical, ethical, and responsible consumer and creator of information.',
            },
        ],
        practicalActivity:
            'Analyze the real-life scenario about Maria and answer the question: What did Maria do that demonstrates Media and Information Literacy? Then, describe a similar situation in which you verified information before believing or sharing it, explaining which MIL competencies you used.',
    },
];

export const communityItems: CommunityItem[] = [
    {
        status: 'review',
        tag: 'Needs Verification',
        tagClass: 'tag-amber',
        reports: '4 reports',
        title: '“Classes are suspended tomorrow in all schools.”',
        text: 'No city or school authority is cited in the original post.',
        note: 'Evidence needed: official advisory from the school, city government, or disaster office.',
        votes: [12, 48, 17],
    },
    {
        status: 'verified',
        tag: 'Community Verified',
        tagClass: 'tag-green',
        reports: '3 trusted sources',
        title: 'Updated scholarship application deadline',
        text: 'The date matches the official university announcement and registrar notice.',
        note: 'Moderation note: supported by two independent official records.',
        votes: [86, 4, 1],
    },
    {
        status: 'media',
        tag: 'Possible Edited Media',
        tagClass: 'tag-purple',
        reports: 'Under review',
        title: 'Viral image of a public announcement',
        text: 'Font alignment and image artifacts require closer examination.',
        note: 'AI advisory: possible edits detected. This is not a final determination.',
        votes: [8, 39, 23],
    },
    {
        status: 'review',
        tag: 'Frequently Reported',
        tagClass: 'tag-red',
        reports: '11 reports',
        title: 'Unverified medical cure shared in a group chat',
        text: 'The claim provides no clinical source or health-agency guidance.',
        note: 'High-impact claims require qualified, authoritative evidence.',
        votes: [3, 31, 54],
    },
    {
        status: 'verified',
        tag: 'Community Verified',
        tagClass: 'tag-green',
        reports: '2 official sources',
        title: 'Campus registration schedule',
        text: 'The dates match the registrar and official university channels.',
        note: 'Verified through original institutional announcements.',
        votes: [64, 2, 0],
    },
    {
        status: 'media',
        tag: 'Possible AI-Generated',
        tagClass: 'tag-purple',
        reports: 'AI analysis available',
        title: 'Synthetic-looking portrait used in a fake endorsement',
        text: 'The source account and original image cannot yet be confirmed.',
        note: 'Manual source tracing is required before any final status.',
        votes: [6, 44, 21],
    },
];

export const analysisScenarios: Record<
    'review' | 'verified' | 'media',
    AnalysisScenario
> = {
    review: {
        tag: 'Needs Verification',
        tagClass: 'tag-amber',
        title: 'Additional evidence is required',
        summary: 'The claim does not clearly identify an authoritative source.',
        aiScore: '72%',
        recordCount: '2',
        sourceCount: '1',
        guidance:
            'Search for the original announcement, confirm the date, location, and context, and compare at least two credible references.',
    },
    verified: {
        tag: 'Community Verified',
        tagClass: 'tag-green',
        title: 'Evidence supports the submitted claim',
        summary:
            'Matching official records were found in this prototype scenario.',
        aiScore: '88%',
        recordCount: '4',
        sourceCount: '3',
        guidance:
            'The claim matches multiple official records. A moderator should still confirm source authenticity and context before final publication.',
    },
    media: {
        tag: 'Possible Manipulated Media',
        tagClass: 'tag-purple',
        title: 'Manual media review is recommended',
        summary: 'Possible synthetic or edited-media indicators were detected.',
        aiScore: '79%',
        recordCount: '1',
        sourceCount: '0',
        guidance:
            'Trace the original media, inspect metadata when available, and compare the visual with authoritative or earlier versions.',
    },
};

export const demoClaim =
    'Classes are suspended tomorrow in all schools, according to a viral social media post.';

export const lessonObjectives = [
    {
        title: 'Understand',
        description: 'Explain the key concepts and their importance.',
    },
    {
        title: 'Evaluate',
        description: 'Apply evidence-based criteria to digital content.',
    },
    {
        title: 'Practice',
        description: 'Complete a guided real-world verification activity.',
    },
    {
        title: 'Reflect',
        description: 'Document responsible sharing decisions.',
    },
];
