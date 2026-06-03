import { Component, inject, signal } from '@angular/core';
import { Course } from '../models/courseInt';
import { CoursesService } from '../services/courses';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {

  courses = signal<Course[]>([]); //signal som lagrar courses, startvärde tom array
  error = signal<string | null>(null); //signal som lagrar error, startvärde null

  coursesService = inject(CoursesService);

  ngOnInit() {
    this.loadCourses();
  }

  async loadCourses() {
    try {
      const response = await this.coursesService.loadCourses(); //loadCourses returnerar kurser som promise
      this.courses.set(response);

    } catch (error) {
      this.error.set("Kunde inte ladda kurser, försök igen senare.")
    }
  }
}

