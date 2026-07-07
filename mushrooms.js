document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
        const containerWrapper = document.createElement("div");
        containerWrapper.className = "cluster-container";

        // Determine a random density of mushrooms per card (3 to 6)
        const mushroomCount = Math.floor(Math.random() * 4) + 3;
        let clusterHTML = '';

        for (let i = 0; i < mushroomCount; i++) {
            // Randomize genetics for each individual mushroom
            const height = Math.floor(Math.random() * 25) + 25; // 25px to 50px tall
            const capWidth = Math.floor(Math.random() * 16) + 16; // 16px to 32px wide
            const capHeight = Math.floor(Math.random() * 6) + 6;   // 6px to 12px deep
            const tilt = (Math.random() - 0.5) * 25;              // Angle slant in degrees
            
            // Scatter them naturally along the bottom rim of the box
            const positionPercent = Math.floor(Math.random() * 80) + 10; 
            
            // Stagger their breathing animations so they don't pulse at the exact same second
            const pulseDelay = (Math.random() * 3).toFixed(2);
            const pulseDuration = (Math.random() * 2 + 3).toFixed(2);

            clusterHTML += `
                <div class="mushroom-specimen" style="
                    left: ${positionPercent}%; 
                    animation-delay: ${pulseDelay}s; 
                    animation-duration: ${pulseDuration}s;
                    transform: rotate(${tilt}deg);
                ">
                    <svg viewBox="0 0 40 60" width="${capWidth * 1.3}" height="${height}">
                        <ellipse cx="20" cy="55" rx="6" ry="2" fill="rgba(0,0,0,0.4)" />
                        
                        <path d="M20,55 Q${16 + Math.random()*8},35 20,15" 
                              stroke="#112415" 
                              stroke-width="${3 + Math.random()*2}" 
                              fill="none" 
                              stroke-linecap="round"/>
                        
                        <ellipse cx="20" cy="15" rx="${capWidth / 2}" ry="3" fill="#183620" />
                        
                        <path d="M${20 - capWidth/2},15 C${20 - capWidth/2},${15 - capHeight * 1.5} ${20 + capWidth/2},${15 - capHeight * 1.5} ${20 + capWidth/2},15 Z" 
                              fill="#1e4426" />
                        
                        <circle cx="20" cy="${15 - capHeight/2}" r="1.5" fill="#39ff14" opacity="0.9" />
                        <circle cx="${20 - capWidth/5}" cy="${14 - capHeight/3}" r="1" fill="#39ff14" opacity="0.8" />
                        <circle cx="${20 + capWidth/4}" cy="${16 - capHeight/4}" r="1.2" fill="#39ff14" opacity="0.8" />
                    </svg>
                </div>
            `;
        }

        containerWrapper.innerHTML = clusterHTML;
        section.appendChild(containerWrapper);
    });
});
