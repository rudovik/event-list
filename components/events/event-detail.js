import DateIcon from '../icons/date-icon'
import AddressIcon from '../icons/address-icon'
import Button from '../ui/button'
import ArrowRightIcon from '../icons/arrow-right-icon'

const EventDetail = (props) => {
  const { title, image, date, location, id, description } = props

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const formattedAddress = location.replace(', ', '\n')
  return (
    <div className='event-item'>
      <img src={'/' + image} alt={title} className='event-item__img' />
      <div className='event-item__content'>
        <div className='summary'>
          <h2 className='event-item__title'>{title}</h2>
          <div className='event-item__date'>
            <span className='icon'>
              <DateIcon />
            </span>
            <time>{humanReadableDate}</time>
          </div>
          <div className='event-item__address'>
            <span className='icon'>
              <AddressIcon />
            </span>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <p>{description}</p>
        <div className='event-item__actions'>
          <Button link='/'>
            <span>Go Back</span>
            <span className='icon'>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EventDetail
