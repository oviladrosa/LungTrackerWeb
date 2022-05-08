import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserService';
import {MatTableModule} from '@angular/material/table'
import{Person} from '../Person'
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-researcher',
  templateUrl: './researcher.component.html',
  styleUrls: ['./researcher.component.css']
})
export class ResearcherComponent implements OnInit {

  constructor(public userService : UserService) { }
  persons :any=[];
  mainResidence :any=[];
  showGraphs = [false,false,false,false];
  typeLocalitzation = 'pie';
  dataLocalitzation = {
    labels: [],
    datasets: [
      {
        fill:'true',
        backgroundColor: [],
        data:[]
      }
    ]
  };
  optionsLocalitzation = {
    legend: {
      display: true,
      position: 'bottom'
    },
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: true,
    text: 'Localización de los pacientes',       
  },
}

  typeCancerType = 'bar';
  dataTypes = {
 
  labels: ["Tipo1", "Tipo2", "Tipo3", "Tipo4", "Tipo5"],
  datasets: [
      {
  
        fill:'true',
        backgroundColor: ['#ff0266','#81c784','#29b6f6','#8a3ab9', '#bc2a8d'],
        data:[10,20,30,40,15]
      }
    ]
  };
  optionsTypes = {
      responsive: true,
      legend: {
        display: false,
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Tipos de tumor',       
      },
      scales: {
        xAxes: [
          { 
            display: true,
            gridLines: {
                display:false
            }
                }],
        yAxes: [{
            display: true,
            gridLines: {
                display:false
            },
            ticks : {
              beginAtZero : true
            }      
        }]
  }
  }

  ngOnInit(): void {

    this.getTableData();
    this.getLocalitzationChart();
  }
  getTableData(){
    this.userService.getTableData().subscribe((res)=>{
      this.persons=res;
     
    });
  }

  getLocalitzationChart(){
    this.userService.getLocalitzation().subscribe((res: any)=>{
      this.treatResponseForChart(res);

    })
  }
  treatResponseForChart(res: any) {
    for(let i=0; i<res.length; i++){
      this.dataLocalitzation.labels.push(res[i]["_id"])
      this.dataLocalitzation.datasets[0].data.push(res[i]["sum"])
      this.dataLocalitzation.datasets[0].backgroundColor.push("#"+Math.floor(Math.random()*16777215).toString(16))
    }
    this.showGraphs[0]=true;
  }


}
