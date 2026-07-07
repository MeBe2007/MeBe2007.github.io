/ Wait for the page structure to load completely
document.addEventListener("DOMContentLoaded", () => {
    // Find every card section on the current page
    const sections = document.querySelectorAll("section");

    sections.forEach((section, index) => {
        const clusterContainer = document.createElement("div");
        clusterContainer.className = "cluster-container";

        // Raw SVG code for the living mushroom cluster
        clusterContainer.innerHTML = `
            <div class="mushroom-cluster">
                <svg viewBox="0 0 40 40" width="35" height="35">
                    <path d="M12,40 Q13,25 9,18 M22,40 Q21,20 24,12 M28,40 Q29,30 31,24" stroke="#162b1c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                    
                    <path d="M4,19 C4,13 14,13 14,19 Z" fill="#1b3822"/>
                    <ellipse cx="9" cy="18" rx="4.5" ry="1.5" fill="#2d5c39"/>
                    <circle cx="9" cy="15" r="0.7" fill="#39ff14"/>
                    
                    <path d="M17,13 C17,5 31,5 31,13 Z" fill="#22472b"/>
                    <ellipse cx="24" cy="12.5" rx="6.5" ry="2" fill="#346b41"/>
                    <circle cx="22" cy="9" r="0.8" fill="#39ff14"/>
                    <circle cx="26" cy="8" r="0.6" fill="#39ff14"/>
                    
                    <path d="M27,25 C27,20 36,20 36,25 Z" fill="#17301d"/>
                    <ellipse cx="31.5" cy="24.5" rx="4" ry="1.2" fill="#254d2f"/>
                    <circle cx="31.5" cy="22" r="0.5" fill="#39ff14"/>
                </svg>
            </div>
        `;

        // Vary the positions slightly on different cards so they look natural
        const clusterElement = clusterContainer.querySelector(".mushroom-cluster");
        if (index % 2 === 0) {
            clusterElement.style.right = "25px";
            clusterElement.style.left = "auto";
        } else {
            clusterElement.style.left = "25px";
            clusterElement.style.right = "auto";
            // Flip them horizontally on alternating cards so they aren't identical copies
            clusterElement.style.transform = "scaleX(-1)";
        }

        // Drop the mushrooms directly into the card section
        section.appendChild(clusterContainer);
    });
});
