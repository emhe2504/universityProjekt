import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Courses } from './courses/courses';
import { Schedule } from './schedule/schedule';

export const routes: Routes = [
    { path: "Home", component: Home},
    { path: "", redirectTo: "Home", pathMatch: "full"},
    { path: "Courses", component: Courses},
    { path: "Schedule", component: Schedule}
];
