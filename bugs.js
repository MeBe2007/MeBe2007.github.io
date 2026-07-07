const CONFIG = {
    crawlerCount: 5,
    flyerCount: 4,
    padding: 10
};

const bugs = [];

// Helper to inject raw SVG insect designs
function createBugElement(type) {
    const container = document.createElement('div');
    container.className = `insect ${type}`;
    
    if (type === 'crawler') {
        // A beetle/ant style shape with a body and tiny legs
        container.innerHTML = `
            <svg viewBox="0 0 20 30" width="12" height="18">
                <path d="M2,10 L8,12 M2,15 L8,15 M2,20 L8,18" stroke="#153019" stroke-width="1.5"/>
                <path d="M18,10 L12,12 M18,15 L12,15 M18,20 L12,18" stroke="#153019" stroke-width="1.5"/>
                <ellipse cx="10" cy="15" rx="4" ry="7" fill="#1b3d22"/>
                <circle cx="10" cy="6" r="2.5" fill="#153019"/>
                <path d="M8,3 Q6,0 4,2 M12,3 Q14,0 16,2" stroke="#153019" stroke-width="1" fill="none"/>
            </svg>`;
    } else {
        // A winged flyer with translucent bioluminescent wings
        container.innerHTML = `
            <svg viewBox="0 0 30 30" width="20" height="20">
                <circle cx="15" cy="20" r="3" fill="#ffffff" class="glow-core"/>
                <ellipse cx="9" cy="12" rx="6" ry="3" fill="rgba(57, 255, 20, 0.3)" transform="rotate(-30 9 12)" class="left-wing"/>
                <ellipse cx="21" cy="12" rx="6" ry="3" fill="rgba(57, 255, 20, 0.3)" transform="rotate(30 21 12)" class="right-wing"/>
                <ellipse cx="15" cy="14" rx="2" ry="5" fill="#1f2e22"/>
            </svg>`;
    }
    
    document.body.appendChild(container);
    return container;
}

// Spawn the crawling population
for (let i = 0; i < CONFIG.crawlerCount; i++) {
    bugs.push({
        element: createBugElement('crawler'),
        type: 'crawler',
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.3 + 0.1,
        turnTimer: Math.random() * 100
    });
}

// Spawn the flying population
for (let i = 0; i < CONFIG.flyerCount; i++) {
    bugs.push({
        element: createBugElement('flyer'),
        type: 'flyer',
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.8 + 0.5,
        targetSpeed: Math.random() * 0.8 + 0.5,
        driftX: Math.random() * 100,
        driftY: Math.random() * 100
    });
}

// Global Animation Loop running constantly in the background
function loop() {
    bugs.forEach(bug => {
        if (bug.type === 'crawler') {
            // Crawlers move slowly, pause occasionally, and stay near borders/edges
            bug.turnTimer--;
            if (bug.turnTimer <= 0) {
                bug.angle += (Math.random() - 0.5) * 1.5;
                bug.turnTimer = Math.random() * 150 + 50;
                // Occasional sudden scurry or stop
                bug.speed = Math.random() > 0.3 ? Math.random() * 0.3 + 0.1 : 0;
            }
            
            bug.x += Math.cos(bug.angle) * bug.speed;
            bug.y += Math.sin(bug.angle) * bug.speed;
            
            // Constrain tightly to screen boundaries
            if (bug.x < CONFIG.padding) { bug.x = CONFIG.padding; bug.angle = 0; }
            if (bug.x > window.innerWidth - CONFIG.padding - 12) { bug.x = window.innerWidth - CONFIG.padding - 12; bug.angle = Math.PI; }
            if (bug.y < CONFIG.padding) { bug.y = CONFIG.padding; bug.angle = Math.PI / 2; }
            if (bug.y > window.innerHeight - CONFIG.padding - 18) { bug.y = window.innerHeight - CONFIG.padding - 18; bug.angle = -Math.PI / 2; }

        } else {
            // Flyers drift completely across the entire screen in organic, fluid curves
            bug.driftX += 0.01;
            bug.driftY += 0.01;
            
            // Subtle angle changes using natural math drift paths
            bug.angle += (Math.sin(bug.driftX) * 0.02) + (Math.random() - 0.5) * 0.05;
            
            bug.x += Math.cos(bug.angle) * bug.speed;
            bug.y += Math.sin(bug.angle) * bug.speed;
            
            // Screen wrapping: when a flyer leaves one side, it smoothly emerges on the other
            if (bug.x < -30) bug.x = window.innerWidth + 10;
            if (bug.x > window.innerWidth + 30) bug.x = -10;
            if (bug.y < -30) bug.y = window.innerHeight + 10;
            if (bug.y > window.innerHeight + 30) bug.y = -10;
        }
        
        // Render coordinates and make their bodies head in the direction they are traveling
        bug.element.style.transform = `translate3d(${bug.x}px, ${bug.y}px, 0) rotate(${bug.angle + Math.PI/2}rad)`;
    });
    
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// Gentle disturbance behavior if someone scrolls, returning to normal instantly
window.addEventListener('scroll', () => {
    bugs.forEach(bug => {
        if (bug.type === 'flyer') {
            bug.speed = bug.targetSpeed * 2.5;
            setTimeout(() => bug.speed = bug.targetSpeed, 1000);
        } else {
            bug.speed = 0.8;
            bug.angle += (Math.random() - 0.5) * 2;
        }
    });
});
