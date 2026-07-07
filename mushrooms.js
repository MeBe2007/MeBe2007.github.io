document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const mainTitle = document.querySelector("header h1");

    function generateMushroomHTML(species, offset, tilt, scale, delay, duration) {
        let svgContent = '';
        
        if (species === 'shelf') {
            // Species 1: Creamy Wood Shelf/Bracket Fungus (Flat, layered, ochre tones)
            svgContent = `
                <svg viewBox="0 0 60 40" width="60" height="40">
                    <path d="M 5,30 C 8,10, 38,5, 55,20 C 58,28, 40,38, 5,36 Z" class="shroom-cap" />
                    <path d="M 10,26 C 16,14, 34,12, 48,22" stroke="rgba(0,0,0,0.4)" stroke-width="1.5" fill="none"/>
                    <path d="M 6,31 C 12,20, 30,18, 44,26" stroke="rgba(255,255,255,0.15)" stroke-width="1" fill="none"/>
                    <circle cx="22" cy="22" r="1.3" class="glow-spore" />
                    <circle cx="36" cy="24" r="1" class="glow-spore" />
                </svg>`;
        } else if (species === 'ghost') {
            // Species 2: Ghost Fungi (Slender, pale, deeply translucent, hanging upside down)
            svgContent = `
                <svg viewBox="0 0 40 50" width="40" height="50">
                    <path d="M 20,2 C 24,15, 10,25, 15,40" class="shroom-stem" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                    <path d="M 4,36 C 2,22, 12,16, 34,22 C 38,27, 28,38, 20,36 C 12,34, 7,40, 4,36 Z" class="shroom-cap" />
                    <circle cx="12" cy="30" r="1.5" class="glow-spore" />
                    <circle cx="24" cy="31" r="1.1" class="glow-spore" />
                </svg>`;
        } else {
            // Species 3: Classic Detailed Toadstool (Wavy, asymmetrical caps, wild stalks)
            svgContent = `
                <svg viewBox="0 0 50 60" width="50" height="60">
                    <path d="M 24,56 Q 20,30, 25,18" class="shroom-stem" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                    <ellipse cx="25" cy="18" rx="15" ry="3.5" class="shroom-gills" />
                    <path d="M 6,18 C 4,3, 44,0, 44,16 C 32,18, 26,14, 20,18 C 14,21, 10,20, 6,18 Z" class="shroom-cap" />
                    <circle cx="18" cy="8" r="1.2" class="glow-spore" />
                    <circle cx="28" cy="7" r="1.4" class="glow-spore" />
                    <circle cx="34" cy="11" r="0.9" class="glow-spore" />
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

    // 1. GROW ON TEXT BOXES
    sections.forEach((section) => {
        let growthHTML = '';
        
        // Vertical Left Sides: Mix of climbing brackets and classic stems
        growthHTML += generateMushroomHTML('shelf', `left: -22px; top: 20%;`, -70, 1.2, 0, 11);
        growthHTML += generateMushroomHTML('toadstool', `left: -15px; top: 60%;`, -85, 1.0, 2.5, 9);

        // Vertical Right Sides
        growthHTML += generateMushroomHTML('shelf', `right: -32px; top: 40%;`, 70, 1.3, 1.2, 13);
        growthHTML += generateMushroomHTML('ghost', `right: -10px; top: 75%;`, 15, 1.1, 3.1, 10);

        // Top Rims
        growthHTML += generateMushroomHTML('toadstool', `left: 20%; top: -46px;`, -6, 1.4, 0.5, 12);
        growthHTML += generateMushroomHTML('ghost', `right: 30%; top: -16px;`, 185, 1.2, 1.9, 14);

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
        titleGrowthHTML += generateMushroomHTML('ghost', `left: -8px; top: 14px;`, -45, 0.9, 0.2, 12);
        titleGrowthHTML += generateMushroomHTML('toadstool', `left: 50%; top: -38px;`, 5, 1.1, 1.7, 10);
        titleGrowthHTML += generateMushroomHTML('shelf', `right: -18px; top: 2px;`, 40, 1.0, 0.8, 14);

        const titleLayer = document.createElement("div");
        titleLayer.className = "mycelium-title-layer";
        titleLayer.innerHTML = titleGrowthHTML;
        mainTitle.appendChild(titleLayer);
    }

    // 3. GROW OFF THE SCREEN EDGES
    const screenLayer = document.createElement("div");
    screenLayer.className = "mycelium-screen-layer";
    let screenHTML = '';
    screenHTML += generateMushroomHTML('shelf', `left: -20px; top: 35vh;`, -90, 2.0, 0, 15);
    screenHTML += generateMushroomHTML('toadstool', `right: -15px; top: 65vh;`, -75, 1.8, 1.5, 11);
    
    screenLayer.innerHTML = screenHTML;
    document.body.appendChild(screenLayer);

    // Inject Color Palette Definitions for Lighting Renderings
    const paletteDefs = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    paletteDefs.style.position = "absolute";
    paletteDefs.style.width = "0";
    paletteDefs.style.height = "0";
    paletteDefs.innerHTML = `
        <defs>
            <linearGradient id="shelfCap" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#cf9b62" />
                <stop offset="50%" stop-color="#785028" />
                <stop offset="100%" stop-color="#2d1d0e" />
            </linearGradient>
            
            <linearGradient id="ghostCap" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#d1fae5" />
                <stop offset="60%" stop-color="#6ee7b7" />
                <stop offset="100%" stop-color="#064e3b" />
            </linearGradient>
            <linearGradient id="ghostStem" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#042f22" />
                <stop offset="50%" stop-color="#a7f3d0" />
                <stop offset="100%" stop-color="#022d20" />
            </linearGradient>
            
            <linearGradient id="toadCap" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#4c7356" />
                <stop offset="60%" stop-color="#1e3625" />
                <stop offset="100%" stop-color="#0a140e" />
            </linearGradient>
            <linearGradient id="toadStem" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#09120b" />
                <stop offset="40%" stop-color="#3b5c43" />
                <stop offset="100%" stop-color="#040805" />
            </linearGradient>
            <linearGradient id="toadGills" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#050a06" />
                <stop offset="50%" stop-color="#1c2e20" />
                <stop offset="100%" stop-color="#050a06" />
            </linearGradient>
        </defs>
    `;
    document.body.appendChild(paletteDefs);
});
