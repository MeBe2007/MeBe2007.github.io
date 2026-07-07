const bugCount = 8;
const bugs = [];

for (let i = 0; i < bugCount; i++) {
    const bug = document.createElement('div');
    bug.className = 'forest-bug';
    
    // Choose a random edge to start on (0: Left, 1: Right, 2: Top, 3: Bottom)
    const edge = Math.floor(Math.random() * 4);
    let x = 0, y = 0;
    
    if (edge === 0) { x = 5; y = Math.random() * window.innerHeight; }
    else if (edge === 1) { x = window.innerWidth - 10; y = Math.random() * window.innerHeight; }
    else if (edge === 2) { x = Math.random() * window.innerWidth; y = 5; }
    else { x = Math.random() * window.innerWidth; y = window.innerHeight - 10; }

    document.body.appendChild(bug);

    bugs.push({
        element: bug,
        x: x,
        y: y,
        angle: Math.random() * Math.PI * 2, // Direction they are facing
        speed: Math.random() * 0.4 + 0.2,   // Slow, gentle crawling speed
        turnSpeed: 0,
        wobbleSpeed: Math.random() * 0.05 + 0.02,
        wobbleTime: Math.random() * 100,
        pulseDelay: Math.random() * 3
    });
}

// Frame-by-frame autonomous steering loop
function updateBugs() {
    bugs.forEach(bug => {
        bug.wobbleTime += bug.wobbleSpeed;
        
        // Perlin-style random steering so they wander smoothly like a real ant or fly
        bug.turnSpeed += (Math.random() - 0.5) * 0.1;
        bug.turnSpeed *= 0.9; // Friction so they don't spin wildly
        bug.angle += bug.turnSpeed;

        // Move forward in the direction they are facing
        bug.x += Math.cos(bug.angle) * bug.speed;
        bug.y += Math.sin(bug.angle) * bug.speed;

        // Force them to stick close to the margins of the screen
        const padding = 15; 
        if (bug.x < padding) { bug.x = padding; bug.angle = 0; }
        if (bug.x > window.innerWidth - padding) { bug.x = window.innerWidth - padding; bug.angle = Math.PI; }
        if (bug.y < padding) { bug.y = padding; bug.angle = Math.PI / 2; }
        if (bug.y > window.innerHeight - padding) { bug.y = window.innerHeight - padding; bug.angle = -Math.PI / 2; }

        // Apply physical coordinates and rotate the bug element to face its travel direction
        bug.element.style.transform = `translate3d(${bug.x}px, ${bug.y}px, 0) rotate(${bug.angle + Math.PI/2}rd)`;
    });
    
    requestAnimationFrame(updateBugs);
}
requestAnimationFrame(updateBugs);

// When scrolling happens, it gently alerts them, making them hasten up slightly
window.addEventListener('scroll', () => {
    bugs.forEach(bug => {
        bug.speed = Math.random() * 1.2 + 0.6; // Scurry temporarily
        setTimeout(() => {
            bug.speed = Math.random() * 0.4 + 0.2; // Return to a slow crawl
        }, 1200);
    });
});
