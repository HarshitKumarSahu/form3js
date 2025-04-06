import 'lenis/dist/lenis.css'
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
    // console.log("lenis working")
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


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


let h1 = document.querySelector("h1");

breakTheTextGsap(h1)


gsap.from(".subHeading h2", {
    y: 100,
    delay:0.2,
    duration:0.8,
    stagger:0.2,
    ease: "expoScale(0.5,7,none)", 
})



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

// gsap.from(".leftCase", {
//     x: -800,
//     delay:0.1,
//     duration: 0.4,
//     stagger: 0.05,
//     ease: "expoScale(0.5,7,none)", 
//     scrollTrigger:{
//         trigger: ".page3", 
//         scroller: "body" ,
//         start: "top bottom", 
//         end: "top top", 
//         // markers: true, 
//         scrub: 5,
//     }
// })
// gsap.from(".rightCase", {
//     x: 800,
//     delay:0.1,
//     duration: 0.4,
//     stagger: 0.05,
//     ease: "expoScale(0.5,7,none)", 
//     scrollTrigger:{
//         trigger: ".page3", 
//         scroller: "body" ,
//         start: "top bottom", 
//         end: "top top", 
//         // markers: true, 
//         scrub: 5,
//     }
// })
// gsap.from(".imgContainer", {
//     scale: 0.6,
//     delay:0.1,
//     duration: 0.4,
//     stagger: 0.05,
//     ease: "expoScale(0.5,7,none)", 
//     scrollTrigger:{
//         trigger: ".page3", 
//         scroller: "body" ,
//         start: "top bottom", 
//         end: "top top", 
//         markers: true, 
//         scrub: 5,
//     }
// })

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
gsap.from(".imgContainer", {
    scale: 0.65,
    ease: "expoScale(0.5,7,none)",
    scrollTrigger: {
        trigger: ".page3",
        scroller: "body",
        start: "top top",
        end: "+=1000",
        scrub: 3,
        pin: true,
    }
});
  


let slider = document.querySelector(".slider");
let sliderWidth = slider.scrollWidth - window.innerWidth;

ScrollTrigger.create({
    x : 0,
    trigger: ".page4",
    start: "top top",
    end: () => "+=" + sliderWidth, // adjust based on content width
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






// ScrollTrigger.create({
//     trigger: ".page5",
//     start: "top top",
//     pin: true,
//     pinSpacing: true, // keeps spacing after pinning
//     markers: true, // optional: for debugging
//  });





// Create a timeline and pin page5 while it runs
// let tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".page5",
//     start: "top top",
//     end: "+=400%", // Adjust based on number of blogs
//     scrub: true,
//     pin: true,
//     markers: true, // for debugging, remove in prod
//   }
// });

// // Animate each blog in sequence
// document.querySelectorAll(".blog").forEach((blog) => {
//   tl.from(
//     blog,
//     {
//       top: "0%",
//       scale: 0.5,
//       opacity: 0,
//     },
//     {
//         top: "0%",
//         scale: 0.5,
//         opacity: 0,
//     },
//     "+=0.5" // gap between animations
//   );
// });



// let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".page5",
//       start: "top top",
//       end: "+=400%", // Adjust as per number of blogs
//       scrub: true,
//       pin: true,
//       markers: true, // Remove later
//     }
//   });
  
//   // Animate each blog from top: 100% to top: 0%
//   document.querySelectorAll(".blog").forEach((blog, i) => {
//     tl.fromTo(
//       blog,
//       {
//         top: "100%",
//         scale: 0.9,
//         // opacity: 0,
//         position: "absolute",
//       },
//       {
//         top: "50%",
//         left : "50%",
//         transform: "translate(-50%, -50%)",
//         scale: 1,
//         // opacity: 1,
//         duration: 1,
//         // ease: "power3.out",
//       },
//       "+=0.5"
//     );
//   });


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
    // delay:0.2\,
    duration:0.4,
    stagger:0.1,
    ease: "expoScale(0.5,7,none)", 
})
const blogs = document.querySelectorAll(".blog");
blogs.forEach((blog, i) => {
    // Animate blog IN
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
        i === 0 ? "+=0.5" : "<" // First blog waits a bit, others overlap with previous
    );
    // If it's not the last blog, scale down while next blog enters
    if (i !== blogs.length - 1) {
        tl.to(
            blog,
            {
            scale: 0.5,
            duration: 1,
            },
            "+=0" // starts immediately as next blog enters
        );
    }
});
  








// ScrollTrigger.create({
//     trigger: ".page6",
//     start: "top top",
//     end : "bottom bottom",
//     scrub: 1,
//     pin: true,
//     markers: true,
//     onUpdate: (self) => {
//         gsap.from(".page7", {
//             width : "100vw",
//             height : "100vw",
//             duration: 1,
//             ease: "power3.out"
//         });
//     }
// });

  









// ScrollTrigger.create({
//   trigger: ".page6",
//   start: "top top",
//   end: "+=200vh",
//   scrub: true,
//   pin: ".heading", // 👈 this keeps heading pinned
//   markers: true
// });

// gsap.fromTo(".circle",
//   {
//     scale: 1,
//   },
//   {
//     scale: 30, // scale up enough to cover screen
//     scrollTrigger: {
//       trigger: ".page6",
//       start: "top top",
//       end: "+=200vh",
//       scrub: true,
//     },
//     transformOrigin: "center center",
//     ease: "none"
//   }
// );




// const page6Height = document.querySelector(".page6").offsetHeight;

// let tl2 = gsap.timeline({
//     scrollTrigger: {
//         trigger: ".page6",
//         start: "top top",
//         end: () => `+=${page6Height}`, // dynamically based on .page6 height
//         scrub: true,
//         pin: true,
//         markers: true,
//       },
// });
// tl2.from(".page6 h1 span", {
//     y: 300,
//     // delay:0.2,
//     duration:0.4,
//     stagger:0.1,
//     ease: "expoScale(0.5,7,none)", 
// }).fromTo(".circle",
//   {
//     scale: 0,
//   },
//   {
//     scale: 30,
//     transformOrigin: "center center",
//     ease: "linear"
//   }
// );



const page6Height = document.querySelector(".page6").offsetHeight;

let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page6",
    start: "top top",
    end: () => `+=${page6Height}`,
    scrub: true, // this scrubs the entire timeline with scroll
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
    "<" // 👈 start at same time as previous animation
);













// const page7Height = document.querySelector(".page7").offsetHeight;
// gsap.from(".leftP", {
//     left: "-100%",
//     ease: "expoScale(0.5,7,none)",
//     scrollTrigger: {
//         trigger: ".page7",
//         scroller: "body",
//         start: "top top",
//         end: () => `+=${page7Height}`,
//         scrub: true,
//         markers: true,
//         pin: true
//     }
// });
// gsap.from(".rightP", {
//     left: "100%",
//     ease: "expoScale(0.5,7,none)",
//     scrollTrigger: {
//         trigger: ".page7",
//         scroller: "body",
//         start: "top top",
//         end: () => `+=${page7Height}`,
//         scrub: true,
//         pin: true
//     }
// });

const page7Height = document.querySelector(".page7").offsetHeight;
const page7Width = document.querySelector(".page7").offsetWidth;

gsap.from(".leftP", {
  x: `-${page7Width}`, // Move in from left
  ease: "expoScale(0.5,7,none)",
  scrollTrigger: {
    trigger: ".page7",
    scroller: "body",
    start: "top top",
    end: () => `+=${page7Height / 1.5}`,
    scrub: true,
    // markers: true,
    // pin: true,
  }
});

gsap.from(".rightP", {
  x: `${page7Width}`, // Move in from right
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













//footer


ScrollTrigger.create({
    trigger: "footer",
    start: "top 40%", // When top of footer hits bottom of viewport
    // once: true,
    // markers : true,          // Only trigger once
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