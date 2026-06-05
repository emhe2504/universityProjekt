import { Component, computed, inject, signal } from '@angular/core';
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


  filterText = signal(""); //signal som lagrar sökfras

  //signal som lagrar filtrerat värde
  filteredCourses = computed(() => {
    const filter = this.filterText().trim().toLowerCase();  //Inmatad sökfras (inga mellanstag, gemener)
    if (!filter) return this.courses(); //Om ingen sökfras, visa alla kurser

    //Returner kursnamn och kurskoder som inkluderar sökfras
    return this.courses().filter(c =>
      c.courseName.toLowerCase().includes(filter) ||
      c.courseCode.toLowerCase().includes(filter)
    );
  })



  sortChoice = signal("normal");


  sortCourses = computed(() => {
    const coursesCopy = [...this.filteredCourses()]; //Allakurser från filteredCourses i ny array
    const value = this.sortChoice();  //Det val vi gjort i listan

    if (value === "byCode") {
      return coursesCopy.sort((a, b) => a.courseCode.localeCompare(b.courseCode));  //sortera på kurskod
    }

    if (value === "byName") {
      return coursesCopy.sort((a, b) => a.courseName.localeCompare(b.courseName));  //sortera på kursnamn
    }

    if (value === "byPoints") {
      return coursesCopy.sort((a, b) => a.points - b.points);  //sortera på poäng
    }

    if (value === "bySubject") {
      return coursesCopy.sort((a, b) => a.subject.localeCompare(b.subject));  //sortera på poäng
    }

    return coursesCopy;   //Annars orginalordning

  });




  coursesService = inject(CoursesService);

  //Körs när komponenten startar
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

  isDarker: boolean[] = []; //Array som innehåller true/false

  changeColor(i: number): void {

    this.isDarker[i] = true;  //True vid klicka på knapp = class darker
  }
}

