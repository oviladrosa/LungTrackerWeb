import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-lung-form',
  templateUrl: './lung-form.component.html',
  styleUrls: ['./lung-form.component.css']
})
export class LungFormComponent implements OnInit {
  isChecked = true;
  formGroup: FormGroup;

  constructor(formBuilder: FormBuilder, private router: Router) {
    this.formGroup = formBuilder.group({
      firstQuestion: ['', Validators.requiredTrue],
      secondQuestion: ['', Validators.requiredTrue],
      thirdQuestion: ['', Validators.requiredTrue],
    });
   }

  ngOnInit(): void {
  }

  isDisabled() {
    return this.formGroup.status == 'INVALID';
  }

  onFormSubmit() {
    alert(JSON.stringify(this.formGroup.value, null, 2));
  }

  startForm() {
    this.router.navigate(['/form-questions']);
  }

}
