import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import AllCoupouns from "../../components/Shop/AllCoupouns"


const ShopAllCoupouns=()=> {
  return (
     <div>
        <DashboardHeader/>
        <div className='flex  justify-center w-full'>
             <div className='w-[80px] 800:w-[330px]'>
                 <DashboardSideBar active={9} />
             </div>
             <div className="w-full justify-center flex">
                <ShopAllCoupouns />
             </div>
        </div>
    </div>
  )
}

export default ShopAllCoupouns;
