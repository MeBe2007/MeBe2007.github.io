document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    sections.forEach((section, index) => {
        const containerWrapper = document.createElement("div");
        containerWrapper.className = "cluster-container";

        const typeA = `
            <div class="mushroom-cluster type-a" style="right: 30px; transform: scale(1.5);">
                <svg viewBox="0 0 50 50" width="50" height="50">
                    <path d="M15,50 Q18,30 12,18 M30,50 Q28,22 34,12" stroke="#122416" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                    <path d="M22,14 C22,3 44,3 44,14 Z" fill="#1b3b22"/>
                    <ellipse cx="33" cy="13.5" rx="11" ry="2.5" fill="#2d5e39"/>
                    <circle cx="28" cy="8" r="1.2" fill="#39ff14"/>
                    <circle cx="36" cy="7" r="1" fill="#39ff14"/>
                    <path d="M4,20 C4,11 19,11 19,20 Z" fill="#152e1a"/>
                    <ellipse cx="11.5" cy="19.5" rx="7.5" ry="2" fill="#224a2a"/>
                    <circle cx="11" cy="16" r="1" fill="#39ff14"/>
                </svg>
            </div>
        `;

        const typeB = `
            <div class="mushroom-cluster type-b" style="left: 20px; transform: scale(1.6) scaleX(-1);">
                <svg viewBox="0 0 50 40" width="50" height="40">
                    <path d="M0,40 Q15,35 10,20" stroke="#0e1f13" stroke-width="4" fill="none"/>
                    <path d="M2,28 C2,16 32,16 32,28 Z" fill="#18331f"/>
                    <ellipse cx="17" cy="27" rx="15" ry="3.5" fill="#295434"/>
                    <circle cx="12" cy="23" r="1.4" fill="#39ff14"/>
                    <circle cx="22" cy="22" r="1.2" fill="#39ff14"/>
                    <path d="M25,36 C25,30 39,30 39,36 Z" fill="#0f2114"/>
                    <ellipse cx="32" cy="35.5" rx="7" ry="1.5" fill="#1a3822"/>
                </svg>
            </div>
        `;

        containerWrapper.innerHTML = typeA + typeB;

        if (index % 2 !== 0) {
            const elA = containerWrapper.querySelector(".type-a");
            const elB = containerWrapper.querySelector(".type-b");
            if (elA) { elA.style.right = "auto"; elA.style.left = "45px"; elA.style.transform = "scale(1.4) scaleX(-1)"; }
            if (elB) { elB.style.left = "auto"; elB.style.right = "15px"; elB.style.transform = "scale(1.7)"; }
        }

        section.appendChild(containerWrapper);
    });
});
