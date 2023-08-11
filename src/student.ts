export interface studentInfo {
    id: number;
    name: string;
    surname: string;
    image: string;
    course_list: Course[];
    teacher_id: number;
    comment: Comment[];
  }
  
  export interface Course {
    course_id: number, 
    course_name: string
  }
  
  export interface Comment {
    // Properties of a comment
  }