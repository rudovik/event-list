import { useState, useEffect, useContext } from 'react'
import NotificationContext from '../../store/notification-context'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'

function Comments(props) {
  const { eventId } = props
  const [showComments, setShowComments] = useState(false)
  const [commentsIsLoading, setCommentsIsLoading] = useState(false)
  const [comments, setComments] = useState([])
  const notificationCtx = useContext(NotificationContext)

  useEffect(() => {
    setCommentsIsLoading(true)
    fetch(`/api/comment/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setCommentsIsLoading(false)
        setComments(data.comments)
      })
  }, [])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  function addCommentHandler(commentData) {
    setCommentsIsLoading(true)

    notificationCtx.showNotification({
      title: 'Comment sending...',
      message: 'Your comment is currently being stored into a database.',
      status: 'pending',
    })

    fetch(`/api/comment/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }

        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!')
        })
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Your comment was successfully saved!',
          status: 'success',
        })
        fetch(`/api/comment/${eventId}`)
          .then((response) => response.json())
          .then((data) => {
            setCommentsIsLoading(false)
            setComments(data.comments)
          })
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        })
      })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !commentsIsLoading && (
        <CommentList comments={comments} />
      )}
      {showComments && commentsIsLoading && <p>Loading...</p>}
    </section>
  )
}

export default Comments
