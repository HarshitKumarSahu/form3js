import 'lenis/dist/lenis.css'
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

//heading and separator animation
function breakTheTextGsap(domElem) {
    let domElemVar = domElem.textContent;
    let splittedText = domElemVar.split("");
    let clutter = "";  
    splittedText.forEach(function(element, index) {
        clutter += `<span class="element">${element}</span>`;
    });
    h1.innerHTML = clutter

    gsap.from(".element", {
        y: 300,
        delay:0.2,
        duration:0.8,
        stagger:0.2,
        ease: "expoScale(0.5,7,none)", 
    })
    gsap.from(".separator", {
        y: 300,
        delay:0.05,
        duration: 1,
        stagger:0.1,
        ease: "expoScale(0.5,7,none)", 
    })
}

//subHeading Animation
function subHeading() {
    gsap.from(".subHeading h2", {
        y: 100,
        delay:0.2,
        duration:0.8,
        stagger:0.2,
        ease: "expoScale(0.5,7,none)", 
    })
}

// intro p animation
function introP() {
    gsap.from(".pContainer p", {
        y: 50,
        delay:0.1,
        duration: 0.4,
        stagger: 0.05,
        ease: "expoScale(0.5,7,none)", 
        scrollTrigger:{
            trigger: ".page2", 
            scroller: "body" ,
            start: "top 25%", 
            end: "top 25%", 
            // markers: true, 
            scrub: 2.5,
        }
    })
}

// showcase animation
function showCase() {
    gsap.from(".leftCase", {
        x: -800,
        ease: "expoScale(0.5,7,none)",
        scrollTrigger: {
            trigger: ".page3",
            scroller: "body",
            start: "top top",
            end: "+=1000",
            scrub: 3,
        }
    });
    gsap.from(".rightCase", {
        x: 800,
        ease: "expoScale(0.5,7,none)",
        scrollTrigger: {
            trigger: ".page3",
            scroller: "body",
            start: "top top",
            end: "+=1000",
            scrub: 3,
        }
    });
    gsap.from(".page3 .img", {
        scale: 0.65,
        ease: "expoScale(0.5,7,none)",
        // zIndex :
        scrollTrigger: {
            trigger: ".page3",
            scroller: "body",
            start: "top top",
            end: "+=1000",
            scrub: 3,
            pin: true,
        },
    });
}

//slider animation
function slider() {
    let slider = document.querySelector(".slider");
    let sliderWidth = slider.scrollWidth - window.innerWidth;

    ScrollTrigger.create({
        x : 0,
        trigger: ".page4",
        start: "top top",
        end: () => "+=" + sliderWidth,
        scrub: 1,
        pin: true,
        // markers: true,
        onUpdate: (self) => {
            gsap.set(slider, {
                x: -sliderWidth * self.progress,
                duration: 1,
                ease: "power3.out"
            });
        }
    });
}

//blogs animation
function blogs() {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".page5",
            start: "top top",
            end: "+=400%",
            scrub: true,
            pin: true,
            // markers: true,
        }
    });
    tl.from(".page5 h1 span", {
        y: 300,
        duration:0.4,
        stagger:0.1,
        ease: "expoScale(0.5,7,none)", 
    })
    const blogs = document.querySelectorAll(".blog");
    blogs.forEach((blog, i) => {
        tl.fromTo(
            blog,
            {
                top: "100%",
                scale: 1,
                position: "absolute",
            },
            {
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                scale: 1,
                duration: 1,
            },
            i === 0 ? "+=0.5" : "<"
        );
        if (i !== blogs.length - 1) {
            tl.to(
                blog,
                {
                scale: 0.5,
                duration: 1,
                },
                "+=0"
            );
        }
    });
}

// TBI animation
function TBI() {
    const page6Height = document.querySelector(".page6").offsetHeight;

    let tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page6",
        start: "top top",
        end: () => `+=${page6Height * 1.5}`,
        scrub: true,
        pin: true,
        // markers: true,
    }
    });
    tl2
    .from(".page6 h1 span", {
        y: 300,
        duration:0.4,
        stagger: 0.1,
        ease: "expoScale(0.5,7,none)", 
    })
    .fromTo(".circle",
        {
        scale: 0,
        },
        {
        scale: 30,
        transformOrigin: "center center",
        ease: "linear"
        },
        "<"
    );
}

// outro animation
function outro() {
    const page7Height = document.querySelector(".page7").offsetHeight;
    const page7Width = document.querySelector(".page7").offsetWidth;

    gsap.from(".leftP", {
    x: `-${page7Width}`,
    ease: "expoScale(0.5,7,none)",
    scrollTrigger: {
        trigger: ".page7",
        scroller: "body",
        start: "top top",
        end: () => `+=${page7Height / 1.5}`,
        scrub: true,
        // markers: true,
    }
    });
    gsap.from(".rightP", {
    x: `${page7Width}`,
    ease: "expoScale(0.5,7,none)",
    scrollTrigger: {
        trigger: ".page7",
        scroller: "body",
        start: "top top",
        pin: true,
        end: () => `+=${page7Height / 1.5}`,
        scrub: true,
    }
    });
}

//footer
function footer()  {
    ScrollTrigger.create({
        trigger: "footer",
        start: "top 40%",
        // markers : true,       
        onEnter: () => {
            gsap.from("footer .heading h1 span", {
                y: 300,
                delay:0.1,
                duration:0.6,
                stagger:0.15,
                ease: "expoScale(0.5,7,none)", 
            })
        },
    });
}

//heading and separator animation
let h1 = document.querySelector("h1");
breakTheTextGsap(h1)

//subHeading Animation
subHeading();   

// intro p animation
introP();

// showcase animation
showCase();

//slider animation
slider();

//blogs animation
blogs() 

// TBI animation
TBI()

// outro animation
outro()

//footer
footer()