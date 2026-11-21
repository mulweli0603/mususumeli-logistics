/* =========================================
   MUSUSUMELI LOGISTICS
   Complete Website JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. PRELOADER
    // =====================================

    const preloader = document.getElementById("preloader");

    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.classList.add("hide");
            }, 1200);
        });

        // Fallback in case the page has already loaded
        if (document.readyState === "complete") {
            preloader.classList.add("hide");
        }
    }


    // =====================================
    // 2. STICKY NAVIGATION
    // =====================================

    const header = document.getElementById("header")
        || document.querySelector(".header");

    function handleHeaderScroll() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll();


    // =====================================
    // 3. MOBILE NAVIGATION
    // =====================================

    const menuToggle =
        document.getElementById("menuToggle")
        || document.querySelector(".menu-toggle");

    const navMenu =
        document.getElementById("navMenu")
        || document.querySelector(".nav-links");

    const navLinks = document.querySelectorAll(
        ".nav-link, .nav-links a"
    );

    function closeMobileMenu() {
        if (!menuToggle || !navMenu) return;

        menuToggle.classList.remove("active");
        navMenu.classList.remove("open");
        navMenu.classList.remove("active");

        document.body.style.overflow = "";

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");

        if (menuToggle.textContent.trim() === "✕") {
            menuToggle.textContent = "☰";
        }
    }

    function toggleMobileMenu() {
        if (!menuToggle || !navMenu) return;

        const isOpen = navMenu.classList.toggle("active");

        navMenu.classList.toggle("open", isOpen);
        menuToggle.classList.toggle("active", isOpen);

        document.body.style.overflow = isOpen ? "hidden" : "";

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        if (menuToggle.textContent.trim() === "☰") {
            menuToggle.textContent = isOpen ? "✕" : "☰";
        }
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", toggleMobileMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 950) {
            closeMobileMenu();
        }
    });


    // =====================================
    // 4. AUTOMATIC FOOTER YEAR
    // =====================================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // =====================================
    // 5. ANIMATED STATISTICS
    // =====================================

    const counters = document.querySelectorAll(".counter");

    function animateCounter(counter) {
        const target = Number(counter.dataset.target);

        if (!Number.isFinite(target)) return;

        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOut = 1 - Math.pow(1 - progress, 3);

            counter.textContent = Math.floor(target * easeOut);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    } else {
        counters.forEach(animateCounter);
    }


    // =====================================
    // 6. ACTIVE NAVIGATION
    // =====================================

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");

        if (
            linkPage &&
            !linkPage.startsWith("#") &&
            linkPage.split("/").pop() === currentPage
        ) {
            link.classList.add("active");
        }
    });


    // =====================================
    // 7. SMOOTH SCROLLING
    // =====================================

    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener("click", function(event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                const headerOffset = header
                    ? header.offsetHeight
                    : 75;

                const offsetPosition =
                    targetElement.getBoundingClientRect().top
                    + window.scrollY
                    - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // =====================================
    // 8. SCROLL REVEAL ANIMATIONS
    // =====================================

    const revealElements = document.querySelectorAll(
        ".section-placeholder, .reveal, .service-card, " +
        ".why-card, .industry-card, .fleet-card, " +
        ".mission-card, .value-card, .process-card"
    );

    if ("IntersectionObserver" in window) {

        revealElements.forEach(element => {
            element.classList.add("reveal-ready");
        });

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }


    // =====================================
    // 9. HERO PARALLAX EFFECT
    // =====================================

    const heroBackground = document.querySelector(".hero-background");
    const hero = document.querySelector(".hero");

    if (heroBackground && hero) {
        window.addEventListener("scroll", () => {
            const scrollPosition = window.scrollY;
            const heroHeight = hero.offsetHeight;

            if (scrollPosition < heroHeight) {
                heroBackground.style.backgroundPositionY =
                    `${50 + scrollPosition * 0.03}%`;
            }
        });
    }


    // =====================================
    // 10. BUTTON INTERACTIONS
    // =====================================

    const buttons = document.querySelectorAll(
        ".btn-primary, .nav-cta, .submit-btn"
    );

    buttons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.style.transition =
                "transform 0.3s ease, background 0.3s ease";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });
    });


    // =====================================
    // 11. CONTACT FORM
    // =====================================

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function(event) {

            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const formData = new FormData(contactForm);

            const fullName = formData.get("fullName");
            const email = formData.get("email");
            const phone = formData.get("phone");
            const service = formData.get("service");
            const collection = formData.get("collection");
            const destination = formData.get("destination");
            const load = formData.get("load") || "Not specified";
            const message = formData.get("message");

            const subject =
                `Transport Enquiry - ${fullName}`;

            const body = `
MUSUSUMELI LOGISTICS
TRANSPORT ENQUIRY

CUSTOMER DETAILS

Name: ${fullName}
Email: ${email}
Phone: ${phone}

SERVICE DETAILS

Service Required: ${service}
Collection Location: ${collection}
Delivery Destination: ${destination}
Load / Equipment: ${load}

PROJECT MESSAGE

${message}

--------------------------------
Enquiry submitted through the website.
            `;

            const emailLink =
                "mailto:mususumelilogistics@gmail.com" +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);

            const formStatus =
                document.getElementById("formStatus");

            if (formStatus) {
                formStatus.textContent =
                    "Your email application is opening. Please review your enquiry and press Send.";
            }

            window.location.href = emailLink;

        });

    }


    // =====================================
    // 12. VIDEO BACKGROUND SUPPORT
    // =====================================

    const backgroundVideos = document.querySelectorAll(
        ".hero-video, .feature-video"
    );

    backgroundVideos.forEach(video => {

        video.muted = true;
        video.playsInline = true;

        const playVideo = video.play();

        if (playVideo !== undefined) {
            playVideo.catch(() => {
                // Browser may block autoplay.
                // The rest of the page remains functional.
            });
        }

    });


    // =====================================
    // 13. CONSOLE BRANDING
    // =====================================

    console.log(
        "%c MUSUSUMELI LOGISTICS ",
        "background: #101112; color: #c49a55; " +
        "font-size: 20px; font-weight: bold; padding: 10px;"
    );

    console.log(
        "%c Moving Business Forward. ",
        "color: #c49a55; font-size: 12px;"
    );

});