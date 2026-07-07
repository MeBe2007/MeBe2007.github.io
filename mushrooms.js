document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const mainTitle = document.querySelector("header h1");

    function generateMushroomHTML(species, offset, tilt, scale, delay, duration) {
        let svgContent = '';
        
        if (species === 'shelf') {
            // Species 1: Creamy Ochre & Deep Brown Shelf Fungi
            svgContent = `
                <svg viewBox="0 0 60 50" width="60" height="50">
                    <defs>
                        <linearGradient id="localShelfCap-${delay}" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#eab308"/>
                            <stop offset="40%" stop-color="#854d0e"/>
                            <stop offset="100%" stop-color="#422006"/>
                        </linearGradient>
                        <linearGradient id="localShelfStem-${delay}" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#1e1b4b"/>
                            <stop offset="100%" stop-color="#451a03"/>
                        </linearGradient>
                    </defs>
                    <path d="M 12,48 Q 20,30 8,16" stroke="url(#localShelfStem-${delay})" stroke-width="4" fill="none" stroke-linecap="round"/>
                    <path d="M 2,22 C 5,6, 35,2, 52,14 C 55,22, 38,32, 2,30 Z" fill="url(#localShelfCap-${delay})" style="filter: drop-shadow(0 3px 4px rgba(0,0,0,0.7));" />
                    <circle cx="18" cy="14" r="1.5" class="glow-spore" fill="#ffffff" />
                    <circle cx="32" cy="13" r="1.2" class="glow-spore" fill="#ffffff" />
                </svg>`;
        } else if (species === 'ghost') {
            // Species 2: Luminous, Translucent Seafoam Pale Ghost Fungi
            svgContent = `
                <svg viewBox="0 0 40 50" width="40" height="50">
                    <defs>
                        <linearGradient id="localGhostCap-${delay}" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#ccfbf1"/>
                            <stop offset="50%" stop-color="#2dd4bf"/>
                            <stop offset="100%" stop-color="#115e59"/>
                        </linearGradient>
                        <linearGradient id="localGhostStem-${delay}" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#042f2e"/>
                            <stop offset="100%" stop-color="#99f6e4"/>
                        </linearGradient>
                    </defs>
                    <path d="M 20,48 C 24,32, 10,22, 15,16" stroke="url(#localGhostStem-${delay})" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                    <path d="M 2,20 C 0,8, 12,2, 32,8 C 36,13, 26,24, 18,22 C 10,20, 5,26, 2,20 Z" fill="url(#localGhostCap-${delay})" fill-opacity="0.95" style="filter: drop-shadow(0 3px 4px rgba(0,0,0,0.8));" />
                    <circle cx="12" cy="12" r="1.6" class="glow-spore" fill="#ffffff" />
                    <circle cx="24" cy="14" r="1.2" class="glow-spore" fill="#ffffff" />
                </svg>`;
        } else {
            // Species 3: Detailed Woodland Toadstool (Fleshy Moss Greens & Ochre Under-shadows)
            svgContent = `
                <svg viewBox="0 0 50 60" width="50" height="60">
                    <defs>
                        <linearGradient id="localToadCap-${delay}" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#4ade80"/>
                            <stop offset="50%" stop-color="#166534"/>
                            <stop offset="100%" stop-color="#052e16"/>
                        </linearGradient>
                        <linearGradient id="localToadStem-${delay}" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#022c22"/>
                            <stop offset="50%" stop-color="#22c55e"/>
                            <stop offset="100%" stop-color="#14532d"/>
                        </linearGradient>
                        <linearGradient id="localToadGills-${delay}" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#022c22"/>
                            <stop offset="50%" stop-color="#15803d"/>
                            <stop offset="100%" stop-color="#022c22"/>
                        </linearGradient>
                    </defs>
                    <path d="M 25,56 Q 19,32, 25,18" stroke="url(#localToadStem-${delay})" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                    <ellipse cx="25" cy="18" rx="14" ry="3" fill="url(#localToadGills-${delay})" />
                    <path d="M 6,18 C 4,3, 44,0, 44,16 C 32,18, 26,14, 20,18 C 14,21, 10,20, 6,18 Z" fill="url(#localToadCap-${delay})" style="filter: drop-shadow(0 4px 5px rgba(0,0,0,0.85));" />
                    <circle cx="18" cy="8" r="1.3" class="glow-spore" fill="#ffffff" />
                    <circle cx="28" cy="7" r="1.5" class="glow-spore" fill="#ffffff" />
                    <circle cx="34" cy="11" r="1.0" class="glow-spore" fill="#ffffff" />
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

    // 1. GROW ON CONTENT BOXES
    sections.forEach((section) => {
        let growthHTML = '';
        
        // Left Vertical Alignment Boundaries
        growthHTML += generateMushroomHTML('shelf', `left: -22px; top: 20%;`, -70, 1.25, 0.1, 11);
        growthHTML += generateMushroomHTML('toadstool', `left: -18px; top: 65%;`, -85, 1.05, 2.3, 9);

        // Right Vertical Alignment Boundaries
        growthHTML += generateMushroomHTML('shelf', `right: -32px; top: 35%;`, 70, 1.35, 1.4, 13);
        growthHTML += generateMushroomHTML('ghost', `right: -12px; top: 75%;`, 15, 1.15, 3.2, 10);

        // Top Rims
        growthHTML += generateMushroomHTML('toadstool', `left: 20%; top: -48px;`, -6, 1.35, 0.4, 12);
        growthHTML += generateMushroomHTML('ghost', `right: 30%; top: -44px;`, 10, 1.25, 1.8, 14);

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
        titleGrowthHTML += generateMushroomHTML('ghost', `left: -14px; top: 8px;`, -35, 0.85, 0.2, 12);
        titleGrowthHTML += generateMushroomHTML('toadstool', `left: 50%; top: -42px;`, 6, 1.05, 1.6, 10);
        titleGrowthHTML += generateMushroomHTML('shelf', `right: -24px; top: -2px;`, 35, 0.95, 0.7, 14);

        const titleLayer = document.createElement("div");
        titleLayer.className = "mycelium-title-layer";
        titleLayer.innerHTML = titleGrowthHTML;
        mainTitle.appendChild(titleLayer);
    }

    // 3. GROW OFF THE WINDOW WALLS
    const screenLayer = document.createElement("div");
    screenLayer.className = "mycelium-screen-layer";
    let screenHTML = '';
    screenHTML += generateMushroomHTML('shelf', `left: -25px; top: 35vh;`, -85, 1.8, 0.3, 15);
    screenHTML += generateMushroomHTML('toadstool', `right: -20px; top: 70vh;`, -70, 1.6, 1.2, 11);
    
    screenLayer.innerHTML = screenHTML;
    document.body.appendChild(screenLayer);
});
