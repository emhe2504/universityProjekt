import { Injectable } from '@angular/core';
import { Course } from '../models/courseInt';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {


  //Hämta från kurser
  getCourses(): Course[] {
    const savedCourses = localStorage.getItem("savedCourses");
    if (!savedCourses) { return [] };

    const currentCourses = JSON.parse(savedCourses);
    return currentCourses;
  }



  //Lägga till kurser
  addCourse(course: Course): Course[] {
    let courses = this.getCourses();

    //Kontrollera så kurs inte redan är tillagd
    const containsCourse = courses.some(c => c.courseCode === course.courseCode);

    //Om inte, lägg till
    if (!containsCourse) {
      courses = [...courses, course];
    }

    //Spara i localStorage
    localStorage.setItem("savedCourses", JSON.stringify(courses));
    return courses;
  }



  //Radera kurser
  removeCourse(course: Course): Course[] {
    let courses = this.getCourses();

    const newCourses = courses.filter(c =>
      c.courseCode !== course.courseCode //Filtrera bort raderad kurs
    );

    localStorage.setItem("savedCourses", JSON.stringify(newCourses)); //Spara filtrerade kurser till localStorage
    return newCourses;

  }
}