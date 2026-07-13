// Areias Technology · interações do site
(function () {
    "use strict";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- header com fundo ao rolar ---------- */

    const header = document.querySelector("[data-header]");

    const onScroll = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---------- menu mobile ---------- */

    const navToggle = document.querySelector("[data-nav-toggle]");
    const navList = document.querySelector("[data-nav-list]");

    const closeMenu = () => {
        navList.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menu");
    };

    navToggle.addEventListener("click", () => {
        const open = navList.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(open));
        navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });

    navList.addEventListener("click", (event) => {
        if (event.target.matches("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });

    /* ---------- reveal on scroll ---------- */

    const revealElements = document.querySelectorAll(".reveal");

    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach((el) => el.classList.add("is-visible"));
    } else {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        revealElements.forEach((el) => revealObserver.observe(el));
    }

    /* ---------- contadores animados ---------- */

    const formatValue = (value, decimals) =>
        value.toLocaleString("pt-BR", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });

    const animateCounter = (el) => {
        const target = parseFloat(el.dataset.target);
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const duration = 1600;

        if (reducedMotion) {
            el.textContent = prefix + formatValue(target, decimals) + suffix;
            return;
        }

        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = prefix + formatValue(target * eased, decimals) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    };

    const counters = document.querySelectorAll("[data-counter]");

    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.6 }
        );

        counters.forEach((el) => counterObserver.observe(el));
    } else {
        counters.forEach(animateCounter);
    }

    /* ---------- terminal com digitação ---------- */

    const terminal = document.querySelector("[data-terminal]");

    if (terminal) {
        const lines = [
            { html: '<span class="t-gold">$</span> areias status --producao', delay: 300 },
            { html: '<span class="t-ok">✔</span> regiao: sa-east-1 <span class="t-dim">............</span> saudavel', delay: 350 },
            { html: '<span class="t-ok">✔</span> api-gateway <span class="t-dim">................</span> p99 12ms', delay: 300 },
            { html: '<span class="t-ok">✔</span> orders-service <span class="t-dim">.............</span> 6 replicas · 0 erros', delay: 300 },
            { html: '<span class="t-ok">✔</span> event-bus <span class="t-dim">..................</span> 42k msg/s', delay: 300 },
            { html: '<span class="t-ok">✔</span> failover drill <span class="t-dim">.............</span> aprovado', delay: 400 },
            { html: "&nbsp;", delay: 250 },
            { html: '<span class="t-gold">uptime 99,99%</span> <span class="t-dim">· ultimo incidente: ha 127 dias</span>', delay: 0 },
        ];

        const renderAll = () => {
            terminal.innerHTML = lines.map((line) => "<code>" + line.html + "</code>").join("\n");
        };

        const typeLines = () => {
            terminal.innerHTML = "";
            let index = 0;

            const next = () => {
                if (index >= lines.length) {
                    const cursor = document.createElement("span");
                    cursor.className = "t-cursor";
                    terminal.appendChild(cursor);
                    return;
                }

                const code = document.createElement("code");
                code.innerHTML = lines[index].html;
                terminal.appendChild(code);
                terminal.appendChild(document.createTextNode("\n"));

                const wait = lines[index].delay;
                index += 1;
                setTimeout(next, wait);
            };

            next();
        };

        if (reducedMotion || !("IntersectionObserver" in window)) {
            renderAll();
        } else {
            const terminalObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            typeLines();
                            terminalObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.4 }
            );

            terminalObserver.observe(terminal);
        }
    }

    /* ---------- ano do rodapé ---------- */

    const yearEl = document.querySelector("[data-year]");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
