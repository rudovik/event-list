import { Fragment } from 'react'
import Head from 'next/head'
import { getFeaturedEvents } from '../helpers/api-utils'
import EventList from '../components/events/event-list'

const HomePage = ({ events }) => {
  // console.log(props)
  return (
    <Fragment>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <EventList items={events} />
    </Fragment>
  )
}

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents()

  return { props: { events: featuredEvents }, revalidate: 1800 }
}

export default HomePage
