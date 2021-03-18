import { Fragment } from 'react'
import { getEventById, getFeaturedEvents } from '../../helpers/api-utils'

import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'

const EventDetailPage = ({ event }) => {
  return (
    <Fragment>
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
