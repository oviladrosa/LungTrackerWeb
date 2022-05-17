import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PatientsContaminantsStationsService {

  constructor(private httpService: HttpClient){

  }

  getStations(lat: number, lon: number, country: string){
    let header = new HttpHeaders().set('Access-Control-Allow-Headers', 'Content-Type');
    header.set('Access-Control-Allow-Methods', 'GET');
    header.set('Access-Control-Allow-Origin', '*');
    header.set('Access-Control-Allow-Headers', 'Origin');
    return this.httpService.get('https://young-hollows-40979.herokuapp.com/https://apiclinic.herokuapp.com/contaminants?latitude='
                                      + lat + '&longitude=' + lon + '&country=' + country, {
      headers: header
    });
  }
}
