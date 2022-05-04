import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserService';
import {MatTableModule} from '@angular/material/table'

@Component({
  selector: 'app-researcher',
  templateUrl: './researcher.component.html',
  styleUrls: ['./researcher.component.css']
})
export class ResearcherComponent implements OnInit {

  constructor(public userService : UserService) { }
  persons :any=[];
  ngOnInit(): void {

    this.getTableData();
  }
  getTableData(){
    this.userService.getTableData().subscribe(res=>{
      this.persons=res;
    });
  }

}
