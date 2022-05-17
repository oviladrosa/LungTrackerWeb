import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientsContaminantsStationsService } from './patients-contaminants-stations.service';
import PollutionStations from '../shared/models/Pollution/PollutionStations';

@Component({
  selector: 'app-patient-contaminants-stations',
  templateUrl: './patient-contaminants-stations.component.html',
  styleUrls: ['./patient-contaminants-stations.component.css']
})
export class PatientContaminantsStationsComponent implements OnInit {

  nivel: any = ['Bajo', 'Medio', 'Alto'];
  color: any = ['#E4CFFF', '#BA87FD', '#903AFF'];
  nivelRad: any = ['Bajo', 'Medio-Bajo', 'Medio', 'Medio-Alto', 'Alto'];
  colorRad: any = ['#E4CFFF', '#D3B1FF', '#BA87FD', '#A763FF', '#903AFF'];

  pollutionStations: PollutionStations;
  lat: number;
  lon: number;
  country: string;

  constructor(private router: Router,
              private apiService: PatientsContaminantsStationsService,
              private activatedRoute: ActivatedRoute) {
    this.populateStations();
  }

  ngOnInit(): void {
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  populateStations(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.lat = params.latitude;
      this.lon = params.longitude;
      this.country = params.country;
    });
    this.getStations(this.lat, this.lon, this.country);
  }

  getStations(lat: number, lon: number, country: string){
    this.apiService.getStations(lat, lon, country).subscribe((stationsInfo: PollutionStations) => {
      console.log(stationsInfo);
      this.pollutionStations = stationsInfo;
    });
  }

}
