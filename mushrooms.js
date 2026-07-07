document.addEventListener("DOMContentLoaded", () => {
    // Target both the glass cards and the main title letters
    const sections = document.querySelectorAll("section");
    const mainTitle = document.querySelector("header h1");

    // Helper to generate custom mushroom SVG markup based on growth habits
    function generateMushroomHTML(type, offset, tilt, scale, delay, duration) {
        let svgContent = '';
        
        if (type === 'bracket') {
            // Flat, creeping shelf fungi for crawling up vertical sides
            svgContent = `
                <svg viewBox="0 0 40 30" width="45" height="35">
                    <path d="M0,15 C0,5 30,0 35,12 C35,22 10,25 0,20 Z" fill="#14301a" />
                    <ellipse cx="16" cy="12" rx="14" ry="4" fill="#224d2b" />
                    <path d="M2,13 Q16,10 28,14" stroke="#39ff14" stroke-width="1.2" fill="none" opacity="0.7"/>
                    <circle cx="12" cy="8" r="1.5" fill="#39ff14" />
                    <circle cx="22" cy="10" r="1" fill="#39ff14" />
                </svg>`;
        } else if (type === 'droop') {
            // Hanging caps that hang upside down off letter rims or card tops
            svgContent = `
                <svg viewBox="0 0 30 40" width="30" height="40">
                    <path d="M15,0 Q20,15 15,30" stroke="#0b170e" stroke-width="3" fill="none" stroke-linecap="round"/>
                    <path d="M5,25 C5,15 25,15 25,25 Z" fill="#1b3b22" />
                    <ellipse cx="15" cy="25" rx="10" ry="2.5" fill="#2d5e39" />
                    <circle cx="11" cy="22" r="1.2" fill="#39ff14" />
                    <circle cx="18" cy="23" r="0.8" fill="#39ff14" />
                </svg>`;
        } else {
            // Standard long-stemmed curving mushrooms
            svgContent = `
                <svg viewBox="0 0 30 50" width="35" height="55">
                    <path d="M15,50 Q${10 + Math.random()*10},25 15,12" stroke="#112415" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                    <path d="M3,12 C3,3 27,3 27,12 Z" fill="#1e4426" />
                    <ellipse cx="15" cy="12" rx="12" ry="2.5" fill="#346b41" />
                    <circle cx="15" cy="8" r="1.3" fill="#39ff14" />
                </circle>`;
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

    // 1. GROW ON TEXT BOXES (Bottoms, vertical left/right seams, and top rims)
    sections.forEach((section) => {
        let growthHTML = '';
        
        // Vertical Left Side (Climbing up)
        const leftCount = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < leftCount; i++) {
            growthHTML += generateMushroomHTML('bracket', `left: -12px; top: ${20 + i * 25}%;`, -70 + (Math.random()*20), 1.2 + Math.random()*0.4, Math.random()*3, 3 + Math.random()*2);
        }

        // Vertical Right Side (Climbing up)
        const rightCount = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < rightCount; i++) {
            growthHTML += generateMushroomHTML('bracket', `right: -24px; top: ${15 + i * 28}%;`, 70 + (Math.random()*20), 1.1 + Math.random()*0.4, Math.random()*3, 3 + Math.random()*2);
        }

        // Top Edge (Hanging downward or popping straight up)
        growthHTML += generateMushroomHTML('droop', `left: 20%; top: -25px;`, 10, 1.3, 0.5, 4);
        growthHTML += generateMushroomHTML('standard', `right: 25%; top: -42px;`, -15, 1.4, 1.2, 3.5);

        // Append everything to the section card
        const boxLayer = document.createElement("div");
        boxLayer.className = "mycelium-box-layer";
        boxLayer.innerHTML = growthHTML;
        section.appendChild(boxLayer);
    });

    // 2. GROW ON MAIN TITLE LETTERS ("THE TERRARIUM")
    if (mainTitle) {
        // Enforce relative positioning so coordinates function perfectly
        mainTitle.style.position = 'relative';
        mainTitle.style.display = 'inline-block';

        let titleGrowthHTML = '';
        // Sprout mushrooms clinging directly onto the top curves and hanging from sides
        titleGrowthHTML += generateMushroomHTML('droop', `left: -5px; top: 15px;`, -45, 0.9, 0.2, 4.2);
        titleGrowthHTML += generateMushroomHTML('standard', `left: 35%; top: -35px;`, 12, 1.0, 1.5, 3.2);
        titleGrowthHTML += generateMushroomHTML('bracket', `right: -10px; top: -5px;`, 35, 1.1, 0.8, 3.8);

        const titleLayer = document.createElement("div");
        titleLayer.className = "mycelium-title-layer";
        titleLayer.innerHTML = titleGrowthHTML;
        mainTitle.appendChild(titleLayer);
    }

    // 3. GROW OFF THE SCREEN EDGE Boundary
    const screenLayer = document.createElement("div");
    screenLayer.className = "mycelium-screen-layer";
    let screenHTML = '';
    // Sprout huge clusters creeping directly out of the absolute left and right phone window walls
    screenHTML += generateMushroomHTML('bracket', `left: -15px; top: 30vh;`, -90, 2.2, 0, 4.5);
    screenHTML += generateMushroomHTML('standard', `right: -10px; top: 65vh;`, -80, 2.0, 1.1, 3.9);
    
    screenLayer.innerHTML = screenHTML;
    document.body.appendChild(screenLayer);
});
