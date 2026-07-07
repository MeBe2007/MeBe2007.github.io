document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    function generateSideProfileBracket(offset, isLeft, scale, delay) {
        const id = `profile-shelf-${Math.floor(Math.random() * 10000)}`;
        
        // Coarse, scaly texture filter for the leathery cap top
        const capTexture = `
            <filter id="cap-texture-${id}">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.35 0" />
                <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
                <feBlend mode="multiply" in="SourceGraphic" in2="monoNoise" />
            </filter>
        `;

        // SVGs designed to show a heavy top crust curving down into a thick pale under-belly
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
                    <path d="M 0,6 C 20,6 85,11 105,20" stroke="#fde047" stroke-width="1.2" fill="none" opacity="0.4" />
                </g>

                <g transform="translate(0, -5) scale(0.72)">
                    <path d="M 0,25 C 25,25 90,35 105,20 C 80,45 25,48 0,35 Z" fill="url(#poreGrad-${id})" />
                    <path d="M 0,5 C 20,5 85,10 105,20 C 70,22 15,30 0,25 Z" fill="url(#crustGrad-${id})" filter="url(#cap-texture-${id})" />
                </g>

                <circle cx="35" cy="48" r="1.5" class="glow-spore" fill="#ffffff" />
                <circle cx="55" cy="28" r="1.2" class="glow-spore" fill="#ffffff" />
                <circle cx="20" cy="72" r="1.3" class="glow-spore" fill="#ffffff" />
            </svg>
        `;

        // If growing on the right side of a trunk, flip the entire graphic horizontally
        const flipTransform = isLeft ? '' : 'scaleX(-1)';

        return `
            <div class="shroom-specimen spec-shelf" style="
                position: absolute;
                ${offset}
                transform: ${flipTransform} scale(${scale});
                animation-delay: ${delay}s;
            ">${svgContent}</div>`;
    }

    // 1. ANCHOR ON THE GLASS CARD TRUNKS
    sections.forEach((section) => {
        let growthHTML = '';
        
        // Left Edge of Card: Growing outward toward the left (set true to keep base orientation)
        growthHTML += generateSideProfileBracket(`left: -88px; top: 20%;`, true, 1.1, 0.1);
        growthHTML += generateSideProfileBracket(`left: -84px; top: 65%;`, true, 0.9, 2.3);

        // Right Edge of Card: Growing outward toward the right (set false to flip horizontally)
        growthHTML += generateSideProfileBracket(`right: -88px; top: 40%;`, false, 1.15, 1.4);

        const boxLayer = document.createElement("div");
        boxLayer.className = "mycelium-box-layer";
        boxLayer.innerHTML = growthHTML;
        section.appendChild(boxLayer);
    });

    // 2. ANCHOR ON THE SYSTEM SCREEN EDGE TRUNKS
    const screenLayer = document.createElement("div");
    screenLayer.className = "mycelium-screen-layer";
    let screenHTML = '';
    
    // Left viewport frame (Jutting into view)
    screenHTML += generateSideProfileBracket(`left: -75px; top: 30vh;`, true, 1.5, 0.5);
    // Right viewport frame (Jutting into view)
    screenHTML += generateSideProfileBracket(`right: -75px; top: 65vh;`, false, 1.4, 1.9);
    
    screenLayer.innerHTML = screenHTML;
    document.body.appendChild(screenLayer);
});
