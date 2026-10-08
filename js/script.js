document.addEventListener('DOMContentLoaded', () => {
    // Inject Data
    renderAbout();
    renderExperience();
    renderSkills();
    renderProjects();
    renderAchievements();
    renderEducation();

    // Init Interactions
    initTerminalAnimation();
    initNavigation();
    initScrollReveal();
    initExperienceAccordion();
    initBackToTop();
});

// --- Data Rendering Functions ---

function renderAbout() {
    const aboutContent = document.getElementById('about-content');
    aboutContent.innerHTML = `<p>${portfolioData.profile.about}</p>`;
}

function renderExperience() {
    const expContainer = document.getElementById('experience-timeline');
    let html = '';

    portfolioData.experience.forEach(job => {
        html += `
        <div class="exp-item">
            <div class="exp-header">
                <div>
                    <span class="exp-role">${job.role}</span>
                    <span class="exp-company"> @ ${job.company}</span>
                </div>
                <div class="exp-period">${job.period} | ${job.location}</div>
            </div>
        `;
        
        if (job.subsections && job.subsections.length > 0) {
            job.subsections.forEach(sub => {
                html += `
                <div class="exp-sub">
                    <div class="exp-sub-title">${sub.title}</div>
                    <ul class="exp-points">
                        ${sub.points.map(p => `<li>${p}</li>`).join('')}
                    </ul>
                </div>
                `;
            });
        }
        
        html += `</div>`;
    });

    expContainer.innerHTML = html;
}

function renderSkills() {
    const skillsContainer = document.getElementById('skills-container');
    let html = '';

    portfolioData.skills.forEach(skillGrp => {
        html += `
        <div class="skill-category">
            <h3>${skillGrp.category}</h3>
            <ul class="skill-list">
                ${skillGrp.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        `;
    });

    skillsContainer.innerHTML = html;
}

function renderProjects() {
    const projContainer = document.getElementById('projects-grid');
    let html = '';

    portfolioData.projects.forEach(proj => {
        html += `
        <div class="project-card">
            <div class="project-header">
                <h3 class="project-title">${proj.title}</h3>
                <div class="project-links">
                    ${proj.link !== '#' ? `<a href="${proj.link}" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>` : ''}
                </div>
            </div>
            <p class="project-desc">${proj.description}</p>
            <div class="project-tech">
                ${proj.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        </div>
        `;
    });

    projContainer.innerHTML = html;
}

function renderAchievements() {
    const achContainer = document.getElementById('achievements-list');
    let html = '';

    portfolioData.achievements.forEach(ach => {
        html += `
        <div class="achievement-card">
            <div class="achievement-title">${ach.title}</div>
            <div class="achievement-desc">${ach.description}</div>
        </div>
        `;
    });

    achContainer.innerHTML = html;
}

function renderEducation() {
    const eduContainer = document.getElementById('education-grid');
    let html = '';

    portfolioData.education.forEach(edu => {
        html += `
        <div class="edu-card">
            <div class="edu-degree">${edu.degree}</div>
            <div class="edu-inst">${edu.institution}</div>
            <div class="edu-meta">
                <span>${edu.duration}</span>
                <span>${edu.details}</span>
            </div>
        </div>
        `;
    });

    eduContainer.innerHTML = html;
}


// --- Interactions ---

function initTerminalAnimation() {
    const terminal = document.getElementById('hero-terminal');
    const details = document.getElementById('hero-details');
    
    const lines = [
        "initializing portfolio...",
        "loading systems...",
        "parsing profile data...",
        "ready."
    ];

    let currentLine = 0;

    function typeLine() {
        if (currentLine < lines.length) {
            const lineElem = document.createElement('div');
            lineElem.className = 'terminal-line';
            lineElem.innerHTML = `<span class="terminal-prompt">$</span>${lines[currentLine]}`;
            terminal.appendChild(lineElem);
            currentLine++;
            setTimeout(typeLine, 300); // 300ms delay between lines
        } else {
            setTimeout(() => {
                terminal.style.display = 'none';
                details.classList.remove('hidden');
                details.classList.add('fade-in');
            }, 400);
        }
    }

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        terminal.style.display = 'none';
        details.classList.remove('hidden');
    } else {
        setTimeout(typeLine, 500);
    }
}

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // Sticky Nav
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.section-reveal');
    
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        reveals.forEach(reveal => reveal.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(reveal => observer.observe(reveal));
}

function initExperienceAccordion() {
    const expContainers = document.querySelectorAll('.exp-sub-title');
    
    expContainers.forEach(title => {
        title.addEventListener('click', () => {
            const parent = title.parentElement;
            parent.classList.toggle('expanded');
        });
        
        // Expand the first one by default if it's the first job
        if(title === expContainers[0]) {
             title.parentElement.classList.add('expanded');
        }
    });
}

function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
