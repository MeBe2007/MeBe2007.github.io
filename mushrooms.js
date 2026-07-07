document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const mainTitle = document.querySelector("header h1");

    function generateMushroomHTML(species, offset, tilt, scale, delay, duration) {
        let svgContent = '';
        
        // Dynamic unique ID suffix to prevent gradient collisions
        const id = `${species}-${Math.floor(Math.random() * 10000)}`;
        
        // Shared organic noise filter to break up smooth vector lines
        const textureFilter = `
            <filter id="fungal-noise-${id}">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" />
                <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
                <feBlend mode="multiply" in="SourceGraphic" in2="monoNoise" />
            </filter>
        `;
        
        if (species === 'shelf') {
            // Species 1: Velvet Wood Bracket Fungi (Rich ochre, rough grain rings)
            svgContent = `
                <svg viewBox="0 0 60 50" width="60" height="50">
                    <defs>
                        ${textureFilter}
                        <linearGradient id="shelfCapGrad-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#d97706"/>
                            <stop offset="40%" stop-color="#78350f"/>
                            <stop offset="100%" stop-color="#2d1500"/>
                        </linearGradient>
                        <linearGradient id="shelfStemGrad-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#1c1917"/>
                            <stop offset="100%" stop-color="#451a03"/>
                        </linearGradient>
                    </defs>
                    <path d="M 15,48 Q 22,32 10,18" stroke="url(#shelfStemGrad-${id})" stroke-width="4.5" fill="none" stroke-linecap="round" />
                    <path d="M 2,24 C 4,6, 36,2, 54,12 C 57,20, 38,32, 2,30 Z" fill="url(#shelfCapGrad-${id})" filter="url(#fungal-noise-${id})" />
                    <path d="M 6,22 Q 26,8 46,16" stroke="rgba(254,240,138,0.2)" stroke-width="1.5" fill="none" />
                    <circle cx="20" cy="15" r="1.2" class="glow-spore" fill="#ffffff" />
                    <circle cx="34" cy="13" r="1" class="glow-spore" fill="#ffffff" />
                </svg>`;
        } else if (species === 'ghost') {
            // Species 2: Bioluminescent Ghost Fungi (Pale, cold emerald glow with dense moss shadows)
            svgContent = `
                <svg viewBox="0 0 40 50" width="40" height="50">
                    <defs>
                        ${textureFilter}
                        <linearGradient id="ghostCapGrad-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#f0fdf4"/>
                            <stop offset="40%" stop-color="#14b8a6"/>
                            <stop offset="100%" stop-color="#115e59"/>
                        </linearGradient>
                        <linearGradient id="ghostStemGrad-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#042f2e"/>
                            <stop offset="100%" stop-color="#99f6e4"/>
                        </linearGradient>
                    </defs>
                    <path d="M 20,48 C 24,32, 10,22, 15,16" stroke="url(#ghostStemGrad-${id})" stroke-width="2.5" fill="none" stroke-linecap="round" />
                    <path d="M 2,20 C 0,8, 12,2, 32,8 C 36,13, 26,24, 18,22 C 10,20, 5,26, 2,20 Z" fill="url(#ghostCapGrad-${id})" filter="url(#fungal-noise-${id})" fill-opacity="0.9" />
                    <circle cx="12" cy="12" r="1.4" class="glow-spore" fill="#ffffff" />
                    <circle cx="24" cy="14" r="1.1" class="glow-spore" fill="#ffffff" />
                </svg>`;
        } else {
            // Species 3: Granular Woodland Toadstool (Wavy caps, realistic ambient occlusion shading)
            svgContent = `
                <svg viewBox="0 0 50 60" width="50" height="60">
                    <defs>
                        ${textureFilter}
                        <linearGradient id="toadCapGrad-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#4ade80"/>
                            <stop offset="60%" stop-color="#14532d"/>
                            <stop offset="100%" stop-color="#052e16"/>
                        </linearGradient>
                        <linearGradient id="toadStemGrad-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#022c22"/>
                            <stop offset="50%" stop-color="#22c55e"/>
                            <stop offset="100%" stop-color="#14532d"/>
                        </linearGradient>
                    </defs>
                    <path d="M 25,56 Q 19,32, 25,18" stroke="url(#toadStemGrad-${id})" stroke-width="3" fill="none" stroke-linecap="round" />
                    <ellipse cx="25" cy="18" rx="13" ry="2.5" fill="#052e16" opacity="0.8" />
                    <path d="M 6,18 C 4,3, 44,0, 44,16 C 32,18, 26,14, 20,18 C 14,21, 10,20, 6,18 Z" fill="url(#toadCapGrad-${id})" filter="url(#fungal-noise-${id})" />
                    <circle cx="18" cy="8" r="1.2" class="glow-spore" fill="#ffffff" />
                    <circle cx="28" cy="7" r="1.4" class="glow-spore" fill="#ffffff" />
                    <circle cx="34" cy="11" r="0.9" class="glow-spore" fill="#ffffff" />
                </svg>`;
        }

        return `
            <div class="shroom-specimen spec-${species}" style="
                position: absolute;
                ${offset}
                transform: rotate(${tilt}deg) scale(${scale});
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
            ">${svgContent}</div>`;
    }

    // 1. GROW ON BOXES
    sections.forEach((section) => {
        let growthHTML = '';
        growthHTML += generateMushroomHTML('shelf', `left: -24px; top: 22%;`, -68, 1.2, 0.1, 12);
        growthHTML += generateMushroomHTML('toadstool', `left: -18px; top: 68%;`, -82, 1.1, 2.1, 10);
        growthHTML += generateMushroomHTML('shelf', `right: -34px; top: 38%;`, 68, 1.3, 1.3, 13);
        growthHTML += generateMushroomHTML('ghost', `right: -14px; top: 78%;`, 18, 1.1, 3.0, 11);
        growthHTML += generateMushroomHTML('toadstool', `left: 25%; top: -46px;`, -5, 1.3, 0.5, 12);
        growthHTML += generateMushroomHTML('ghost', `right: 35%; top: -42px;`, 8, 1.2, 1.7, 14);

        const boxLayer = document.createElement("div");
        boxLayer.className = "mycelium-box-layer";
        boxLayer.innerHTML = growthHTML;
        section.appendChild(boxLayer);
    });

    // 2. GROW ON MAIN TITLE LETTERS
    if (mainTitle) {
        mainTitle.style.position = 'relative';
        mainTitle.style.display = 'inline-block';
        let titleGrowthHTML = '';
        titleGrowthHTML += generateMushroomHTML('ghost', `left: -15px; top: 6px;`, -38, 0.85, 0.2, 12);
        titleGrowthHTML += generateMushroomHTML('toadstool', `left: 52%; top: -40px;`, 6, 1.0, 1.5, 10);
        titleGrowthHTML += generateMushroomHTML('shelf', `right: -25px; top: -5px;`, 38, 0.9, 0.8, 14);

        const titleLayer = document.createElement("div");
        titleLayer.className = "mycelium-title-layer";
        titleLayer.innerHTML = titleGrowthHTML;
        mainTitle.appendChild(titleLayer);
    }

    // 3. GROW OFF THE SCREEN EDGES
    const screenLayer = document.createElement("div");
    screenLayer.className = "mycelium-screen-layer";
    let screenHTML = '';
    screenHTML += generateMushroomHTML('shelf', `left: -25px; top: 32vh;`, -85, 1.7, 0.2, 16);
    screenHTML += generateMushroomHTML('toadstool', `right: -22px; top: 68vh;`, -72, 1.5, 1.4, 12);
    screenLayer.innerHTML = screenHTML;
    document.body.appendChild(screenLayer);
});
