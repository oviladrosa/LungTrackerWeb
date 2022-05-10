import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar'
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { FooterComponent } from './footer/footer.component';
import { LungFormComponent } from './lung-form/lung-form.component';
import { HomeComponent } from './home/home.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LungFormQuestionsComponent } from './lung-form/lung-form-questions/lung-form-questions.component';
import { MatStepperModule, MatStepper} from '@angular/material/stepper'
import {MatFormFieldModule} from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { LungFormQuestionsService } from './lung-form/lung-form-questions/lung-form-questions-service';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { ResearcherComponent } from './researcher/researcher.component';
import {MatTableModule} from '@angular/material/table'
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ChartModule } from 'angular2-chartjs';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LungFormComponent,
    HomeComponent,
    LungFormQuestionsComponent,
    LoginComponent,
    ResearcherComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    ChartModule
  ],
  providers: [
    LungFormQuestionsService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
