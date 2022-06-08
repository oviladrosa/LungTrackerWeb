import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as L from 'leaflet';
import { UserService } from '../../../services/UserService';
import { PopupService } from './popup.service';

export interface PlacesPopulation {
  name: string;
  postalCode: number;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  private placesDictionary: PlacesPopulation[] = [];

  constructor(private http: HttpClient,
              private userService: UserService,
              private popupService: PopupService
  ) { }

  static scaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  makeCityMarkers(map: L.Map): void {
    this.userService.getLocations().subscribe((res: any) => {
      for (const person of res) {
        for (const place of person['livingPlaces']){
          if (place.isPresent){
            const lon = place['city']['longitude'];
            const lat = place['city']['latitude'];
            this.addPlaceToDictionary(place);
            const marker = L.marker([lat, lon]);
            marker.addTo(map);
          }
        }
      }
    });
  }

   getRadonData(){
    return this.http.get("https://young-hollows-40979.herokuapp.com/https://apiclinic.herokuapp.com/contaminants/allDataRadon", {headers: new HttpHeaders().set('Authorization', this.userService.getToken())});

  }

  makeCityCircles(map: L.Map): void {
    this.userService.getLocations().subscribe((res: any) => {
      for (const person of res) {
        for (const place of person['livingPlaces']){
          if (place.isPresent){
            const name = place['city']['name'];
            const lon = place['city']['longitude'];
            const lat = place['city']['latitude'];
            this.addPlaceToDictionary(place);
          }
        }
      }
      this.calculateCirclesRadius(map, res);
    });
  }

  calculateCirclesRadius(map: L.Map, persons: any): void{
    const maxVal = this.getMaxValue();
    for (const person of persons){
      for (const place of person['livingPlaces']) {
        if (place.isPresent){
          const name = place['city']['name'];
          const lon = place['city']['longitude'];
          const lat = place['city']['latitude'];
          let found = false;
          let dictPlace = this.placesDictionary[0];
          for (let i = 0; i < this.placesDictionary.length && !found; i++) {
            let element = this.placesDictionary[i];
            if (element.name === name) {
              dictPlace = element;
              found = true;
            }
          }
          if(lat && lon){
            const circle = L.circleMarker([lat, lon], {
              radius: MarkerService.scaledRadius(dictPlace.value, maxVal)
            });
            circle.bindPopup(this.popupService.makeCapitalPopup(dictPlace),{closeButton: false});
            circle.addTo(map);
          }
        }
      }
    }
  }

  addPlaceToDictionary(place): void{
    const name = place['city']['name'];
    const postalCode = place['postalCode'];
    let found = false;
    for (let i = 0; i < this.placesDictionary.length; i++){
      let element = this.placesDictionary[i];
      if (element.name === name){
        element.value += 1;
        found = true;
      }
    }
    if (!found) {
      this.placesDictionary.push({name: name, postalCode: parseInt(postalCode, 10), value: 1});
    }
  }

  getMaxValue(): number{
    let maxKey = '';
    let maxValue = 0;
    for (let i = 0; i < this.placesDictionary.length; i++ ){
      const element = this.placesDictionary[i];
      if (element.value > maxValue){
        maxValue = element.value;
        maxKey = element.name;
      }
    }
    return maxValue;
  }
}
