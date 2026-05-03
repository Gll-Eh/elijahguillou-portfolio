// ==========================================================
//  Setup GSAP + Lenis (smooth scroll + scroll-triggered anims)
// ==========================================================

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

gsap.registerPlugin(ScrollTrigger);

// Lenis : scroll fluide qui pilote ScrollTrigger
const lenis = new Lenis({ lerp: 0.1 });

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ==========================================================
//  Bascule du thème du header selon la section visible
// ==========================================================

const header = document.querySelector('.site-header');
const lightSections = document.querySelectorAll(
    '.about, .resume, .work-grid, .work-page-hero, .work-list, .work-cta, .project-page'
);

function updateHeaderTheme() {
    if (!header) return;
    const trigger = header.offsetHeight / 2;
    let onLight = false;
    lightSections.forEach((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= trigger && bottom >= trigger) onLight = true;
    });
    header.classList.toggle('site-header--light-bg', onLight);
}

lenis.on('scroll', updateHeaderTheme);
window.addEventListener('resize', updateHeaderTheme);
updateHeaderTheme();

// ==========================================================
//  Animations
// ==========================================================

if (!reducedMotion) {
    // ----- Hero · entrée au load -----
    window.addEventListener('load', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.hero__title', { y: 70, opacity: 0, duration: 1.1 }, 0)
            .from('.hero__name', { y: 40, opacity: 0, duration: 1.2 }, 0.25)
            .from('.hero__role', { y: 30, opacity: 0, duration: 1 }, 0.45);
    });

    // ----- Bio · reveal au scroll -----
    gsap.from('.about__label', {
        scrollTrigger: { trigger: '.about', start: 'top 75%', toggleActions: 'play none none reverse' },
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
    });
    gsap.from('.about__heading', {
        scrollTrigger: { trigger: '.about', start: 'top 75%', toggleActions: 'play none none reverse' },
        y: 50, opacity: 0, duration: 1, delay: 0.15, ease: 'power3.out',
    });
    gsap.from('.about__text', {
        scrollTrigger: { trigger: '.about', start: 'top 75%', toggleActions: 'play none none reverse' },
        y: 30, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out',
    });
    gsap.from('.about__photo', {
        scrollTrigger: { trigger: '.about', start: 'top 75%', toggleActions: 'play none none reverse' },
        x: 80, opacity: 0, duration: 1.2, ease: 'power3.out',
    });

    // ----- Formes flottantes · fade-in (on n'animera QUE l'opacité
    //       pour ne pas écraser les keyframes CSS qui pilotent transform)
    gsap.from('.shape', {
        scrollTrigger: { trigger: '.about', start: 'top 80%', toggleActions: 'play none none reverse' },
        opacity: 0,
        duration: 1.4,
        stagger: 0.08,
        ease: 'power2.out',
    });

    // ----- Resume · titre + cartes timeline -----
    gsap.from('.resume__heading', {
        scrollTrigger: { trigger: '.resume', start: 'top 75%', toggleActions: 'play none none reverse' },
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
    });
    gsap.from('.resume__column-title', {
        scrollTrigger: { trigger: '.resume__columns', start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    });
    gsap.from('.resume__item', {
        scrollTrigger: { trigger: '.resume__columns', start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.12, delay: 0.25, ease: 'power3.out',
    });

    // ----- Work-grid · titre + cartes en stagger -----
    gsap.from('.work-grid__heading', {
        scrollTrigger: { trigger: '.work-grid', start: 'top 75%', toggleActions: 'play none none reverse' },
        y: 70, opacity: 0, duration: 1, ease: 'power3.out',
    });
    gsap.from('.work-grid__text', {
        scrollTrigger: { trigger: '.work-grid', start: 'top 75%', toggleActions: 'play none none reverse' },
        y: 30, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
    });
    gsap.from('.work-card', {
        scrollTrigger: { trigger: '.work-grid__list', start: 'top 85%', toggleActions: 'play none none reverse' },
        y: 60, opacity: 0, scale: 0.95,
        duration: 0.9, stagger: 0.1, ease: 'power3.out',
    });

    // ----- Page work (work.html) · entrée hero + grille -----
    window.addEventListener('load', () => {
        const heroTitle = document.querySelector('.work-page-hero__title');
        if (heroTitle) {
            gsap.from('.work-page-hero__label', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' });
            gsap.from('.work-page-hero__title', { y: 80, opacity: 0, duration: 1.2, delay: 0.15, ease: 'power3.out' });
            gsap.from('.work-page-hero__intro', { y: 30, opacity: 0, duration: 0.9, delay: 0.45, ease: 'power3.out' });
        }
    });

    document.querySelectorAll('.work-row').forEach((row, i) => {
        gsap.from(row, {
            scrollTrigger: { trigger: row, start: 'top 88%', toggleActions: 'play none none reverse' },
            y: 70, opacity: 0, scale: 0.96,
            duration: 0.9, ease: 'power3.out',
            delay: (i % 2) * 0.08,
        });
    });

    gsap.from('.work-cta__title', {
        scrollTrigger: { trigger: '.work-cta', start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 50, opacity: 0, duration: 1, ease: 'power3.out',
    });
    gsap.from('.work-cta__btn', {
        scrollTrigger: { trigger: '.work-cta', start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 30, opacity: 0, duration: 0.8, delay: 0.25, ease: 'power3.out',
    });

    // ----- Page projet (projects/projet-X.html) · entrée au load -----
    window.addEventListener('load', () => {
        const projectMedia = document.querySelector('.project-page__media');
        if (!projectMedia) return;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.project-page__back', { y: 20, opacity: 0, duration: 0.6 }, 0)
            .from('.project-page__media', { y: 60, opacity: 0, scale: 0.97, duration: 1.2 }, 0.1)
            .from('.project-page__title', { y: 50, opacity: 0, duration: 0.9 }, 0.45)
            .from('.project-page__subtitle', { y: 25, opacity: 0, duration: 0.7 }, 0.6)
            .from('.project-page__pills .pill', { y: 20, opacity: 0, duration: 0.5, stagger: 0.06 }, 0.75)
            .from('.project-page__tools .tool', { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.95);
    });

    // ----- Page projet · reveals au scroll -----
    document.querySelectorAll('.project-page__context').forEach((section) => {
        const items = section.querySelectorAll(
            '.project-page__h2, .project-page__text > p, .project-page__list > li'
        );
        if (!items.length) return;

        gsap.from(items, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            y: 35,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
        });
    });

    // Chaque figure (hero secondaire, mockup, placeholder paysage) trigger
    // indépendamment quand elle entre dans la viewport
    document.querySelectorAll('.project-page__figure').forEach((fig) => {
        // En mode 2-colonnes (figure dans .project-page__text), slide depuis la droite
        const isSidebar = fig.parentElement?.classList.contains('project-page__context')
            && fig.previousElementSibling?.classList.contains('project-page__text');

        gsap.from(fig, {
            scrollTrigger: {
                trigger: fig,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
            y: isSidebar ? 0 : 60,
            x: isSidebar ? 60 : 0,
            opacity: 0,
            scale: isSidebar ? 1 : 0.94,
            duration: 1.1,
            ease: 'power3.out',
        });
    });

    // Bloc Bilan personnel · fade + scale
    gsap.from('.project-page__bilan', {
        scrollTrigger: {
            trigger: '.project-page__bilan',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
        ease: 'power3.out',
    });

    // Subtle hover sur chaque chip d'outil (lift au passage)
    document.querySelectorAll('.tool').forEach((tool) => {
        const icon = tool.querySelector('.tool__icon');
        if (!icon) return;
        tool.addEventListener('mouseenter', () => {
            gsap.to(tool, { y: -3, duration: 0.3, ease: 'power2.out' });
            gsap.to(icon, { rotate: -6, scale: 1.1, duration: 0.4, ease: 'back.out(2)' });
        });
        tool.addEventListener('mouseleave', () => {
            gsap.to(tool, { y: 0, duration: 0.3, ease: 'power2.out' });
            gsap.to(icon, { rotate: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
        });
    });

    // ========================================================
    //  Wave hover sur "Elijah • Guillou" (lettres + dot)
    // ========================================================
    function setupNameWave(nameEl) {
        if (nameEl.dataset.waveReady) return;
        nameEl.dataset.waveReady = '1';

        // Wrap chaque caractère dans un <span> pour pouvoir l'animer.
        // Le .dot reste intact (son markup d'origine), il sera animé en même temps.
        const wrapChars = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                const frag = document.createDocumentFragment();
                for (const char of text) {
                    if (char === ' ') {
                        frag.appendChild(document.createTextNode(' '));
                    } else {
                        const span = document.createElement('span');
                        span.className = 'site-header__name-char';
                        span.textContent = char;
                        frag.appendChild(span);
                    }
                }
                node.replaceWith(frag);
            } else if (
                node.nodeType === Node.ELEMENT_NODE &&
                !node.classList.contains('dot')
            ) {
                [...node.childNodes].forEach(wrapChars);
            }
        };
        [...nameEl.childNodes].forEach(wrapChars);

        // Cibles de la vague (chars + dot) dans l'ordre DOM, donc le dot est
        // animé pile à sa position dans le mot.
        const waveTargets = nameEl.querySelectorAll('.site-header__name-char, .dot');

        // Timeline réutilisable : fromTo force le start à y:0 + yoyo garantit
        // qu'on revient à y:0 à la fin, donc plus de blocage en haut.
        const tl = gsap.timeline({ paused: true });
        tl.fromTo(
            waveTargets,
            { y: 0 },
            {
                y: -10,
                duration: 0.4,
                stagger: { each: 0.04 },
                ease: 'sine.inOut',
                yoyo: true,
                repeat: 1,
            }
        );

        nameEl.addEventListener('mouseenter', () => {
            tl.restart();
        });
    }

    document.querySelectorAll('.site-header__name').forEach(setupNameWave);

    // ========================================================
    //  Wave hover sur le Elijah • Guillou du footer (typo géante)
    // ========================================================
    function setupFooterWave(container) {
        if (container.dataset.waveReady) return;
        container.dataset.waveReady = '1';

        // Découpe chaque mot en lettres individuelles
        container.querySelectorAll('.site-footer__nameword').forEach((word) => {
            const text = word.textContent;
            word.textContent = '';
            for (const char of text) {
                const span = document.createElement('span');
                span.className = 'site-footer__char';
                span.textContent = char;
                word.appendChild(span);
            }
        });

        // Cibles = toutes les lettres + le dot, dans l'ordre DOM
        const targets = container.querySelectorAll(
            '.site-footer__char, .site-footer__dot'
        );

        // Timeline réutilisable (fromTo + yoyo garantit retour à y:0)
        const tl = gsap.timeline({ paused: true });
        tl.fromTo(
            targets,
            { y: 0 },
            {
                y: -30,
                duration: 0.55,
                stagger: { each: 0.05 },
                ease: 'sine.inOut',
                yoyo: true,
                repeat: 1,
            }
        );

        container.addEventListener('mouseenter', () => {
            tl.restart();
        });
    }

    document.querySelectorAll('.site-footer__name').forEach(setupFooterWave);

    // ========================================================
    //  Footer · reveals au scroll
    // ========================================================
    gsap.from('.site-footer__col', {
        scrollTrigger: { trigger: '.site-footer', start: 'top 85%', toggleActions: 'play none none reverse' },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    });
    gsap.from('.site-footer__nameword, .site-footer__dot', {
        scrollTrigger: { trigger: '.site-footer__name', start: 'top 90%', toggleActions: 'play none none reverse' },
        y: 80, opacity: 0, scale: 0.95,
        duration: 1.1, stagger: 0.12, ease: 'power3.out',
    });

    // ========================================================
    //  Hover sur le logo EG : rotation + scale rebondi
    // ========================================================
    document.querySelectorAll('.site-header__logo').forEach((logo) => {
        const inner = logo.querySelector('span');
        logo.addEventListener('mouseenter', () => {
            gsap.to(logo, {
                rotate: -10,
                scale: 1.12,
                duration: 0.45,
                ease: 'back.out(2.5)',
                overwrite: 'auto',
            });
            if (inner) {
                gsap.fromTo(inner,
                    { scale: 0.85 },
                    { scale: 1, duration: 0.45, ease: 'back.out(2)', overwrite: 'auto' }
                );
            }
        });
        logo.addEventListener('mouseleave', () => {
            gsap.to(logo, {
                rotate: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power3.out',
                overwrite: 'auto',
            });
        });
    });
}
