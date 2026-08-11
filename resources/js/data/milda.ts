export type CourseModule = {
    title: string;
    description: string;
    progress: number;
    duration: string;
    period: 'Prelim' | 'Midterm' | 'Semi-Final' | 'Final';
    topics: [string, string, string];
    objectives: LearningObjective[];
    activity: string;
    quiz: KnowledgeCheck;
};

export type LearningObjective = {
    title: string;
    description: string;
};

export type KnowledgeCheck = {
    title: string;
    directions: string;
    question: string;
    answers: string[];
    correctAnswer: number;
    correctFeedback: string;
    incorrectFeedback: string;
};

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

export const courseModules: CourseModule[] = [
    {
        title: 'Introduction to Media and Information Literacy',
        description:
            'Explain the meaning, importance, and scope of Media and Information Literacy in the digital age.',
        progress: 100,
        duration: '5 hrs',
        period: 'Prelim',
        topics: [
            'Media, information, and literacy',
            'Access, analyze, create, reflect, and act',
            'Responsible media habits',
        ],
        objectives: [
            {
                title: 'Define',
                description: 'Media and Information Literacy (MIL).',
            },
            {
                title: 'Explain',
                description: 'Why MIL is important.',
            },
            {
                title: 'Describe',
                description: 'The scope of MIL in the digital age.',
            },
        ],
        activity:
            'Analyze sample media and information, share your online information habits, and reflect on how you decide what is trustworthy.',
        quiz: {
            title: 'Fact or Fake?',
            directions: 'Identify whether the statement is a fact or fake.',
            question:
                'Media and Information Literacy helps people identify trustworthy information.',
            answers: ['Fact', 'Fake'],
            correctAnswer: 0,
            correctFeedback:
                'Correct. MIL develops the skills needed to evaluate whether information is accurate and trustworthy.',
            incorrectFeedback:
                'Try again. Identifying trustworthy information is one of the central purposes of MIL.',
        },
    },
    {
        title: 'Misinformation, Disinformation, and Malinformation',
        description:
            'Identify and differentiate misinformation, disinformation, and malinformation in digital contexts.',
        progress: 100,
        duration: '7 hrs',
        period: 'Prelim',
        topics: ['Misinformation', 'Disinformation', 'Malinformation'],
        objectives: [
            {
                title: 'Define',
                description:
                    'Misinformation, disinformation, and malinformation.',
            },
            {
                title: 'Differentiate',
                description:
                    'The three types of false or misleading information.',
            },
            {
                title: 'Identify',
                description: 'Examples of each type of information disorder.',
            },
            {
                title: 'Apply',
                description:
                    'Critical thinking before believing or sharing information online.',
            },
        ],
        activity:
            'Classify local and global online examples by truthfulness, intent, and potential harm, then explain your decisions.',
        quiz: {
            title: 'Name That Type!',
            directions:
                'Choose misinformation, disinformation, or malinformation.',
            question:
                'A student accidentally shares the wrong date for the school intramurals.',
            answers: ['Misinformation', 'Disinformation', 'Malinformation'],
            correctAnswer: 0,
            correctFeedback:
                'Correct. The information is false, but it was shared accidentally and without intent to harm.',
            incorrectFeedback:
                'Not quite. Focus on the word “accidentally”: there is no intent to deceive or harm.',
        },
    },
    {
        title: 'Information Disorder and Online Sharing Behavior',
        description:
            'Explain how misleading content spreads through social media and digital platforms.',
        progress: 100,
        duration: '7 hrs',
        period: 'Prelim',
        topics: [
            'The information environment',
            'Emotion, identity, and social sharing',
            'Responsible sharing practices',
        ],
        objectives: [
            {
                title: 'Explain',
                description: 'What information disorder is.',
            },
            {
                title: 'Describe',
                description:
                    'How misleading content spreads through social media and digital platforms.',
            },
            {
                title: 'Identify',
                description:
                    'Online sharing behaviors that contribute to the spread of misleading information.',
            },
            {
                title: 'Demonstrate',
                description: 'Responsible online sharing practices.',
            },
        ],
        activity:
            'Create a group map showing how misinformation spreads, then reflect on the sharing behaviors that amplify it.',
        quiz: {
            title: 'Share or Stop?',
            directions:
                'Choose Share if it is safe to share right away, or Stop if it should be verified first.',
            question:
                'Your school posts an announcement on its official Facebook page.',
            answers: ['Share', 'Stop'],
            correctAnswer: 0,
            correctFeedback:
                'Correct. An announcement on the school’s official channel is an appropriate source to share.',
            incorrectFeedback:
                'Review the source. The announcement comes directly from the school’s official page.',
        },
    },
    {
        title: 'Evaluating Online Sources and Claims',
        description:
            'Evaluate the credibility of online sources and claims using source-evaluation criteria.',
        progress: 100,
        duration: '9 hrs',
        period: 'Midterm',
        topics: [
            'Accuracy and authority',
            'Objectivity and currency',
            'Documentation and coverage',
        ],
        objectives: [
            {
                title: 'Explain',
                description: 'Why evaluating online sources is important.',
            },
            {
                title: 'Identify',
                description:
                    'Characteristics of credible and unreliable online sources.',
            },
            {
                title: 'Apply',
                description: 'Source-evaluation criteria to online claims.',
            },
            {
                title: 'Decide',
                description: 'Whether information can be trusted.',
            },
        ],
        activity:
            'Evaluate three online sources with the course credibility checklist and compare reliable and unreliable websites.',
        quiz: {
            title: 'Which Source Wins?',
            directions: 'Choose the source you would trust more.',
            question: 'Which source would you trust for health information?',
            answers: ['A government health website', 'A random Facebook post'],
            correctAnswer: 0,
            correctFeedback:
                'Correct. A government health website has identifiable authority and institutional accountability.',
            incorrectFeedback:
                'Try again. Prefer the source with clear authority, expertise, and accountability.',
        },
    },
    {
        title: 'Fact-Checking and Verification Techniques',
        description:
            'Apply fact-checking and verification techniques to online posts, articles, and claims.',
        progress: 100,
        duration: '9 hrs',
        period: 'Midterm',
        topics: [
            'Source triangulation',
            'Reverse image search',
            'Dates, authors, ownership, and URLs',
        ],
        objectives: [
            {
                title: 'Explain',
                description:
                    'The importance of fact-checking in the digital age.',
            },
            {
                title: 'Apply',
                description:
                    'Fact-checking techniques to online posts, articles, and claims.',
            },
            {
                title: 'Use',
                description: 'Reliable verification tools and trusted sources.',
            },
            {
                title: 'Practice',
                description:
                    'Responsible sharing by verifying information before posting or forwarding it.',
            },
        ],
        activity:
            'Fact-check a claim using search, source triangulation, and reverse image search, then complete a verification worksheet.',
        quiz: {
            title: 'Pick the Right Tool',
            directions:
                'Choose the best fact-checking technique for the situation.',
            question:
                'A photo claims it was taken during yesterday’s typhoon, but you want to know where it first appeared.',
            answers: [
                'Reverse image search',
                'Check the date',
                'Read the “About Us” page',
                'Examine the URL',
                'Check the author’s credentials',
            ],
            correctAnswer: 0,
            correctFeedback:
                'Correct. Reverse image search can trace earlier copies and reveal the image’s original context.',
            incorrectFeedback:
                'Try again. Use the technique designed to locate earlier appearances of an image.',
        },
    },
    {
        title: 'Community Verification and Reporting',
        description:
            'Use community-based verification to report suspicious content and contribute trusted references.',
        progress: 100,
        duration: '7 hrs',
        period: 'Midterm',
        topics: [
            'Crowdsourced fact-checking',
            'Responsible reporting',
            'Trusted sources and peer review',
        ],
        objectives: [
            {
                title: 'Explain',
                description:
                    'The importance of community verification in combating misinformation.',
            },
            {
                title: 'Identify',
                description: 'When suspicious content should be reported.',
            },
            {
                title: 'Demonstrate',
                description:
                    'Appropriate ways to report misleading or harmful online content.',
            },
            {
                title: 'Contribute',
                description:
                    'Trusted references that help others verify information.',
            },
        ],
        activity:
            'Submit a report and trusted source through MILDA, then peer-review a classmate’s submitted source.',
        quiz: {
            title: 'What’s Your Move?',
            directions: 'Choose the best action for the situation.',
            question:
                'A post claims there is a disease outbreak in your city, but official health agencies say it is false.',
            answers: [
                'Share it anyway to warn others',
                'Ignore it and keep scrolling',
                'Report the post and share the official information',
            ],
            correctAnswer: 2,
            correctFeedback:
                'Correct. Reporting the false post and supplying official information helps protect the community.',
            incorrectFeedback:
                'Not quite. Responsible community verification includes reporting false content and adding credible context.',
        },
    },
    {
        title: 'AI-Generated Content and AI Hallucinations',
        description:
            'Recognize possible AI-generated text, AI hallucinations, and unreliable AI outputs.',
        progress: 60,
        duration: '8 hrs',
        period: 'Semi-Final',
        topics: [
            'AI-generated text, images, video, and audio',
            'AI hallucinations',
            'Checking sources and comparing outputs',
        ],
        objectives: [
            {
                title: 'Explain',
                description: 'What AI-generated content is.',
            },
            {
                title: 'Define',
                description: 'AI hallucinations and why they occur.',
            },
            {
                title: 'Recognize',
                description: 'Signs of unreliable or AI-generated outputs.',
            },
            {
                title: 'Evaluate',
                description:
                    'AI-generated information before using or sharing it.',
            },
        ],
        activity:
            'Compare human-written and AI-generated content, then identify outputs that may be fabricated, inconsistent, or unsupported.',
        quiz: {
            title: 'AI or Human?',
            directions: 'Choose AI, Human, or Both for the statement.',
            question:
                'Can generate text, images, videos, and audio in seconds.',
            answers: ['AI', 'Human', 'Both'],
            correctAnswer: 0,
            correctFeedback:
                'Correct. Generative AI tools can produce several forms of content rapidly.',
            incorrectFeedback:
                'Try again. The statement describes a defining capability of generative AI tools.',
        },
    },
    {
        title: 'Deepfakes and Manipulated Media',
        description:
            'Explain deepfakes, manipulated images, edited videos, and synthetic media.',
        progress: 25,
        duration: '8 hrs',
        period: 'Semi-Final',
        topics: [
            'Deepfakes and synthetic media',
            'Visual and contextual red flags',
            'Reverse image search and fact-checking',
        ],
        objectives: [
            {
                title: 'Explain',
                description:
                    'Deepfakes, manipulated images, edited videos, and synthetic media.',
            },
            {
                title: 'Differentiate',
                description: 'Authentic and manipulated digital media.',
            },
            {
                title: 'Identify',
                description: 'Common signs of manipulated media.',
            },
            {
                title: 'Practice',
                description: 'Verifying media before believing or sharing it.',
            },
        ],
        activity:
            'Analyze an image or video for manipulation indicators and use reverse image search to trace its original context.',
        quiz: {
            title: 'Spot the Red Flag',
            directions:
                'Choose the red flag that suggests the media may have been manipulated.',
            question:
                'A viral photo has blurry edges around a person’s face. What is the red flag?',
            answers: ['Clear lighting', 'Blurry edges', 'High resolution'],
            correctAnswer: 1,
            correctFeedback:
                'Correct. Blurry or unnatural edges can indicate that part of an image was altered or inserted.',
            incorrectFeedback:
                'Look again for an editing artifact around the subject’s face.',
        },
    },
    {
        title: 'Responsible Sharing and Digital Citizenship',
        description:
            'Demonstrate responsible digital citizenship and ethical information sharing.',
        progress: 0,
        duration: '7 hrs',
        period: 'Semi-Final',
        topics: [
            'Digital citizenship',
            'Digital etiquette and respectful participation',
            'Ethical sharing and digital well-being',
        ],
        objectives: [
            {
                title: 'Explain',
                description: 'The meaning of digital citizenship.',
            },
            {
                title: 'Identify',
                description: 'The responsibilities of a digital citizen.',
            },
            {
                title: 'Demonstrate',
                description: 'Ethical information-sharing practices.',
            },
            {
                title: 'Apply',
                description:
                    'Responsible online behavior in different digital situations.',
            },
        ],
        activity:
            'Complete the ShareSmart activity, discuss an ethical sharing dilemma, and write a reflection on responsible online behavior.',
        quiz: {
            title: 'Good or Bad?',
            directions:
                'Identify whether the action shows good digital citizenship.',
            question: 'Fact-checking a post before sharing it.',
            answers: ['Good digital citizenship', 'Bad digital citizenship'],
            correctAnswer: 0,
            correctFeedback:
                'Correct. Fact-checking before sharing is a responsible digital habit.',
            incorrectFeedback:
                'Try again. Responsible digital citizens verify information before amplifying it.',
        },
    },
    {
        title: 'Ethics of AI and Online Information',
        description:
            'Apply ethical judgment in digital spaces and use AI and online information responsibly.',
        progress: 0,
        duration: '7 hrs',
        period: 'Final',
        topics: [
            'Fairness and transparency',
            'Privacy and accountability',
            'Intellectual honesty and responsible AI use',
        ],
        objectives: [
            {
                title: 'Explain',
                description:
                    'The importance of ethics in the use of AI and online information.',
            },
            {
                title: 'Identify',
                description:
                    'Ethical issues related to AI-generated content and digital information.',
            },
            {
                title: 'Apply',
                description:
                    'Ethical judgment when using AI tools and sharing information online.',
            },
            {
                title: 'Demonstrate',
                description:
                    'Responsible and honest use of AI in academic, personal, and professional contexts.',
            },
        ],
        activity:
            'Debate an AI ethics case involving privacy, bias, intellectual honesty, and responsible information use.',
        quiz: {
            title: 'Ethical or Unethical',
            directions: 'Identify whether the action is ethical or unethical.',
            question:
                'Using AI to brainstorm ideas, then checking the facts and writing the final work yourself.',
            answers: ['Ethical', 'Unethical'],
            correctAnswer: 0,
            correctFeedback:
                'Correct. AI is being used as support while the student verifies facts and produces their own work.',
            incorrectFeedback:
                'Try again. Ethical AI use can include brainstorming when the final work is verified and honestly produced.',
        },
    },
    {
        title: 'MILDA Practical Verification Activities',
        description:
            'Use MILDA platforms to complete verification missions and community-based verification tasks.',
        progress: 0,
        duration: '8 hrs',
        period: 'Final',
        topics: [
            'MILDA browser extension, web app, and mobile app',
            'Analyze, source, vote, and report',
            'Contribution reports and reflection',
        ],
        objectives: [
            {
                title: 'Use',
                description:
                    'MILDA tools to complete practical verification missions.',
            },
            {
                title: 'Analyze',
                description:
                    'Digital content with evidence-based verification steps.',
            },
            {
                title: 'Contribute',
                description: 'Trusted sources, votes, and responsible reports.',
            },
            {
                title: 'Reflect',
                description:
                    'On the evidence and ethical impact of each decision.',
            },
        ],
        activity:
            'Use the MILDA browser extension, web app, and mobile app to analyze content, add sources, vote, report, and reflect.',
        quiz: {
            title: 'Verification Mission Check',
            directions:
                'Choose the workflow that matches the syllabus activity.',
            question:
                'Which set of actions completes a MILDA practical verification mission?',
            answers: [
                'Analyze content, add sources, vote, report, and reflect',
                'Count likes, repost the claim, and wait for comments',
                'Accept the first result without documenting evidence',
            ],
            correctAnswer: 0,
            correctFeedback:
                'Correct. The syllabus requires evidence-based analysis and active, reflective community participation.',
            incorrectFeedback:
                'Review the practical workflow: verification requires evidence, responsible contribution, and reflection.',
        },
    },
    {
        title: 'Final Project: Digital Verification Portfolio',
        description:
            'Design, document, and present a final Media and Information Literacy verification project.',
        progress: 0,
        duration: '7 hrs',
        period: 'Final',
        topics: [
            'Five analyzed digital items',
            'Credibility and verification evidence',
            'Community contribution, reflection, and recommendations',
        ],
        objectives: [
            {
                title: 'Design',
                description: 'A complete Digital Verification Portfolio.',
            },
            {
                title: 'Document',
                description:
                    'Source credibility and the verification process for each item.',
            },
            {
                title: 'Reflect',
                description:
                    'On responsible sharing and improved online information behavior.',
            },
            {
                title: 'Present',
                description:
                    'Findings, trusted references, and community contributions clearly.',
            },
        ],
        activity:
            'Compile and present five analyzed posts, articles, images, or claims with credibility evaluations, verification evidence, trusted references, community contributions, reflection, and recommendations.',
        quiz: {
            title: 'Portfolio Requirement Check',
            directions: 'Choose the requirement stated in the course syllabus.',
            question:
                'What is the minimum number of online posts, articles, images, or claims that the final portfolio must analyze?',
            answers: ['Three', 'Five', 'Ten'],
            correctAnswer: 1,
            correctFeedback:
                'Correct. The syllabus requires a minimum of five analyzed items.',
            incorrectFeedback:
                'Check the final-project requirements: the minimum is five analyzed items.',
        },
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
