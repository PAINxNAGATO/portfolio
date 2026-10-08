/**
 * Ashutosh Aswani - Portfolio Interactivity
 */

// --- 1. UTILITIES & LERP ---
const lerp = (start, end, factor) => start + (end - start) * factor;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// --- 2. SMOOTH SCROLLING (LENIS + GSAP) ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0, 0);

// --- 3. CUSTOM CURSOR SYSTEM ---
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
const cursorText = document.getElementById('cursor-text');

let cursorRingX = 0, cursorRingY = 0;

function animateCursor() {
    // Dot moves instantly (almost)
    cursorDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
    
    // Ring uses spring-like lerp
    cursorRingX = lerp(cursorRingX, mouseX, 0.15);
    cursorRingY = lerp(cursorRingY, mouseY, 0.15);
    cursorRing.style.transform = `translate(calc(${cursorRingX}px - 50%), calc(${cursorRingY}px - 50%))`;
    
    requestAnimationFrame(animateCursor);
}

if(window.innerWidth > 768) {
    animateCursor();
    
    // Hover triggers
    const hoverElements = document.querySelectorAll('[data-cursor]');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
            cursorText.textContent = el.getAttribute('data-cursor');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

// --- 4. MAGNETIC EFFECTS ---
const magneticElements = document.querySelectorAll('[data-magnetic], .magnetic-btn');

magneticElements.forEach(el => {
    el.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(this, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.8,
            ease: "power3.out"
        });
    });
    
    el.addEventListener('mouseleave', function() {
        gsap.to(this, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
        });
    });
});

// --- 5. PARALLAX FLOATING OBJECTS ---
const floaters = document.querySelectorAll('.floating-obj');
floaters.forEach(el => {
    const speed = el.getAttribute('data-speed');
    gsap.to(el, {
        y: () => -window.innerHeight * speed,
        ease: "none",
        scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

// --- 6. SCROLL REVEALS & TIMELINE ---
const reveals = document.querySelectorAll('[data-scroll-reveal]');
reveals.forEach(el => {
    gsap.fromTo(el, 
        { opacity: 0, y: 50 },
        {
            opacity: 1, y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
            }
        }
    );
});

// Timeline progress
gsap.to('.timeline-progress', {
    height: "100%",
    ease: "none",
    scrollTrigger: {
        trigger: ".exp-container",
        start: "top 50%",
        end: "bottom 50%",
        scrub: true,
        onUpdate: (self) => {
            const nodes = document.querySelectorAll('.timeline-node');
            const progress = self.progress;
            nodes.forEach((node, i) => {
                if (progress > (i / (nodes.length - 1)) - 0.1) {
                    node.classList.add('active');
                } else {
                    node.classList.remove('active');
                }
            });
        }
    }
});

// --- 7. TYPEWRITER EFFECT ---
const codeString = `def solve(problem):
    """
    The Harsh framework for 
    handling complex engineering.
    """
    understand(problem)
    simplify(problem)
    measure(problem)
    optimize(problem)
    
    return elegant_solution`;

const typingTarget = document.getElementById('typing-code');
let isTyping = false;

ScrollTrigger.create({
    trigger: ".code-section",
    start: "top 60%",
    onEnter: () => {
        if(!isTyping) {
            isTyping = true;
            let i = 0;
            typingTarget.innerHTML = '';
            function typeChar() {
                if(i < codeString.length) {
                    typingTarget.innerHTML += codeString.charAt(i);
                    i++;
                    setTimeout(typeChar, 30 + Math.random() * 40);
                }
            }
            typeChar();
        }
    }
});

// --- 8. THREE.JS HERO SPHERE ---
function initThreeSphere() {
    const container = document.getElementById('hero-webgl');
    if(!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    const colorPrimary = new THREE.Color(0x7C3AED); // Violet
    const colorSecondary = new THREE.Color(0x00E5FF); // Cyan

    for(let i = 0; i < particlesCount * 3; i+=3) {
        // Create spherical distribution
        const r = 2 + Math.random();
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        
        posArray[i] = r * Math.sin(phi) * Math.cos(theta);
        posArray[i+1] = r * Math.sin(phi) * Math.sin(theta);
        posArray[i+2] = r * Math.cos(phi);

        // Mix colors
        const mixedColor = colorPrimary.clone().lerp(colorSecondary, Math.random());
        colorsArray[i] = mixedColor.r;
        colorsArray[i+1] = mixedColor.g;
        colorsArray[i+2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const material = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);
    
    // Add wireframe sphere around it
    const sphereGeo = new THREE.IcosahedronGeometry(2.5, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
        color: 0x7C3AED,
        wireframe: true,
        transparent: true,
        opacity: 0.05
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphereMesh);

    camera.position.z = 5;

    let targetRotationX = 0;
    let targetRotationY = 0;

    function render() {
        requestAnimationFrame(render);
        
        // Mouse interaction
        const mouseNormX = (mouseX / window.innerWidth) - 0.5;
        const mouseNormY = (mouseY / window.innerHeight) - 0.5;
        
        targetRotationY = mouseNormX * Math.PI;
        targetRotationX = mouseNormY * Math.PI * 0.5;

        particlesMesh.rotation.y += 0.002;
        particlesMesh.rotation.x += 0.001;
        
        // Lerp to target rotation
        scene.rotation.y = lerp(scene.rotation.y, targetRotationY, 0.05);
        scene.rotation.x = lerp(scene.rotation.x, targetRotationX, 0.05);

        renderer.render(scene, camera);
    }
    
    render();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}
initThreeSphere();

// --- 9. GLOBAL CANVAS PARTICLES ---
function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.baseX = this.x;
            this.baseY = this.y;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 0.5;
            this.color = Math.random() > 0.5 ? 'rgba(124, 58, 237, 0.3)' : 'rgba(0, 229, 255, 0.3)';
        }
        
        update() {
            // Drift
            this.x += this.vx;
            this.y += this.vy;
            
            // Mouse interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.hypot(dx, dy);
            
            if (dist < 150) {
                const force = (150 - dist) / 150;
                this.x -= (dx / dist) * force * 2;
                this.y -= (dy / dist) * force * 2;
            }
            
            // Return to bounds
            if(this.x < 0) this.x = width;
            if(this.x > width) this.x = 0;
            if(this.y < 0) this.y = height;
            if(this.y > height) this.y = 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    for(let i=0; i<60; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}
initAmbientCanvas();

// --- 10. SKILLS CONSTELLATION ---
const skills = [
    { name: "Python", x: 20, y: 30 },
    { name: "C++", x: 40, y: 15 },
    { name: "Redis", x: 60, y: 25 },
    { name: "MongoDB", x: 80, y: 40 },
    { name: "SQL", x: 70, y: 60 },
    { name: "TCP/IP", x: 45, y: 80 },
    { name: "Flask", x: 25, y: 65 },
    { name: "Airflow", x: 15, y: 85 },
    { name: "Linux", x: 85, y: 80 }
];

const constellation = document.getElementById('constellation');
if(constellation) {
    skills.forEach(skill => {
        const node = document.createElement('div');
        node.className = 'skill-node';
        node.innerHTML = `<div class="dot"></div><span>${skill.name}</span>`;
        node.style.left = `${skill.x}%`;
        node.style.top = `${skill.y}%`;
        node.setAttribute('data-cursor', 'EXPAND');
        constellation.appendChild(node);
        
        // Add random drift animation
        gsap.to(node, {
            x: () => (Math.random() - 0.5) * 30,
            y: () => (Math.random() - 0.5) * 30,
            duration: () => 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
}

// Contact orb follows mouse slowly
const orb = document.querySelector('.contact-orb');
if(orb) {
    window.addEventListener('mousemove', () => {
        // Find position within contact section
        const contactSection = document.getElementById('contact');
        const rect = contactSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const relX = mouseX - rect.left - (orb.clientWidth / 2);
            const relY = mouseY - rect.top - (orb.clientHeight / 2);
            
            gsap.to(orb, {
                x: relX * 0.3,
                y: relY * 0.3,
                duration: 2,
                ease: "power2.out"
            });
        }
    });
}
