import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientsContaminantsStationsService } from './patients-contaminants-stations.service';
import PollutionStations from '../shared/models/Pollution/PollutionStations';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-patient-contaminants-stations',
  templateUrl: './patient-contaminants-stations.component.html',
  styleUrls: ['./patient-contaminants-stations.component.css']
})
export class PatientContaminantsStationsComponent implements OnInit {

  nivel: any = ['Bajo', 'Medio', 'Alto'];
  color: any = ['#0C884A', '#FBC43A', '#FF1D34'];
  nivelRad: any = ['Bajo', 'Medio-Bajo', 'Medio', 'Medio-Alto', 'Alto'];
  colorRad: any = ['#0C884A', '#BECE45', '#FBC43A', '#F16E22', '#FF1D34'];

  pollutionStations: PollutionStations;
  localPollutionStations: PollutionStations;
  bornPollutionStations: PollutionStations;
  regularDistribution = 100 / 3 + '%';
  residence: string;
  pollutionIndex = 0;
  lat: number;
  lon: number;
  country: string;
  lat2: number;
  lon2: number;
  country2: string;
  loading = true;
  localLoading = true;
  bornLoading = true;
  localCountryIsSpain = false;
  bornCountryIsSpain = false;
  loadingColor: ThemePalette = 'primary';

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

  changePollutionStations(index: number){
    if (index === 0){
      this.pollutionStations = this.bornPollutionStations;
      this.residence = 'Primera Residencia';
    } else{
      this.pollutionStations = this.localPollutionStations;
      this.residence = 'Residencia Actual';
    }
  }

  populateStations(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.lat = params.latitude;
      this.lon = params.longitude;
      this.country = params.country;
      this.lat2 = params.latitude2;
      this.lon2 = params.longitude2;
      this.country2 = params.country2;
    });
    this.getLocalStations(this.lat, this.lon, this.country, false);
    this.getBornStations(this.lat2, this.lon2, this.country2, true);
  }

  getLocalStations(lat: number, lon: number, country: string, born: boolean){
    if (country === 'Spain'){
      this.localCountryIsSpain = true;
      this.apiService.getStations(lat, lon).subscribe((stationsInfo: PollutionStations) => {
        this.localLoading = false;
        stationsInfo['born'] = born;
        console.log(stationsInfo);
        this.localPollutionStations = stationsInfo;
        this.updateLoading();
      });
    }
    else {
      this.localLoading = false;
      this.updateLoading();
    }
  }

  getBornStations(lat: number, lon: number, country: string, born: boolean){
    if (country === 'Spain') {
      this.bornCountryIsSpain = true;
      this.apiService.getStations(lat, lon).subscribe((stationsInfo: PollutionStations) => {
        this.bornLoading = false;
        stationsInfo['born'] = born;
        console.log(stationsInfo);
        this.bornPollutionStations = stationsInfo;
        this.updateLoading();
      });
    }
    else {
      this.bornLoading = false;
      this.updateLoading();
    }
  }

  updateLoading(){
    this.loading = this.bornLoading || this.localLoading;
    if (!this.loading){
      if (!this.localCountryIsSpain) {
        if (this.bornCountryIsSpain) {
          this.changePollutionStations(0);
        }
      }
      else{
        this.changePollutionStations(1);
      }
    }
  }
}
