import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Courses } from './courses/courses';
import { Schedule } from './schedule/schedule';

export const routes: Routes = [
    { path: "home", component: Home},
    { path: "", redirectTo: "home", pathMatch: "full"},
    { path: "courses", component: Courses},
    { path: "schedule", component: Schedule}
];
