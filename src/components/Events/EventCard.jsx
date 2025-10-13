import React from "react";
import styles from "../../styles/styles";
import  CountDown from "./CountDown";

const EventCard=({active}) =>{
  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-4 mb-12 shadow-md`}>
      <div className="w-full lg:-w[50%] m-auto">
        <img
          src="https://media.gettyimages.com/id/165853320/photo/wristwatch.jpg?s=612x612&w=0&k=20&c=DgQbRd67gNDR0rdOpywkHDTBzLB3ahw_CsMPANtWyY8="
            alt="Rolex Watch"
          className="rounded-lg"
        />
      </div>
      <div className="w-full lg:w-[70%] flex flex-col justify-center px-4">
        <h2 className={`${styles.productTitle}`}>Rolex Submariner – Limited Edition</h2>
        <p className="text-gray-700 text-[17px] leading-7 mt-3">
          Discover timeless luxury with the <strong>Rolex Submariner</strong>, a perfect
          blend of precision and elegance. Designed with a 40mm Oystersteel case, 
          scratch-resistant sapphire crystal, and automatic self-winding movement, 
          this watch ensures durability and unmatched performance. 
          Waterproof up to 300m, it’s a true icon of strength and sophistication.
        </p>
        <ul className="list-disc list-outside  text-gray-600 mt-3 text-[14px] space-y-2">
          <li>40mm Oystersteel case with black Cerachrom bezel</li>
          <li>Automatic self-winding movement (Caliber 3235)</li>
          <li>Scratch-resistant sapphire crystal glass</li>
          <li>300m water resistance – built for divers</li>
          <li>Iconic Oyster bracelet with Glidelock clasp</li>
        </ul>

         <div className="flex py-3 justify-between items-center">
            <div>
                <h5 className="font-[500] text-[14px] text-[#d55b45] pr-3 line-through">
                    1099$
                </h5>
                <h5 className="font-bold text-[22px] text-[#333] font-Roboto">
                       999$  <span className="text-green-600 text-[15px]">(20% OFF)</span>
                </h5>
            </div>
             <span className="pr-3 font-[400] text-[16px] text-[#44a55e]">
                120 Sold
             </span>
         </div>
             <div className="mt-2">
          <CountDown />
        </div>
      </div>
    </div>
  );
}

export default EventCard;



