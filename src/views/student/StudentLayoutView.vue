<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const store = useStudentStore()
const student = storeToRefs(store).student
const id = ref(student?.value?.id)

</script>
<template>
    <div v-if="student">
        <div id="nav">
            <router-link :to="{ name: 'student-detail', params:{id}}"
            >Details</router-link>
            >
            <!-- |
            <router-link :to="{name: 'event-register', params: {id} }"
            >Register</router-link>
            >
            |
            <router-link :to="{name: 'event-edit', params: {id} }"
            >Edit</router-link> -->

            </div>
            <RouterView :student="student"></RouterView>
    </div>
</template>