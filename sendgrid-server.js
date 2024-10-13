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
