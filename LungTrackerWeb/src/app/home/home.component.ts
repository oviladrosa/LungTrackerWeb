import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import suggestRequest from '../shared/models/SuggestRequest';
import { HomeComponentService } from './home.component-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  suggestForm!: FormGroup;
  loadingSuggestion = false;
  formsSubmitted: number;
  avgSuggestMark: number;

  constructor(private router: Router, private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private homeService: HomeComponentService) { 
      this.suggestForm = this.formBuilder.group({
        name: ['', Validators.required],
        mail: ['', Validators.required],
        option: ['1', null],
        checkBox: [false, Validators.required],
        description: ['', Validators.required],
      });
    }



  async ngOnInit() {
    this.formsSubmitted = await this.homeService.getPersons();
    this.avgSuggestMark = await this.homeService.getSuggestions();
    this.avgSuggestMark = this.avgSuggestMark[0]['avg_mark'];
    this.avgSuggestMark = Math.round(this.avgSuggestMark * 10) / 10

    if (this.route.snapshot.paramMap.get('successfullForm') != undefined) {
        const value = this.route.snapshot.paramMap.get('successfullForm');
        if (value) {
          this._snackBar.open('Formulario enviado correctamente', 'Cerrar', {
            duration: 10000,
            panelClass: ['purple-snack'],
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
    }
  }

  lungForm() {
    this.router.navigate(['/form']);
  }

  async submitSuggest() {
    this.loadingSuggestion = true;
    console.log(this.suggestForm);
    if (this.suggestForm.valid) {
      try {
        const suggest = new suggestRequest();
        suggest.name = this.suggestForm.get('name').value;
        suggest.email = this.suggestForm.get('mail').value;
        suggest.mark = parseInt(this.suggestForm.get('option').value);
        suggest.description = this.suggestForm.get('description').value;
        console.log(suggest);
        await this.homeService.communicateSuggest(suggest);
        this._snackBar.open('Sugerencia enviada correctamente', 'Cerrar', {
          duration: 10000,
          panelClass: ['purple-snack'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.suggestForm.reset();
      } catch(error) {
        this._snackBar.open('Ha ocurrido un error', 'Cerrar', {
          duration: 10000,
          panelClass: ['purple-snack'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
      
    }
    this.loadingSuggestion = false;
    
  }

}
