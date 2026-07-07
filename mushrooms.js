document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    function generateSideProfileBracket(offset, isLeft, scale, delay) {
        const id = `profile-shelf-${Math.floor(Math.random() * 10000)}`;
        
        // Dynamic device sizing: scale down significantly if the screen is a phone
        const isMobile = window.innerWidth < 768;
        const finalScale = isMobile ? (scale * 0.55).toFixed(2) : scale;

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
                
                <path d="M 0,10 Q 30,30 20,90 Q 0,70 0,10 Z" fill="#030201" filter="blur(4px)" opacity="0.9" />
                <g transform="translate(0, 35)">${singleTierHTML(`poreGrad-${id}`, `crustGrad-${id}`)}</g>
                <g transform="translate(0, 15) scale(0.88)">${singleTierHTML(`poreGrad-${id}`, `crustGrad-${id}`)}</g>
                <g transform="translate(0, -5) scale(0.72)">${singleTierHTML(`poreGrad-${id}`, `crustGrad-${id}`)}</g>
                <circle cx="30" cy="52" r="1.4" class="glow-spore" fill="#ffffff" />
                <circle cx="50" cy="32" r="1.1" class="glow-spore" fill="#ffffff" />
            </svg>
        `;

        const flipTransform = isLeft ? 'scaleX(-1)' : '';

        // Using flexible rem sizes for container bounding boxes to scale seamlessly
        return `
            <div class="shroom-specimen spec-shelf" style="
                position: absolute;
                width: ${isMobile ? '45px' : '95px'};
                height: ${isMobile ? '38px' : '80px'};
                ${offset}
                transform: ${flipTransform} scale(${finalScale});
                animation-delay: ${delay}s;
            ">${svgContent}</div>`;
    }

    // 1. CARDS COLONIZATION (Responsive offsets)
    sections.forEach((section) => {
        let growthHTML = '';
        const isMobile = window.innerWidth < 768;
        
        // Left Edge Anchors: Uses responsive percentage/viewport overrides
        const leftOffset = isMobile ? 'left: -32px;' : 'left: -85px;';
        growthHTML += generateSideProfileBracket(`${leftOffset} top: 22%;`, true, 1.05, 0.1);
        growthHTML += generateSideProfileBracket(`${leftOffset} top: 68%;`, true, 0.88, 2.3);

        // Right Edge Anchors: RESTORED both shelves, shifting them slightly outward on desktop
        const rightOffset = isMobile ? 'right: -12px;' : 'right: -15px;';
        growthHTML += generateSideProfileBracket(`${rightOffset} top: 25%;`, false, 0.95, 0.7);
        growthHTML += generateSideProfileBracket(`${rightOffset} top: 60%;`, false, 1.1, 1.4);

        const boxLayer = document.createElement("div");
        boxLayer.className = "mycelium-box-layer";
        boxLayer.innerHTML = growthHTML;
        section.appendChild(boxLayer);
    });

    // 2. VIEWPORT SIDEWALL COLONIZATION
    const screenLayer = document.createElement("div");
    screenLayer.className = "mycelium-screen-layer";
    let screenHTML = '';
    const isMobile = window.innerWidth < 768;
    
    const screenLeft = isMobile ? 'left: -20px;' : 'left: -65px;';
    const screenRight = isMobile ? 'right: -5px;' : 'right: -10px;';

    screenHTML += generateSideProfileBracket(`${screenLeft} top: 28vh;`, true, 1.35, 0.5);
    screenHTML += generateSideProfileBracket(`${screenRight} top: 72vh;`, false, 1.25, 1.9);
    
    screenLayer.innerHTML = screenHTML;
    document.body.appendChild(screenLayer);
});
