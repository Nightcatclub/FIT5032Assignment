<template>
    <div class="assessment-container">
      <div class="assessment-info">
        <h1>Mental Health Assessment</h1>
        <p>This page provides an overview of the mental health assessment. You can start the assessment by clicking the button below.</p>
        <button class="btn btn-primary" @click="startTest">Start Test</button>
      </div>
      <div class="resources">
        <h2>Mental Health Resources</h2>
        <ul>
          <li><a href="https://www.who.int/mental_health/en/" target="_blank">World Health Organization - Mental Health</a></li>
          <li><a href="https://www.mentalhealth.gov/" target="_blank">MentalHealth.gov</a></li>
          <li><a href="https://www.mind.org.uk/" target="_blank">Mind - Mental Health Charity</a></li>
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
  }
  .assessment-info {
    width: 60%;
  }
  .resources {
    width: 30%;
  }
  ul {
    list-style-type: none;
  }
  li {
    margin-bottom: 10px;
  }
  </style>
  