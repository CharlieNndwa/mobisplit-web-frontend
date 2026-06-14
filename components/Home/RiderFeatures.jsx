import React from "react";
import { AiFillCar } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";

export default function RiderFeatures() {
  return (
    <div className="bg-slate-100">
      <div className="mx-auto max-w-[1300px] px-6 xl:px-16 py-20">
        <div className="mx-auto max-w-[400px] text-center ">
          <h3 className="font-bold text-3xl xl:text-4xl leading-tight">
            Stick with us
          </h3>

          <p className="text-sm text-primary font-normal my-6">
            Available in all major cities, move around with ease without
            breaking bank.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 xl:grid-cols-3 gap-14 xl:gap-4">
          <div className="xl:pr-20">
            <div>
              <ImLocation2 size="1.3rem" color="#062775" />
            </div>
            <p className="font-semibold text-gray-900 text-2xl mt-5">
              Reliable ride
            </p>
            <p className="text-sm mt-3">
              Reach your destination as soon as you can.
            </p>
          </div>

          <div className="xl:pr-20">
            <div>
              <AiFillCar size="1.3rem" color="#062775" />
            </div>
            <p className="font-semibold text-gray-900 text-2xl mt-5">
              Car pool
            </p>
            <p className="text-sm mt-3">
              Ride with others, split the bill. You can lessen traffic by riding
              together.
            </p>
          </div>

          <div className="xl:pr-20">
            <div>
              <FaCalendarAlt size="1.3rem" color="#062775" />
            </div>
            <p className="font-semibold text-gray-900 text-2xl mt-5">
              Schedule rides
            </p>
            <p className="text-sm mt-3">
              By planning your trips in advance, you can save money.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
