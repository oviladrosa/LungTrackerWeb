import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makeCapitalPopup(data: any): string {
    return `` +
      `<div>Ciudad: ${ data.name }</div>` +
      `<div>Código Postal: ${ data.postalCode }</div>` +
      `<div>Personas Registradas: ${ data.value }</div>`;
  }
}
