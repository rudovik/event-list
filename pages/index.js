import { getFeaturedEvents } from '../helpers/api-utils'
import EventList from '../components/events/event-list'

const StartingPage = ({ events }) => {
  const featuredEvents = getFeaturedEvents()

  // console.log(events)

  return (
    <div>
      <EventList items={events} />
    </div>
  )
}

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents()

  return { props: { events: featuredEvents }, revalidate: 1800 }
}

export default StartingPage
