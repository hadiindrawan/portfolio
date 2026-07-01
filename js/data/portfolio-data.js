// Portfolio Data - Centralized content management
export const portfolioData = {
    personal: {
        name: "Hadi Indrawan",
        title: "Lead QA Engineer & Full-stack Software Engineer",
        subtitle: "Test Systems, Automation & AI-driven Quality",
        tagline: "Quality, engineered.",
        description: "QA Engineer and Full-stack Software Engineer with 4+ years designing, building, and optimizing testing systems across fintech startups and government agencies — from automation frameworks to AI-driven QA tooling with RAG.",
        email: "hadiindrawan157@gmail.com",
        phone: "+62 878-3000-0351",
        location: "Jakarta, Indonesia",
        website: "https://hadiindrawan.my.id",
        websiteLabel: "hadiindrawan.my.id",
        resumeUrl: "https://drive.google.com/file/d/1Az5IgcpdmKKX2izM6GxapRmz93guJi15/view?usp=sharing"
    },

    // Quick-glance stats used across hero / about
    stats: [
        { value: "4+", label: "Years in QA & Engineering" },
        { value: "99%", label: "Test coverage on Maxtest AI" },
        { value: "3", label: "Published articles" },
        { value: "3", label: "Conference talks" }
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

    // Companies for the trust / logo strip
    companies: [
        "Matchmade",
        "Moladin",
        "DOT Indonesia",
        "Makerindo",
        "Alami / Hijra Bank",
        "DPR RI"
    ],

    about: {
        lead: "I build the systems that keep software honest.",
        description: [
            "I'm a Lead QA Engineer at **Matchmade**, where payment matching and reconciliation demand exactness at every step — from data upload to processing. I own quality across those flows: test strategy, Playwright automation, quality metrics, and QA sign-off.",
            "I also build. My work spans production-grade tooling in **React**, **Python**, and **Docker**, including **Maxtest AI** — an AI-driven test management platform using **RAG** for intelligent test generation, similarity detection, and failure analysis.",
            "Across fintech startups and government agencies, I've architected test management solutions, led regression cycles to 100% success, mentored QA teams, and pushed for cleaner code and better standards on both sides of the codebase."
        ],
        highlights: [
            "Lead QA Engineer at Matchmade",
            "Full-stack: React, Python, Node, Docker",
            "AI-driven QA with RAG",
            "Payment systems & fintech depth",
            "Team leadership & QA sign-off ownership"
        ]
    },

    // Work experience — timeline / research-table style
    experience: [
        {
            company: "Matchmade",
            role: "Lead QA Engineer",
            period: "Sep 2024 — Present",
            location: "Jakarta, Indonesia",
            summary: "Owning quality for payment matching and reconciliation — from data upload through processing — while building the tooling the team tests with.",
            highlights: [
                "Built the automation suite from scratch with Playwright for rapid regression feedback.",
                "Built an internal test management platform with Python and React.",
                "Introduced AI-driven testing for comprehensive test cases, risk analysis, and higher coverage.",
                "Defined test strategy across functional, non-functional, automation, and regression.",
                "Tracked quality metrics — defect density, coverage, pass/fail, automation trends — and initiated QA sign-off."
            ],
            tags: ["Playwright", "Python", "React", "AI / RAG", "Leadership"]
        },
        {
            company: "Moladin Indonesia",
            role: "Senior SDET",
            period: "Feb 2024 — Aug 2024",
            location: "Jakarta, Indonesia",
            summary: "Consumer financing: pre-disbursement, disbursement, LMS, and integrations to payment and insurance services.",
            highlights: [
                "Initiated the Testing Strategy Document (TSD) to strengthen evidence and risk controls.",
                "Authored guidelines to standardize test docs and automation scripting.",
                "Wrote and reviewed Playwright automation and maintained the E2E suite.",
                "Led regression from data submission to fund disbursement with a 100% success rate."
            ],
            tags: ["Playwright", "E2E", "Test Strategy", "Fintech"]
        },
        {
            company: "DOT Indonesia",
            role: "Software QA Engineer",
            period: "Jun 2022 — Feb 2024",
            location: "Indonesia",
            summary: "Financing apps, government web dashboards, and government-agency financial systems.",
            highlights: [
                "Authored test scenarios, test data, and UAT docs for financial processes and compliance.",
                "Analyzed requirements and surfaced gaps before they became defects.",
                "Built regression automation and maintained CI/CD pipelines.",
                "Performed REST and SOAP API testing with Postman for secure, accurate data exchange."
            ],
            tags: ["Postman", "API Testing", "CI/CD", "Automation"]
        },
        {
            company: "Makerindo Prima Solusi",
            role: "Full-stack Developer",
            period: "Aug 2021 — Jun 2022",
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
            description: "End-to-end automation frameworks with Playwright, Selenium, Cypress, and WebdriverIO — built for fast, reliable regression.",
            icon: "automation",
            level: "Expert"
        },
        {
            id: 2,
            title: "Manual & Exploratory",
            description: "Exploratory, functional, and usability testing with rigorous documentation across web and mobile surfaces.",
            icon: "test",
            level: "Expert"
        },
        {
            id: 3,
            title: "API Testing",
            description: "REST and SOAP validation with Postman, contract checks, and automated API suites for trustworthy data exchange.",
            icon: "api",
            level: "Expert"
        },
        {
            id: 4,
            title: "AI-driven QA",
            description: "RAG-powered test generation, similarity detection, and failure analysis that lift coverage and cut manual overhead.",
            icon: "ai",
            level: "Advanced"
        },
        {
            id: 5,
            title: "Full-stack Engineering",
            description: "Production tooling in React, Next.js, Node, Python, and Go — backed by PostgreSQL and containerized with Docker.",
            icon: "code",
            level: "Advanced"
        },
        {
            id: 6,
            title: "Mobile Testing",
            description: "Native and hybrid app testing across iOS and Android with Appium and Selenium.",
            icon: "mobile",
            level: "Advanced"
        },
        {
            id: 7,
            title: "Performance Testing",
            description: "Load and stress testing with K6 to validate durability, scalability, and load capacity.",
            icon: "performance",
            level: "Advanced"
        },
        {
            id: 8,
            title: "QA Leadership",
            description: "Test strategy, quality metrics, task delegation, QA sign-off, and mentoring engineers toward cleaner code.",
            icon: "leadership",
            level: "Expert"
        }
    ],

    projects: [
        {
            id: 1,
            title: "Maxtest AI",
            role: "Software Engineer",
            description: "A comprehensive test management system for manual and automation testing, reaching 99% coverage across Matchmade's QA workflows. Python backend with RAG for intelligent test-case generation, similarity detection, and failure analysis; React frontend for management, execution tracking, and reporting; containerized with Docker and adopted across engineering teams.",
            image: "/asset/kewops.png",
            technologies: ["Python", "React", "RAG", "Docker", "PostgreSQL"],
            category: "AI Test Management",
            year: "2026",
            status: "In Progress",
            featured: true
        },
        {
            id: 2,
            title: "Fashion Programming",
            role: "Internal Full-stack Engineer",
            description: "Immersive internal tooling for software development with OpenAI integrated. Express and Python backend wired to OpenAI and PostgreSQL, with a Next.js frontend.",
            image: "/asset/aep.jpg",
            technologies: ["Next.js", "Express", "Python", "OpenAI", "PostgreSQL"],
            category: "Internal Tooling",
            year: "2024",
            status: "Completed"
        },
        {
            id: 3,
            title: "Moladin Automation",
            role: "SDET — Automation",
            description: "Migrated test cases to Allure TestOps, validated data across SQL and NoSQL databases against actual behavior, and built common helper functions to speed development.",
            image: "/asset/moladin.png",
            technologies: ["WebdriverIO", "Allure TestOps", "SQL", "NoSQL"],
            category: "Fintech Automation",
            year: "2024",
            status: "Completed"
        },
        {
            id: 4,
            title: "DPR RI Revamp",
            role: "QA Engineer — Manual",
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
            role: "QA Engineer — Manual & Automation",
            description: "QA for Islamic digital banking across mobile and web. Manual testing with TestRail, UAT coordination, K6 performance testing, and mobile automation with Selenium and Appium.",
            image: "/asset/hijra.png",
            technologies: ["Selenium", "Appium", "K6", "TestRail"],
            category: "Mobile Banking",
            year: "2023",
            status: "Delivered"
        },
        {
            id: 6,
            title: "Po-gen",
            role: "QA Engineer — Automation",
            description: "An automation API generator that scaffolds clean, suitable test code — published to NPM. Designed the generator, maintained issues, and collaborated with the team on the system.",
            image: "/asset/pogen.png",
            technologies: ["JavaScript", "Node.js", "NPM", "Code Generation"],
            category: "Open Source Library",
            year: "2023",
            status: "Published",
            link: "https://www.npmjs.com/package/@dot.indonesia/po-gen"
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

    // Text-only stack list (from CV "Tech Stacks") for a mono-label chip row
    stackList: [
        "JavaScript", "TypeScript", "Node", "Java", "Python", "Go",
        "Selenium", "Cypress", "WebdriverIO", "Playwright", "Mocha", "Robot Framework",
        "Appium", "K6", "Postman",
        "TestRail", "Qase.io", "Allure TestOps", "Qameta", "Katalon", "Jira",
        "SQL", "NoSQL", "Docker", "GitHub Actions",
        "GCP", "Ubuntu", "VM", "Grafana"
    ],

    // Writing — Medium articles
    writing: [
        {
            title: "Continuous Testing dalam CI/CD Menggunakan Github Action: Apa, Mengapa dan Bagaimana?",
            outlet: "Medium",
            date: "Oct 2022",
            topics: ["CI/CD", "GitHub Actions"],
            url: "https://blog.dot.co.id/continuous-testing-dalam-ci-cd-menggunakan-github-action-apa-mengapa-dan-bagaimana-4a7099ebb1b5"
        },
        {
            title: "Automation Testing: What's Playwright and how to play with",
            outlet: "Medium",
            date: "Jan 2023",
            topics: ["Playwright", "Automation"],
            url: "https://blog.dot.co.id/automation-testing-whats-playwright-and-how-to-play-with-44c13085b346"
        },
        {
            title: "Streamline Your API Automation Testing with Po-gen",
            outlet: "Medium",
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
            description: "Automation API generator",
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
            detail: "Cumulative GPA 3.62 / 4.0 · Vice Chairman, Badminton Organization"
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
