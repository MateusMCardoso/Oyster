document.addEventListener("DOMContentLoaded", () => {
    /* ================================== */
    /* MENU HAMBÚRGUER                    */
    /* ================================== */
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = navMenu ? navMenu.querySelectorAll(".nav-link") : [];

    const toggleNavigation = () => {
        const isOpen = hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        hamburger.setAttribute("aria-expanded", String(isOpen));
    };

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", toggleNavigation);

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ================================== */
    /* CÓDIGO DO BOTÃO WHATSAPP C/ DELAY  */
    /* ================================== */
    const whatsappButton = document.querySelector(".whatsapp-button");
    let leaveTimeout = null;
    const LEAVE_DELAY_MS = 50;

    if (whatsappButton) {
        whatsappButton.addEventListener("mouseenter", () => {
            if (leaveTimeout) {
                clearTimeout(leaveTimeout);
                leaveTimeout = null;
            }

            whatsappButton.classList.add("hover-active");
        });

        whatsappButton.addEventListener("mouseleave", () => {
            leaveTimeout = setTimeout(() => {
                whatsappButton.classList.remove("hover-active");
            }, LEAVE_DELAY_MS);
        });
    }

    /* ================================== */
    /* ANIMAÇÃO DE TEXTO DIGITADO NA HOME */
    /* ================================== */
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["seu sorriso.", "sua saúde.", "sua família."];
    const typingDelay = 100;
    const erasingDelay = 70;
    const newTextDelay = 1500;
    let textArrayIndex = 0;
    let charIndex = 0;

    const type = () => {
        if (!typedTextSpan || !cursorSpan) return;

        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    };

    const erase = () => {
        if (!typedTextSpan || !cursorSpan) return;

        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, typingDelay + 1100);
        }
    };

    if (typedTextSpan && cursorSpan && textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }

    /* ================================== */
    /* GRADIENTE INTERATIVO DA HOME       */
    /* ================================== */
    const heroSection = document.querySelector(".home-hero");

    if (heroSection) {
        heroSection.addEventListener("mousemove", (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            heroSection.style.setProperty("--mouse-x", `${x}px`);
            heroSection.style.setProperty("--mouse-y", `${y}px`);
        });
    }

    /* ================================== */
    /* SLIDERS GERAIS                     */
    /* ================================== */
    const sliderContainers = document.querySelectorAll("[data-slider]");

    sliderContainers.forEach((slider) => {
        const slides = slider.querySelectorAll(".slide");
        const dots = slider.querySelectorAll(".slider-dot");
        if (!slides.length) return;

        let currentIndex = 0;
        const interval = Number(slider.dataset.interval) || 5000;
        let timerId = null;

        const activateSlide = (index) => {
            slides.forEach((slide, slideIndex) => {
                const isActive = slideIndex === index;
                slide.classList.toggle("active", isActive);
                slide.setAttribute("aria-hidden", String(!isActive));
            });

            dots.forEach((dot, dotIndex) => {
                const isActive = dotIndex === index;
                dot.classList.toggle("active", isActive);
                dot.setAttribute("aria-selected", isActive ? "true" : "false");
            });

            currentIndex = index;
        };

        const startSlider = () => {
            if (slides.length < 2) return;
            timerId = setInterval(() => {
                const nextIndex = (currentIndex + 1) % slides.length;
                activateSlide(nextIndex);
            }, interval);
        };

        const restartSlider = () => {
            if (timerId) clearInterval(timerId);
            startSlider();
        };

        activateSlide(0);
        startSlider();

        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                const targetIndex = Number(dot.dataset.slide);
                if (Number.isNaN(targetIndex) || targetIndex === currentIndex) return;
                activateSlide(targetIndex);
                restartSlider();
            });
        });
    });

    /* ================================== */
    /* ACORDEÃO INTERATIVO                */
    /* ================================== */
    const accordionItems = document.querySelectorAll(".accordion-item");

    const closeItem = (item) => {
        const trigger = item.querySelector(".accordion-trigger");
        const panel = item.querySelector(".accordion-panel");
        if (!trigger || !panel) return;

        item.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
        panel.setAttribute("aria-hidden", "true");
        panel.style.maxHeight = null;
    };

    const openItem = (item) => {
        const trigger = item.querySelector(".accordion-trigger");
        const panel = item.querySelector(".accordion-panel");
        if (!trigger || !panel) return;

        item.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
        panel.setAttribute("aria-hidden", "false");
        panel.style.maxHeight = `${panel.scrollHeight}px`;
    };

    accordionItems.forEach((item) => {
        const trigger = item.querySelector(".accordion-trigger");
        if (!trigger) return;

        trigger.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");
            accordionItems.forEach((otherItem) => {
                if (otherItem !== item) closeItem(otherItem);
            });

            if (isOpen) {
                closeItem(item);
            } else {
                openItem(item);
            }
        });
    });
});
