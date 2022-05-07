import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserService';
import {MatTableModule} from '@angular/material/table'
import{Person} from '../Person'
import { ChartModule } from 'angular2-chartjs';


@Component({
  selector: 'app-researcher',
  templateUrl: './researcher.component.html',
  styleUrls: ['./researcher.component.css']
})
export class ResearcherComponent implements OnInit {

  constructor(public userService : UserService) { }
  persons :any=[];
  mainResidence :any=[];
  typeLocalitzation = 'pie';
  dataLocalitzation = {

  
    labels: ["Barcelona", "Vic", "Tarragona", "Girona", "Lleida"],
  datasets: [
    {
      label: "Donde viven los pacientes",
      fill:'true',
      backgroundColor: ['#ff0266','#81c784','#29b6f6','#8a3ab9', "#bc2a8d"],
      data:[10,20,30,40, 15]
    }
  ]
};
optionsLocalitzation = {
  legend: {
    display: true
},
  responsive: true,
  maintainAspectRatio: false,
 
}

typeCancerType = 'bar';
dataTypes = {
  labels: ["Barcelona", "Vic", "Tarragona", "Girona", "Lleida"],
  datasets: [
    {
      fill:'true',
      backgroundColor: ['#ff0266','#81c784','#29b6f6','#8a3ab9', '#bc2a8d'],
      data:[10,20,30,40,15]
    }
  ]
  };
  optionsTypes = {
      legend: {
        display: true
    },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          { display: true,
                    gridLines: {
                        display:false
                    }
                }],
        yAxes: [{
            display: true,
            gridLines: {
                display:false
            }   
        }]
  }
  }




  ngOnInit(): void {

    this.getTableData();
  }
  getTableData(){
    this.userService.getTableData().subscribe((res)=>{
      this.persons=res;
      this.getActualResidence(this.persons);
     
    });
  }
  getActualResidence(persons: Array<Person>) {
    for(let p in persons){
      let per:any=p;
      for(var lP in per.livingplaces){
        let livingPlace:any=lP;
        if(livingPlace.isPresent){
          this.mainResidence.add(livingPlace)
        }
      }
    } 
  }

}
