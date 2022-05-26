import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from 'src/app/researcher/researcher-map/leaflet-map/marker.service';

@Component({
  selector: 'app-leaflet-public-map',
  templateUrl: './leaflet-public-map.component.html',
  styleUrls: ['./leaflet-public-map.component.css']
})
export class LeafletPublicMapComponent implements AfterViewInit {

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
    this.markerService.makeCityMarkers(this.map);
  }
}
