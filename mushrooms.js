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

        const singleTierHTML = (poreGradId, crustGradId) => `
            <path d="M 0,25 C 25,25 90,35 105,20 C 80,45 25,48 0,35 Z" fill="url(#${poreGradId})" />
            <g stroke="#6b3a04" stroke-width="0.9" opacity="0.65" fill="none">
                <path d="M 5,30 Q 35,32 100,21" />
                <path d="M 10,33 Q 40,35 95,22" />
                <path d="M 15,36 Q 45,37 88,23" />
                <path d="M 20,38 Q 48,39 80,24" />
                <path d="M 2,28 Q 30,30 103,21" />
                <path d="M 25,40 Q 50,40 72,25" />
            </g>
            <path d="M 0,5 C 20,5 85,10 105,20 C 70,22 15,30 0,25 Z" fill="url(#${crustGradId})" filter="url(#cap-texture-${id})" />
            <path d="M 0,6 C 20,6 85,11 105,20" stroke="#fde047" stroke-width="1.2" fill="none" opacity="0.35" />
        `;

        const svgContent = `
            <svg viewBox="0 0 120 100" width="120" height="100" style="overflow: visible;">
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
                
                <path d="M 0,10 Q 30,30 20,90 Q 0,70 0,10 Z" fill="#030201" filter="blur(4px)" opacity="0.9" />

                <g transform="translate(0, 35)">
                    ${singleTierHTML(`poreGrad-${id}`, `crustGrad-${id}`)}
                </g>

                <g transform="translate(0, 15) scale(0.88)">
                    ${singleTierHTML(`poreGrad-${id}`, `crustGrad-${id}`)}
                </g>

                <g transform="translate(0, -5) scale(0.72)">
                    ${singleTierHTML(`poreGrad-${id}`, `crustGrad-${id}`)}
                </g>

                <circle cx="30" cy="52" r="1.4" class="glow-spore" fill="#ffffff" />
                <circle cx="50" cy="32" r="1.1" class="glow-spore" fill="#ffffff" />
            </svg>
        `;

        // Left side elements point left, right side elements point right
        const flipTransform = isLeft ? 'scaleX(-1)' : '';

        return `
            <div class="shroom-specimen spec-shelf" style="
                position: absolute;
                ${offset}
                transform: ${flipTransform} scale(${scale});
                animation-delay: ${delay}s;
            ">${svgContent}</div>`;
    }

    // 1. FIXED GLASS BOX ALIGNMENTS
    sections.forEach((section) => {
        let growthHTML = '';
        
        // Left Edge: Adjusted to pull the base entirely out of the text window (-115px)
        growthHTML += generateSideProfileBracket(`left: -115px; top: 22%;`, true, 0.95, 0.1);
        growthHTML += generateSideProfileBracket(`left: -115px; top: 68%;`, true, 0.85, 2.3);

        // Right Edge: Shifted outward to flush the base cleanly against the glass border (-5px)
        growthHTML += generateSideProfileBracket(`right: -5px; top: 45%;`, false, 1.0, 1.4);

        const boxLayer = document.createElement("div");
        boxLayer.className = "mycelium-box-layer";
        boxLayer.innerHTML = growthHTML;
        section.appendChild(boxLayer);
    });

    // 2. FIXED VIEWPORT WINDOW ALIGNMENTS
    const screenLayer = document.createElement("div");
    screenLayer.className = "mycelium-screen-layer";
    let screenHTML = '';
    
    // Left monitor edge: Pulling it out from the absolute frame seam (-110px)
    screenHTML += generateSideProfileBracket(`left: -110px; top: 28vh;`, true, 1.3, 0.5);
    // Right monitor edge: Snapping it beautifully into the right gutter (-10px)
    screenHTML += generateSideProfileBracket(`right: -10px; top: 72vh;`, false, 1.2, 1.9);
    
    screenLayer.innerHTML = screenHTML;
    document.body.appendChild(screenLayer);
});
