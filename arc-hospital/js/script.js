"use strict";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const body = document.body;

const preloader =
    document.getElementById("preloader");

const header =
    document.getElementById("header");

const navbar =
    document.getElementById("navbar");

const menuToggle =
    document.getElementById("menuToggle");

const themeToggle =
    document.getElementById("themeToggle");

const backToTop =
    document.getElementById("backToTop");

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");

const toastClose =
    document.getElementById("toastClose");


/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 700);

});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("active");

    menuToggle.classList.toggle("active");

});


/* Close mobile menu after clicking link */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        menuToggle.classList.remove("active");

    });

});


/* =========================================================
   HEADER SCROLL
========================================================= */

function handleHeaderScroll() {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    handleHeaderScroll
);

handleHeaderScroll();


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");

function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 150;

    sections.forEach(section => {

        const top =
            section.offsetTop;

        const height =
            section.offsetHeight;

        const id =
            section.getAttribute("id");

        if (
            scrollPosition >= top &&
            scrollPosition < top + height
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `#${id}`
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav
);


/* =========================================================
   THEME TOGGLE
========================================================= */

const savedTheme =
    localStorage.getItem("arHospitalTheme");

if (savedTheme === "dark") {

    body.classList.add("dark-mode");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark-mode");

    const isDark =
        body.classList.contains("dark-mode");

    if (isDark) {

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

        localStorage.setItem(
            "arHospitalTheme",
            "dark"
        );

    } else {

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

        localStorage.setItem(
            "arHospitalTheme",
            "light"
        );

    }

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters =
    document.querySelectorAll(".counter");

let countersStarted = false;


function animateCounter(counter) {

    const target =
        Number(counter.dataset.target);

    const duration = 1800;

    const startTime =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );

        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );

        const current =
            Math.floor(
                target * eased
            );

        counter.textContent =
            current.toLocaleString();

        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            counter.textContent =
                target.toLocaleString();

        }

    }

    requestAnimationFrame(update);
}


const statsSection =
    document.querySelector(".stats-section");


const statsObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    !countersStarted
                ) {

                    countersStarted = true;

                    counters.forEach(
                        animateCounter
                    );

                }

            });

        },

        {
            threshold: 0.4
        }

    );

statsObserver.observe(statsSection);


/* =========================================================
   DOCTOR FILTER
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const doctorCards =
    document.querySelectorAll(
        ".doctor-card-item"
    );


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter =
            button.dataset.filter;


        doctorCards.forEach(card => {

            const category =
                card.dataset.category;

            if (
                filter === "all" ||
                category === filter
            ) {

                card.style.display =
                    "block";

                setTimeout(() => {

                    card.style.opacity = "1";

                    card.style.transform =
                        "translateY(0)";

                }, 10);

            } else {

                card.style.opacity = "0";

                card.style.transform =
                    "translateY(10px)";

                setTimeout(() => {

                    card.style.display =
                        "none";

                }, 250);

            }

        });

    });

});


/* =========================================================
   TESTIMONIAL SLIDER
========================================================= */

const testimonialTrack =
    document.getElementById(
        "testimonialTrack"
    );

const testimonialSlides =
    document.querySelectorAll(
        ".testimonial-slide"
    );

const testimonialPrev =
    document.getElementById(
        "testimonialPrev"
    );

const testimonialNext =
    document.getElementById(
        "testimonialNext"
    );

const sliderDots =
    document.querySelectorAll(
        "#sliderDots span"
    );

let testimonialIndex = 0;


function updateTestimonial() {

    testimonialTrack.style.transform =
        `translateX(-${testimonialIndex * 100}%)`;


    sliderDots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === testimonialIndex
            );

        }
    );

}


testimonialNext.addEventListener(
    "click",
    () => {

        testimonialIndex++;

        if (
            testimonialIndex >=
            testimonialSlides.length
        ) {

            testimonialIndex = 0;

        }

        updateTestimonial();

    }
);


testimonialPrev.addEventListener(
    "click",
    () => {

        testimonialIndex--;

        if (testimonialIndex < 0) {

            testimonialIndex =
                testimonialSlides.length - 1;

        }

        updateTestimonial();

    }
);


sliderDots.forEach(
    (dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                testimonialIndex =
                    index;

                updateTestimonial();

            }
        );

    }
);


/* Auto slide */

let testimonialTimer =
    setInterval(() => {

        testimonialIndex++;

        if (
            testimonialIndex >=
            testimonialSlides.length
        ) {

            testimonialIndex = 0;

        }

        updateTestimonial();

    }, 6000);


/* Pause on hover */

const slider =
    document.querySelector(
        ".testimonial-slider"
    );

slider.addEventListener(
    "mouseenter",
    () => {

        clearInterval(
            testimonialTimer
        );

    }
);

slider.addEventListener(
    "mouseleave",
    () => {

        testimonialTimer =
            setInterval(() => {

                testimonialIndex++;

                if (
                    testimonialIndex >=
                    testimonialSlides.length
                ) {

                    testimonialIndex = 0;

                }

                updateTestimonial();

            }, 6000);

    }
);


/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(
            ".faq-question"
        );

    question.addEventListener(
        "click",
        () => {

            const isActive =
                item.classList.contains(
                    "active"
                );


            faqItems.forEach(
                otherItem => {

                    otherItem.classList.remove(
                        "active"
                    );

                }
            );


            if (!isActive) {

                item.classList.add(
                    "active"
                );

            }

        }
    );

});


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(
    title,
    message
) {

    toastTitle.textContent =
        title;

    toastMessage.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 5000);

}


toastClose.addEventListener(
    "click",
    () => {

        toast.classList.remove(
            "show"
        );

    }
);


/* =========================================================
   APPOINTMENT FORM
========================================================= */

const appointmentForm =
    document.getElementById(
        "appointmentForm"
    );

const appointmentDate =
    document.getElementById(
        "appointmentDate"
    );


/* Prevent past dates */

const today =
    new Date()
        .toISOString()
        .split("T")[0];

appointmentDate.min = today;


appointmentForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "patientName"
            ).value.trim();

        const phone =
            document.getElementById(
                "patientPhone"
            ).value.trim();

        const department =
            document.getElementById(
                "department"
            ).value;

        const doctor =
            document.getElementById(
                "doctor"
            ).value;

        const date =
            appointmentDate.value;


        if (
            !name ||
            !phone ||
            !department ||
            !doctor ||
            !date
        ) {

            showToast(
                "Missing Information",
                "Please complete all appointment fields."
            );

            return;

        }


        showToast(
            "Appointment Request Sent",
            `Thank you ${name}. Your ${department} appointment request has been received.`
        );


        appointmentForm.reset();

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "contactName"
            ).value.trim();


        showToast(
            "Message Sent",
            `Thank you ${name}. We will get back to you soon.`
        );


        contactForm.reset();

    }
);


/* =========================================================
   NEWSLETTER FORM
========================================================= */

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );


newsletterForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const email =
            newsletterForm
                .querySelector("input")
                .value.trim();


        if (!email) {

            showToast(
                "Invalid Email",
                "Please enter your email address."
            );

            return;

        }


        showToast(
            "Subscribed",
            "You have successfully subscribed to A R Hospital updates."
        );


        newsletterForm.reset();

    }
);


/* =========================================================
   BACK TO TOP
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 600) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   SMOOTH ANCHOR LINKS
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");


            if (
                targetId === "#" ||
                !targetId
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {

                return;

            }


            event.preventDefault();


            const headerHeight =
                header.offsetHeight;


            const targetPosition =
                target.offsetTop -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }
    );

});


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            navbar.classList.remove(
                "active"
            );

            toast.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%cA R HOSPITAL",
    "font-size:24px;font-weight:bold;color:#087f8c;"
);

console.log(
    "Responsive hospital frontend loaded successfully."
);