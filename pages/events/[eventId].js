import { Fragment } from 'react'
import { getEventById, getFeaturedEvents } from '../../helpers/api-utils'
import Head from 'next/head'

import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import Comments from '../../components/input/comments'

const EventDetailPage = ({ event }) => {
  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  )
}

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId

  const event = await getEventById(eventId)

  if (!event) {
    return { notFound: true }
  }

  return { props: { event }, revalidate: 30 }
}

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents()

  const paths = events.map((event) => ({ params: { eventId: event.id } }))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export default EventDetailPage
