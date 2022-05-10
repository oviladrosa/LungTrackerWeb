import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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

}
