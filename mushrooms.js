document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    function generateShelfCluster(offset, tilt, scale, delay) {
        const id = `shelf-${Math.floor(Math.random() * 10000)}`;
        
        // Coarse fractal noise to mimic rough wood-grain texture
        const textureFilter = `
            <filter id="shelf-noise-${id}">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.25 0" />
                <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
                <feBlend mode="multiply" in="SourceGraphic" in2="monoNoise" />
            </filter>
        `;

        // The SVG geometry now uses a flat vertical baseline on the left (0,0 axis)
        // so it looks perfectly fused into the wood boundary line.
        svgContent = `
            <svg viewBox="0 0 80 60" width="85" height="65">
                <defs>
                    ${textureFilter}
                    <linearGradient id="shelfGrad-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#140a03" />       <stop offset="20%" stop-color="#5c2d06" />      <stop offset="75%" stop-color="#b45309" />      <stop offset="100%" stop-color="#f59e0b" />     </linearGradient>
                </defs>
                
                <path d="M 0,5 C 20,10, 35,25, 30,55 C 15,55, 0,45, 0,5 Z" fill="#050404" filter="blur(3px)" />

                <g filter="url(#shelf-noise-${id})">
                    <path d="M 0,10 C 35,5, 75,15, 75,32 C 65,48, 30,52, 0,48 Z" fill="url(#shelfGrad-${id})" />
                    <path d="M 0,18 C 25,14, 55,22, 60,32" stroke="rgba(254,240,138,0.22)" stroke-width="1.5" fill="none" />
                    <path d="M 0,28 C 15,24, 40,28, 45,36" stroke="rgba(0,0,0,0.35)" stroke-width="1.2" fill="none" />
                </g>

                <g transform="translate(0, 4) scale(0.72) rotate(6)" filter="url(#shelf-noise-${id})">
                    <path d="M 0,10 C 35,5, 75,15, 75,32 C 65,48, 30,52, 0,48 Z" fill="url(#shelfGrad-${id})" />
                </g>

                <g transform="translate(0, 12) scale(0.45) rotate(-8)" filter="url(#shelf-noise-${id})">
                    <path d="M 0,10 C 35,5, 75,15, 75,32 C 65,48, 30,52, 0,48 Z" fill="url(#shelfGrad-${id})" />
                </g>

                <circle cx="28" cy="24" r="1.3" class="glow-spore" fill="#ffffff" />
                <circle cx="48" cy="34" r="1.0" class="glow-spore" fill="#ffffff" />
                <circle cx="16" cy="18" r="1.1" class="glow-spore" fill="#ffffff" />
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

    // 1. DOCK DIRECTLY ON THE BOX "TRUNKS"
    sections.forEach((section) => {
        let growthHTML = '';
        
        // Left Box Edge: Sprouting horizontally out to the left (180deg flip)
        growthHTML += generateShelfCluster(`left: -58px; top: 20%;`, 180, 1.25, 0.1);
        growthHTML += generateShelfCluster(`left: -58px; top: 65%;`, 180, 1.05, 2.3);

        // Right Box Edge: Sprouting horizontally out to the right (0deg default orientation)
        growthHTML += generateShelfCluster(`right: -58px; top: 45%;`, 0, 1.3, 1.4);

        const boxLayer = document.createElement("div");
        boxLayer.className = "mycelium-box-layer";
        boxLayer.innerHTML = growthHTML;
        section.appendChild(boxLayer);
    });

    // 2. DOCK DIRECTLY ON THE VIEWPORT SCREEN WINDOW "TRUNKS"
    const screenLayer = document.createElement("div");
    screenLayer.className = "mycelium-screen-layer";
    let screenHTML = '';
    
    // Left viewport frame attachment
    screenHTML += generateShelfCluster(`left: -52px; top: 25vh;`, 0, 1.8, 0.5);
    // Right viewport frame attachment
    screenHTML += generateShelfCluster(`right: -52px; top: 70vh;`, 180, 1.6, 1.9);
    
    screenLayer.innerHTML = screenHTML;
    document.body.appendChild(screenLayer);
});
