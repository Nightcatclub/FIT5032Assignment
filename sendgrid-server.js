import express from 'express'
import sgMail from '@sendgrid/mail'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

// eslint-disable-next-line no-undef
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.post('/send-email', async (req, res) => {
  const { email, subject, message } = req.body

  const msg = {
    to: email,
    from: 'crh549636158@gmail.com',
    subject: subject,
    text: message
  }

  try {
    await sgMail.send(msg)
    res.status(202).send('Email sent successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Failed to send email')
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
