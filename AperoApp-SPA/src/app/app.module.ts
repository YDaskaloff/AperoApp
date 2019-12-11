import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BikeListComponent } from './bikes-root/bike-list/bike-list.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { appRoutes } from './routes';
import { ContactComponent } from './contact/contact.component';
import { AuthService } from './_services/auth.service';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptor } from './_services/error.interceptor';
import { MembersEditComponent } from './members/members-edit/members-edit.component';
import { EditBikesComponent } from './bikes-root/edit-bikes/edit-bikes.component';
import { EditBikeComponent } from './bikes-root/edit-bike/edit-bike.component';
import { AuthInterceptorService } from './_services/auth-interceptor.service';
import { UserService } from './_services/user.service';
import { BikeService } from './_services/bike.service';
import { EditBikesService } from './_services/editBikes.service';
import { BikeCardComponent } from './bikes-root/bike-card/bike-card.component';
import { EditBikesCardComponent } from './bikes-root/edit-bikes-card/edit-bikes-card.component';
import { MemberCardComponent } from './members/member-card/member-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    BikeListComponent,
    AboutComponent,
    FaqComponent,
    ContactComponent,
    RegisterComponent,
    MembersEditComponent,
    EditBikesComponent,
    EditBikeComponent,
    BikeCardComponent,
    EditBikesCardComponent,
    MemberCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
      AuthService,
      BikeService,
      UserService,
      EditBikesService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: ErrorInterceptor,
         multi: true
      },
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptorService,
         multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
