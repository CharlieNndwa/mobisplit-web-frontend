import React, { useEffect } from "react";
import gsap, { Power3 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function HireBicycle() {
  useEffect(() => {
    gsap.timeline().from(".bicycle_animation_btn", {
      opacity: 0,
      ease: Power3.easeIn,
      y: 10,
      scrollTrigger: {
        trigger: ".bicycle_animation_btnw",
      },
    });
  }, []);

  return (
    <div className="bg-primary">
      <div className="mx-auto max-w-[1300px] px-6 xl:px-16 text-slate-100 py-20 flex flex-col xl:flex-row justify-between items-start xl:items-center">
        <div>
          <h1 className="text-3xl font-semibold">
            Pickup <span className="font-normal text-base">Yourself</span>
          </h1>

          <p className="mt-5 max-w-[400px] bicycle_animation_trigger">
            Rent one of our bicycles for the day and go at your own leisure.
          </p>
        </div>

        <button className="bicycle_animation_btn border shadow-lg text-sm mt-7 xl:mt-0 border-white rounded-md text-primary bg-white px-10 py-3 transition hover:scale-[0.95] ">
          Rent a bicycle
        </button>
      </div>
      <div className="h-10 w-10 bicycle_animation_btnw" />
    </div>
  );
}
