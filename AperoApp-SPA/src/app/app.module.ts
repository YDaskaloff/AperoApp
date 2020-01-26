import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import {TimeAgoPipe} from 'time-ago-pipe';

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
import { MemberCardComponent } from './members/member-card/member-card.component';
import { BikeDetailComponent } from './bikes-root/bike-detail/bike-detail.component';
import { SliderComponent } from './bikes-root/slider/slider.component';
import { BikeDetailResolver } from './_resolvers/bike-detail.resolver';
import { BikeListResolver } from './_resolvers/bike-list.resolver';
import { EditBikeResolver } from './_resolvers/edit-bike.resolver';
import { EditBikesResolver } from './_resolvers/edit-bikes.resolver';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './bikes-root/photo-editor/photo-editor.component';
import { AddNewBikeComponent } from './bikes-root/add-new-bike/add-new-bike.component';
import { EditProfileComponent } from './members/edit-profile/edit-profile.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
  };
}

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
      MemberCardComponent,
      BikeDetailComponent,
      SliderComponent,
      PhotoEditorComponent,
      AddNewBikeComponent,
      TimeAgoPipe,
      EditProfileComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      ReactiveFormsModule,
      JwtModule.forRoot({
         config: {
           tokenGetter,
           whitelistedDomains: ['localhost:5000/api/admin'],
           blacklistedRoutes: ['localhost:5000/api/auth']
         }
       }),
       NgbModule,
       NgxGalleryModule,
       FileUploadModule
     ],
   providers: [
      AuthService,
      BikeService,
      UserService,
      EditBikesService,
      BikeDetailResolver,
      BikeListResolver,
      EditBikeResolver,
      EditBikesResolver,
      AdminGuard,
      AuthGuard,
      PreventUnsavedChanges,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: ErrorInterceptor,
         multi: true
      },
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptorService,
         multi: true
      },
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
