import apiClient from '@/services/AxiosClient'
import type { studentInfo } from '@/student'
import type { AxiosResponse } from 'axios'
export default {
    getStudent(perPage: number, page: number): Promise<AxiosResponse<studentInfo[]>>{
        return apiClient.get<studentInfo[]>('/students?_limit=' + perPage + '&_page=' + page)
    },
    getStudentByID(id: number): Promise<AxiosResponse<studentInfo>>{
        return apiClient.get<studentInfo>('students/' +id.toString())
    },
    getStudents(): Promise<AxiosResponse<studentInfo[]>>{
        return apiClient.get<studentInfo[]>('/students')
    },
  }