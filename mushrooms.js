/* ============================================================================
   MUSHROOM POSITION CONFIG
   Edit these numbers to nudge the corner mushrooms -- nothing else in this
   file needs to change. All four corners share the same numbers (mirrored
   automatically), so there's one dial per direction, not four.
   ============================================================================ */
const MUSHROOM_CONFIG = {
    // Overall size of each mushroom's bounding box, per breakpoint (px).
    size: {
        desktop: 48,   // >= 992px
        tablet: 42,    // 768px - 991px
        mobile: 30,    // <= 767px
    },

    // How far the mushroom is pushed out past each card corner (px).
    // These are CSS top/bottom/left/right values, so negative = further
    // outside the card; 0 = flush with the corner; positive = pulled in.
    offset: {
        desktop: { top: -40, bottom: -0, left: -31, right: -31 },
        tablet:  { top: -41, bottom: -0, left: -30, right: -30 },
        mobile:  { top: -29, bottom: -0, left: -21, right: -21 },
    },

    // Cap placement, independent of the stem/foot. Units are SVG viewBox
    // units (the art lives in a 0-56 box) so these stay in proportion at
    // every breakpoint automatically.
    cap: {
        offsetX: 10,      // + moves the cap right, - moves it left
        offsetY: 0,      // + moves the cap down, - moves it up
        leanAngle: -22,  // degrees the whole mushroom leans; - = left, + = right
    },
};

document.addEventListener("DOMContentLoaded", () => {
    let uid = 0;
    const nextId = (prefix) => `${prefix}-${Date.now().toString(36)}-${uid++}`;

    // Push MUSHROOM_CONFIG's size/offset numbers into CSS custom properties
    // so style.css's breakpoints can read them. This is the only bridge
    // between the config above and the stylesheet -- change the numbers up
    // top and they flow through automatically, no need to touch style.css.
    (function applyMushroomConfig() {
        const root = document.documentElement.style;
        const { size, offset } = MUSHROOM_CONFIG;
        ["desktop", "tablet", "mobile"].forEach((bp) => {
            root.setProperty(`--mush-size-${bp}`, `${size[bp]}px`);
            root.setProperty(`--mush-top-${bp}`, `${offset[bp].top}px`);
            root.setProperty(`--mush-bottom-${bp}`, `${offset[bp].bottom}px`);
            root.setProperty(`--mush-left-${bp}`, `${offset[bp].left}px`);
            root.setProperty(`--mush-right-${bp}`, `${offset[bp].right}px`);
        });
    })();

    /* ======================================================================
       CORNER TOADSTOOLS
       One simple, self-contained <div class="tw-mush tw-*"> per corner.
       Position is set with plain top/left/right/bottom pixel values ONLY
       (no percentage tricks, no runtime transforms for placement), so there
       is nothing that can silently drift. The element's own CSS `transform`
       is reserved purely for the grow + sway animation.
       ====================================================================== */
    function mushroomSVG(id) {
        // viewBox is 56x56. One single piece of art: the mushroom always
        // stands upright (cap up, foot down) -- gravity never flips. The
        // whole thing leans, rotated around its foot at (40, 54), which is
        // the "attach" point. CSS positions the element so (40,54) lands
        // on the card's corner. Only a horizontal mirror (per corner, in
        // CSS) is ever applied -- to pick which way it leans -- never a
        // vertical one, so it can never look upside-down.
        const { offsetX: capX, offsetY: capY, leanAngle } = MUSHROOM_CONFIG.cap;
        return `
            <svg viewBox="0 0 56 56" style="overflow: visible;">
                <defs>
                    <radialGradient id="cap-${id}" cx="34%" cy="28%" r="85%">
                        <stop offset="0%"  stop-color="#ffab7f" />
                        <stop offset="40%" stop-color="#f2703a" />
                        <stop offset="75%" stop-color="#dd4a20" />
                        <stop offset="100%" stop-color="#b93018" />
                    </radialGradient>
                    <linearGradient id="stem-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stop-color="#c9a878" />
                        <stop offset="30%"  stop-color="#fbf3e2" />
                        <stop offset="70%"  stop-color="#fbf3e2" />
                        <stop offset="100%" stop-color="#c9a878" />
                    </linearGradient>
                </defs>

                <g transform="rotate(${leanAngle} 40 54)">
                    <ellipse cx="39" cy="53.5" rx="7" ry="2" fill="#000000" opacity="0.3" />

                    <!-- curved stem: bulges out then tucks back in, like a
                         gentle backwards-C, instead of a straight tube -->
                    <path d="M37.5,54.5
                             C32,50.5 29.5,45 32,39.5
                             C33.4,36.5 35.6,34.5 38.5,33
                             L42.5,34
                             C40,36 38,38.5 37,41.5
                             C35.3,46.5 37.5,50.5 42,53.5
                             Z"
                          fill="url(#stem-${id})" stroke="#b09062" stroke-width="0.4" />
                    <path d="M35,41 C34,45.5 35.6,49.5 39,52.5" stroke="#ffffff" stroke-width="0.9" fill="none" opacity="0.5"/>

                    <!-- everything below is the cap: wrapped in its own
                         translate so MUSHROOM_CONFIG.cap.offsetX/offsetY can
                         reposition it without touching the stem -->
                    <g transform="translate(${capX}, ${capY})">
                        <!-- gills peeking under the tilted cap rim -->
                        <path d="M5,28.5 C5,37.5 46,33.5 46,29.5 L46,31.5 C46,36 5,37.5 20 15 30 5,34.5 Z" fill="#fde9cc" opacity="0.9"></path>
                        
                        

                        <!-- asymmetric leaning cap: fuller on the upper-left,
                             tapering toward the stem on the lower-right -->
                        <path d="M2,24.5 C0,13 10,0.5 24,-0.5 C36,-1.1 46.5,6 50.5,16.5
                                 C52.5,22 48,29 41,32 C33,35 16,33.5 7.5,30
                                 C4,28.5 2.6,27.5 2,24.5 Z"
                              fill="url(#cap-${id})" stroke="#7a1f0a" stroke-width="0.55" />
                        <path d="M6,21.5 C4.6,12 12,2.9 22,1.1" stroke="#ffd2ad" stroke-width="1.4" fill="none" opacity="0.5" stroke-linecap="round"/>

                        <!-- densely scattered irregular spots across the lit surface -->
                        <ellipse cx="14" cy="8.5"  rx="2.1" ry="1.7" fill="#fff8ec" opacity="0.96"/>
                        <ellipse cx="24" cy="4.5"  rx="1.6" ry="1.3" fill="#fff8ec" opacity="0.95"/>
                        <ellipse cx="33" cy="7.5"  rx="1.9" ry="1.5" fill="#fff8ec" opacity="0.94"/>
                        <ellipse cx="41" cy="13.5" rx="1.7" ry="1.4" fill="#fff8ec" opacity="0.9"/>
                        <ellipse cx="8"  cy="17.5" rx="1.5" ry="1.2" fill="#fff8ec" opacity="0.92"/>
                        <ellipse cx="18" cy="15.5" rx="1.3" ry="1.05" fill="#fff8ec" opacity="0.85"/>
                        <ellipse cx="28" cy="14.5" rx="1.5" ry="1.2" fill="#fff8ec" opacity="0.85"/>
                        <ellipse cx="36" cy="20.5" rx="1.4" ry="1.1" fill="#fff8ec" opacity="0.82"/>
                        <ellipse cx="12" cy="23.5" rx="1.2" ry="1.0" fill="#fff8ec" opacity="0.8"/>
                        <ellipse cx="22" cy="23.5" rx="1.1" ry="0.9" fill="#fff8ec" opacity="0.78"/>
                        <ellipse cx="45" cy="18.5" rx="1.2" ry="1.0" fill="#fff8ec" opacity="0.8"/>
                    </g>
                </g>
            </svg>`;
    }

    // flip: mirror the artwork horizontally for the right-hand corners so
    // they lean the opposite way from the left-hand ones.
    const CORNERS = ["tw-tl", "tw-tr", "tw-bl", "tw-br"];

    function generateMushroom(cornerClass) {
        const id = nextId("shroom");

        const growDur = (1.1 + Math.random() * 0.5).toFixed(2);
        const growDelay = (Math.random() * 0.5).toFixed(2);
        const swayDur = (4.5 + Math.random() * 2).toFixed(2);
        const tiltA = -(1.6 + Math.random() * 0.8).toFixed(1);
        const tiltB = (1.6 + Math.random() * 0.8).toFixed(1);

        const el = document.createElement("div");
        el.className = `tw-mush ${cornerClass}`;
        el.style.setProperty("--grow-dur", `${growDur}s`);
        el.style.setProperty("--grow-delay", `${growDelay}s`);
        el.style.setProperty("--sway-dur", `${swayDur}s`);
        el.style.setProperty("--tilt-a", `${tiltA}deg`);
        el.style.setProperty("--tilt-b", `${tiltB}deg`);
        el.innerHTML = mushroomSVG(id);

        const totalGrowMs = (parseFloat(growDur) + parseFloat(growDelay)) * 1000;
        let handed = false;
        const handOff = () => {
            if (handed) return;
            handed = true;
            el.style.opacity = "1";
            el.classList.add("sway");
        };
        el.addEventListener("animationend", (e) => {
            if (e.animationName === "twGrow") handOff();
        });
        setTimeout(handOff, totalGrowMs + 150);

        return el;
    }

    document.querySelectorAll("section").forEach((section) => {
        CORNERS.forEach((cls) => section.appendChild(generateMushroom(cls)));
    });

    /* ======================================================================
       TREE TRUNK + CLUSTERED SHELF FUNGUS, running the full page height.
       (unchanged from the previously-approved version)
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

    // Slightly wider than before
    const w = 50 * scale * dir;
    const inset = -5;
    const x = edgeX + (isLeft ? inset : -inset);

    // ---------- TOP CAP ----------
    const top = `
        M${x},${cyAbs-8}
        C${x+w*0.18},${cyAbs-9}
         ${x+w*0.70},${cyAbs-4}
         ${x+w},${cyAbs+2}

        C${x+w*0.82},${cyAbs+3}
         ${x+w*0.32},${cyAbs+1}
         ${x},${cyAbs-2}
        Z`;

    // ---------- UNDERSIDE ----------
    const under = `
        M${x},${cyAbs+2}
        C${x+w*0.28},${cyAbs+3}
         ${x+w*0.82},${cyAbs+4}
         ${x+w},${cyAbs+2}

        C${x+w*0.90},${cyAbs+9}
         ${x+w*0.42},${cyAbs+10}
         ${x},${cyAbs+7}
        Z`;

    // ---------- GILLS ----------
    let gills = "";

    for (let i = 0; i < 4; i++) {

        const yy = cyAbs + 3 + i * 1.5;

        gills += `
            <path
                d="M${x+dir*2},${yy}
                   Q${x+w*0.35},${yy+0.9}
                    ${x+w*0.92},${yy-0.4}"
                stroke="#7a4b14"
                stroke-width="0.45"
                opacity="0.35"
                fill="none"
            />`;
    }

    return `
        <g class="shelf-fungus ${sideClassName}" style="animation-delay:${delay}s">

            <defs>

                <linearGradient id="${c}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#3a2110"/>
                    <stop offset="45%" stop-color="#8a4a12"/>
                    <stop offset="100%" stop-color="#e0a13a"/>
                </linearGradient>

                <linearGradient id="${p}" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#f4e2b0"/>
                    <stop offset="100%" stop-color="#a97a2e"/>
                </linearGradient>

            </defs>

            <path
                d="${under}"
                fill="url(#${p})"
            />

            ${gills}

            <path
                d="${top}"
                fill="url(#${c})"
                stroke="#2b1608"
                stroke-width="0.6"
            />

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
