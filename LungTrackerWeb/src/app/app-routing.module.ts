import { LungFormQuestionsComponent } from './lung-form/lung-form-questions/lung-form-questions.component';
import { LungFormComponent } from './lung-form/lung-form.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResearcherComponent } from './researcher/researcher.component';
import { AuthGuard } from './services/auth.guard';
import { MapsComponent } from './maps/maps.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'form', component: LungFormComponent },
  { path: 'form-questions', component: LungFormQuestionsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'researcher', component: ResearcherComponent,canActivate:[AuthGuard] },

  {  path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
