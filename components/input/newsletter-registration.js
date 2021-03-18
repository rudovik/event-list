import { useState } from 'react'
import classes from './newsletter-registration.module.css'

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

function NewsletterRegistration() {
  const [email, setEmail] = useState()

  function registrationHandler(event) {
    event.preventDefault()

    if (!validateEmail(email)) {
      console.log('Entered email is invalid')
      return
    }

    const reqBody = {
      email,
    }

    fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  const changeHandler = (e) => {
    setEmail(e.target.value)
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            value={email}
            onChange={changeHandler}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  )
}

export default NewsletterRegistration
