import gsap from "gsap";
import eventEmitter from "utils/eventEmitter";

export default function preloaderAnimation() {
  const onLoadingComplete = () => eventEmitter.emit("preloading-complete");

  gsap
    .timeline()
    .to(".preloader_left", {
      delay: 0.3,
      left: "-50%",
      opacity: 0,
      duration: 1,
      ease: "circ.in",
    })
    .to(
      ".preloader_right",
      {
        right: "-50%",
        duration: 1,
        opacity: 0,
        ease: "circ.in",
        onComplete: onLoadingComplete,
      },
      "-=1"
    );
}
