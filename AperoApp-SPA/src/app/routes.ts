
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BikesComponent } from './bikes/bikes.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';


export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'bikes', component: BikesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },

    /* {
        path: '',
        runGuardsAndResolvers: 'always',
        children: [
            { path: 'login', component: LoginComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }, // default destination if nothing above matches the request */
];
