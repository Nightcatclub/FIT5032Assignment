<template>
  <div class="assessment-container">
    <div class="assessment-info card">
      <h1>Mental Health Assessment</h1>
      <p>This page provides an overview of the mental health assessment. You can start the assessment by clicking the button below.</p>
      <button class="btn btn-primary" @click="startTest">Start Test</button>
    </div>
    <div class="resources card">
      <h2>Mental Health Resources</h2>
      <ul>
        <li><a href="https://mhaustralia.org/" target="_blank">Mental Health Australia</a></li>
        <li><a href="https://www.mhvic.org.au/" target="_blank">Mental Health Victoria</a></li>
        <li><a href="https://www.healthdirect.gov.au/mental-health-helplines" target="_blank">Mental health helplines</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startTest = () => {
  router.push('/mental-health-test')
}
</script>

<style scoped>
.assessment-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
}

.assessment-info, .resources {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.assessment-info {
  width: 60%;
}

.resources {
  width: 30%;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 10px;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
