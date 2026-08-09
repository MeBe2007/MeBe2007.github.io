document.addEventListener("DOMContentLoaded", () => {
    let uid = 0;
    const nextId = (prefix) => `${prefix}-${Date.now().toString(36)}-${uid++}`;

    /* ======================================================================
       TREE TRUNK + CLUSTERED SHELF FUNGUS
       ====================================================================== */
    function buildTreeSVG(isLeft, H) {
        const id = nextId("trunk");
        const edgeX = isLeft ? 46 : 94;
        const dir = isLeft ? 1 : -1;
        const sideClass = isLeft ? "shelf-left" : "shelf-right";

        const trunkPath = isLeft
            ? `M0,0 L44,0 C55,${H*0.10} 36,${H*0.22} 49,${H*0.35} C59,${H*0.47} 33,${H*0.60} 47,${H*0.72} C57,${H*0.83} 34,${H*0.92} 46,${H} L0,${H} Z`
            : `M140,0 L96,0 C85,${H*0.10} 104,${H*0.22} 91,${H*0.35} C81,${H*0.47} 107,${H*0.60} 93,${H*0.72} C83,${H*0.83} 106,${H*0.92} 94,${H} L140,${H} Z`;

        const highlightPath = isLeft
            ? `M18,0 C26,${H*0.15} 15,${H*0.32} 24,${H*0.5} C31,${H*0.65} 14,${H*0.8} 22,${H} L11,${H} C4,${H*0.8} 20,${H*0.65} 12,${H*0.5} C4,${H*0.32} 15,${H*0.15} 8,0 Z`
            : `M122,0 C114,${H*0.15} 125,${H*0.32} 116,${H*0.5} C109,${H*0.65} 126,${H*0.8} 118,${H} L129,${H} C136,${H*0.8} 120,${H*0.65} 128,${H*0.5} C136,${H*0.32} 125,${H*0.15} 132,0 Z`;

        const barkRidges = isLeft
            ? `<path d="M10,0 Q19,${H*0.22} 8,${H*0.45} Q20,${H*0.68} 11,${H}" stroke="#2b1608" stroke-width="2" fill="none" opacity="0.4"/>
               <path d="M25,0 Q32,${H*0.25} 21,${H*0.5} Q34,${H*0.75} 23,${H}" stroke="#3a2110" stroke-width="1.5" fill="none" opacity="0.32"/>
               <path d="M36,0 Q29,${H*0.22} 38,${H*0.48} Q27,${H*0.75} 38,${H}" stroke="#1e0f05" stroke-width="1.3" fill="none" opacity="0.36"/>
               <path d="M16,0 Q22,${H*0.3} 14,${H*0.55} Q23,${H*0.8} 15,${H}" stroke="#5a3d1f" stroke-width="1" fill="none" opacity="0.28"/>`
            : `<path d="M130,0 Q121,${H*0.22} 132,${H*0.45} Q120,${H*0.68} 129,${H}" stroke="#2b1608" stroke-width="2" fill="none" opacity="0.4"/>
               <path d="M115,0 Q108,${H*0.25} 119,${H*0.5} Q106,${H*0.75} 117,${H}" stroke="#3a2110" stroke-width="1.5" fill="none" opacity="0.32"/>
               <path d="M104,0 Q111,${H*0.22} 102,${H*0.48} Q113,${H*0.75} 102,${H}" stroke="#1e0f05" stroke-width="1.3" fill="none" opacity="0.36"/>
               <path d="M124,0 Q118,${H*0.3} 126,${H*0.55} Q117,${H*0.8} 125,${H}" stroke="#5a3d1f" stroke-width="1" fill="none" opacity="0.28"/>`;

        const knotFracs = [0.18, 0.44, 0.66, 0.88];
        const knotIds = knotFracs.map(() => `knot-${nextId(id)}`);
        const knotDefs = knotFracs.map((f, i) => `
            <radialGradient id="${knotIds[i]}" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stop-color="#5a3c1f"/>
                <stop offset="60%" stop-color="#2e1a0a"/>
                <stop offset="100%" stop-color="#1a0e04"/>
            </radialGradient>`).join("");
        const knotEls = knotFracs.map((f, i) => {
            const cy = H * f;
            const cx = isLeft ? (18 + (i % 2) * 9) : (122 - (i % 2) * 9);
            return `<ellipse cx="${cx}" cy="${cy}" rx="4.2" ry="6.5" fill="url(#${knotIds[i]})" opacity="0.85"/>`;
        }).join("");

        const sideClassName = sideClass;

        function shelf(cyAbs, scale, delay) {
            const p = `pore-${nextId(id)}`;
            const c = `crust-${nextId(id)}`;

            const w = 50 * scale * dir;
            const inset = -5;
            const x = edgeX + (isLeft ? inset : -inset);

            // TOP CAP
            const top = `
                M${x},${cyAbs-8}
                C${x+w*0.18},${cyAbs-9}
                 ${x+w*0.70},${cyAbs-4}
                 ${x+w},${cyAbs+2}

                C${x+w*0.82},${cyAbs+3}
                 ${x+w*0.32},${cyAbs+1}
                 ${x},${cyAbs-2}
                Z`;

            // UNDERSIDE
            const under = `
                M${x},${cyAbs+2}
                C${x+w*0.28},${cyAbs+3}
                 ${x+w*0.82},${cyAbs+4}
                 ${x+w},${cyAbs+2}

                C${x+w*0.90},${cyAbs+9}
                 ${x+w*0.42},${cyAbs+10}
                 ${x},${cyAbs+7}
                Z`;

            // GILLS
            let gills = "";
            for (let i = 0; i < 4; i++) {
                const yy = cyAbs + 3 + i * 1.5;
                gills += `
                    <path
                        d="M${x+dir*2},${yy}
                           Q${x+w*0.35},${yy+0.9}
                            ${x+w*0.92},${yy-0.4}"
                        stroke="#6b3a04"
                        stroke-width="0.5"
                        opacity="0.5"
                        fill="none"
                    />`;
            }

            return `
                <g class="shelf-fungus ${sideClassName}" style="animation-delay:${delay}s">
                    <defs>
                        <!-- Restored original multi-stop vibrant crust gradient -->
                        <linearGradient id="${c}" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#211003"/>
                            <stop offset="45%" stop-color="#4c1d95"/>
                            <stop offset="80%" stop-color="#b45309"/>
                            <stop offset="100%" stop-color="#f59e0b"/>
                        </linearGradient>

                        <!-- Restored original glowing underbelly gradient -->
                        <linearGradient id="${p}" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#fef08a"/>
                            <stop offset="30%" stop-color="#fef9c3"/>
                            <stop offset="100%" stop-color="#a16207"/>
                        </linearGradient>
                    </defs>

                    <path d="${under}" fill="url(#${p})" />
                    ${gills}
                    <path d="${top}" fill="url(#${c})" stroke="#211003" stroke-width="0.6" />
                    <path d="M${x},${cyAbs-7} C${x+w*0.18},${cyAbs-8} ${x+w*0.70},${cyAbs-3} ${x+w},${cyAbs+2}" stroke="#fde047" stroke-width="0.8" fill="none" opacity="0.35" />
                </g>`;
        }

        const clusters = [
            { frac: 0.05, layers: [{ dy: 0,   scale: 0.75 }] },
            { frac: 0.17, layers: [{ dy: -6,  scale: 0.55 }, { dy: 7,  scale: 0.9 }] },
            { frac: 0.31, layers: [{ dy: -11, scale: 0.5 }, { dy: 0, scale: 0.8 }, { dy: 12, scale: 1 }] },
            { frac: 0.47, layers: [{ dy: 0,   scale: 0.7 }] },
            { frac: 0.62, layers: [{ dy: -9,  scale: 0.55 }, { dy: 8, scale: 0.92 }] },
            { frac: 0.78, layers: [{ dy: -11, scale: 0.5 }, { dy: 0, scale: 0.82 }, { dy: 12, scale: 1 }] },
            { frac: 0.92, layers: [{ dy: 0,   scale: 0.68 }] },
        ];

        const shelves = clusters.map((cl, ci) =>
            cl.layers.map((layer, li) =>
                shelf(H * cl.frac + layer.dy, layer.scale, (ci * 0.5 + li * 0.25).toFixed(2))
            ).join("")
        ).join("");

        return `
            <svg viewBox="0 0 140 ${H}" preserveAspectRatio="none" style="overflow: visible;">
                <defs>
                    <linearGradient id="bark-${id}" x1="${isLeft ? '0%' : '100%'}" y1="0%" x2="${isLeft ? '100%' : '0%'}" y2="0%">
                        <stop offset="0%" stop-color="#3d2712"/>
                        <stop offset="35%" stop-color="#6b4a26"/>
                        <stop offset="65%" stop-color="#7c5a34"/>
                        <stop offset="100%" stop-color="#5a3d20"/>
                    </linearGradient>
                    ${knotDefs}
                </defs>
                ${shelves}
                <path class="tree-trunk" d="${trunkPath}" fill="url(#bark-${id})" />
                <path class="tree-highlight" d="${highlightPath}" fill="#8a6738" opacity="0.35"/>
                ${barkRidges}
                ${knotEls}
            </svg>`;
    }

    function renderTrees() {
        document.querySelectorAll(".tree-shroom").forEach((el) => el.remove());

        const H = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
            window.innerHeight
        );

        [true, false].forEach((isLeft) => {
            const wrap = document.createElement("div");
            wrap.className = `tree-shroom ${isLeft ? "tree-left" : "tree-right"}`;
            wrap.style.height = `${H}px`;
            wrap.innerHTML = buildTreeSVG(isLeft, H);
            document.body.appendChild(wrap);
        });
    }

    renderTrees();
    window.addEventListener("load", renderTrees);

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(renderTrees, 300);
    });
});
