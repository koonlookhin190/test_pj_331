import apiClient from '@/services/AxiosClient'
import type { teacherInfo } from '@/teacher'
import type { AxiosResponse } from 'axios'
export default {
    getTeachers(): Promise<AxiosResponse<teacherInfo[]>>{
        return apiClient.get<teacherInfo[]>('/teachers')
    },
  }