import { Component, signal } from '@angular/core';
import { Course } from '../models/courseInt';

@Component({
  selector: 'app-schedule',
  imports: [],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class Schedule {

  //Körs när komponenten startar
  ngOnInit() {
    this.loadCourses();
  }


  courseArray = signal<Course[]>([]);
  courseCount = signal(0);

  //Hämta kurser från localStorage (som sedan skrivs ut till skärmen)
  loadCourses(): void {

    const savedCourses: string | null = localStorage.getItem("savedCourses");

    if (savedCourses) {

      const current: Course[] = JSON.parse(savedCourses);
      this.courseArray.set(current);

      current.forEach(course => {

        //Summera alla kursers poäng med reduce
        const totalCount: number = current.reduce((total, course) => total + course.points, 0);
        this.courseCount.set(totalCount);
      });
    }
  }


  //Radera kurs från ramschema
  removeCourse(deletedCourse: Course): void {

    const fetchedCourses: string | null = localStorage.getItem("savedCourses"); //Hämta från localStorage

    if (fetchedCourses) {

      const courses: Course[] = JSON.parse(fetchedCourses);

      const newCourses = courses.filter(course =>
        course.courseCode !== deletedCourse.courseCode //Filtrera bort raderad kurs
      );

      localStorage.setItem("savedCourses", JSON.stringify(newCourses)); //Spara filtrerade kurser till localStorage
      this.courseArray.set(newCourses); //Även uppdatera signal
    }

  }
}
