<template>
<RouterLink class="event-link" :to="{name: 'student-detail', params:{id: student?.id}}">
  <div class="event-card">
    <h3>Name: {{ props.student?.name }}</h3>
    <h3>Surname: {{ props.student?.surname }}</h3>    
  </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { studentInfo } from '@/student'
import type { PropType } from 'vue'
const props = defineProps({
  student: {
    type: Object as PropType<studentInfo>,
    required: true // Corrected the property name here
  }
})
</script>

<style scoped>
h3 {
  font-family: Avenir, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.event-link{
    color: #2c3e50;
    text-decoration: none;
}
</style>
