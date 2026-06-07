import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Course } from '../models/courseInt';


@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  private url: string = "https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json";

  //injicerar HttpClient
  http = inject(HttpClient);


  //Ladda kurser
  async loadCourses(): Promise<Course[]> {
    const courses = this.http.get<Course[]>(this.url); //Använder http-klienten, get-anrop, läsa in som array av Course, anropa URL
    return await firstValueFrom(courses); //Returnera courses som ett promise till anropet - dvs. kurser från url
  }
}
