import React from 'react';
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import { useSelector } from 'react-redux';
import { backend_url } from '../../server';


const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);
  console.log(allEvents);

  return (
    <div>
      {
        !isLoading && (
          <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
              <h1 className="text-[#417fa0] font-bold text-3xl">
                  Popular Events
              </h1>
            </div>
            <div className="w-full grid">
              <EventCard data={allEvents && allEvents[0]} />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Events;
