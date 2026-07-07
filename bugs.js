const CONFIG = {
    crawlerCount: 4,
    flyerCount: 3
};

const bugs = [];

function createBugElement(type) {
    const container = document.createElement('div');
    container.className = `insect ${type}`;
    
    if (type === 'crawler') {
        container.innerHTML = `
            <svg viewBox="0 0 20 30" width="12" height="18">
                <path d="M2,10 L8,12 M2,15 L8,15 M2,20 L8,18" stroke="#112414" stroke-width="1.5"/>
                <path d="M18,10 L12,12 M18,15 L12,15 M18,20 L12,18" stroke="#112414" stroke-width="1.5"/>
                <ellipse cx="10" cy="15" rx="4" ry="7" fill="#16351c"/>
                <circle cx="10" cy="6" r="2.5" fill="#112414"/>
                <path d="M8,3 Q6,0 4,2 M12,3 Q14,0 16,2" stroke="#112414" stroke-width="1" fill="none"/>
            </svg>`;
    } else {
        container.innerHTML = `
            <svg viewBox="0 0 30 30" width="18" height="18">
                <circle cx="15" cy="20" r="3" fill="#ffffff" class="glow-core"/>
                <ellipse cx="8" cy="12" rx="6" ry="3" fill="rgba(57, 255, 20, 0.35)" class="left-wing"/>
                <ellipse cx="22" cy="12" rx="6" ry="3" fill="rgba(57, 255, 20, 0.35)" class="right-wing"/>
                <ellipse cx="15" cy="14" rx="1.5" ry="5" fill="#122015"/>
            </svg>`;
    }
    
    document.body.appendChild(container);
    return container;
}

// Initialization
for (let i = 0; i < CONFIG.crawlerCount; i++) {
    bugs.push({
        element: createBugElement('crawler'),
        type: 'crawler',
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.4 + 0.2,
        targetSpeed: Math.random() * 0.4 + 0.2,
        wobble: Math.random() * 100
    });
}

for (let i = 0; i < CONFIG.flyerCount; i++) {
    bugs.push({
        element: createBugElement('flyer'),
        type: 'flyer',
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.6 + 0.4,
        targetSpeed: Math.random() * 0.6 + 0.4,
        wobble: Math.random() * 100
    });
}

// Fixed constant animation loop
function loop() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    bugs.forEach(bug => {
        bug.wobble += 0.02;
        
        if (bug.type === 'crawler') {
            // Crawlers drift slowly across the full page, curving gently
            bug.angle += Math.sin(bug.wobble) * 0.03;
            
            // Bring down the speed slightly so they creep elegantly across cards
            bug.x += Math.cos(bug.angle) * bug.speed;
            bug.y += Math.sin(bug.angle) * bug.speed;
            
            // Seamless screen wrap so they walk entirely across your text blocks from side to side
            if (bug.x < -20) bug.x = width + 10;
            if (bug.x > width + 20) bug.x = -10;
            if (bug.y < -20) bug.y = height + 10;
            if (bug.y > height + 20) bug.y = -10;
        } else {
            // Flyers move in wider, looping curves directly across the viewport center
            bug.angle += Math.cos(bug.wobble) * 0.04;
            bug.x += Math.cos(bug.angle) * bug.speed;
            bug.y += Math.sin(bug.angle) * bug.speed;
            
            if (bug.x < -30) bug.x = width + 10;
            if (bug.x > width + 30) bug.x = -10;
            if (bug.y < -30) bug.y = height + 10;
            if (bug.y > height + 30) bug.y = -10;
        }

        // Apply position using highly stable transforms (avoids jitter entirely)
        bug.element.style.left = '0px';
        bug.element.style.top = '0px';
        bug.element.style.transform = `translate3d(${bug.x}px, ${bug.y}px, 0) rotate(${bug.angle + Math.PI/2}rad)`;
    });
    
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// Relaxed scroll interaction - just gives them a tiny panic burst without shifting coordinates
window.addEventListener('scroll', () => {
    bugs.forEach(bug => {
        bug.speed = bug.targetSpeed * 1.8;
        bug.angle += (Math.random() - 0.5) * 0.5;
        setTimeout(() => {
            bug.speed = bug.targetSpeed;
        }, 800);
    });
});
