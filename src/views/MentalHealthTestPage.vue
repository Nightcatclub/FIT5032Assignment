<template>
  <div class="test-container">
    <h1>Mental Health Status Test</h1>
    <form @submit.prevent="submitTest">
      <div v-for="(question, index) in questions" :key="index" class="question-block">
        <p>{{ question.text }}</p>
        <div v-for="(option, idx) in question.options" :key="idx">
          <label>
            <input
              type="radio"
              :name="'question' + index"
              :value="option.score"
              v-model.number="userAnswers[index]"
              required
            />
            {{ option.text }}
          </label>
        </div>
      </div>

      <div class="button-container">
        <button type="submit" class="btn btn-primary">Submit Test</button>
        <button @click="goBack" type="button" class="btn btn-secondary">Go Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  data() {
    return {
      questions: [
        {
          text: 'How often do you feel overwhelmed by your responsibilities?',
          options: [
            { text: 'A: Very Often', score: 10 },
            { text: 'B: Often', score: 7 },
            { text: 'C: Sometimes', score: 4 },
            { text: 'D: Rarely', score: 1 }
          ]
        },
        {
          text: 'How satisfied are you with your current work-life balance?',
          options: [
            { text: 'A: Very Satisfied', score: 1 },
            { text: 'B: Satisfied', score: 3 },
            { text: 'C: Neutral', score: 5 },
            { text: 'D: Dissatisfied', score: 10 }
          ]
        },
        {
          text: 'How often do you feel lonely or isolated?',
          options: [
            { text: 'A: Very Often', score: 10 },
            { text: 'B: Often', score: 7 },
            { text: 'C: Sometimes', score: 5 },
            { text: 'D: Rarely', score: 2 }
          ]
        },
        {
          text: 'How well do you manage stress in your daily life?',
          options: [
            { text: 'A: Very Well', score: 1 },
            { text: 'B: Well', score: 3 },
            { text: 'C: Sometimes Well', score: 6 },
            { text: 'D: Poorly', score: 10 }
          ]
        },
        {
          text: 'How often do you experience mood swings?',
          options: [
            { text: 'A: Very Often', score: 10 },
            { text: 'B: Often', score: 7 },
            { text: 'C: Sometimes', score: 4 },
            { text: 'D: Rarely', score: 1 }
          ]
        },
        {
          text: 'How well do you maintain positive relationships with others?',
          options: [
            { text: 'A: Very Well', score: 1 },
            { text: 'B: Well', score: 3 },
            { text: 'C: Neutral', score: 5 },
            { text: 'D: Poorly', score: 10 }
          ]
        },
        {
          text: 'How often do you feel anxious in social situations?',
          options: [
            { text: 'A: Very Often', score: 10 },
            { text: 'B: Often', score: 7 },
            { text: 'C: Sometimes', score: 4 },
            { text: 'D: Rarely', score: 1 }
          ]
        },
        {
          text: 'How often do you struggle with feelings of low self-worth?',
          options: [
            { text: 'A: Very Often', score: 10 },
            { text: 'B: Often', score: 7 },
            { text: 'C: Sometimes', score: 5 },
            { text: 'D: Rarely', score: 2 }
          ]
        },
        {
          text: 'How well do you handle unexpected challenges in your life?',
          options: [
            { text: 'A: Very Well', score: 1 },
            { text: 'B: Well', score: 3 },
            { text: 'C: Neutral', score: 5 },
            { text: 'D: Poorly', score: 10 }
          ]
        },
        {
          text: 'How often do you engage in activities that bring you joy or relaxation?',
          options: [
            { text: 'A: Very Often', score: 1 },
            { text: 'B: Often', score: 3 },
            { text: 'C: Sometimes', score: 6 },
            { text: 'D: Rarely', score: 10 }
          ]
        }
      ],
      userAnswers: []
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  methods: {
    async submitTest() {
      const totalScore = this.userAnswers.reduce((sum, answer) => sum + answer, 0)
      const userEmail = localStorage.getItem('email')
      console.log('Total Score:', totalScore)
      console.log('Type of totalScore:', typeof totalScore)

      await this.sendEmail(userEmail, 'Your Test Results', `Your total score is ${totalScore}.`)
    },

    async sendEmail(recipientEmail, subject, messageContent) {
      try {
        const response = await axios.post('http://localhost:3001/send-email', {
          email: recipientEmail,
          subject: subject,
          message: messageContent
        })

        if (response.status === 202) {
          alert('Email has been sent!')
        } else {
          alert('Failed to send email.')
        }
      } catch (error) {
        console.error('Error sending email:', error)
        alert('Network error. Failed to send email.')
      }
    },

    goBack() {
      this.$router.push('/mentalhealth')
    }
  }
}
</script>

<style scoped>
.test-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
}
</style>
