import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/data-base/service/http-client.service';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'main-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tableNames:String [] = [];
  opened:boolean = true;


  test = [
    1,
    2,
    3,
    4,
    5
  ]

  drop(event) {
    console.log(event);
    moveItemInArray(this.test, event.previousIndex, event.currentIndex);
  }

  constructor(
    private httpClientService: HttpClientService,
    private router: Router) { }

  ngOnInit() {
    this.httpClientService.getTableNames().subscribe(
      data => {

        this.setTableNames(data);
        console.log("Table names fetched! ",data);


      },

      error => {

        console.log("Error", error);

      }
      )
  }

  setTableNames(data){
    this.tableNames = data;

  }

  openTable(name){
    this.router.navigate(['/home']);
    //this.router.navigate(['/table',name]);
    
  }
}
