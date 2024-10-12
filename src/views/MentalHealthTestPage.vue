<template>
  <div class="test-container">
    <h1 class="heading">Mental Health Status Test</h1>
    <form @submit.prevent="submitTest" class="test-form">
      <div v-for="(question, index) in questions" :key="index" class="question-block">
        <p class="question-text">{{ question.text }}</p>
        <div v-for="(option, idx) in question.options" :key="idx" class="option-block">
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
        <button @click="exportPDF" type="button" class="btn btn-secondary">Export as PDF</button>
        <button @click="goBack" type="button" class="btn btn-secondary">Go Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { jsPDF } from 'jspdf';

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
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async submitTest() {
      const totalScore = this.userAnswers.reduce((sum, answer) => sum + answer, 0);
      const userEmail = localStorage.getItem('email');
      console.log('Total Score:', totalScore);
      console.log('Type of totalScore:', typeof totalScore);

      await this.sendEmail(userEmail, 'Your Test Results', `Your total score is ${totalScore}.`);
    },

    async sendEmail(recipientEmail, subject, messageContent) {
      try {
        const response = await axios.post('http://localhost:3001/send-email', {
          email: recipientEmail,
          subject: subject,
          message: messageContent
        });

        if (response.status === 202) {
          alert('Email has been sent!');
        } else {
          alert('Failed to send email.');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        alert('Network error. Failed to send email.');
      }
    },

    exportPDF() {
      const doc = new jsPDF();

      doc.text('Mental Health Test Results', 10, 10);
      this.questions.forEach((question, index) => {
        doc.text(`${index + 1}. ${question.text}`, 10, 20 + (index * 10));
        doc.text(`Answer: ${this.getAnswerText(question, index)}`, 10, 25 + (index * 10));
      });

      const totalScore = this.userAnswers.reduce((sum, answer) => sum + answer, 0);
      doc.text(`Total Score: ${totalScore}`, 10, 20 + (this.questions.length * 10));

      doc.save('mental_health_test_results.pdf');
    },

    getAnswerText(question, index) {
      const selectedOption = this.userAnswers[index];
      const option = question.options.find(opt => opt.score === selectedOption);
      return option ? option.text : 'No answer';
    },

    goBack() {
      this.$router.push('/mentalhealth');
    }
  }
};
</script>

<style scoped>
.test-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: linear-gradient(to right, #f9f9f9, #e3f2fd);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 40px auto;
}

.heading {
  font-size: 2rem;
  color: #007bff;
  margin-bottom: 30px;
  text-align: center;
}

.question-block {
  margin-bottom: 20px;
}

.question-text {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.option-block {
  margin-left: 20px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  margin-top: 30px;
}

.btn {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #565e64;
}
</style>