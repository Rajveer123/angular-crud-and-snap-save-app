import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EmployComponent } from './components/employ/employ.component';

export const routes: Routes = [
    {path: 'header', component: HeaderComponent},
    {path: '',  component: HomeComponent},
    {path: 'employ/:id',  component: EmployComponent},
    {path: '**', component: PageNotFoundComponent}
];
