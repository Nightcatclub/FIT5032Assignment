<template>
  <div class="rating-container">
    <h1 class="text-center">Rate My Web Application</h1>
    <form @submit.prevent="submitRating">
      <div class="mb-3">
        <label for="rating" class="form-label">Select Your Rating (1-5):</label>
        <input
          type="number"
          id="rating"
          v-model.number="currentRating"
          class="form-control"
          min="1"
          max="5"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">Submit</button>
    </form>

    <div class="mt-5 text-center">
      <h3>Ratings History:</h3>
      <ul class="list-group">
        <li v-for="(rating, index) in ratings" :key="index" class="list-group-item">
          <strong>
            {{ rating.username }}
          </strong>
          : {{ rating.score }} / 5
        </li>
      </ul>
      <p v-if="ratings.length === 0">No ratings yet.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const username = ref(localStorage.getItem('username') || 'Nobody')
const currentRating = ref(0)
const ratings = ref([])

onMounted(() => {
  const storedRatings = JSON.parse(localStorage.getItem('ratings')) || []
  ratings.value = storedRatings
})

const submitRating = () => {
  const userRating = {
    username: username,
    score: currentRating.value
  }

  ratings.value.push(userRating)
  localStorage.setItem('ratings', JSON.stringify(ratings.value))
  alert('Thank you for your rating!')
  currentRating.value = 0
}
</script>

<style scoped>
.rating-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f8f9fa;
}

.text-center {
  text-align: center;
}

.list-group {
  text-align: left;
}
</style>
