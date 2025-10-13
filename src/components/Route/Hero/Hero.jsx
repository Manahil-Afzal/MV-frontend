// import React from "react";
// import styles from "../../../styles/styles";
// import { Link } from 'react-router-dom';

// const Hero = () => {
//   return (
//     <div
//       className={"relative min-h-[90vh]  800px:min-h-[80vh]  bg-no-repeat"}
//       style={{
//         backgroundImage:
//           "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
//         backgroundSize: "100% 100%",
//         backgroundPosition: "center",
//       }}
//     >
//       <div
//         className={`${styles.section} absolute bottom-45 left-1/3 transform -translate-x-1/2
//                     800px:left-10 800px:transform-none 800px:w-[60%] w-[90%]`}
//       >
//         <h1 className="text-[35px] font-bold leading-[1.2] 800px:text-[60px] text-[#170404] capitalize">
//           Best Collection for <br /> home Decoration
//         </h1>
//         <p className="pt-5 text-[16px] font-Poppins font-[400] text-[#000000ba]">
//           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
//           <br />
//           corrupti beatae sapiente aliquam quasi, enim, eius, id maiores?
//           <br /> Quam eum ad vel dolor? Cum id facilis nam?
//         </p>
//         <Link to="/products" className="inline-block">
//           <div className={`${styles.button} mt-5`}>
//             <span className="text-[#fff] font-[Poppins] text-[18px]">
//                Shop Now
//             </span>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Hero;


import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className="relative min-h-[80vh] sm:min-h-[90vh] bg-cover bg-center bg-no-repeat flex items-center justify-start"
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div
        className={`${styles.section} text-left ml-6 px-6 sm:px-10 md:px-20 max-w-[700px]`}
      >
        {/* Heading */}
        <h1 className="text-[26px] sm:text-[40px] md:text-[55px] font-bold leading-tight text-[#170404] capitalize">
          Best Collection for <br className="hidden sm:block" /> Home Decoration
        </h1>

        {/* Paragraph */}
        <p className="pt-4 sm:pt-5 text-[14px] sm:text-[16px] font-Poppins font-[400] text-[#000000ba]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
          corrupti beatae sapiente aliquam quasi, enim, eius, id maiores? Quam
          eum ad vel dolor? Cum id facilis nam?
        </p>

        {/* Button */}
        <Link to="/products" className="inline-block mt-6">
          <div
            className={`${styles.button} bg-[#333] hover:bg-[#222] transition-all px-6 py-3 rounded-md`}
          >
            <span className="text-[#fff] font-Poppins text-[16px] sm:text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
