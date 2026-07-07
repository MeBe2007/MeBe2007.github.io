document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    function generateSideProfileBracket(offset, isLeft, scale, delay) {
        const id = `profile-shelf-${Math.floor(Math.random() * 10000)}`;
        
        const capTexture = `
            <filter id="cap-texture-${id}">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.35 0" />
                <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
                <feBlend mode="multiply" in="SourceGraphic" in2="monoNoise" />
            </filter>
        `;

        const svgContent = `
            <svg viewBox="0 0 120 100" width="120" height="100" style="overflow: visible;">
                <defs>
                    ${capTexture}
                    <linearGradient id="crustGrad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#271302" />
                        <stop offset="50%" stop-color="#78350f" />
                        <stop offset="85%" stop-color="#b45309" />
                        <stop offset="100%" stop-color="#d97706" />
                    </linearGradient>
                    <linearGradient id="poreGrad-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#fef08a" />
                        <stop offset="30%" stop-color="#fef9c3" />
                        <stop offset="100%" stop-color="#ca8a04" />
                    </linearGradient>
                </defs>
                
                <path d="M 0,10 Q 30,30 20,90 Q 0,70 0,10 Z" fill="#040201" filter="blur(4px)" opacity="0.85" />

                <g transform="translate(0, 35)">
                    <path d="M 0,25 C 25,25 90,35 105,20 C 80,45 25,48 0,35 Z" fill="url(#poreGrad-${id})" />
                    <path d="M 0,5 C 20,5 85,10 105,20 C 70,22 15,30 0,25 Z" fill="url(#crustGrad-${id})" filter="url(#cap-texture-${id})" />
                    <path d="M 0,6 C 20,6 85,11 105,20" stroke="#fde047" stroke-width="1.2" fill="none" opacity="0.4" />
                </g>

                <g transform="translate(0, 15) scale(0.88)">
                    <path d="M 0,25 C 25,25 90,35 105,20 C 80,45 25,48 0,35 Z" fill="url(#poreGrad-${id})" />
                    <path d="M 0,5 C 20,5 85,10 105,20 C 70,22 15,30 0,25 Z" fill="url(#crustGrad-${id})" filter="url(#cap-texture-${id})" />
                </g>

                <g transform="translate(0, -5) scale(0.72)">
                    <path d="M 0,25 C 25,25 90,35 105,20 C 80,45 25,48 0,35 Z" fill="url(#poreGrad-${id})" />
                    <path d="M 0,5 C 20,5 85,10 105,20 C 70,22 15,30 0,25 Z" fill="url(#crustGrad-${id})" filter="url(#cap-texture-${id})" />
                </g>

                <circle cx="35" cy="48" r="1.5" class="glow-spore" fill="#ffffff" />
                <circle cx="55" cy="28" r="1.2" class="glow-spore" fill="#ffffff" />
            </svg>
        `;

        // If it's growing on the left edge, we flip it so it points outward to the left gutters
        const flipTransform = isLeft ? 'scaleX(-1)' : '';

        return `
            <div class="shroom-specimen spec-shelf" style="
                position: absolute;
                ${offset}
                transform: ${flipTransform} scale(${scale});
                animation-delay: ${delay}s;
            ">${svgContent}</div>`;
    }

    // 1. CONTENT BOX ANCHORS
    sections.forEach((section) => {
        let growthHTML = '';
        
        // Left Side: Shifted to pull the flipped base perfectly flush with the left frame track
        growthHTML += generateSideProfileBracket(`left: -15px; top: 25%;`, true, 1.0, 0.1);
        growthHTML += generateSideProfileBracket(`left: -15px; top: 65%;`, true, 0.85, 2.3);

        // Right Side: Anchored seamlessly pointing outward to the right gutters
        growthHTML += generateSideProfileBracket(`right: -15px; top: 45%;`, false, 1.05, 1.4);

        const boxLayer = document.createElement("div");
        boxLayer.className = "mycelium-box-layer";
        boxLayer.innerHTML = growthHTML;
        section.appendChild(boxLayer);
    });

    // 2. ABSOLUTE VIEWPORT SCREEN ANCHORS
    const screenLayer = document.createElement("div");
    screenLayer.className = "mycelium-screen-layer";
    let screenHTML = '';
    
    // Left screen frame edge
    screenHTML += generateSideProfileBracket(`left: -10px; top: 30vh;`, true, 1.4, 0.5);
    // Right screen frame edge
    screenHTML += generateSideProfileBracket(`right: -10px; top: 70vh;`, false, 1.3, 1.9);
    
    screenLayer.innerHTML = screenHTML;
    document.body.appendChild(screenLayer);
});
