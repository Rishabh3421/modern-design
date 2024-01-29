function locomotive() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });

    // Each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // Tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // We don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // Each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // After everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locomotive();


gsap.to("#logo #right-nav",{
    transform:"translatey(-100%)",
    ease: "power1.easeInOut",
    scrollTrigger:{
        trigger:"#page1",
        scroller:"#main",
        // markers:true,
        start:"top 0",
        end:"top -5%",
        scrub:1
    }
    
})
gsap.to("#logo #right-nav-2",{
    transform:"translatey(-100%)",
    ease: "power1.easeInOut",
    scrollTrigger:{
        trigger:"#page1",
        scroller:"#main",
        // markers:true,
        start:"top 0",
        end:"top -5%",
        scrub:1
    }
})
gsap.to("#options",{
    transform:"translatey(-100%)",
    ease: "power1.easeInOut",
    opacity:0,
    scrollTrigger:{
        trigger:"#page1",
        scroller:"#main",
        // markers:true,
        start:"top 0",
        end:"top -5%",
        scrub:1
    }
})
// Video controls
function play() {
    const video = document.querySelector("#video-container");
    const play = document.querySelector("#play");

    video.addEventListener("mouseenter", function () {
        gsap.to(play, {
            scale: 1,
            opacity: 1
        });
    });

    video.addEventListener("mouseleave", function () {
        gsap.to(play, {
            scale: 0,
            opacity: 0
        });
    });

    video.addEventListener("mousemove", function (event) {
        gsap.to(play, {
            left: event.x,
            top: event.y,
            transform: 'translate(-50%, -50%)'
        });
    });
}
play();
// Initialize Locomotive Scroll with a delay
setTimeout(function () {
    locomotive();
}, 500); // You can adjust the delay as needed

// Animation on page load
(function () {
    gsap.from("#page1 .text-container", {
        y: 150,
        opacity: 0,
        duration: 1,
        stagger: 0.5
    });

    gsap.from("#page1 #video-container", {
        scale: 0.8,
        opacity: 0,
        delay: 1.3,
    });
})();

// Cursor behavior
document.addEventListener("mousemove", function (event) {
    gsap.to("#cursor", {
        left: event.clientX,
        top: event.clientY,
    });
});

// Child element hover effects
const a = document.querySelectorAll(".child");
const cursor = document.getElementById("cursor");

const colors = ["rgba(255, 0, 0, 0.4)", "rgba(0, 255, 0, 0.4)", "rgba(0, 0, 255, 0.4)", "rgba(255, 255, 0, 0.4)"];

a.forEach(function (elem, index) {
    elem.addEventListener("mouseenter", function () {
        gsap.to(cursor, {
            transform: 'translate(-50%, -50%) scale(1)',
            backgroundColor: colors[index]
        });
    });

    elem.addEventListener("mouseleave", function () {
        gsap.to(cursor, {
            transform: 'translate(-50%, -50%) scale(0)',
            backgroundColor: 'initial'
        });
    });
});

