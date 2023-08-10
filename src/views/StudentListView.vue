<script setup lang="ts">
import { computed, ref, watchEffect, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
import type { AxiosResponse } from 'axios'
import type { studentInfo } from '@/student'
import StudentService from '../services/StudentService'
import StudentCard from '../components/StudentCard.vue'
const totalStudent = ref<number>(0)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalStudent.value / 3)
  return props.page.valueOf() < totalPages
})
const router = useRouter()
const students: Ref<Array<studentInfo>> = ref([])
StudentService.getStudent(3, props.page).then((response: AxiosResponse<studentInfo[]>) => {
  students.value = response.data
  totalStudent.value = response.headers['x-total-count']
})
onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  StudentService.getStudent(3, toPage).then((response: AxiosResponse<studentInfo[]>) => {
    students.value = response.data
    totalStudent.value = response.headers['x-total-count']
    next()
  })
})
</script>

<template>
  <main class="students">
    <StudentCard v-for="student in students" :key="student.id" :student="student"></StudentCard>
    <div class="pagination">
      <RouterLink
        :to="{ name: 'student-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
        class="text-left mr-auto"
        >Prev Page</RouterLink
      >
      <RouterLink
        :to="{ name: 'student-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        id="page-next"
        class="text-right ml-auto"
        >Next Page</RouterLink
      >
    </div>
  </main>
</template>

<style scoped>
.students {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>