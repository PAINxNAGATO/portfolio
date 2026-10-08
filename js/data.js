const portfolioData = {
    profile: {
        name: "Harsh Singh Rawat",
        title: "Software Engineer",
        email: "harshrawat349@gmail.com",
        phone: "+91-9264940331",
        linkedin: "https://linkedin.com/in/harsh-singh-rawat",
        github: "https://github.com/harshrawat349", // Added placeholder since resume says "GitHub"
        website: "#", // Placeholder
        about: "Software engineer skilled in Python, C++, SQL, Linux, trading/risk systems, financial data pipelines, and deployment infrastructure. Strong DSA background, with exposure to PnL attribution, risk reporting, and fund accounting."
    },
    experience: [
        {
            company: "AlphaGrep",
            role: "Analyst (Python Developer)",
            location: "GIFT City, India",
            period: "Jan. 2025 - Present",
            subsections: [
                {
                    title: "UK Fund Accounting",
                    points: [
                        "Built accounting pipelines for UK funds covering cash flows, PnL attribution, forwards, GSECs, and withholding tax using Python and SQL.",
                        "Built a Flask fund backend for GSECs, forwards, and cash entries, with PnL recon views orchestrated via Airflow DAGs."
                    ]
                },
                {
                    title: "Deployer",
                    points: [
                        "Built a Python/TCP deployment server managing binary and config releases across hundreds of machines.",
                        "Built deployment workflows handling Git pull/commit, async binary transfer, MongoDB updates, and Slack alerts.",
                        "Built a cron-based rollout scheduler with Redis deduplication for safe, incremental deploys."
                    ]
                },
                {
                    title: "CMS (Config Management System)",
                    points: [
                        "Built a visual Query Builder UI for CMS config changes, letting users filter, edit, and delete entries without SQL.",
                        "Built a Preview-and-Commit flow for non-binary releases with bulk edits and row-diff highlighting."
                    ]
                },
                {
                    title: "RMS (Risk Management System)",
                    points: [
                        "Built risk analytics modules using Python and finance metrics.",
                        "Automated daily/monthly risk reporting and PDF generation (ReportLab, Dash)."
                    ]
                }
            ]
        },
        {
            company: "BNKM India Private Limited",
            role: "Associate Software Developer",
            location: "India",
            period: "May 2024 - Nov. 2024",
            subsections: [
                {
                    title: "Responsibilities",
                    points: [
                        "Helped implement an ERP system to streamline manufacturing and inventory tracking.",
                        "Built API integrations linking shop floor systems with the e-commerce platform.",
                        "Supported dashboards and predictive maintenance systems that reduced equipment downtime."
                    ]
                }
            ]
        }
    ],
    projects: [
        {
            title: "FEC Scheme Identification",
            technologies: ["Python", "TensorFlow", "Keras", "Sionna", "Commpy", "RNN", "Matlab"],
            description: "Built a blind classifier using a 7-layer RNN (3 LSTM + 4 Dense) to identify FEC schemes from demodulated signals.",
            link: "#"
        },
        {
            title: "Bitcoin Block Miner",
            technologies: ["Python", "hashlib", "ECDSA", "Crypto", "Linux"],
            description: "Built a Bitcoin consensus simulator for block construction via transaction filtering, script evaluation, and Merkle root calculation.",
            link: "#"
        }
    ],
    skills: [
        {
            category: "Languages",
            items: ["C++", "C", "Python", "SQL", "HTML/CSS", "JavaScript", "Matlab"]
        },
        {
            category: "Concepts",
            items: ["Data Structures and Algorithms (DSA)", "Machine Learning/Deep Learning", "Scheduling (Cron, DAGs)", "Data Analysis"]
        },
        {
            category: "Tools & Frameworks",
            items: ["Flask", "MERN Stack", "ERP Systems", "ReportLab", "Dash", "Git", "Linux"]
        },
        {
            category: "Infrastructure",
            items: ["Airflow", "Redis", "MongoDB", "TCP/IP", "Trade Finance (RMS)"]
        }
    ],
    achievements: [
        {
            title: "Smart India Hackathon 2023",
            description: "Finalist, top 2% among 44,000+ teams nationally."
        },
        {
            title: "Summer of Bitcoin 2023",
            description: "Successfully completed the program as a selected participant, gaining hands-on experience in Bitcoin and open-source development."
        },
        {
            title: "e-Yantra Robotics Competition 2023",
            description: "Semi-Finalist, represented the institute in a 4-person team."
        },
        {
            title: "Codeforces",
            description: "Ranked Specialist (rating 1510)."
        },
        {
            title: "CodeChef",
            description: "Achieved a 3★ rating."
        }
    ],
    education: [
        {
            institution: "Indian Institute of Information Technology Kalyani, India",
            degree: "Bachelor of Technology in Electronics and Communication Engineering",
            duration: "Dec. 2021 - Present",
            details: "CGPA: 8.31/10.0"
        },
        {
            institution: "Stella Maris Inter College, Lucknow, India",
            degree: "Higher Secondary (Science - PCM)",
            duration: "Apr. 2018 - Apr. 2020",
            details: "Result: 94%"
        }
    ]
};
