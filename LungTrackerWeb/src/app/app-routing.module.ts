import { LungFormQuestionsComponent } from './lung-form/lung-form-questions/lung-form-questions.component';
import { LungFormComponent } from './lung-form/lung-form.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResearcherComponent } from './researcher/researcher.component';
import { AuthGuard } from './services/auth.guard';
import { MapsComponent } from './maps/maps.component';
import { PatientContaminantsStationsComponent } from './patient-contaminants-stations/patient-contaminants-stations.component';
import { ResearcherMapComponent } from './researcher/researcher-map/researcher-map.component';
import{ InformationComponent } from './information/information.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'form', component: LungFormComponent },
  { path: 'form-questions', component: LungFormQuestionsComponent},
  { path: 'contaminants', component: PatientContaminantsStationsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'information', component: InformationComponent },
  { path: 'researcher', component: ResearcherComponent, canActivate: [AuthGuard] },
  { path: 'researcher/maps', component: ResearcherMapComponent, canActivate: [AuthGuard] },

  {  path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
