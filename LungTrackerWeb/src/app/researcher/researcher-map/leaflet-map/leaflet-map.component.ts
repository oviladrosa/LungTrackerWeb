import { Component, AfterViewInit } from '@angular/core';

import { MarkerService } from './marker.service';
import *  as L from 'leaflet'
import 'leaflet.heat/dist/leaflet-heat.js'

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements AfterViewInit {
  private map;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 40.4167, -3.70325 ],
      zoom: 6
    });

    
    let radonData =[];
    this.markerService.getRadonData().subscribe((res : any)=>{
      for(let i in res){
        radonData.push([res[i]["LAT"],res[i]["LON"],res[i]["Nivell"]*res[i]["Nivell"]])
      }
      const heat = (L as any).heatLayer(radonData,{radius: 75, blur:30,max: 0.7, gradient: {0.2: '#FFFF00',0.35: '#FFCC00', 0.50: '#ff9900', 0.65: '#FF3300', 0.8: '#FF0000'},maxZoom: 18})
      heat.addTo(this.map);
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 6,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

      tiles.addTo(this.map);
    });
    
  }

  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCityCircles(this.map);
  }

}
