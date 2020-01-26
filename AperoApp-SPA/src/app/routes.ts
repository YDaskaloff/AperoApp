
import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { BikeListComponent } from './bikes-root/bike-list/bike-list.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MembersEditComponent } from './members/members-edit/members-edit.component';
import { EditBikesComponent } from './bikes-root/edit-bikes/edit-bikes.component';
import { EditBikeComponent } from './bikes-root/edit-bike/edit-bike.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';
import { BikeDetailComponent } from './bikes-root/bike-detail/bike-detail.component';
import { BikeDetailResolver } from './_resolvers/bike-detail.resolver';
import { BikeListResolver } from './_resolvers/bike-list.resolver';
import { EditBikesResolver } from './_resolvers/edit-bikes.resolver';
import { EditBikeResolver } from './_resolvers/edit-bike.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { AddNewBikeComponent } from './bikes-root/add-new-bike/add-new-bike.component';
import { EditProfileComponent } from './members/edit-profile/edit-profile.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'bikes', component: BikeListComponent,
        resolve: {bikes: BikeListResolver}},
    { path: 'bikes/:id', component: BikeDetailComponent,
        resolve: {bike: BikeDetailResolver}},
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'contact', component: ContactComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'edit-bikes', component: EditBikesComponent,
                resolve: {bikes: EditBikesResolver} },
            { path: 'edit-bikes/:id', component: EditBikeComponent,
                resolve: {bike: EditBikeResolver}, canDeactivate: [PreventUnsavedChanges] },
            { path: 'add-new-bike', component: AddNewBikeComponent, canDeactivate: [PreventUnsavedChanges] },
            { path: 'edit-profile', component: EditProfileComponent }
        ]
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AdminGuard],
        children: [
            { path: 'register', component: RegisterComponent },
            { path: 'members', component: MembersEditComponent }
        ]
    },
    // default destination if nothing above matches the request:
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
