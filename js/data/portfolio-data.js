// Portfolio Data - Centralized content management
export const portfolioData = {
    personal: {
        name: "Hadi Indrawan",
        title: "Lead QA Engineer",
        subtitle: "Test Automation & Quality Strategist",
        description: "Lead QA Engineer with 4+ years of experience leading quality assurance initiatives for fintech and payment systems, specializing in comprehensive test strategies and advanced automation frameworks.",
        email: "hadiindrawan157@gmail.com",
        phone: "+62 878-3000-0351",
        location: "Indonesia",
        resumeUrl: "https://drive.google.com/file/d/1Az5IgcpdmKKX2izM6GxapRmz93guJi15/view?usp=sharing"
    },

    navigation: [
        { text: "Home", href: "#home", icon: "home" },
        { text: "About", href: "#about", icon: "user" },
        { text: "Skills", href: "#skills", icon: "code" },
        { text: "Projects", href: "#projects", icon: "briefcase" },
        { text: "Tools", href: "#tools", icon: "settings" },
        { text: "Contact", href: "#contact", icon: "mail" }
    ],

    social: [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/hadi-indrawan/",
            icon: "linkedin",
            color: "#0077B5"
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/hadiindrawann/",
            icon: "instagram",
            color: "#E4405F"
        },
        {
            name: "WhatsApp",
            url: "https://wa.me/6287830000351/",
            icon: "whatsapp",
            color: "#25D366"
        },
        {
            name: "Email",
            url: "mailto:hadiindrawan157@gmail.com",
            icon: "mail",
            color: "#EA4335"
        }
    ],

    about: {
        description: [
            "I'm currently working at **Matchmade** as a Lead QA Engineer, where I lead quality assurance initiatives for payment systems, matching and reconciliation solutions that ensure transaction integrity.",
            "With a proven track record in fintech and payment systems, I specialize in developing comprehensive test strategies, from manual exploratory testing to sophisticated automation frameworks using **Playwright** and modern testing tools.",
            "My leadership experience includes managing QA teams, implementing quality metrics, and collaborating with cross-functional teams to deliver robust, scalable solutions that meet business requirements and ensure exceptional user experiences."
        ],
        highlights: [
            "4+ years in Quality Assurance",
            "Lead QA Engineer & Team Management",
            "Payment Systems & Fintech Expertise",
            "Advanced Test Automation with Playwright",
            "Quality Metrics & Process Improvement"
        ]
    },

    skills: [
        {
            id: 1,
            title: "Manual Testing",
            description: "Comprehensive manual testing strategies including exploratory, functional, and usability testing.",
            icon: "/asset/mobile.png",
            color: "#A0956B",
            expertise: "Expert"
        },
        {
            id: 2,
            title: "Test Automation",
            description: "Advanced automation frameworks using Playwright, Selenium, Cypress, and custom solutions.",
            icon: "/asset/design.png",
            color: "#8B7D6B",
            expertise: "Expert"
        },
        {
            id: 3,
            title: "API Testing",
            description: "RESTful API testing, performance testing, and automated API validation frameworks.",
            icon: "/asset/web.png",
            color: "#6B5B47",
            expertise: "Advanced"
        },
        {
            id: 4,
            title: "Mobile Testing",
            description: "Native and hybrid mobile app testing across iOS and Android platforms using Appium.",
            icon: "/asset/engineer.png",
            color: "#A0956B",
            expertise: "Advanced"
        }
    ],

    projects: [
        {
            id: 1,
            title: "Hijra Bank Mobile App",
            description: "Comprehensive QA for Islamic digital banking application, implementing both manual and automated testing strategies for critical financial transactions.",
            image: "/asset/hijra.png",
            technologies: ["Appium", "TestRail", "API Testing", "Security Testing"],
            category: "Mobile Banking",
            year: "2024",
            status: "Production"
        },
        {
            id: 2,
            title: "DPR RI Website Revamp",
            description: "Quality assurance for the Indonesian House of Representatives website modernization project, focusing on accessibility and user experience.",
            image: "/asset/dpr.png",
            technologies: ["Selenium", "Accessibility Testing", "Performance Testing"],
            category: "Government Portal",
            year: "2023",
            status: "Live"
        },
        {
            id: 3,
            title: "PJT II Customer System",
            description: "Testing infrastructure for Perum Jasa Tirta II customer management system, ensuring reliable service delivery for state-owned enterprise.",
            image: "/asset/pjt.jpg",
            technologies: ["Playwright", "Database Testing", "Integration Testing"],
            category: "Enterprise System",
            year: "2023",
            status: "Production"
        },
        {
            id: 4,
            title: "Automation Generator from Postman Collection",
            description: "Developed automation library that generates test code from Postman collections, streamlining API test automation setup.",
            image: "/asset/pogen.png",
            technologies: ["JavaScript", "Node.js", "Postman API", "Code Generation"],
            category: "Open Source Tool",
            year: "2024",
            status: "Active Development"
        },
        {
            id: 5,
            title: "Moladin Fintech Platform",
            description: "Comprehensive testing for automotive financing platform, including CRM systems and customer-facing applications.",
            image: "/asset/moladin.png",
            technologies: ["Cypress", "Mocha", "API Testing", "E2E Testing"],
            category: "Fintech Platform",
            year: "2024",
            status: "Ongoing"
        }
    ],

    tools: [
        {
            name: "JavaScript",
            image: "/asset/js.png",
            category: "Programming Language"
        },
        {
            name: "Java",
            image: "/asset/java.png",
            category: "Programming Language"
        },
        {
            name: "TestRail",
            image: "/asset/testrail.png",
            category: "Test Management"
        },
        {
            name: "Qase.io",
            image: "/asset/qaseio.png",
            category: "Test Management"
        },
        {
            name: "Selenium",
            image: "/asset/selenium.png",
            category: "Automation Framework"
        },
        {
            name: "Mocha",
            image: "/asset/mocha.png",
            category: "Testing Framework"
        },
        {
            name: "Playwright",
            image: "/asset/playwright.png",
            category: "Automation Framework"
        },
        {
            name: "Cypress",
            image: "/asset/cypress.png",
            category: "Automation Framework"
        },
        {
            name: "Appium",
            image: "/asset/appium.png",
            category: "Mobile Testing"
        },
        {
            name: "Postman",
            image: "/asset/postman.png",
            category: "API Testing"
        },
        {
            name: "Vue.js",
            image: "/asset/vue.png",
            category: "Frontend Framework"
        },
        {
            name: "Laravel",
            image: "/asset/laravel.png",
            category: "Backend Framework"
        },
        {
            name: "GitLab",
            image: "/asset/gitlab.png",
            category: "DevOps"
        },
        {
            name: "Git",
            image: "/asset/git.png",
            category: "Version Control"
        },
        {
            name: "GitHub",
            image: "/asset/github.png",
            category: "Version Control"
        },
        {
            name: "PostgreSQL",
            image: "/asset/postgresql.png",
            category: "Database"
        },
        {
            name: "MySQL",
            image: "/asset/mysql.png",
            category: "Database"
        },
        {
            name: "Figma",
            image: "/asset/figma.png",
            category: "Design Tool"
        }
    ],

    testimonials: [
        {
            name: "Tech Lead",
            company: "Moladin Indonesia",
            text: "Hadi's attention to detail and systematic approach to quality assurance has been instrumental in maintaining our high standards.",
            rating: 5
        }
    ],

    experience: [
        {
            title: "Senior SDET",
            company: "Moladin Indonesia",
            period: "2023 - Present",
            description: "Leading test automation initiatives for fintech products, implementing comprehensive testing strategies.",
            technologies: ["Playwright", "Cypress", "API Testing", "CI/CD"]
        }
    ],

    education: [
        {
            degree: "Bachelor's Degree",
            institution: "University",
            year: "2020",
            description: "Computer Science and Software Engineering fundamentals"
        }
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