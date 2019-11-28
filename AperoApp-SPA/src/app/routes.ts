
import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { BikesComponent } from './bikes-root/bikes/bikes.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MembersEditComponent } from './members/members-edit/members-edit.component';
import { BikesEditComponent } from './bikes-root/bikes-edit/bikes-edit.component';
import { BikeEditComponent } from './bikes-root/bike-edit/bike-edit.component';
import { AuthGuard } from './_guards/auth.guard';


export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'bikes', component: BikesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'contact', component: ContactComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'register', component: RegisterComponent },
            { path: 'members', component: MembersEditComponent },
            { path: 'bikes-edit', component: BikesEditComponent },
            { path: 'bike-edit', component: BikeEditComponent },
        ]
    },
    { path: 'register', component: RegisterComponent },
    { path: 'members', component: MembersEditComponent },
    { path: 'bikes-edit', component: BikesEditComponent },
    { path: 'bike-edit', component: BikeEditComponent },
    // default destination if nothing above matches the request:
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
