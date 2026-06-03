import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Courses {

  private url: string = "https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json";

  //injicerar HttpClient
  http = inject(HttpClient);
}
