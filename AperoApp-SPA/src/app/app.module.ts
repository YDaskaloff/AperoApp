import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap";

import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { BikesComponent } from "./bikes-root/bikes/bikes.component";
import { AboutComponent } from "./about/about.component";
import { FaqComponent } from "./faq/faq.component";
import { appRoutes } from "./routes";
import { ContactComponent } from "./contact/contact.component";
import { AuthService } from "./_services/auth.service";
import { RegisterComponent } from "./register/register.component";
import { ErrorInterceptor } from "./_services/error.interceptor";
import { MembersEditComponent } from "./members/members-edit/members-edit.component";
import { BikesEditComponent } from "./bikes-root/bikes-edit/bikes-edit.component";
import { BikeEditComponent } from "./bikes-root/bike-edit/bike-edit.component";
import { AuthInterceptorService } from "./_services/auth-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    BikesComponent,
    AboutComponent,
    FaqComponent,
    ContactComponent,
    RegisterComponent,
    MembersEditComponent,
    BikesEditComponent,
    BikeEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot()
  ],
  providers: [
      AuthService,
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
