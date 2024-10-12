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
  