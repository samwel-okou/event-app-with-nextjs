import React from "react";
import EventList from "../components/events/event-list";

import { getFeaturedEvents } from "../dummy-data";

const HomePage = () => {
  const featuredEvent = getFeaturedEvents();

  return (
    <div>
      <ul>
        <EventList items={featuredEvent} />
      </ul>
    </div>
  );
};

export default HomePage;
