import express from 'express'
import sgMail from '@sendgrid/mail'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(bodyParser.json())

sgMail.setApiKey('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')

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
