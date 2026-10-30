// Portfolio Data - Centralized content management
export const portfolioData = {
    personal: {
        name: "Hadi Indrawan",
        title: "Lead QA Engineer",
        subtitle: "Test automation platforms & AI test tooling",
        tagline: "Quality, engineered.",
        description: "Lead QA / SDET in payments and fintech. I turn day-long manual regression into a one-hour automated run, and build the platform the team tests on: Playwright E2E, a containerized job runner, and an AI-assisted test-management system.",
        email: "hadiindrawan157@gmail.com",
        phone: "+62 878-3000-0351",
        location: "Jakarta, Indonesia",
        website: "https://hadiindrawan.web.id",
        websiteLabel: "hadiindrawan.web.id",
        resumeUrl: "https://drive.google.com/file/d/1Az5IgcpdmKKX2izM6GxapRmz93guJi15/view?usp=sharing"
    },

    // Quick-glance stats used across hero / about
    stats: [
        { value: "~1h", label: "Full regression run (was ~1 day)" },
        { value: "15", label: "CI workflows" },
        { value: "6", label: "Services under smoke automation" },
        { value: "5+", label: "Years in software & QA" }
    ],

    navigation: [
        { text: "About", href: "#about", icon: "user" },
        { text: "Work", href: "#work", icon: "briefcase" },
        { text: "Projects", href: "#projects", icon: "grid" },
        { text: "Stack", href: "#stack", icon: "settings" },
        { text: "Writing", href: "#writing", icon: "edit" },
        { text: "Contact", href: "#contact", icon: "mail" }
    ],

    social: [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/hadi-indrawan/",
            icon: "linkedin"
        },
        {
            name: "GitHub",
            url: "https://github.com/hadiindrawan",
            icon: "github"
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/hadiindrawann/",
            icon: "instagram"
        },
        {
            name: "WhatsApp",
            url: "https://wa.me/6287830000351/",
            icon: "whatsapp"
        },
        {
            name: "Email",
            url: "mailto:hadiindrawan157@gmail.com",
            icon: "mail"
        }
    ],

    // Employers for the "where I've worked" strip (client projects are listed under DOT)
    companies: [
        "Matchmade",
        "Moladin",
        "DOT Indonesia",
        "Makerindo"
    ],

    about: {
        lead: "I build the systems that keep software honest.",
        description: [
            "I'm the Lead QA Engineer at **Matchmade**, where payment matching and reconciliation demand exactness from data upload to reporting. I own QA strategy and sign-off.",
            "I also build the tools QA runs on: a **Playwright + Python** E2E suite (~17k lines, 15 CI workflows), **pancake-runner** (a FastAPI + Docker job runner with live logs), and **Maxtest**, a test-management platform I built solo, with RAG-based test generation and an MCP server.",
            "Before Matchmade: Senior SDET at **Moladin** and QA at **DOT Indonesia** on banking and government projects. I also wrote **po-gen**, an NPM library that generates API tests from Postman collections."
        ],
        highlights: [
            "Lead QA Engineer at Matchmade",
            "E2E automation: day-long regression → ~1 hour",
            "Test tooling: runner, reporting, test management",
            "Payments & fintech domain depth"
        ]
    },

    // Work experience — timeline / research-table style
    experience: [
        {
            company: "Matchmade",
            role: "Lead QA Engineer",
            period: "Sep 2024 — Present",
            location: "Jakarta, Indonesia",
            summary: "QA Engineer from Sep 2024, Lead since May 2025. Owning quality for payment matching and reconciliation while building the tooling the team tests with.",
            highlights: [
                "Cut full regression from about a day to about an hour with a Playwright + Python E2E suite (~17k lines, ~65% authored by me) running as 15 CI workflows across 6 services.",
                "Built pancake-runner: FastAPI + Docker SDK, isolated Playwright jobs, parallel execution, live log streaming and VNC preview.",
                "Built the Allure reporting pipeline and a k6 performance lab.",
                "Run QA on Maxtest, the test-management platform I built solo: cases, launches and automation runs in one place.",
                "Own sprint QA: test plans, launches, sign-off, deployment and hotfix verification, on-call triage."
            ],
            tags: ["Playwright", "Python", "FastAPI", "Docker", "RAG / MCP"]
        },
        {
            company: "Moladin Indonesia",
            role: "Senior SDET",
            period: "Feb 2024 — Sep 2024",
            location: "Jakarta, Indonesia",
            summary: "Consumer financing: pre-disbursement, disbursement, LMS, and integrations to payment and insurance services.",
            highlights: [
                "Wrote the testing strategy document (TSD) and test documentation standards.",
                "Maintained the Playwright E2E automation suite.",
                "Led regression from data submission to fund disbursement."
            ],
            tags: ["Playwright", "E2E", "Test Strategy", "Fintech"]
        },
        {
            company: "DOT Indonesia",
            role: "QA Engineer",
            period: "Jun 2022 — Feb 2024",
            location: "Indonesia",
            summary: "Client assignments in banking and government: Alami Hijra Bank, DPR RI web revamp, and Moladin (SDET, Oct 2023 – Jan 2024, 90% automation coverage).",
            highlights: [
                "Authored test scenarios, test data, and UAT docs for financial processes.",
                "Built regression automation and maintained CI/CD pipelines.",
                "Performed REST and SOAP API testing with Postman.",
                "Built po-gen, an API test generator published on NPM."
            ],
            tags: ["Postman", "API Testing", "CI/CD", "Automation"]
        },
        {
            company: "Makerindo Prima Solusi",
            role: "Full-stack Developer",
            period: "Aug 2021 — Jul 2022",
            location: "Indonesia",
            summary: "Customer management and financial features integrated with hardware devices and disbursement flows.",
            highlights: [
                "Built customer systems and plant-factory management with Laravel and Vue.",
                "Optimized transaction processes for fast, reliable disbursement.",
                "Integrated field-sensor data and IoT devices for real-time monitoring.",
            ],
            tags: ["Laravel", "Vue", "IoT", "Full-stack"]
        }
    ],

    // Core capabilities — capability cards with thin-line SVG icons (icon = key)
    skills: [
        {
            id: 1,
            title: "Test Automation",
            description: "End-to-end automation with Playwright, Selenium, Cypress, and WebdriverIO. Currently 15 CI workflows across 6 services.",
            icon: "automation"
        },
        {
            id: 2,
            title: "Manual & Exploratory",
            description: "Exploratory, functional, and usability testing with rigorous documentation across web and mobile surfaces.",
            icon: "test"
        },
        {
            id: 3,
            title: "API Testing",
            description: "REST and SOAP validation with Postman, contract checks, and automated API suites for trustworthy data exchange.",
            icon: "api"
        },
        {
            id: 4,
            title: "AI-assisted QA",
            description: "RAG-based test generation and semantic search across cases, plans and launches, exposed to QA through an MCP server.",
            icon: "ai"
        },
        {
            id: 5,
            title: "Test Platform Engineering",
            description: "FastAPI, React, PostgreSQL and Docker: the runner, reporting and test-management tools the QA team runs on.",
            icon: "code"
        },
        {
            id: 6,
            title: "Mobile Testing",
            description: "Native and hybrid app testing across iOS and Android with Appium and Selenium.",
            icon: "mobile"
        },
        {
            id: 7,
            title: "Performance Testing",
            description: "Load testing with K6 across dev, staging and prod environments.",
            icon: "performance"
        },
        {
            id: 8,
            title: "QA Leadership",
            description: "Test strategy, quality metrics, sprint QA sign-off, and mentoring a QA engineer.",
            icon: "leadership"
        }
    ],

    projects: [
        {
            id: 1,
            title: "Maxtest AI",
            role: "Founder & sole developer",
            description: "Test-management platform for manual and automated testing, used by the Matchmade QA team. FastAPI, PostgreSQL and Redis/Celery backend with a React dashboard for test cases, suites, plans, launches, role-based access and an audit trail. RAG (LangChain + Qdrant) generates test cases and finds similar ones; an MCP server (OAuth, audit log, confirmation guard) lets QA query and update tests from a chat client.",
            image: "/asset/maxtest-dashboard.webp",
            imageFit: "contain",
            technologies: ["Python", "FastAPI", "React", "RAG", "PostgreSQL", "Docker"],
            category: "AI Test Management",
            year: "2026",
            status: "In use",
            featured: true
        },
        {
            id: 2,
            title: "pancake",
            role: "Lead engineer",
            description: "End-to-end automation platform behind Matchmade's regression. A Playwright + Python suite (~17k lines, ~65% authored by me) runs as 15 CI workflows across 6 services on dev and staging. pancake-runner (FastAPI + Docker SDK) runs each job in its own container with live log streaming and browser preview; results publish to Allure reports. A k6 lab covers performance. Took regression from about a day to about an hour.",
            image: "/asset/pancake.svg",
            technologies: ["Python", "Playwright", "FastAPI", "Docker", "Allure", "k6"],
            category: "Test Automation Platform",
            year: "2024 – 2026",
            status: "In use"
        },
        {
            id: 3,
            title: "Po-gen",
            role: "Author",
            description: "An API test generator: export a Postman collection and it writes the automation code. Built and published to NPM, open source on GitHub.",
            image: "/asset/pogen.png",
            technologies: ["JavaScript", "Node.js", "NPM", "Code Generation"],
            category: "Open Source Library",
            year: "2023",
            status: "Published",
            link: "https://www.npmjs.com/package/@dot.indonesia/po-gen"
        },
        {
            id: 4,
            title: "DPR RI Revamp",
            role: "QA Engineer, client project via DOT",
            description: "Manual testing for the Indonesian House of Representatives web revamp. Designed test plans, cases, and reports in Qase.io, and validated database state against actual behavior with the client.",
            image: "/asset/dpr.png",
            technologies: ["Qase.io", "Manual Testing", "UAT", "DB Validation"],
            category: "Government Portal",
            year: "2023",
            status: "Delivered"
        },
        {
            id: 5,
            title: "Alami / Hijra Bank",
            role: "QA Engineer, client project via DOT",
            description: "QA for Islamic digital banking across mobile and web. Manual testing with TestRail, UAT coordination, K6 performance testing, and mobile automation with Selenium and Appium.",
            image: "/asset/hijra.png",
            technologies: ["Selenium", "Appium", "K6", "TestRail"],
            category: "Mobile Banking",
            year: "2022 – 2023",
            status: "Delivered"
        }
    ],

    // Tools grouped for the stack strip
    tools: [
        { name: "JavaScript", image: "/asset/js.png", category: "Language" },
        { name: "Java", image: "/asset/java.png", category: "Language" },
        { name: "Playwright", image: "/asset/playwright.png", category: "Automation" },
        { name: "Selenium", image: "/asset/selenium.png", category: "Automation" },
        { name: "Cypress", image: "/asset/cypress.png", category: "Automation" },
        { name: "Mocha", image: "/asset/mocha.png", category: "Framework" },
        { name: "Appium", image: "/asset/appium.png", category: "Mobile" },
        { name: "Postman", image: "/asset/postman.png", category: "API" },
        { name: "TestRail", image: "/asset/testrail.png", category: "Test Mgmt" },
        { name: "Qase.io", image: "/asset/qaseio.png", category: "Test Mgmt" },
        { name: "Vue.js", image: "/asset/vue.png", category: "Frontend" },
        { name: "Laravel", image: "/asset/laravel.png", category: "Backend" },
        { name: "PostgreSQL", image: "/asset/postgresql.png", category: "Database" },
        { name: "MySQL", image: "/asset/mysql.png", category: "Database" },
        { name: "Docker", image: "/asset/docker.svg", category: "DevOps" },
        { name: "GitLab", image: "/asset/gitlab.png", category: "DevOps" },
        { name: "GitHub", image: "/asset/github.png", category: "Version Control" },
        { name: "Git", image: "/asset/git.png", category: "Version Control" },
        { name: "Figma", image: "/asset/figma.png", category: "Design" }
    ],

    // Text-only stack list for a mono-label chip row
    stackList: [
        "Python", "JavaScript", "TypeScript", "Go", "SQL",
        "Playwright", "Selenium", "Cypress", "WebdriverIO", "Appium", "K6", "Postman",
        "FastAPI", "React", "Docker", "PostgreSQL", "GitHub Actions", "Allure", "GCP", "Jira"
    ],

    // Writing — articles on the DOT engineering blog
    writing: [
        {
            title: "Continuous Testing dalam CI/CD Menggunakan Github Action: Apa, Mengapa dan Bagaimana?",
            outlet: "DOT Engineering Blog",
            date: "Oct 2022",
            topics: ["CI/CD", "GitHub Actions"],
            url: "https://blog.dot.co.id/continuous-testing-dalam-ci-cd-menggunakan-github-action-apa-mengapa-dan-bagaimana-4a7099ebb1b5"
        },
        {
            title: "Automation Testing: What's Playwright and how to play with",
            outlet: "DOT Engineering Blog",
            date: "Jan 2023",
            topics: ["Playwright", "Automation"],
            url: "https://blog.dot.co.id/automation-testing-whats-playwright-and-how-to-play-with-44c13085b346"
        },
        {
            title: "Streamline Your API Automation Testing with Po-gen",
            outlet: "DOT Engineering Blog",
            date: "May 2023",
            topics: ["API", "Po-gen"],
            url: "https://blog.dot.co.id/streamline-your-api-automation-testing-with-po-gen-58e0f4a7dc0e"
        }
    ],

    // Speaking — DOT Techtalks
    speaking: [
        { title: "How to play with Playwright", event: "DOT Techtalk", date: "Jan 2023" },
        { title: "Introduction to Mocha & Chai framework", event: "DOT Techtalk × Malang QA", date: "Jul 2023" },
        { title: "How to use ChatGPT with prompt optimization", event: "DOT Techtalk", date: "Sep 2023" }
    ],

    // Open-source libraries
    libraries: [
        {
            name: "Po-gen",
            description: "API test generator from Postman collections (author)",
            outlet: "NPM",
            date: "Mar 2023",
            url: "https://www.npmjs.com/package/@dot.indonesia/po-gen"
        }
    ],

    education: [
        {
            degree: "Electrical Engineering of Education",
            institution: "Indonesia University of Education",
            period: "Sep 2018 — Sep 2022",
            detail: "Cumulative GPA 3.62 / 4.0"
        }
    ],

    languages: [
        { name: "Bahasa Indonesia", level: "Native" },
        { name: "English", level: "Conversational" }
    ]
};

// Helper function to get data by category
export const getDataByCategory = (category) => {
    switch (category) {
        case 'skills':
            return portfolioData.skills;
        case 'projects':
            return portfolioData.projects;
        case 'tools':
            return portfolioData.tools;
        case 'social':
            return portfolioData.social;
        case 'experience':
            return portfolioData.experience;
        default:
            return [];
    }
};

// Helper function to filter tools by category
export const getToolsByCategory = (category) => {
    return portfolioData.tools.filter(tool => tool.category === category);
};

// Helper function to get featured projects
export const getFeaturedProjects = (count = 3) => {
    return portfolioData.projects.slice(0, count);
};
