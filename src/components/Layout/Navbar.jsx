import React from 'react'
import { Link } from "react-router-dom";
import styles from "../../styles/styles"; 
import { navItems } from "../../static/data";

const  Navbar = ({active}) =>  {
      return (
    <div className={`${styles.normalFlex} justify-end w-full`}>
      {navItems &&
        navItems.map((i, index) => (
          <div key={index} className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1 ? "text-[#17dd1f]" : "text-[#fff]"
              } font-[500] px-6 cursor-pointer`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default Navbar;


