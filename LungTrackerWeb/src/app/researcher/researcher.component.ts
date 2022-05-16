import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../services/UserService';



@Component({
  selector: 'app-researcher',
  templateUrl: './researcher.component.html',
  styleUrls: ['./researcher.component.css']
})
export class ResearcherComponent implements OnInit {

  constructor(public userService : UserService, private sanitizer: DomSanitizer) { }
  persons :any=[];
  downloadJsonHref;
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

  typeAgeRanges = 'bar';
  dataAgeRanges = {
    labels: ["Menor 18", "18 - 30", "31 - 50","51 - 70", "Mayor de 70"],
    datasets: [
      {
        label: 'Mujeres',
        fill:'true',
        backgroundColor: [' #F47174', '#F47174', '#F47174', '#F47174','#F47174'],
        data:[]
      },
      {
        label: 'Hombres',
        fill:'true',
        backgroundColor: ['#93CAED','#93CAED','#93CAED','#93CAED','#93CAED'],
        data:[]
      }
    ]
  };
  optionsAgeRanges = {
    legend: {
      display: true,
      position: 'top'
    },
    responsive: true,
      title: {
        display: true,
        text: 'Rangos de edad',       
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
                display:true
            },
            ticks : {
              beginAtZero : true,
              userCallback: function(label, index, labels) {
                // when the floored value is the same as the value we have a whole number
                if (Math.floor(label) === label) {
                    return label;
                }
              } 
            },   
        }],
        ticks: {
          precision: 0
        }
  }
  }
  typeMutations = 'pie';
  dataMutations = {
    labels: [],
    datasets: [
      {
        fill:'true',
        backgroundColor: [],
        data:[]
      }
    ]
  };
  optionsMutations = {
    legend: {
      display: true,
      position: 'bottom'
    },
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: true,
    text: 'Mutaciones más comunes',       
  },
}

typeExpositions = 'bar';
dataExpositions = {
  labels: [],
  datasets: [
    {
      label: 'Exposiciones',
      fill:'true',
      backgroundColor: [],
      data:[]
    }
  ]
};
optionsExpositions = {
  legend: {
    display: true,
    position: 'top'
  },
  responsive: true,
    title: {
      display: true,
      text: 'Exposiciones a cancerigenos más comunes',       
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
              display:true
          },
          ticks : {
            beginAtZero : true,
            userCallback: function(label, index, labels) {
              // when the floored value is the same as the value we have a whole number
              if (Math.floor(label) === label) {
                  return label;
              }
            } 
          },
          
             
      }],
      ticks: {
        precision: 0
      }
}
}


  ngOnInit(): void {

    this.getTableData();
    this.getLocalitzationChart();
    this.getAgeRangesData();
    this.getMutationTypes();
    this.getExpositions();
  }

  getMutationTypes(){
    this.userService.getMutationTypes().subscribe((res:any)=>{
      for(let i=0; i<res.length; i++){
        if(res[i]["_id"]["mutation"]==""){
          this.dataMutations.labels.push("NS/NC");
        }else{
          this.dataMutations.labels.push(res[i]["_id"]["mutation"])
        }
        this.dataMutations.datasets[0].data.push(res[i]["Total"])
        this.dataMutations.datasets[0].backgroundColor.push("#"+Math.floor(Math.random()*16777215).toString(16))
      }
      this.showGraphs[2]=true;
    })
  }
  
  getAgeRangesData() {
    this.userService.getAgeRanges().subscribe((res:any)=>{
      for(let range of res){
        if(range["_id"]["grupo"] =="1b"){
          this.dataAgeRanges.datasets[1].data.push(range["Total"])
        }else if(range["_id"]["grupo"] =="1a"){
          this.dataAgeRanges.datasets[0].data.push(range["Total"])
        }else if(range["_id"]["grupo"] =="2a"){
          this.dataAgeRanges.datasets[0].data.push(range["Total"])
        }else if(range["_id"]["grupo"] =="2b"){
          this.dataAgeRanges.datasets[1].data.push(range["Total"])
        }else if(range["_id"]["grupo"] =="3a"){
          this.dataAgeRanges.datasets[0].data.push(range["Total"])
        }else if(range["_id"]["grupo"] =="3b"){
          this.dataAgeRanges.datasets[1].data.push(range["Total"])
        }else if(range["_id"]["grupo"] =="4a"){
          this.dataAgeRanges.datasets[0].data.push(range["Total"])
        }else if(range["_id"]["grupo"] =="4b"){
          this.dataAgeRanges.datasets[1].data.push(range["Total"])
        }else if(range["_id"]["grupo"] =="5a"){
          this.dataAgeRanges.datasets[0].data.push(range["Total"])
        }else if(range["_id"]["grupo"] =="5b"){
          this.dataAgeRanges.datasets[1].data.push(range["Total"])
        }
      }
      this.showGraphs[1]=true;
    })
  }
  getTableData(){
    this.userService.getTableData().subscribe((res)=>{
      this.persons=res;
     
    });
  }

  getExpositions(){
    this.userService.getExpositionsClassified().subscribe((res:any)=>{
      for(let i=0; i<res.length; i++){
        this.dataExpositions.labels.push(res[i]["_id"]["expositions"])
        this.dataExpositions.datasets[0].data.push(res[i]["Total"])
        this.dataExpositions.datasets[0].backgroundColor.push("#a8c7a3")
      }
      this.showGraphs[3]=true;
    });
  }

  getLocalitzationChart(){
    this.userService.getLocalitzation().subscribe((res: any)=>{
      this.treatResponseForChart(res);

    })
  }
  treatResponseForChart(res: any) {
    for(let i=0; i<res.length; i++){
      this.dataLocalitzation.labels.push(res[i]["_id"]["name"])
      this.dataLocalitzation.datasets[0].data.push(res[i]["sum"])
      this.dataLocalitzation.datasets[0].backgroundColor.push("#"+Math.floor(Math.random()*16777215).toString(16))
    }
    this.showGraphs[0]=true;
  }




}
