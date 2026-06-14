import gsap, { Back } from "gsap";

export default function heroAnimation() {
  gsap
    .timeline()
    .fromTo(
      ".nav_bar",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: Back.easeOut }
    )
    .fromTo(
      ".hero_buttons",
      { opacity: 0, y: 150, duration: 0.4 },
      { opacity: 1, duration: 0.6, y: 0, ease: Back.easeOut }
    )
    .fromTo(
      ".hero_text_description",
      { opacity: 0, y: 180, duration: 0.4 },
      { opacity: 1, duration: 0.6, y: 0, ease: Back.easeOut },
      "-=0.8"
    )
    .fromTo(
      ".hero_text",
      { opacity: 0, y: 200, duration: 0.4 },
      { opacity: 1, duration: 0.6, y: 0, ease: Back.easeOut },
      "-=1"
    )
    .fromTo(
      ".hero_main_image",
      { opacity: 0 },
      { opacity: 1, ease: Back.easeOut },
      "-=1"
    )
    .fromTo(
      ".hero_left_image",
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, ease: Back.easeOut },
      "-=2"
    )
    .fromTo(
      ".hero_right_image",
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, ease: Back.easeOut },
      "-=3"
    );

  const left_img = new gsap.timeline({ repeat: -1 });
  const right_img = new gsap.timeline({ repeat: -1 });

  left_img.to(".hero_left_image", {
    repeat: -1,
    y: 14,
    yoyo: true,
    yoyoEase: true,
    ease: "sine.inOut",
    duration: 2.5,
    autoAlpha: 1,
    stagger: 0.1,
  });

  right_img.to(".hero_right_image", {
    repeat: -1,
    y: 5,
    x: 10,
    yoyo: true,
    yoyoEase: true,
    ease: "sine.inOut",
    duration: 2.5,
    autoAlpha: 1,
    stagger: 0.1,
  });
}
