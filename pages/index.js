import React from "react";
import EventList from "../components/events/event-list";

import { getFeaturedEvents } from "../helpers/api-util";

const HomePage = (props) => {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <ul>
        <EventList items={props.events} />
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  console.log("[Reg..]Generated 1800");
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
