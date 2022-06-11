import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import { NavbarComponent } from './navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { MapComponent } from './map/map.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFileUploadModule } from 'angular-material-fileupload';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostComponent } from './post/post.component';
import { SettingsComponent } from './settings/settings.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { CommentsComponent } from './comments/comments.component';
import { UserListComponent } from './user-list/user-list.component';
import { PostPinsComponent } from './post-pins/post-pins.component';
import { AgmDirectionModule } from 'agm-direction';
import { AgmOverlays } from "agm-overlays"

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    MapComponent,
    LoginComponent,
    FeedComponent,
    ProfileComponent,
    AddPostComponent,
    PostComponent,
    SettingsComponent,
    CommentsComponent,
    UserListComponent,
    PostPinsComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCgUVrha4t7QGrCpAZu2v70J-tcIr3vIA0',
      libraries: ["places", "geometry"]
    }),
    AgmDirectionModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFileUploadModule,
    FormsModule,
    CarouselModule,
    ReactiveFormsModule,
    MatGoogleMapsAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
