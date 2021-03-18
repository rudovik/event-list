import { Fragment } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { getAllEvents } from '../../helpers/api-utils'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'

const AllEventsPage = ({ events }) => {
  const router = useRouter()

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`

    router.push(fullPath)
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  )
}

export const getStaticProps = async () => {
  const events = await getAllEvents()

  return { props: { events }, revalidate: 60 }
}

export default AllEventsPage
