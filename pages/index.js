import React from 'react';
import Head from 'next/head';
import EventList from '../components/events/event-list';

import { getFeaturedEvents } from '../helpers/api-util';
import NewsletterRegistration from '../components/input/newsletter-registration';

const HomePage = (props) => {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <Head>
        <title>Next JS Events App</title>
        <meta
          name="description"
          content="Find alot of greate events that allow you to evolve"
        />
      </Head>
      <NewsletterRegistration />

      <EventList items={props.events} />
    </div>
  );
};

export async function getStaticProps() {
  console.log('[Reg..]Generated 1800');
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
