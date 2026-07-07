document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const mainTitle = document.querySelector("header h1");

    // Helper to generate hyper-realistic organic SVG mushroom paths
    function generateMushroomHTML(type, offset, tilt, scale, delay, duration) {
        let svgContent = '';
        
        if (type === 'bracket') {
            // Textured Wood Shelf/Bracket Fungus (climbing vertical walls)
            svgContent = `
                <svg viewBox="0 0 60 40" width="60" height="40">
                    <path d="M 5,28 C 8,12, 32,8, 55,18 C 58,26, 42,38, 5,34 Z" fill="url(#capGradient)" />
                    <path d="M 12,24 C 15,14, 30,12, 48,19" stroke="#122b19" stroke-width="1.5" fill="none" opacity="0.6"/>
                    <path d="M 8,27 C 12,18, 28,16, 42,22" stroke="#0a120c" stroke-width="1.2" fill="none" opacity="0.8"/>
                    <path d="M 18,22 C 22,16, 32,15, 45,20" stroke="#a7f3d0" stroke-width="1" fill="none" opacity="0.3" filter="drop-shadow(0 0 3px #39ff14)"/>
                    <circle cx="20" cy="18" r="1.2" fill="#e8ffd9" />
                    <circle cx="34" cy="17" r="1" fill="#e8ffd9" />
                </svg>`;
        } else if (type === 'droop') {
            // Slender, heavy-capped hanging toadstool (drooping from letter corners)
            svgContent = `
                <svg viewBox="0 0 40 50" width="40" height="50">
                    <path d="M 20,2 C 22,12, 12,22, 16,38" stroke="url(#stemGradient)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                    <path d="M 5,35 C 3,24, 15,18, 32,24 C 36,28, 30,38, 22,36 C 14,34, 8,39, 5,35 Z" fill="url(#capGradient)" />
                    <circle cx="14" cy="30" r="1.3" fill="#e8ffd9" />
                    <circle cx="22" cy="29" r="0.9" fill="#e8ffd9" />
                    <circle cx="26" cy="32" r="1.1" fill="#e8ffd9" />
                </svg>`;
        } else {
            // Classic detailed forest mushroom (wild stalks with wavy, uneven caps)
            svgContent = `
                <svg viewBox="0 0 50 60" width="50" height="60">
                    <path d="M 25,56 Q 21,32, 26,16" stroke="url(#stemGradient)" stroke-width="3" fill="none" stroke-linecap="round"/>
                    <ellipse cx="26" cy="16" rx="16" ry="4" fill="url(#gillsGradient)" />
                    <path d="M 8,16 C 6,4, 42,2, 44,15 C 34,17, 28,13, 22,16 C 16,19, 11,18, 8,16 Z" fill="url(#capGradient)" />
                    <circle cx="20" cy="8" r="1.2" fill="#e8ffd9" />
                    <circle cx="28" cy="7" r="1" fill="#e8ffd9" />
                    <circle cx="34" cy="10" r="1.4" fill="#e8ffd9" />
                    <circle cx="15" cy="11" r="0.8" fill="#e8ffd9" />
                </svg>`;
        }

        return `
            <div class="shroom-specimen" style="
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
        
        const leftCount = Math.floor(Math.random() * 2) + 2;
        for (let i = 0; i < leftCount; i++) {
            growthHTML += generateMushroomHTML('bracket', `left: -18px; top: ${15 + i * 30}%;`, -65 + (Math.random()*15), 1.1 + Math.random()*0.3, Math.random()*3, 10 + Math.random()*4);
        }

        const rightCount = Math.floor(Math.random() * 2) + 2;
        for (let i = 0; i < rightCount; i++) {
            growthHTML += generateMushroomHTML('bracket', `right: -28px; top: ${20 + i * 35}%;`, 65 + (Math.random()*15), 1.0 + Math.random()*0.3, Math.random()*3, 10 + Math.random()*4);
        }

        growthHTML += generateMushroomHTML('standard', `left: 15%; top: -46px;`, -8, 1.3, 0.4, 11);
        growthHTML += generateMushroomHTML('droop', `right: 25%; top: -15px;`, 180, 1.2, 1.8, 13);

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
        titleGrowthHTML += generateMushroomHTML('droop', `left: -8px; top: 12px;`, -40, 0.8, 0.2, 12);
        titleGrowthHTML += generateMushroomHTML('standard', `left: 45%; top: -38px;`, 8, 0.9, 1.5, 10);
        titleGrowthHTML += generateMushroomHTML('bracket', `right: -15px; top: 0px;`, 45, 0.9, 0.8, 14);

        const titleLayer = document.createElement("div");
        titleLayer.className = "mycelium-title-layer";
        titleLayer.innerHTML = titleGrowthHTML;
        mainTitle.appendChild(titleLayer);
    }

    // 3. GROW OFF THE SCREEN EDGES
    const screenLayer = document.createElement("div");
    screenLayer.className = "mycelium-screen-layer";
    let screenHTML = '';
    screenHTML += generateMushroomHTML('bracket', `left: -20px; top: 40vh;`, -90, 1.8, 0, 12);
    screenHTML += generateMushroomHTML('standard', `right: -15px; top: 70vh;`, -75, 1.6, 1.1, 11);
    
    screenLayer.innerHTML = screenHTML;
    document.body.appendChild(screenLayer);

    // Master Realistic Color Palettes (Earthy Ochres & Dark Decay Tones)
    const paletteDefs = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    paletteDefs.style.position = "absolute";
    paletteDefs.style.width = "0";
    paletteDefs.style.height = "0";
    paletteDefs.innerHTML = `
        <defs>
            <linearGradient id="capGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#34493a" />
                <stop offset="60%" stop-color="#16241b" />
                <stop offset="100%" stop-color="#070d08" />
            </linearGradient>
            <linearGradient id="gillsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#040805" />
                <stop offset="50%" stop-color="#0f1f14" />
                <stop offset="100%" stop-color="#040805" />
            </linearGradient>
            <linearGradient id="stemGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#090f0a" />
                <stop offset="40%" stop-color="#1d2e22" />
                <stop offset="70%" stop-color="#121d15" />
                <stop offset="100%" stop-color="#040705" />
            </linearGradient>
        </defs>
    `;
    document.body.appendChild(paletteDefs);
});
