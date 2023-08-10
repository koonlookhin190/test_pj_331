import { createRouter, createWebHistory } from 'vue-router'
import StudentListView from '../views/StudentListView.vue'
import StudentLayoutView from '../views/student/StudentLayoutView.vue'
import { useStudentStore } from '@/stores/student'
import StudentService from '@/services/StudentService'
import StudentDetailView from '../views/student/StudentDetailView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'student-list',
      component: StudentListView,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || "1"),
      }),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: "/student/:id",
      name: "student-layout",
      component: StudentLayoutView,
      props: true,
        beforeEnter: (to) => {
          const id: number = parseInt(to.params.id as string)
            const studentStore = useStudentStore()
          return StudentService.getStudentByID(id).then((response) => {
            studentStore.setStudent(response.data)
          })
        },
      children: [
        {
          path: "/student/:id",
          name: "student-detail",
          component: StudentDetailView,
          props: true,
        }
        // ,
        // {
        //   path: "/event/:id/edit",
        //   name: "event-edit",
        //   component: EventEditView,
        //   props: true,
        // },
        // {
        //   path: "/event/:id/register",
        //   name: "event-register",
        //   component: EventRegisterView,
        //   props: true,
        // },
      ],
    },
  ]
})

export default router
