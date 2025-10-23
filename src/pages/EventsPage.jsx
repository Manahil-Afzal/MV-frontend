import React from 'react'
import EventCard from '../components/Events/EventCard';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
function EventsPage() {
  return (
    <div>
        <Header activeHeading={4} />
         <EventCard active={true} />
         <EventCard active={true} />
          <Footer />
    </div>
  )
}

export default EventsPage;
