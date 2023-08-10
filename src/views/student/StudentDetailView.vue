<script setup lang="ts">
import type { Ref } from 'vue'
import type { studentInfo } from '@/student'
import type{PropType} from 'vue'

defineProps({
    student: {
        type: Object as PropType<studentInfo>,
            require: true
    }
})
</script>
<template>
    <div v-if="student">
        <img :src="student.img">
        <p>Student ID : {{ student.id }} </p>
        <p>Student Name : {{ student.name }} </p>
        <p>Student Surname : {{ student.surname }} </p>
        <p>--------------------------------------------------</p>
        <p>Enroll course</p>
        <p v-for="course in student.course_list" :key="course.id" >Course ID : {{ course.course_id }} Course Name : {{ course.course_name}} </p>
        <p>--------------------------------------------------</p>
        <p>Teacher ID : {{ student.teacher_id }} </p>
    </div>
</template>