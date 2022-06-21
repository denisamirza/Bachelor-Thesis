import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { MapComponent } from './map/map.component';
import { CommentsComponent } from './comments/comments.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  { path: '', component: localStorage.getItem('email')?FeedComponent:(()=>{return LoginComponent})() },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'feed', component: FeedComponent},
  { path: 'profile/:email', component: ProfileComponent },
  { path: 'map/:dest', component: MapComponent},
  { path: 'comments', component: CommentsComponent},
  { path: 'notifs', component: NotificationsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
