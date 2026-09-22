const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


(() => {
    const nav = document.querySelector(".nav");
    const toggle = document.getElementById("menu-toggle");
    if (!nav || !toggle) return;

    const setOpen = (open) => {
        nav.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    toggle.addEventListener("click", () => {
        setOpen(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll(".nav-links a").forEach((link) =>
        link.addEventListener("click", () => setOpen(false))
    );

    document.addEventListener("click", (e) => {
        if (!nav.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setOpen(false);
    });
})();

(() => {
    const viewport = document.querySelector(".avatars");
    const track = document.querySelector(".avatar-track");
    if (!viewport || !track) return;

    const items = [...track.querySelectorAll(".avatar")];
    const quoteEl = document.getElementById("t-quote");
    const nameEl = document.getElementById("t-name");
    const roleEl = document.getElementById("t-role");
    const prevBtn = document.getElementById("t-prev");
    const nextBtn = document.getElementById("t-next");

    let index = Math.max(0, items.findIndex((el) => el.classList.contains("is-active")));

    function getSizes() {
        const small = Math.round(Math.min(190, Math.max(72, window.innerWidth * 0.13)));
        return {
            small,
            active: Math.round(small * 1.42),
            gap: Math.round(small * 0.125),
        };
    }

    function positionTrack() {
        const { small, active, gap } = getSizes();
        track.style.setProperty("--s", small + "px");
        track.style.setProperty("--a", active + "px");
        track.style.setProperty("--g", gap + "px");

        const centreOfActive = index * (small + gap) + active / 2;
        const offset = viewport.clientWidth / 2 - centreOfActive;
        track.style.transform = `translateX(${offset}px)`;
    }

    function buildQuote(text) {
        const [start = "", highlight = "", end = ""] = text.split("|");
        const safe = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
        return `${safe(start)}<em>${safe(highlight)}</em><span class="fade">${safe(end)}</span>`;
    }

    function update(animate = true) {
        items.forEach((el, i) => {
            const isActive = i === index;
            el.classList.toggle("is-active", isActive);
            el.setAttribute("aria-current", String(isActive));
        });

        positionTrack();

        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === items.length - 1;

        const current = items[index];
        nameEl.textContent = current.dataset.name;
        roleEl.textContent = current.dataset.role;
        if (current.dataset.quote) quoteEl.innerHTML = buildQuote(current.dataset.quote);

        if (animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            quoteEl.animate(
                [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }],
                { duration: 450, easing: "ease-out" }
            );
        }
    }

    items.forEach((el, i) =>
        el.addEventListener("click", () => {
            index = i;
            update();
        })
    );
    prevBtn.addEventListener("click", () => {
        if (index > 0) { index--; update(); }
    });
    nextBtn.addEventListener("click", () => {
        if (index < items.length - 1) { index++; update(); }
    });

    window.addEventListener("resize", positionTrack);

    // first paint: no animation, and no slide-in from the left
    track.style.transition = "none";
    update(false);
    requestAnimationFrame(() => requestAnimationFrame(() => (track.style.transition = "")));
})();


(() => {
    const form = document.getElementById("reservation-form");
    if (!form) return;
    const button = form.querySelector(".btn");
    const label = button.textContent;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        button.textContent = "Reservation request sent";
        button.disabled = true;
        form.reset();

        setTimeout(() => {
            button.textContent = label;
            button.disabled = false;
        }, 3500);
    }                                                                                                                                                                                                                                                                                                                                                                                                                               );
})();