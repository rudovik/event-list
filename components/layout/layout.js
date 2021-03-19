import { Fragment, useContext } from 'react'

import MainHeader from './main-header'
import Notification from '../ui/notification'

import NotificationContext from '../../store/notification-context'

const Layout = ({ children }) => {
  const notificationContext = useContext(NotificationContext)

  const activeNotification = notificationContext.notification

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  )
}

export default Layout
