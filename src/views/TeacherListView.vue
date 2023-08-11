<script setup lang="ts">
import { computed, ref, watchEffect, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
import type { AxiosResponse } from 'axios'
import type { teacherInfo } from '@/teacher'
import TeacherService from '../services/TeacherService'
import TeacherCard from '../components/TeacherCard.vue'
const all_teacher: Ref<Array<teacherInfo>> = ref([])

const router = useRouter()
// const students: Ref<Array<studentInfo>> = ref([])
TeacherService.getTeachers()
.then((response: AxiosResponse<teacherInfo[]>) => {
  all_teacher.value = response.data
  console.log(all_teacher.value)
})

</script>

<template>
  <main class="teacher">
    <TeacherCard v-for="teacher in all_teacher" :key="teacher.id" :teacher="teacher"></TeacherCard>
  </main>
</template>

<style scoped>
.teacher {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>