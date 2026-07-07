document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    function generateShelfCluster(offset, tilt, scale, delay) {
        const id = `shelf-${Math.floor(Math.random() * 10000)}`;
        
        const textureFilter = `
            <filter id="shelf-noise-${id}">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.25 0" />
                <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
                <feBlend mode="multiply" in="SourceGraphic" in2="monoNoise" />
            </filter>
        `;

        // Keeping the flat seam base, but our rotation in the layout step 
        // will turn these vertically to hug the trunk frames perfectly
        svgContent = `
            <svg viewBox="0 0 80 60" width="85" height="65">
                <defs>
                    ${textureFilter}
                    <linearGradient id="shelfGrad-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#140a03" />
                        <stop offset="20%" stop-color="#5c2d06" />
                        <stop offset="75%" stop-color="#b45309" />
                        <stop offset="100%" stop-color="#f59e0b" />
                    </linearGradient>
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

    // 1. CLIMBING THE BOX BORDER "TRUNKS"
    sections.forEach((section) => {
        let growthHTML = '';
        
        // Left Box Edge: Tilted to -90 degrees so they face straight up along the seam
        growthHTML += generateShelfCluster(`left: -20px; top: 20%;`, -90, 1.2, 0.1);
        growthHTML += generateShelfCluster(`left: -20px; top: 60%;`, -90, 1.0, 2.3);

        // Right Box Edge: Tilted to 90 degrees so they grip and grow upward on the right seam
        growthHTML += generateShelfCluster(`right: -60px; top: 40%;`, 90, 1.25, 1.4);

        const boxLayer = document.createElement("div");
        boxLayer.className = "mycelium-box-layer";
        boxLayer.innerHTML = growthHTML;
        section.appendChild(boxLayer);
    });

    // 2. CLIMBING THE SCREEN PARAMETER "TRUNKS"
    const screenLayer = document.createElement("div");
    screenLayer.className = "mycelium-screen-layer";
    let screenHTML = '';
    
    // Left viewport frame attachment (Climbing up)
    screenHTML += generateShelfCluster(`left: -15px; top: 30vh;`, -90, 1.6, 0.5);
    // Right viewport frame attachment (Climbing up)
    screenHTML += generateShelfCluster(`right: -65px; top: 65vh;`, 90, 1.5, 1.9);
    
    screenLayer.innerHTML = screenHTML;
    document.body.appendChild(screenLayer);
});
