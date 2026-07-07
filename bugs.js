const bugCount = 6; // Total number of bugs active on the screen edges
const bugs = [];

for (let i = 0; i < bugCount; i++) {
    const bug = document.createElement('div');
    bug.className = 'forest-bug';
    
    // Randomly scatter them along the left or right edges initially
    const side = Math.random() > 0.5 ? 0 : window.innerWidth - 10;
    const top = Math.random() * window.innerHeight;
    
    bug.style.left = `${side}px`;
    bug.style.top = `${top}px`;
    
    // Give each bug a unique, slight variation in bioluminescent glow size
    bug.style.boxShadow = `0 0 ${Math.random() * 6 + 4}px #39ff14`;
    
    document.body.appendChild(bug);
    
    // Store their positioning metadata
    bugs.push({
        element: bug,
        x: side,
        y: top,
        targetY: top,
        speed: Math.random() * 0.08 + 0.02,
        side: side === 0 ? 'left' : 'right'
    });
}

// Whenever the user scrolls, stir up the bugs and push them along the screen
window.addEventListener('scroll', () => {
    const scrollDelta = window.scrollY;
    
    bugs.forEach(bug => {
        // Skitter up or down randomly in reaction to the scroll momentum
        const movement = (Math.random() - 0.5) * 60;
        bug.targetY = (bug.y + movement + (scrollDelta * 0.1)) % window.innerHeight;
        
        // Prevent them from climbing entirely off the screen limits
        if (bug.targetY < 0) bug.targetY = window.innerHeight;
    });
});

// Frame-by-frame animation loop to make their movement look organic and smooth
function animateBugs() {
    bugs.forEach(bug => {
        // Smooth interpolation (lerp) so they glide instead of snap teleporting
        bug.y += (bug.targetY - bug.y) * bug.speed;
        
        // Keep them locked strictly to the edge boundaries so they don't block text
        if (bug.side === 'left') {
            bug.element.style.left = '2px';
        } else {
            bug.element.style.left = `${window.innerWidth - 8}px`;
        }
        
        bug.element.style.top = `${bug.y}px`;
    });
    requestAnimationFrame(animateBugs);
}
animateBugs();

// Keep the bugs pinned to the true edges if the screen is resized
window.addEventListener('resize', () => {
    bugs.forEach(bug => {
        if (bug.side === 'right') bug.x = window.innerWidth - 10;
    });
});
