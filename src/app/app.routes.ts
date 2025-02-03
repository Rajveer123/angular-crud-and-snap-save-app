import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: 'header', component: HeaderComponent},
    {path: '',  component: HomeComponent},
    {path: '**', component: PageNotFoundComponent}
];
