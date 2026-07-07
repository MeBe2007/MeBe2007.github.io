document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    function generateShelfCluster(offset, tilt, scale, delay) {
        const id = `shelf-${Math.floor(Math.random() * 10000)}`;
        
        // Heavy, gritty organic bark texture filter
        const textureFilter = `
            <filter id="shelf-noise-${id}">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.22 0" />
                <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
                <feBlend mode="multiply" in="SourceGraphic" in2="monoNoise" />
            </filter>
        `;

        // Generates a single, naturally deformed shelf path
        // Uses irregular control points so it looks hand-drawn and organic
        svgContent = `
            <svg viewBox="0 0 80 60" width="80" height="60">
                <defs>
                    ${textureFilter}
                    <linearGradient id="shelfGrad-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#eab308" />       <stop offset="25%" stop-color="#b45309" />      <stop offset="70%" stop-color="#451a03" />      <stop offset="100%" stop-color="#1c1917" />     </linearGradient>
                </defs>
                
                <path d="M 5,45 C 5,15, 55,10, 75,30 C 70,48, 40,55, 5,45 Z" fill="#0c0a09" opacity="0.65" filter="blur(2px)" />

                <g filter="url(#shelf-noise-${id})">
                    <path d="M 8,42 C 6,18, 52,10, 72,28 C 74,38, 48,50, 8,42 Z" fill="url(#shelfGrad-${id})" />
                    <path d="M 14,36 C 18,24, 46,18, 62,30" stroke="rgba(254,240,138,0.25)" stroke-width="1.5" fill="none" />
                    <path d="M 22,39 C 26,30, 42,26, 54,34" stroke="rgba(0,0,0,0.4)" stroke-width="1.2" fill="none" />
                </g>

                <g transform="translate(6, -10) scale(0.75) rotate(-5)" filter="url(#shelf-noise-${id})">
                    <path d="M 8,42 C 6,18, 52,10, 72,28 C 74,38, 48,50, 8,42 Z" fill="url(#shelfGrad-${id})" />
                    <path d="M 14,36 C 18,24, 46,18, 62,30" stroke="rgba(254,240,138,0.2)" stroke-width="1.5" fill="none" />
                </g>

                <g transform="translate(18, -16) scale(0.45) rotate(8)" filter="url(#shelf-noise-${id})">
                    <path d="M 8,42 C 6,18, 52,10, 72,28 C 74,38, 48,50, 8,42 Z" fill="url(#shelfGrad-${id})" />
                </g>

                <circle cx="24" cy="32" r="1.3" class="glow-spore" fill="#ffffff" />
                <circle cx="42" cy="35" r="1.0" class="glow-spore" fill="#ffffff" />
                <circle cx="16" cy="24" r="1.1" class="glow-spore" fill="#ffffff" />
            </svg>
        `;

        return `
            <div class="shroom-specimen spec-shelf" style="
                position: absolute;
                ${offset}
                transform: rotate(${tilt}deg) scale(${scale});
                animation-delay: ${delay}s;
            ">${svgContent}</div>`;
    }

    // Attach clusters to content cards
    sections.forEach((section) => {
        let growthHTML = '';
        
        // Clamped directly to the left vertical frames
        growthHTML += generateShelfCluster(`left: -28px; top: 25%;`, -90, 1.2, 0.1);
        growthHTML += generateShelfCluster(`left: -24px; top: 70%;`, -80, 1.0, 2.3);

        // Clamped directly to the right vertical frames
        growthHTML += generateShelfCluster(`right: -42px; top: 40%;`, 90, 1.3, 1.4);

        const boxLayer = document.createElement("div");
        boxLayer.className = "mycelium-box-layer";
        boxLayer.innerHTML = growthHTML;
        section.appendChild(boxLayer);
    });

    // Grow major clusters right on the screen margins
    const screenLayer = document.createElement("div");
    screenLayer.className = "mycelium-screen-layer";
    let screenHTML = '';
    screenHTML += generateShelfCluster(`left: -32px; top: 30vh;`, -90, 1.8, 0.5);
    screenHTML += generateShelfCluster(`right: -28px; top: 65vh;`, 90, 1.6, 1.9);
    
    screenLayer.innerHTML = screenHTML;
    document.body.appendChild(screenLayer);
});
