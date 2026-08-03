export type CommunityLink = {
    platform: 'facebook' | 'instagram' | 'twitter' | 'tiktok' | 'youtube' | 'web'; // add youtube
    label: string;
    url: string;
};

export type CommunityItem = {
    status: 'verified' | 'review' | 'media' | 'reported'; // add 'reported'
    tag: string;
    tagClass: string;
    reports: string;
    title: string;
    text: string;
    note: string;
    votes: [number, number, number];
    links: CommunityLink[];
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
    content?: LessonContent;
    quiz?: LessonQuiz;
};

export type LessonBlock =
    | { type: 'heading'; text: string }
    | { type: 'paragraph'; text: string; indent?: boolean }
    | { type: 'list'; items: string[] }
    | { type: 'terms'; items: { term: string; definition: string }[] }
    | { type: 'table'; headers: string[]; rows: string[][] }
    | {
          type: 'section';
          title: string;
          text: { text: string; italic?: boolean; bold?: boolean }[];
      };

export type LessonContent = {
    objectivesLabel: string;
    objectives: string[];
    intro: string;
    introQuestion?: string;
    blocks: LessonBlock[];
};

export type QuizStatement = {
    text: string;
    answer: 'fact' | 'fake';
};

export type LessonQuiz = {
    title: string;
    directions: string;
    statements: QuizStatement[];
};

export const courseModules: CourseModule[] = [
    {
        title: 'Introduction to Media and Information Literacy',
        description:
            'Core MIL concepts, information ecosystems, and responsible digital participation.',
        progress: 90,
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
        content: {
            objectivesLabel: 'By the end of this lesson, learners should be able to:',
            objectives: [
                'Define Media and Information Literacy (MIL).',
                'Explain why MIL is important.',
                'Describe its scope in the digital age.',
            ],
            intro: 'You wake up in the morning. It\'s the weekend and you have nothing to do. So, you immediately grab your phone without even getting out of bed. You check for new messages and notifications on Facebook, then scroll through TikTok. You regularly visit these applications, all flooded with information.',
            introQuestion: 'Question: But how do you know what\'s accurate and trustworthy?',
            blocks: [
                {
                    type: 'heading',
                    text: 'What is Media and Information Literacy?',
                },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'Media and Information Literacy (MIL) is a basis for enhancing access to information and knowledge, freedom of expression and quality education. It describes skills and attitudes that are needed to value the functions of media and other information providers (UNESCO, 2024).',
                },
                {
                    type: 'heading',
                    text: 'Key Terms',
                },
                {
                    type: 'terms',
                    items: [
                        {
                            term: 'Media',
                            definition: 'the plural of medium, or ways to communicate information',
                        },
                        {
                            term: 'Information',
                            definition: 'consists of facts, figures, details or particulars transmitted or learned about someone or something',
                        },
                        {
                            term: 'Literacy',
                            definition: 'the essential set of competencies that empowers individuals to access, analyze, evaluate, create, and share information and media content ethically and effectively',
                        },
                    ],
                },
                {
                    type: 'heading',
                    text: 'Why is MIL Important?',
                },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'In order for the audience to recognize quality information and to identify disinformation, they need to develop the five core MIL competencies (Access, Analyze, Create, Reflect, Act) (Reineck, 2025).',
                },
                {
                    type: 'terms',
                    items: [
                        {
                            term: 'Access',
                            definition: 'The ability to find and access relevant media and information sources.',
                        },
                        {
                            term: 'Analyze',
                            definition: 'The ability to evaluate the credibility, accuracy and objectivity of media content, for example a news story.',
                        },
                        {
                            term: 'Create',
                            definition: 'The ability to create and produce media and information content, such as photos, texts, or videos.',
                        },
                        {
                            term: 'Reflect',
                            definition: 'The ability to think critically about media habits, experiences, trends, and technologies, and how they impact individuals and society.',
                        },
                        {
                            term: 'Act',
                            definition: 'The ability to use media to achieve specific goals, for example launching a social media campaign about health.',
                        },
                    ],
                },
                {
                    type: 'section',
                    title: 'Real-Life Application',
                    text: [
                        {
                            text: 'It\'s July in the Philippines – typhoon season. Maria sees a viral Facebook post claiming schools in her town are closed due to a strong typhoon. Before sharing it though, she checks the official announcements from the local government and news agencies. She discovers the post is false and decides not to share it.',
                        },
                        {
                            text: 'Question: What did Maria do that shows Media and Information Literacy?',
                            italic: true,
                        },
                    ],
                },
            ],
        },
        practicalActivity: 'Analyze the real-life scenario about Maria and answer the question: What did Maria do that demonstrates Media and Information Literacy? Then, describe a similar situation in which you verified information before believing or sharing it, explaining which MIL competencies you used.',
        quiz: {
            title: 'Quiz: Fact or Fake?',
            directions: 'Identify if the statement is a FACT or FAKE.',
            statements: [
                { text: 'Media are ways of communicating information.', answer: 'fact' },
                { text: 'Media and Information Literacy helps people identify trustworthy information.', answer: 'fact' },
                { text: 'The best way to verify news is by checking official sources.', answer: 'fact' },
                { text: 'Literacy only means knowing how to read and write.', answer: 'fake' },
                { text: 'Before sharing information online, you should check if it is accurate.', answer: 'fact' },
            ],
        }
    },
    {
        title: 'Misinformation, Disinformation, and Malinformation',
        description:
            'Identify different forms of information disorder in digital contexts.',
        progress: 90,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the differences between misinformation, disinformation, and malinformation, including their characteristics, intent, and impact.',
            },
            {
                title: 'Practice',
                description:
                    'Classify real-life examples as misinformation, disinformation, or malinformation, and apply critical thinking before accepting or sharing online information.',
            },
            {
                title: 'Evaluate',
                description:
                    'Evaluate the credibility of online content by identifying signs of false or misleading information and considering the intent behind its creation or distribution.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on how false or misleading information can affect individuals and communities, and identify responsible actions to help prevent its spread.',
            },
        ],
        content: {
            objectivesLabel: 'By the end of this lesson, learners should be able to:',
            objectives: [
                'Define misinformation, disinformation, and malinformation.',
                'Differentiate the three types of false or misleading information.',
                'Identify examples of each.',
                'Apply critical thinking before believing or sharing information online.',
            ],
            intro:
                'A screenshot of a class group chat goes viral, showing a teacher supposedly insulting students. Later, it is revealed that someone edited the messages before posting them online.',
            introQuestion:
                'Question: Was this simply a mistake, or was someone intentionally trying to mislead others?',
            blocks: [
                { type: 'heading', text: 'Understanding the Three Types' },

                { type: 'heading', text: 'What is Misinformation?' },
                {
                    type: 'list',
                    items: [
                        'Unintentionally published inaccurate or misleading information',
                        'Accidental and is not intended to harm.',
                    ],
                },
                {
                    type: 'paragraph',
                    text: 'Example: Unintentional mistakes such as inaccurate photo captions, dates, statistics, translations',
                },

                { type: 'heading', text: 'What is Disinformation?' },
                {
                    type: 'list',
                    items: [
                        'Deliberately fabricated or manipulated information',
                        'Deliberately shared to harm or deceive a person',
                    ],
                },
                {
                    type: 'paragraph',
                    text: 'Example: Fabricated or deliberately manipulated audio/visual content. Intentionally created conspiracy theories or rumors.',
                },

                { type: 'heading', text: 'What is Malinformation?' },
                {
                    type: 'list',
                    items: [
                        'Deliberately published sensitive/private information with altered context',
                        'Deliberate publication of private information for personal or corporate rather than public interest',
                    ],
                },
                {
                    type: 'paragraph',
                    text: 'Example: Doxxing (publishing a private individual\'s home address), leaking unauthorized private emails to ruin a reputation, or selectively editing a video clip to strip away critical context and make someone look bad (CSI Library, 2026).',
                },

                { type: 'heading', text: 'Compare the Three' },
                {
                    type: 'table',
                    headers: ['Type', 'Is the Information True?', 'Intent to Harm?'],
                    rows: [
                        ['Misinformation', 'No', 'No'],
                        ['Disinformation', 'No', 'Yes'],
                        ['Malinformation', 'Yes', 'Yes'],
                    ],
                },

                { type: 'heading', text: 'Real-Life Scenarios' },
                {
                    type: 'section',
                    title: 'Scenario 1',
                    text: [
                        {
                            text: 'Someone in your class group chat says that tomorrow\'s exam has been canceled. Everyone celebrates, but when they arrive at school the next day, the exam still takes place.',
                        },
                        { text: 'Answer: Misinformation', bold: true },
                    ],
                },
                {
                    type: 'section',
                    title: 'Scenario 2',
                    text: [
                        {
                            text: 'Your friends are talking about a post claiming that a famous actor has died. The post spreads rapidly across social media, but a few hours later, the actor uploads a new video proving the news was false.',
                        },
                        { text: 'Answer: Disinformation', bold: true },
                    ],
                },
                {
                    type: 'section',
                    title: 'Scenario 3',
                    text: [
                        {
                            text: 'A student records a classmate making a mistake during a presentation. The video is real, but it is uploaded online to embarrass them, and it quickly spreads.',
                        },
                        { text: 'Answer: Malinformation', bold: true },
                    ],
                },

                { type: 'heading', text: 'How to Avoid Spreading False Information' },
                {
                    type: 'list',
                    items: [
                        'Never share a post on social media without fact checking',
                        'Look for the sources',
                        'Consider the story\'s agenda',
                        'Don\'t discount stories that play to emotions, but view them with caution',
                    ],
                },
            ],
        },
        practicalActivity:
            'Read the given scenarios and identify whether each is an example of misinformation, disinformation, or malinformation. Then, explain your answer and describe the steps you would take to verify the information before sharing it online.',
    },
    {
        title: 'Information Disorder and Online Sharing Behavior',
        description:
            'Understand how misleading content spreads and why people share it.',
        progress: 90,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the concept of information disorder, how misleading information spreads through digital platforms, and the factors that influence online sharing behavior.',
            },
            {
                title: 'Practice',
                description:
                    'Analyze online posts and identify behaviors that contribute to the spread of misleading information, then apply responsible sharing practices before reposting content.',
            },
            {
                title: 'Evaluate',
                description:
                    'Evaluate the credibility of online content by considering its source, evidence, emotional appeal, and the motivations behind why it is being shared.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your own online sharing habits and identify ways to become a more responsible digital citizen who helps prevent the spread of information disorder.',
            },
        ],
        content: {
            objectivesLabel: 'By the end of this lesson, learners should be able to:',
            objectives: [
                'Explain what information disorder is.',
                'Describe how misleading content spreads through social media and digital platforms.',
                'Identify common online sharing behaviors that contribute to the spread of misleading information.',
                'Demonstrate responsible online sharing practices.',
            ],
            intro:
                'While scrolling through TikTok, you see a video claiming that a powerful earthquake will strike your city tomorrow. The comments are filled with people saying, "Share this before it\'s deleted!" Without checking if it\'s true, thousands of users repost the video. A few hours later, authorities announce that the claim is completely false—but by then, panic has already spread online.',
            introQuestion:
                'Question: Why do you think so many people shared the video before verifying it?',
            blocks: [
                { type: 'heading', text: 'What is Information Disorder?' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'Information Disorder refers to all harmful information that disrupts the information environment. It\'s the data that pollutes the IE and causes users to have to slow down and sort through everything. Disinformation, misinformation and malinformation are the categories of harmful information that make up information disorder. These categories have similarities and differences. What all three have in common is that they cause harm (Pavilion, 2025).',
                },

                { type: 'heading', text: 'How Misleading Content Spreads' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'People are more likely to share misinformation when it aligns with personal identity or social norms, when it is novel, and when it elicits strong emotions (American Psychological Association, 2024). Misinformation spreads differently on social media than on legacy media such as television, radio, and newspapers. Rapid publication and peer-to-peer sharing allow ordinary users to distribute information quickly to large audiences. Overall, most online misinformation originates from a small minority of "superspreaders," but social media amplifies their reach and influence.',
                },

                { type: 'heading', text: 'Why Do People Share Misleading Information?' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'In online spaces, power-motivated individuals may be frequent communicators as a means to exercise influence. It is probable that power-motivated individuals could post and share disproportionately. By the law of averages, if power-motivated individuals frequently share more posts, they may share more misinformation. Enhanced spreading of misinformation is non-normative behavior and could increase the person\'s visibility, provoke others, and signal power. Indeed, individuals motivated to attain power often bend rules and can cheat for self-serving purposes (Guinote et al., 2025).',
                },

                {
                    type: 'section',
                    title: 'Real-Life Scenario',
                    text: [
                        {
                            text: 'A TikTok creator claims a dangerous challenge is "scientifically proven" to improve health. Thousands of users share and imitate it without checking medical advice.',
                        },
                        {
                            text: 'Question: Why do people trust influencers so easily?',
                            italic: true,
                        },
                    ],
                },
            ],
        },
        practicalActivity:
            'Examine the TikTok scenario and explain why the content spread so quickly. Identify the online sharing behaviors that contributed to its popularity, then create a simple checklist of steps you would follow to verify similar claims before liking, commenting on, or sharing them.',
    },
    {
        title: 'Evaluating Online Sources and Claims',
        description:
            'Apply credibility indicators and source-evaluation criteria.',
        progress: 90,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the importance of evaluating online sources and recognize the characteristics of credible and unreliable information.',
            },
            {
                title: 'Practice',
                description:
                    'Apply source evaluation criteria—such as accuracy, authority, objectivity, currency, and documentation—to assess the credibility of online sources and claims.',
            },
            {
                title: 'Evaluate',
                description:
                    'Evaluate whether online information is trustworthy by analyzing its author, evidence, purpose, and reliability before accepting or using it.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your own research and browsing habits and identify ways to become a more critical and informed consumer of online information.',
            },
        ],
        content: {
            objectivesLabel: 'By the end of this lesson, learners should be able to:',
            objectives: [
                'Explain why evaluating online sources is important.',
                'Identify characteristics of credible and unreliable online sources.',
                'Apply source evaluation criteria to assess online claims.',
                'Make informed decisions about whether information can be trusted.',
            ],
            intro:
                'You\'re researching for a school project and search, "Can energy drinks improve memory?" Google gives you thousands of results. One article says "Yes, scientists prove it!" Another says "No, there\'s no evidence." A TikTok creator also claims that drinking two cans every day improves brain power.',
            introQuestion:
                'Question: If all of these appear online, how do you know which one to trust?',
            blocks: [
                { type: 'heading', text: 'Why Should We Evaluate Online Sources?' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'According to Rasmuson (2026), evaluating online sources helps us:',
                },
                {
                    type: 'list',
                    items: [
                        'Indicate who is responsible for the intellectual content',
                        'Check if the information provided is accurate, of quality, and specific',
                        'Decide whether the information is sufficiently objective for your purpose',
                        'Judge if a study is current and essential to understanding',
                        'Consider whether the information source adequately covers the topic',
                    ],
                },

                { type: 'heading', text: 'Understanding Credible Sources' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'A credible online source is a trustworthy, unbiased digital platform or publication that provides reliable, fact-based information written by subject-matter experts and backed by verifiable evidence.',
                },
                {
                    type: 'paragraph',
                    text: 'Examples:',
                },
                {
                    type: 'list',
                    items: [
                        'Academic Databases',
                        'Government and Educational Sites',
                        'Established News Outlets',
                    ],
                },

                { type: 'heading', text: 'Source Evaluation Criteria' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'In the social media echo-chamber, people often challenge the accuracy or truth of the information they find online. Claims of "Fake News" and political bias are frequently made with the intended purpose of trying to cast doubt on the accuracy of reporting or even scientific research. For this reason it is important that we as information consumers use our critical thinking skills to make decisions about what information we rely on (Eastern Illinois University, 2026).',
                },
                {
                    type: 'list',
                    items: [
                        'Accuracy — Is the information factual and accurate?',
                        'Authority — Is it clear who the author is?',
                        'Content/Objectivity — What is the purpose of the page or site?',
                        'Currency — How recent is the information? Can you tell when the information was first created or last updated?',
                        'Documentation/Coverage — Does the page verify or document its claims?',
                    ],
                },

                { type: 'heading', text: 'Evaluating Online Claims' },
                {
                    type: 'paragraph',
                    text: 'Ask yourself these questions before using resources from the Internet:',
                },
                {
                    type: 'list',
                    items: [
                        'Is the name of the author/creator on the page?',
                        'Is the author qualified to write on the given topic? Why?',
                        'What do you think is the purpose of the site?',
                        'Is the information covered fact, opinion, or propaganda?',
                        'Are the sources for factual information clearly listed so that the information can be verified?',
                        'Does the information appear to be valid and well-researched, or is it unsupported by evidence?',
                        'Is it kept up-to-date?',
                        'Are links still current, or have they become dead ends?',
                    ],
                },
            ],
        },
        practicalActivity:
            'Select two online sources that make opposing claims about the same topic. Evaluate each source using the five source evaluation criteria (Accuracy, Authority, Objectivity, Currency, and Documentation/Coverage), then determine which source is more credible and explain your reasoning.',
    },
    {
        title: 'Fact-Checking and Verification Techniques',
        description:
            'Practice source triangulation, reverse image search, and evidence checking.',
        progress: 90,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the importance of fact-checking and verification in ensuring the accuracy and reliability of information shared online.',
            },
            {
                title: 'Practice',
                description:
                    'Apply fact-checking techniques and use reliable verification tools and trusted sources to confirm the authenticity of online posts, images, and claims.',
            },
            {
                title: 'Evaluate',
                description:
                    'Evaluate the credibility of digital content by examining its source, evidence, publication date, and supporting information before accepting or sharing it.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on the value of verifying information before posting or forwarding it and identify ways to promote responsible information sharing in everyday online activities.',
            },
        ],
        content: {
            objectivesLabel: 'By the end of this lesson, learners should be able to:',
            objectives: [
                'Explain the importance of fact-checking in the digital age.',
                'Apply fact-checking techniques to online posts, articles, and claims.',
                'Use reliable verification tools and trusted sources.',
                'Practice responsible sharing by verifying information before posting or forwarding it.',
            ],
            intro:
                'A realistic image showing snow falling in Manila goes viral online. Thousands of users are amazed, but later it is revealed that the image was created using artificial intelligence.',
            introQuestion: 'Question: How could you verify whether the image is authentic?',
            blocks: [
                { type: 'heading', text: 'What is Fact-Checking?' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'Fact-checking involves verifying content that has already been published, particularly on social media, and establishing what is known—or not—about a subject.',
                },
                {
                    type: 'paragraph',
                    text: 'Jacob (2026) explains that fact-checking helps us:',
                },
                {
                    type: 'list',
                    items: [
                        'Preserve content integrity',
                        'Help consumers make informed decisions',
                        'Promote media literacy and critical thinking',
                    ],
                },

                { type: 'heading', text: 'Why is Verification Important?' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'In a world where false information spreads rapidly, it is important to verify information before sharing it. This not only helps you avoid spreading false information that can mislead or harm others and protects your reputation and that of your network but also promotes a culture of responsible information sharing (Casimir, 2024).',
                },

                { type: 'heading', text: 'Real-Life Scenarios' },
                {
                    type: 'section',
                    title: 'Scenario',
                    text: [
                        {
                            text: 'A dramatic flood photo is shared after a typhoon. Later, you discover it was actually taken several years ago in another country.',
                        },
                        {
                            text: 'Question: How could reverse image search help verify the photo?',
                            italic: true,
                        },
                    ],
                },

                { type: 'heading', text: 'Tips for Effective Fact-Checking' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'Macdonald-Kelce Library (2026) shares a quick guide to sort out facts, evaluate resources and become more knowledgeable about the resources used to find information.',
                },
                {
                    type: 'list',
                    items: [
                        'Check credentials',
                        'Read the "About Us"',
                        'Look for Bias',
                        'Check the Dates',
                        'Check out the Source',
                        'Examine URLs',
                        'Suspect the sensational',
                        'Judge Hard',
                    ],
                },
            ],
        },
        practicalActivity:
            'Choose an online post, article, or image that makes a factual claim. Verify its authenticity by applying at least three fact-checking techniques (e.g., checking the source, examining the publication date, using reverse image search, or consulting trusted fact-checking websites). Then, summarize your findings and explain whether the claim is credible or misleading.',
    },
    {
        title: 'Community Verification and Reporting',
        description:
            'Report suspicious content and contribute trusted references responsibly.',
        progress: 90,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the role of community verification and responsible reporting in preventing the spread of misinformation and promoting trustworthy online information.',
            },
            {
                title: 'Practice',
                description:
                    'Apply community verification strategies by identifying suspicious content, consulting trusted sources, and reporting misleading or harmful online posts through appropriate channels.',
            },
            {
                title: 'Evaluate',
                description:
                    'Evaluate online content to determine when verification or reporting is necessary and assess how responsible online actions contribute to a safer digital community.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your responsibility as a member of an online community and identify ways you can help others verify information and reduce the spread of false or harmful content.',
            },
        ],
        content: {
            objectivesLabel: 'By the end of this lesson, learners should be able to:',
            objectives: [
                'Explain the importance of community verification in combating misinformation.',
                'Identify situations where suspicious content should be reported.',
                'Demonstrate appropriate ways to report misleading or harmful online content.',
                'Contribute trusted references to help others verify information.',
            ],
            intro:
                'While scrolling through Facebook, you find a post claiming that a dangerous disease has spread across your city. The post has thousands of shares, but after checking official health agencies, you discover it is false. Many people are still commenting and sharing it.',
            introQuestion:
                'Question: Should you simply ignore the post, or is there something you can do to help prevent others from being misled?',
            blocks: [
                { type: 'heading', text: 'What is Community Verification?' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'Community verification for online information is a collaborative process where internet users work together to check, fact-check, and add context to digital content. Key features include crowdsourced fact-checking, peer review, and transparent notes.',
                },
                {
                    type: 'paragraph',
                    text: 'Key Players in Verification:',
                },
                {
                    type: 'list',
                    items: [
                        'Platform Administrators and Moderators',
                        'Individual Users',
                        'Government and Regulatory Agencies',
                        'Third-party Tech and Security Vendors',
                    ],
                },

                { type: 'heading', text: 'Why is Community Verification Important?' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'Community information verification brings accuracy and quality, as it stops fake news or wrong numbers from spreading by checking facts at the local level. It also builds trust and teamwork, as it creates a helpful bridge between normal citizens and leaders or service providers. It lets local people check and confirm facts so that groups and leaders can make smart choices.',
                },

                { type: 'heading', text: 'How to Verify Information as a Community' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'According to Witness (2025), community-based verification process will always vary depending on the context, the people, and the resources available. Here are some general questions that can guide the approach before beginning:',
                },
                {
                    type: 'list',
                    items: [
                        'What are the objectives of your investigation? Why do you need to verify your material?',
                        'What are the risks associated?',
                        'How was your material documented or collected? How will you plan to collect your material?',
                        'How have you identified or involved your community?',
                    ],
                },

                { type: 'heading', text: 'Responsible Reporting' },
                {
                    type: 'paragraph',
                    text: 'Kwan (2019) shares some questions to think about when using social media:',
                },
                {
                    type: 'list',
                    items: [
                        'If I am thinking about replying to, retweeting or quote-tweeting someone, have I explained the context to my audience?',
                        'How likely is it that my response will amplify mis- or disinformation?',
                        'If I am sharing an opinion, how can I ensure that my followers understand that my post/tweet is an opinion and not fact?',
                        'If I am sharing a rumor, have I disclosed the source and any related context to explain the relevance and reasoning for my post?',
                        'What is my personal corrections policy for social media posts? Will I delete posts that are subsequently found to be misleading or inaccurate, or respond in a comment or thread? How can I make sure that my correction reaches as many of the original audience that saw the incorrect post as possible?',
                    ],
                },

                { type: 'heading', text: 'Real-Life Scenario' },
                {
                    type: 'section',
                    title: 'Scenario',
                    text: [
                        {
                            text: 'Someone creates a fake Facebook account pretending to be your school\'s principal and asks students to send money for a "school activity."',
                        },
                        {
                            text: 'Question: What actions should students take?',
                            italic: true,
                        },
                    ],
                },
            ],
        },
        practicalActivity:
            'Review the fake Facebook account scenario and develop an action plan describing how you would verify the account, report it to the platform, notify the appropriate school authorities, and share trusted information to help prevent others from being deceived.',
    },
    {
        title: 'AI-Generated Content and AI Hallucinations',
        description:
            'Recognize AI limitations, hallucinations, and possible synthetic content.',
        progress: 60,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand what AI-generated content and AI hallucinations are, why they occur, and how they can affect the accuracy and reliability of digital information.',
            },
            {
                title: 'Practice',
                description:
                    'Apply verification techniques to identify possible AI-generated or hallucinated content by checking sources, asking follow-up questions, and comparing information with trusted references.',
            },
            {
                title: 'Evaluate',
                description:
                    'Evaluate AI-generated outputs for accuracy, relevance, consistency, and credibility before using or sharing them.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on the benefits and limitations of AI tools and identify responsible ways to use AI while recognizing the importance of independent verification.',
            },
        ],
        content: {
            objectivesLabel: 'By the end of this lesson, learners should be able to:',
            objectives: [
                'Explain what AI-generated content is.',
                'Define AI hallucinations and understand why they occur.',
                'Recognize signs of unreliable or AI-generated outputs.',
                'Evaluate AI-generated information before using or sharing it.',
            ],
            intro:
                'You ask an AI chatbot to help with your history assignment. It confidently tells you that the Philippines gained independence in 1948, and even provides a detailed explanation. You submit your assignment without checking other sources. Later, your teacher tells you the correct year is 1946.',
            introQuestion:
                'Question: The AI sounded confident—but was it actually correct? Why should we verify AI-generated information?',
            blocks: [
                { type: 'heading', text: 'What is AI-Generated Content?' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'AI-generated content is any type of content, such as text, image, video or audio, which is created by artificial intelligence models. These models are the result of algorithms trained on large datasets that enable them to produce new content that mimics the characteristics of the training data (Mucci, 2024).',
                },

                { type: 'heading', text: 'What are AI Hallucinations?' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'AI hallucination is a phenomenon where, in a large language model (LLM) often a generative AI chatbot or computer vision tool, perceives patterns or objects that are nonexistent or imperceptible to human observers, creating outputs that are nonsensical or altogether inaccurate (IBM, 2026).',
                },
                {
                    type: 'paragraph',
                    text: 'Some notable examples of AI hallucination include:',
                },
                {
                    type: 'list',
                    items: [
                        'Google\'s Bard chatbot incorrectly claiming that the James Webb Space Telescope had captured the world\'s first images of a planet outside our solar system.',
                        'Microsoft\'s chat AI, Sydney, admitting to falling in love with users and spying on Bing employees.',
                        'Meta pulling its Galactica LLM demo in 2022, after it provided users inaccurate information, sometimes rooted in prejudice.',
                    ],
                },

                { type: 'heading', text: 'Why Can AI Produce Unreliable Information?' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'Aryabh Consulting Inc. (2025) declares some of the primary reasons contributing to AI hallucinations:',
                },
                {
                    type: 'terms',
                    items: [
                        {
                            term: 'Lack of Real Understanding',
                            definition:
                                'AI models do not possess true comprehension or reasoning abilities. Instead, they rely on statistical patterns and probabilities to predict the next word, sentence, or image in a sequence. As a result, they sometimes produce responses that sound logical but are factually incorrect.',
                        },
                        {
                            term: 'Incomplete or Biased Training Data',
                            definition:
                                'AI models are trained on vast datasets from the internet. If the model encounters gaps in its knowledge, it may fabricate information based on related patterns.',
                        },
                        {
                            term: 'Overgeneralization',
                            definition:
                                'AI models often generalize information based on patterns found in training data. If a model has seen similar inputs before but lacks precise details, it may make an incorrect assumption, leading to false or misleading outputs.',
                        },
                        {
                            term: 'Confabulation in Language Models',
                            definition:
                                'It generates an answer that sounds authoritative, even if it is incorrect. This is particularly concerning in high-stakes domains like medical advice, legal counsel, and scientific research.',
                        },
                        {
                            term: 'Prompt Misinterpretation',
                            definition:
                                'Sometimes, hallucinations occur due to ambiguous or misleading prompts. If a user provides an unclear request, the AI may attempt to fill in the gaps by generating speculative or fictional content.',
                        },
                        {
                            term: 'Algorithmic and Model Limitations',
                            definition:
                                'Current AI models do not have reasoning capabilities or a direct feedback loop for verifying the correctness of their outputs. Unlike human researchers, AI cannot fact-check itself beyond the patterns it has learned.',
                        },
                    ],
                },

                { type: 'heading', text: 'How to Recognize Possible AI Hallucinations' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'A121 Labs (2025) presents the key categories of hallucination to monitor, along with typical signs to watch for:',
                },
                {
                    type: 'terms',
                    items: [
                        {
                            term: 'Output accuracy',
                            definition:
                                'This occurs when a model provides information that is not supported by the prompt or source material — even if it sounds correct on the surface.',
                        },
                        {
                            term: 'Context Integrity',
                            definition:
                                'Context integrity failures happen when the model generates responses as if they\'re derived from the source material — but a review shows no such information exists. When challenged, the model may deny inventing content or acknowledge the mistake yet still repeat the claim.',
                        },
                        {
                            term: 'Answer relevance',
                            definition:
                                'Hallucinations in relevance occur when the model\'s response is factually correct but not appropriately focused on the question asked. The information may be real, but its inclusion is unwarranted or tangential.',
                        },
                        {
                            term: 'Inconsistency detection',
                            definition:
                                'LLMs lack a consistent internal model of truth, which makes them prone to contradictions — especially in longer, multi-part prompts.',
                        },
                        {
                            term: 'Statistical improbability',
                            definition:
                                'Because LLMs generate content based on linguistic likelihood — not real-world probability — they can fabricate or distort numerical data, especially when dealing with outliers or rare events.',
                        },
                    ],
                },

                { type: 'heading', text: 'How to Verify AI Outputs' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'According to Holmberg (2024), one can detect AI hallucinations by:',
                },
                {
                    type: 'list',
                    items: [
                        'Checking sources',
                        'Asking follow-up questions',
                        'Testing different language models',
                    ],
                },

                { type: 'heading', text: 'Real-Life Scenario' },
                {
                    type: 'section',
                    title: 'Scenario',
                    text: [
                        {
                            text: 'An image online appears to show a famous athlete receiving an award they never actually won. The picture looks realistic, but later it is revealed to be AI-generated.',
                        },
                        {
                            text: 'Question: What clues or verification methods could help determine whether the image is authentic?',
                            italic: true,
                        },
                    ],
                },
            ],
        },
        practicalActivity:
            'Review an AI-generated response or image and identify any signs that suggest it may be inaccurate or fabricated. Verify the information using at least two trusted sources or another AI model, then explain whether the content is reliable and describe the steps you took to reach your conclusion.',
    },
    {
        title: 'Deepfakes and Manipulated Media',
        description:
            'Analyze synthetic media, visual artifacts, and edited images or videos.',
        progress: 25,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the different forms of manipulated media, including deepfakes, edited images, edited videos, and synthetic media, and recognize their potential impact on individuals and society.',
            },
            {
                title: 'Practice',
                description:
                    'Apply techniques for identifying manipulated media by examining visual clues, performing reverse image searches, and consulting reliable verification sources before sharing digital content.',
            },
            {
                title: 'Evaluate',
                description:
                    'Evaluate the authenticity and credibility of digital media by analyzing its quality, context, source, and evidence of manipulation.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on the ethical and social consequences of creating or sharing manipulated media and identify ways to promote responsible digital citizenship.',
            },
        ],
        content: {
            objectivesLabel: 'By the end of this lesson, learners should be able to:',
            objectives: [
                'Explain what deepfakes, manipulated images, edited videos, and synthetic media are.',
                'Differentiate between authentic and manipulated digital media.',
                'Identify common signs of manipulated media.',
                'Practice verifying media before believing or sharing it.',
            ],
            intro:
                'A short video spreads around campus showing a teacher yelling at a student. Many people criticize the teacher online. Later, the full video reveals that the teacher was stopping a fight and protecting another student.',
            introQuestion:
                'Question: How did editing the video change people\'s understanding of what happened?',
            blocks: [
                { type: 'heading', text: 'What is Manipulated Media?' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'Media manipulation refers to a broad array of techniques used to sway public opinion through mass media, encompassing psychological tactics and advertising strategies. This practice employs images, carefully crafted language, and auditory elements to influence audience emotions and compel action or perspectives (Dewey, 2021).',
                },

                { type: 'heading', text: 'Types of Manipulated Media' },
                {
                    type: 'terms',
                    items: [
                        {
                            term: 'A. Deepfakes',
                            definition:
                                'Deepfakes are computer-created artificial videos in which images are combined to create new footage that depicts events, statements or action that never actually happened.',
                        },
                        {
                            term: 'B. Manipulated Images',
                            definition:
                                'Photo manipulation refers to the process of altering photographic images to depict something different from what was originally captured (Tantawi, 2023).',
                        },
                        {
                            term: 'C. Edited Videos',
                            definition:
                                'Cut, arranged, and organized digital footage, creating compelling video content (Coursera, 2026).',
                        },
                        {
                            term: 'D. Synthetic Media',
                            definition:
                                'Synthetic media refers to content partially or entirely generated using AI or machine learning, including images, video and audio.',
                        },
                    ],
                },

                { type: 'heading', text: 'Why Can Manipulated Media Be Dangerous?' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'Hendrickson (2024) shows the ethical and legal implications of digital manipulation:',
                },
                { type: 'heading', text: 'Key Ethical Concerns in Digital Manipulation' },
                {
                    type: 'terms',
                    items: [
                        {
                            term: 'Privacy violations',
                            definition: 'Using someone\'s image or likeness without permission can be a privacy violation.',
                        },
                        {
                            term: 'Lies and Misinformation',
                            definition: 'Manipulated content can mislead people by presenting false information as real.',
                        },
                        {
                            term: 'False Advertising',
                            definition:
                                'Manipulating content, like companies hiding fake reviews or using altered "before and after" images in ads, violates people\'s right to make informed decisions.',
                        },
                        {
                            term: 'Copyright Infringement',
                            definition:
                                'Using or altering images, videos, or audio without permission from the copyright holder can lead to copyright infringement lawsuits.',
                        },
                        {
                            term: 'Defamation',
                            definition:
                                'Manipulating content to make someone look bad could be considered defamation, especially if it damages their reputation.',
                        },
                        {
                            term: 'Regulatory Compliance',
                            definition:
                                'This is a major concern because it directly impacts how companies and individuals can use manipulated content legally.',
                        },
                        {
                            term: 'Data Protection and Cybersecurity Laws',
                            definition:
                                'This concern highlights the potential for manipulated content to break laws protecting personal information.',
                        },
                    ],
                },

                { type: 'heading', text: 'How to Recognize Manipulated Media' },
                {
                    type: 'terms',
                    items: [
                        {
                            term: 'Stop and think',
                            definition: 'Take a moment to really look at the image and look to see if something doesn\'t make sense or comes off as weird.',
                        },
                        {
                            term: 'Look for bad edges',
                            definition: 'Has the image been intentionally cropped? Can you see any evidence that something was pasted into the original image?',
                        },
                        {
                            term: 'Find mismatched light',
                            definition: 'Matching light is one of the trickiest things to do when editing photos. Look where the light source is in the photo and then track the way shadows fall.',
                        },
                        {
                            term: 'Be wary of poor quality',
                            definition: 'A low-resolution photo can be the perfect way to hide editing, so be wary of this when you see an image.',
                        },
                        {
                            term: 'Conduct a reverse image search',
                            definition: 'There are many search engines out there that you can use to find the original of an image and compare it to the one you\'re seeing.',
                        },
                        {
                            term: 'Consult a fact checker website',
                            definition: 'There are many websites out there devoted to debunking fake news, and that includes manipulated media. If it\'s a viral image, they likely have some information on it.',
                        },
                    ],
                },

                { type: 'heading', text: 'Real-Life Scenario' },
                {
                    type: 'section',
                    title: 'Scenario',
                    text: [
                        {
                            text: 'A picture spreads online showing several students supposedly vandalizing school property. After an investigation, it is discovered that one student had been digitally added to the photo.',
                        },
                        {
                            text: 'Question: How could sharing this edited image harm the people involved?',
                            italic: true,
                        },
                    ],
                },
            ],
        },
        practicalActivity:
            'Analyze a suspected manipulated image or video using the verification techniques discussed in the lesson. Identify any signs of editing or manipulation, explain how you verified the content, and discuss the possible consequences if the media were shared without verification.',
    },
    {
        title: 'Responsible Sharing and Digital Citizenship',
        description:
            'Develop ethical habits for communication and information sharing.',
        progress: 0,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the principles of digital citizenship, digital etiquette, and the responsibilities of using digital technologies in a safe, respectful, and ethical manner.',
            },
            {
                title: 'Practice',
                description:
                    'Apply responsible online behaviors by demonstrating ethical information-sharing practices, protecting personal information, and following appropriate digital etiquette in various online situations.',
            },
            {
                title: 'Evaluate',
                description:
                    'Evaluate online actions and digital interactions by considering their ethical implications, potential consequences, and impact on others before posting or sharing content.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your own digital habits and identify ways to become a more responsible, respectful, and ethical digital citizen.',
            },
        ],
        content: {
            objectivesLabel: 'By the end of this lesson, learners should be able to:',
            objectives: [
                'Explain the meaning of digital citizenship.',
                'Identify the responsibilities of a responsible digital citizen.',
                'Demonstrate ethical information-sharing practices.',
                'Apply responsible online behavior in different digital situations.',
            ],
            intro:
                'Your friend sends a funny meme in your class group chat. Without reading it carefully, you immediately forward it to other friends. A few minutes later, someone points out that the meme contains false information and insults a specific group of people. Several classmates are upset, and the post continues spreading because many people shared it without thinking.',
            introQuestion:
                'Question: As someone who shared the post, what responsibility do you have? What could you have done differently?',
            blocks: [
                { type: 'heading', text: 'What is Digital Citizenship?' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'Digital citizenship is the ability to navigate our digital environments in a way that\'s safe and responsible and to actively and respectfully engage in these spaces. A good digital citizen protects their personal information, uses good judgment and treats others with respect.',
                },

                { type: 'heading', text: '11 Digital Skills that Every Digital Citizen Should Possess' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'Here are eleven essential skills every good digital citizen should have, as shown by Maidukov (2026):',
                },
                {
                    type: 'list',
                    items: [
                        'Recognize when personal information is being collected.',
                        'Understand that technology is a means to an end.',
                        'Familiarize yourself with copyright & creative rights.',
                        'Use strong passwords.',
                        'Protect yourself from cyberbullying and harassment.',
                        'Consider how your actions affect others.',
                        'Take ownership over your digital footprint.',
                        'Keep security top of mind.',
                        'Research everything.',
                        'Protect your time.',
                        'Create a healthy online and offline balance.',
                    ],
                },

                { type: 'heading', text: 'Digital Etiquette (Netiquette)' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'The term digital etiquette refers to the electronic standards of conduct or procedures. Digital etiquette involves thinking about others when using digital devices (Kammer et al., 2022). How do you practice good digital etiquette? It\'s easier than you might think. Simply treat others as you would like to be treated, with courtesy and respect. It is also important to know your audience and to communicate accordingly.',
                },

                { type: 'heading', text: 'Real-Life Scenario' },
                {
                    type: 'section',
                    title: 'Scenario',
                    text: [
                        {
                            text: 'A friend sends you photos of tomorrow\'s quiz answers and asks you to share them with the whole class.',
                        },
                        {
                            text: 'Question: Besides breaking school rules, why is sharing the answers unethical?',
                            italic: true,
                        },
                    ],
                },
            ],
        },
        practicalActivity:
            'Read the scenario about the quiz answers and explain why sharing them is unethical. Then, describe the actions you would take as a responsible digital citizen, citing at least three principles of digital citizenship or digital etiquette that support your decision.',
    },
    {
        title: 'Ethics of AI and Online Information',
        description:
            'Examine privacy, bias, transparency, accountability, and intellectual honesty.',
        progress: 0,
        objectives: [
            {
                title: 'Understand',
                description:
                    'Understand the importance of ethics in the use of AI and online information, including the principles of fairness, transparency, privacy, and accountability.',
            },
            {
                title: 'Practice',
                description:
                    'Apply ethical judgment when using AI tools by verifying information, respecting intellectual property, protecting privacy, and using AI responsibly in academic, personal, and professional contexts.',
            },
            {
                title: 'Evaluate',
                description:
                    'Evaluate the ethical implications of AI-generated content and online information by considering its accuracy, fairness, transparency, and potential impact on individuals and society.',
            },
            {
                title: 'Reflect',
                description:
                    'Reflect on your responsibilities as an AI user and digital citizen, and identify ways to use AI and online information honestly, ethically, and responsibly.',
            },
        ],
        content: {
            objectivesLabel: 'By the end of this lesson, learners should be able to:',
            objectives: [
                'Explain the importance of ethics in the use of AI and online information.',
                'Identify ethical issues related to AI-generated content and digital information.',
                'Apply ethical judgment when using AI tools and sharing information online.',
                'Demonstrate responsible and honest use of AI in academic, personal, and professional contexts.',
            ],
            intro:
                'Your teacher assigns a research essay due tomorrow. One of your classmates copies an essay generated by an AI chatbot and submits it without checking the facts or citing the AI tool. Another classmate uses AI to brainstorm ideas, verifies the information with reliable sources, rewrites it in their own words, and properly acknowledges the assistance.',
            introQuestion:
                'Question: Both students used AI—but did they use it ethically? What makes one approach more responsible than the other?',
            blocks: [
                { type: 'heading', text: 'What is Ethics?' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'Ethics is based on well-founded standards of right and wrong that prescribe what humans ought to do, usually in terms of rights, obligations, benefits to society, fairness, or specific virtues (Velasquez et al., 2010).',
                },
                {
                    type: 'paragraph',
                    text: 'Perez (2024) says that in digital spaces, ethics influences how we:',
                },
                {
                    type: 'list',
                    items: [
                        'Involve considerations of fairness, transparency, privacy, security, and technology\'s impact on individuals and society as a whole.',
                        'Shape our interaction with technology and each other.',
                        'Ensure that technological advancements are aligned with ethical values and societal norms, and;',
                        'Safeguard these technological advancements against potential harm and exploitation.',
                    ],
                },

                { type: 'heading', text: 'Ethics in AI and Online Information' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'AI ethics are the set of guiding principles that stakeholders use to ensure artificial intelligence technology is developed and used responsibly. This means taking a safe, secure, humane, and environmentally friendly approach to AI (Coursera, 2026). On the other hand, ethics in online information means using digital content in a fair, honest, and safe way. Key rules include truth, privacy, and respect. It guides how we read, share, and make data on the internet.',
                },

                { type: 'heading', text: 'Ethical Decision-Making' },
                {
                    type: 'paragraph',
                    indent: true,
                    text: 'Given the potential risks and benefits of AI decision-making, Bhengesa (2023) expresses the importance of considering the ethical implications of using these systems. Some of the key ethical considerations include:',
                },
                {
                    type: 'terms',
                    items: [
                        {
                            term: 'Fairness',
                            definition:
                                'AI decision making systems should be designed to make decisions that are fair and unbiased. This requires ensuring that the data used to train the system is representative of the population it will be making decisions about and that the system is tested to ensure that it is not discriminating against certain groups.',
                        },
                        {
                            term: 'Transparency',
                            definition:
                                'AI decision making systems should be transparent, meaning that the decision-making process is clear and understandable to those affected by the decisions. This includes providing explanations for decisions made by the system, as well as making the decision-making process itself transparent.',
                        },
                        {
                            term: 'Privacy',
                            definition:
                                'AI decision making systems should respect individual privacy, and any data used by the system should be collected and used in accordance with relevant privacy laws and regulations.',
                        },
                        {
                            term: 'Accountability',
                            definition:
                                'Those responsible for developing and using AI decision making systems should be accountable for the decisions made by the system. This includes monitoring the system for bias and errors and taking steps to mitigate any negative outcomes.',
                        },
                    ],
                },

                { type: 'heading', text: 'Real-Life Scenario' },
                {
                    type: 'section',
                    title: 'Scenario',
                    text: [
                        {
                            text: 'Someone uses AI to imitate a teacher\'s voice and sends a fake audio recording announcing that tomorrow\'s exam has been canceled.',
                        },
                        {
                            text: 'Question: Who could be affected by this action, and what responsibilities do the creator and the people who share the recording have?',
                            italic: true,
                        },
                    ],
                },
            ],
        },
        practicalActivity:
            'Analyze the scenario involving the AI-generated voice recording. Identify the ethical issues involved, explain who may be affected, and propose appropriate actions that both the creator and recipients should take to prevent harm and promote responsible use of AI.',
    },
    {
        title: 'MILDA Practical Verification Activities',
        description:
            'Complete guided verification missions using MILDA digital tools.',
        progress: 0,
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
        title: 'Digital Verification Portfolio',
        description:
            'Prepare and present the final evidence-based verification portfolio.',
        progress: 0,
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
        title: '"Classes are suspended tomorrow in all schools."',
        text: 'No city or school authority is cited in the original post.',
        note: 'Evidence needed: official advisory from the school, city government, or disaster office.',
        votes: [12, 48, 17],
        links: [
            {
                platform: 'facebook',
                label: 'Facebook Viral Post',
                url: 'facebook.com/groups/deped-announcements/...',
            },
            {
                platform: 'instagram',
                label: 'Instagram Story Snapshot',
                url: 'instagram.com/p/C3x9kL1S89u/',
            },
        ],
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
        links: [
            {
                platform: 'web',
                label: 'University Portal Notice',
                url: 'registrar.university.edu/scholarships/2026-upda...',
            },
            {
                platform: 'facebook',
                label: 'Official FB Page Post',
                url: 'facebook.com/StateUniversityOfficial/posts/102...',
            },
        ],
    },
    {
        status: 'media',
        tag: 'Possible Edited Media',
        tagClass: 'tag-purple',
        reports: 'Under review',
        title: 'Viral photo of public landmark flood levels',
        text: 'Metadata suggests contrast manipulation and digital alteration in lower left quad.',
        note: 'Moderation note: Reverse image search matches an origin photo from 2021.',
        votes: [3, 62, 104],
        links: [
            {
                platform: 'twitter',
                label: 'X (Twitter) Viral Tweet',
                url: 'x.com/weather_watch_ph/status/1782910293',
            },
            {
                platform: 'tiktok',
                label: 'TikTok Video Clip',
                url: 'tiktok.com/@cityupdates/video/7391829012',
            },
        ],
    },
    {
        status: 'reported',
        tag: 'Frequently Reported',
        tagClass: 'tag-red',
        reports: '11 reports',
        title: 'Unverified medical cure shared in social groups',
        text: 'Promotes home concoction with false claims of immediate viral immunity.',
        note: 'Health Advisory: FDA and DOH have published warnings regarding this product.',
        votes: [2, 15, 142],
        links: [
            {
                platform: 'facebook',
                label: 'Facebook Health Group',
                url: 'facebook.com/groups/healthtips/posts/3819203',
            },
            {
                platform: 'youtube',
                label: 'YouTube Short Demo',
                url: 'youtube.com/shorts/9xKw82aLmn0',
            },
        ],
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
