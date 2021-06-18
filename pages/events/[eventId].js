import { Fragment } from 'react';
import Head from 'next/head';
// import { useRouter } from "next/router";
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/error-alert';
import Comments from '../../components/input/comments';

const EventDetailPage = (props) => {
  // const router = useRouter();
  // const eventId = router.query.eventId;
  // const event = getEventById(eventId);
  const event = props.selectedEvent;

  if (!event) {
    return (
      <Fragment>
        <div className="center">
          <p>Loading Data...</p>
        </div>

        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        image={event.image}
        address={event.location}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
}
export default EventDetailPage;
