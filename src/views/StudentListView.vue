<script setup lang="ts">
import { computed, ref, watchEffect, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
import type { AxiosResponse } from 'axios'
import type { studentInfo } from '@/student'
import StudentService from '../services/StudentService'
import StudentCard from '../components/StudentCard.vue'
import { storeToRefs } from 'pinia'
import { useStudentListStore } from '@/stores/student_list'
const store_student_list = useStudentListStore()
const student_list = storeToRefs(store_student_list).student_list
const all_stuent: Ref<Array<studentInfo>> = ref([])
const showForm = ref(false);
const id = ref<number | null>(null);
const name = ref<string>('');
const surname = ref<string>('');
const image = ref<string>('');
const teacher_id = ref<number | null>(null);
const course_list = ref<[]>(null);
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
// const students: Ref<Array<studentInfo>> = ref([])
StudentService.getStudent(3, props.page).then((response: AxiosResponse<studentInfo[]>) => {
  store_student_list.setStudent_list(response.data)
  totalStudent.value = response.headers['x-total-count']
})
StudentService.getStudents()
.then((response: AxiosResponse<studentInfo[]>) => {
  all_stuent.value = response.data
  console.log(all_stuent.value)
})
onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  StudentService.getStudent(3, toPage).then((response: AxiosResponse<studentInfo[]>) => {
    store_student_list.setStudent_list(response.data)
    totalStudent.value = response.headers['x-total-count']
    next()
  })
  StudentService.getStudents()
.then((response: AxiosResponse<studentInfo[]>) => {
  all_stuent.value = response.data
  console.log(all_stuent.value)
})
})

const addStudent = () => {
  const newStudent = {
    id: id.value,
    name: name.value,
    surname: surname.value,
    image: image.value,
    teacher_id: teacher_id.value,
    course_list: course_list.value,
  };
  store_student_list.add_student(newStudent)
  id.value = null;
  name.value = '';
  surname.value = '';
  image.value = '';
  teacher_id.value = null;
  course_list.value = [];
  showForm.value = false;
};
</script>

<template>
  <main class="students">
    <StudentCard v-for="student in student_list" :key="student.id" :student="student"></StudentCard>
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
     <button @click="showForm = true" class="add-student-btn">Add Student</button>
    <div>
       <form v-if="showForm" @submit.prevent="addStudent" class="student-form">
      <label for="id">ID:</label>
      <input v-model="id" type="number" id="id" required>
      <label for="name">Name:</label>
      <input v-model="name" type="text" id="name" required>
      <label for="surname">Surname:</label>
      <input v-model="surname" type="text" id="surname" required>
      <label for="image">Image URL:</label>
      <input v-model="image" type="text" id="image" required>
      <label for="teacher_id">Teacher ID:</label>
      <input v-model="teacher_id" type="number" id="teacher_id" required>
      <button type="submit" class="submit-btn">Add Student</button>
    </form>
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