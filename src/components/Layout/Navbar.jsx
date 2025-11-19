// import React from 'react'
// import { Link } from 'react-router-dom'
// import { navItems } from '../../static/data'

// const Navbar = ({ active }) => {
//   return (
//     <div className="flex flex-col md:flex-row md:items-center md:flex-nowrap md:gap-x-1">
//       {navItems &&
//         navItems.map((i, index) => (
//           <div key={index} className="md:mr-5">
//             <Link
//               to={i.url}
//               className={`${
//                 active === index + 1
//                   ? "text-[#F2A533]"
//                   : "text-black md:text-white"
//               } pb-3   md:pb-0 font-[500]  cursor-pointer`}
//             >
//               {i.title}
//             </Link>
//           </div>
//         ))}
//     </div>
//   )
// }

// export default Navbar



import React from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = () => {
  const location = useLocation(); // gets current URL path

  return (
    <div className="flex flex-col md:flex-row md:items-center md:flex-nowrap md:gap-x-1">
      {navItems &&
        navItems.map((i, index) => {
          const isActive = location.pathname === i.url; // check if current page
          return (
            <div key={index} className="md:mr-5">
              <Link
                to={i.url}
                className={`pb-3 md:pb-0 font-[500] cursor-pointer ${
                  isActive
                    ? "text-[#F2A533]  border-b-2 after:border-[#F2A533] relative after:mt-2  after:border-b-2 md:underline"
                    : "text-black md:text-white"
                }`}
              >
                {i.title}
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Navbar;
