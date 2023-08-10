import type { studentInfo } from '@/student'
import { defineStore } from 'pinia'
export const useStudentListStore = defineStore('student_list', {
    state: () => ({
        student_list: null as studentInfo | null
    }),
    actions: {
        setStudent_list(student_list: studentInfo){
            this.student_list = student_list
        }
    }
})