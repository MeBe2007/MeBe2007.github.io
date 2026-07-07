document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const mainTitle = document.querySelector("header h1");

    function generateMushroomHTML(species, offset, tilt, scale, delay, duration) {
        let svgContent = '';
        
        if (species === 'shelf') {
            // Species 1: Ochre Wood Bracket Fungi - now with a thick, knotty lateral base stalk
            svgContent = `
                <svg viewBox="0 0 60 50" width="60" height="50">
                    <path d="M 12,48 Q 20,30 8,16" class="shroom-stem shelf-stem" stroke-width="4" fill="none" stroke-linecap="round"/>
                    <path d="M 2,22 C 5,6, 35,2, 52,14 C 55,22, 38,32, 2,30 Z" class="shroom-cap shelf-cap" />
                    <circle cx="18" cy="14" r="1.3" class="glow-spore" />
                    <circle cx="32" cy="13" r="1" class="glow-spore" />
                </svg>`;
        } else if (species === 'ghost') {
            // Species 2: Glowing Ghost Fungi - slender, deeply bent stalks
            svgContent = `
                <svg viewBox="0 0 40 50" width="40" height="50">
                    <path d="M 20,48 C 24,32, 10,22, 15,16" class="shroom-stem ghost-stem" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                    <path d="M 2,20 C 0,8, 12,2, 32,8 C 36,13, 26,24, 18,22 C 10,20, 5,26, 2,20 Z" class="shroom-cap ghost-cap" />
                    <circle cx="12" cy="12" r="1.5" class="glow-spore" />
                    <circle cx="24" cy="14" r="1.1" class="glow-spore" />
                </svg>`;
        } else {
            // Species 3: Classic Forest Toadstool - thick, flared roots
            svgContent = `
                <svg viewBox="0 0 50 60" width="50" height="60">
                    <path d="M 25,56 Q 19,32, 25,18" class="shroom-stem toad-stem" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                    <ellipse cx="25" cy="18" rx="14" ry="3" class="shroom-gills toad-gills" />
                    <path d="M 6,18 C 4,3, 44,0, 44,16 C 32,18, 26,14, 20,18 C 14,21, 10,20, 6,18 Z" class="shroom-cap toad-cap" />
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
        
        // Left Verticals
        growthHTML += generateMushroomHTML('shelf', `left: -25px; top: 25%;`, -65, 1.2, 0, 11);
        growthHTML += generateMushroomHTML('toadstool', `left: -20px; top: 65%;`, -80, 1.0, 2.5, 9);

        // Right Verticals
        growthHTML += generateMushroomHTML('shelf', `right: -35px; top: 35%;`, 65, 1.3, 1.2, 13);
        growthHTML += generateMushroomHTML('ghost', `right: -15px; top: 70%;`, 20, 1.1, 3.1, 10);

        // Top Rims
        growthHTML += generateMushroomHTML('toadstool', `left: 25%; top: -48px;`, -5, 1.3, 0.4, 12);
        growthHTML += generateMushroomHTML('ghost', `right: 35%; top: -44px;`, 10, 1.2, 1.9, 14);

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
        titleGrowthHTML += generateMushroomHTML('ghost', `left: -12px; top: 5px;`, -35, 0.8, 0.2, 12);
        titleGrowthHTML += generateMushroomHTML('toadstool', `left: 55%; top: -42px;`, 8, 1.0, 1.7, 10);
        titleGrowthHTML += generateMushroomHTML('shelf', `right: -24px; top: -5px;`, 35, 0.9, 0.8, 14);

        const titleLayer = document.createElement("div");
        titleLayer.className = "mycelium-title-layer";
        titleLayer.innerHTML = titleGrowthHTML;
        mainTitle.appendChild(titleLayer);
    }

    // 3. GROW OFF THE SCREEN EDGES
    const screenLayer = document.createElement("div");
    screenLayer.className = "mycelium-screen-layer";
    let screenHTML = '';
    screenHTML += generateMushroomHTML('shelf', `left: -25px; top: 30vh;`, -85, 1.8, 0, 15);
    screenHTML += generateMushroomHTML('toadstool', `right: -20px; top: 60vh;`, -70, 1.6, 1.5, 11);
    
    screenLayer.innerHTML = screenHTML;
    document.body.appendChild(screenLayer);

    // Inject Master Lighting Gradients
    const paletteDefs = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    paletteDefs.style.position = "absolute";
    paletteDefs.style.width = "0";
    paletteDefs.style.height = "0";
    paletteDefs.innerHTML = `
        <defs>
            <linearGradient id="shelfCapGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#dfa86f"/><stop offset="60%" stop-color="#8c5d32"/><stop offset="100%" stop-color="#3a2512"/></linearGradient>
            <linearGradient id="shelfStemGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#24160a"/><stop offset="100%" stop-color="#4a321c"/></linearGradient>
            <linearGradient id="ghostCapGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#e6fffa"/><stop offset="50%" stop-color="#99f6e4"/><stop offset="100%" stop-color="#0d9488"/></linearGradient>
            <linearGradient id="ghostStemGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#115e59"/><stop offset="100%" stop-color="#ccfbf1"/></linearGradient>
            <linearGradient id="toadCapGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#5c8a69"/><stop offset="60%" stop-color="#223d29"/><stop offset="100%" stop-color="#0c1a10"/></linearGradient>
            <linearGradient id="toadStemGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#0a140d"/><stop offset="50%" stop-color="#476e52"/><stop offset="100%" stop-color="#0d1f14"/></linearGradient>
            <linearGradient id="toadGillsGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#060c08"/><stop offset="50%" stop-color="#1e3324"/><stop offset="100%" stop-color="#060c08"/></linearGradient>
        </defs>
    `;
    document.body.appendChild(paletteDefs);
});
