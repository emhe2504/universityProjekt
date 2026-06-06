import { Component, inject, signal } from '@angular/core';
import { Course } from '../models/courseInt';
import { ScheduleService } from '../services/schedule';

@Component({
  selector: 'app-schedule',
  imports: [],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class Schedule {

  scheduleService = inject(ScheduleService);

  courseArray = signal<Course[]>([]);
  courseCount = signal(0);

  //Körs när komponenten startar
  ngOnInit() {
    this.loadCourses();
  }


  /**
   * Hämta kurser från getCourses-service
   * Beräkna totalpoäng med reduce
   */
  loadCourses(): void {

    const courses: Course[] = this.scheduleService.getCourses();

    this.courseArray.set(courses)

    const totalCount: number = courses.reduce((total, course) => total + course.points, 0);
    this.courseCount.set(totalCount);
  }



  /**
   * Radera kurs från ramschema via removeCourse-service
   * Beräkna uppdaterad totalpoäng
   */
  removeCourse(course: Course): void {

    const courses: Course[] = this.scheduleService.removeCourse(course);

    this.courseArray.set(courses); //Även uppdatera signal

    const totalCount: number = courses.reduce((total, course) => total + course.points, 0);
    this.courseCount.set(totalCount);

  }

}
