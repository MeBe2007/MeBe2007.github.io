document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    function generateSideProfileBracket(directionClass, isLeft, delay) {
        const id = `profile-shelf-${Math.floor(Math.random() * 10000)}`;
        
        const capTexture = `
            <filter id="cap-texture-${id}">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.35 0" />
                <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
                <feBlend mode="multiply" in="SourceGraphic" in2="monoNoise" />
            </filter>
        `;

        // Right-Facing Vector paths (Flat wall on the absolute left edge at X=0)
        const rightFacingHTML = (pId, cId) => `
            <g transform="translate(0, 35)">
                <path d="M 0,25 C 25,25 90,35 105,20 C 80,45 25,48 0,35 Z" fill="url(#${pId})" />
                <g stroke="#6b3a04" stroke-width="0.9" opacity="0.65" fill="none"><path d="M 5,30 Q 35,32 100,21" /><path d="M 10,33 Q 40,35 95,22" /><path d="M 15,36 Q 45,37 88,23" /></g>
                <path d="M 0,5 C 20,5 85,10 105,20 C 70,22 15,30 0,25 Z" fill="url(#${cId})" filter="url(#cap-texture-${id})" />
                <path d="M 0,6 C 20,6 85,11 105,20" stroke="#fde047" stroke-width="1.2" fill="none" opacity="0.35" />
            </g>
            <g transform="translate(0, 15) scale(0.88)">
                <path d="M 0,25 C 25,25 90,35 105,20 C 80,45 25,48 0,35 Z" fill="url(#${pId})" />
                <path d="M 0,5 C 20,5 85,10 105,20 C 70,22 15,30 0,25 Z" fill="url(#${cId})" filter="url(#cap-texture-${id})" />
            </g>
            <g transform="translate(0, -5) scale(0.72)">
                <path d="M 0,25 C 25,25 90,35 105,20 C 80,45 25,48 0,35 Z" fill="url(#${pId})" />
                <path d="M 0,5 C 20,5 85,10 105,20 C 70,22 15,30 0,25 Z" fill="url(#${cId})" filter="url(#cap-texture-${id})" />
            </g>
        `;

        // Left-Facing Vector paths (Flat wall on the absolute right edge at X=120)
        const leftFacingHTML = (pId, cId) => `
            <g transform="translate(0, 35)">
                <path d="M 120,25 C 95,25 30,35 15,20 C 40,45 95,48 120,35 Z" fill="url(#${pId})" />
                <g stroke="#6b3a04" stroke-width="0.9" opacity="0.65" fill="none"><path d="M 115,30 Q 85,32 20,21" /><path d="M 110,33 Q 80,35 25,22" /><path d="M 105,36 Q 75,37 32,23" /></g>
                <path d="M 120,5 C 100,5 35,10 15,20 C 50,22 105,30 120,25 Z" fill="url(#${cId})" filter="url(#cap-texture-${id})" />
                <path d="M 120,6 C 100,6 35,11 15,20" stroke="#fde047" stroke-width="1.2" fill="none" opacity="0.35" />
            </g>
            <g transform="translate(0, 15) scale(0.88) translate(16, 0)">
                <path d="M 120,25 C 95,25 30,35 15,20 C 40,45 95,48 120,35 Z" fill="url(#${pId})" />
                <path d="M 120,5 C 100,5 35,10 15,20 C 50,22 105,30 120,25 Z" fill="url(#${cId})" filter="url(#cap-texture-${id})" />
            </g>
            <g transform="translate(0, -5) scale(0.72) translate(46, 0)">
                <path d="M 120,25 C 95,25 30,35 15,20 C 40,45 95,48 120,35 Z" fill="url(#${pId})" />
                <path d="M 120,5 C 100,5 35,10 15,20 C 50,22 105,30 120,25 Z" fill="url(#${cId})" filter="url(#cap-texture-${id})" />
            </g>
        `;

        const svgContent = `
            <svg viewBox="0 0 120 100" width="100%" height="100%" style="overflow: visible;">
                <defs>
                    ${capTexture}
                    <linearGradient id="crustGrad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#211003" />
                        <stop offset="50%" stop-color="#4c1d95" />
                        <stop offset="85%" stop-color="#b45309" />
                        <stop offset="100%" stop-color="#f59e0b" />
                    </linearGradient>
                    <linearGradient id="poreGrad-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#fef08a" />
                        <stop offset="25%" stop-color="#fef9c3" />
                        <stop offset="100%" stop-color="#a16207" />
                    </linearGradient>
                </defs>
                
                <path d="${isLeft ? 'M 120,10 Q 90,30 100,90 Q 120,70 120,10 Z' : 'M 0,10 Q 30,30 20,90 Q 0,70 0,10 Z'}" fill="#030201" filter="blur(4px)" opacity="0.9" />
                
                ${isLeft ? leftFacingHTML(`poreGrad-${id}`, `crustGrad-${id}`) : rightFacingHTML(`poreGrad-${id}`, `crustGrad-${id}`)}
                
                <circle cx="${isLeft ? '90' : '30'}" cy="52" r="1.4" class="glow-spore" fill="#ffffff" />
                <circle cx="${isLeft ? '70' : '50'}" cy="32" r="1.1" class="glow-spore" fill="#ffffff" />
            </svg>
        `;

        return `
            <div class="shroom-specimen ${directionClass}" style="animation-delay: ${delay}s;">
                ${svgContent}
            </div>`;
    }

    sections.forEach((section) => {
        const boxLayer = document.createElement("div");
        boxLayer.className = "mycelium-box-layer";
        
        boxLayer.innerHTML = 
            generateSideProfileBracket('box-left-top', true, 0.1) +
            generateSideProfileBracket('box-left-bottom', 2.3) +
            generateSideProfileBracket('box-right-top', false, 0.7) +
            generateSideProfileBracket('box-right-bottom', 1.4);
            
        section.appendChild(boxLayer);
    });

    const screenLayer = document.createElement("div");
    screenLayer.className = "mycelium-screen-layer";
    screenLayer.innerHTML = 
        generateSideProfileBracket('screen-left-shroom', true, 0.5) +
        generateSideProfileBracket('screen-right-shroom', 1.9);
        
    document.body.appendChild(screenLayer);
});
