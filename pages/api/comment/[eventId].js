import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-util'

const handler = async (req, res) => {
  const eventId = req.query.eventId

  let client

  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' })
    return
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid  input.' })
      client.close()
      return
    }

    const newComment = {
      eventId,
      email,
      name,
      text,
    }

    let result

    try {
      result = await insertDocument(client, 'comments', newComment)
      res.status(201).json({ message: 'Success', comment: newComment })
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' })
    }

    newComment._id = result.insertedId
  }

  if (req.method === 'GET') {
    let documents

    try {
      documents = await getAllDocuments(client, 'comments', { _id: -1 })
      res.status(200).json({ comments: documents })
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed!' })
    }
  }

  client.close()
}

export default handler
