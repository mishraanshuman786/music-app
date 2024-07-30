// absoluteAnimation.js
import { gsap } from "gsap";

export function playAnimation(img1, img2, img3) {
  gsap.to([img1, img2, img3], {
    duration: 1,
    opacity: 1,
    display: "block",
    onStart: () => {
      gsap.fromTo(img1, { scale: 0.5 }, { scale: 1, duration: 1 });
      gsap.fromTo(img2, { scale: 0.5 }, { scale: 1, duration: 1 });
      gsap.fromTo(img3, { scale: 0.5 }, { scale: 1, duration: 1 });
    }
  });
}

export function pauseOrEndAnimation(img1, img2, img3) {
  gsap.to([img1, img2, img3], {
    duration: 1,
    opacity: 0,
    display: "none"
  });
}
