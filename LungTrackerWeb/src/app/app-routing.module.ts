import { LungFormQuestionsComponent } from './lung-form/lung-form-questions/lung-form-questions.component';
import { LungFormComponent } from './lung-form/lung-form.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'form', component: LungFormComponent },
  { path: 'form-questions', component: LungFormQuestionsComponent},
  {  path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
