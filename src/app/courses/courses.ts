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

  //signals - startvärden
  filterText = signal("");
  sortChoice = signal("normal");
  subjectChoice = signal("original");


  //En computed signal för all filtrering och sortering

  filterAndSortCourses = computed(() => {

    let result = [...this.courses()]; //Array med värden från courses


    //Textfiltrering
    const filter = this.filterText().trim().toLowerCase();  //Inmatad sökfras (inga mellanstag, gemener)

    if (filter) {
      //Returner kursnamn och kurskoder som inkluderar sökfras
      result = result.filter(c =>
        c.courseName.toLowerCase().includes(filter) ||
        c.courseCode.toLowerCase().includes(filter)
      );
    }



    //Filtrering på ämne
    const subjectValue = this.subjectChoice();

    if (subjectValue !== "original") {
      result = result.filter(c =>
        c.subject === subjectValue);
    }



    //Sortering via dropdown
    const sortValue = this.sortChoice();  //Det val vi gjort i listan

    if (sortValue === "normal" || sortValue === "byCode") {
      return result.sort((a, b) => a.courseCode.localeCompare(b.courseCode));  //sortera på kurskod
    }

    if (sortValue === "byName") {
      return result.sort((a, b) => a.courseName.localeCompare(b.courseName));  //sortera på kursnamn
    }

    if (sortValue === "byLowToHigh") {
      return result.sort((a, b) => a.points - b.points);  //sortera på poäng
    }

    if (sortValue === "byHighToLow") {
      return result.sort((a, b) => b.points - a.points);  //sortera på poäng
    }

    if (sortValue === "bySubject") {
      return result.sort((a, b) => a.subject.localeCompare(b.subject));  //sortera på ämne
    }



    return result;

  })




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



  courseArray = signal<Course[]>([]);

  selectCourse(course: any): void {

    const saved: string | null = localStorage.getItem("savedCourses"); //Hämta om det redan finns lagrade kurser

    if (saved) {
      const currentCourses: Course[] = JSON.parse(saved);

      const updatedArray: Course[] = [...currentCourses, course]  //Skapa array med nuvarande + ny kurs

      this.courseArray.set(updatedArray); //uppdatera signal

      localStorage.setItem("savedCourses", JSON.stringify(updatedArray)); //Spara uppdaterad array till localStorage
    }
  }
}



