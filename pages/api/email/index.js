import { connectDatabase, insertDocument } from '../../../helpers/db-util'

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email

    if (!validateEmail(email)) {
      res.status(422).json({ message: 'Invalid email address.' })
      return
    }

    let client

    try {
      client = await connectDatabase()
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' })
      return
    }

    try {
      await insertDocument(client, 'emails', { email })
      client.close()
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' })
      return
    }

    client.close()

    res.status(201).json({ message: 'Success!', email })
  }
}

export default handler
