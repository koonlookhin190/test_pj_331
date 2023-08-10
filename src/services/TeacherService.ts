import apiClient from '@/services/AxiosClient'
import type { teacherInfo } from '@/teacher'
import type { AxiosResponse } from 'axios'
export default {
    getTeachers(perPage: number, page: number): Promise<AxiosResponse<teacherInfo[]>>{
        return apiClient.get<teacherInfo[]>('/teachers?_limit=' + perPage + '&_page=' + page)
    },
    getTeachersByID(id: number): Promise<AxiosResponse<teacherInfo>>{
        return apiClient.get<teacherInfo>('teachers/' +id.toString())
    }
  }