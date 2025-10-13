
// import React from 'react'
// import { Link } from 'react-router-dom'
// import { navItems } from '../../static/data'
// import styles from '../../styles/styles'

// const Navbar = ({active}) => {
//   return (
//         <div className={`flex flex-col 800px:flex-row 800px:items-center`}>
//          {
//             navItems && navItems.map((i,index) => (
//                 <div className="flex">
//                     <Link to={i.url}
//                     className={`${active === index + 1 ? "text-[#17dd1f]" : "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
//                     >
//                     {i.title}
//                     </Link>
//                 </div>
//             ))
//          }
//     </div>
//   )
// }

// export default Navbar


import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../static/data'

const Navbar = ({ active }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:flex-nowrap md:gap-x-3">
      {navItems &&
        navItems.map((i, index) => (
          <div key={index} className="md:mr-9">
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#17dd1f]"
                  : "text-black md:text-white"
              } pb-3   md:pb-0 font-[500]  cursor-pointer`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default Navbar
