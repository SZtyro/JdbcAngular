import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/data-base/service/http-client.service';

@Component({
  selector: 'main-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tableNames:String [] = [];
  opened:boolean = true;

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
    this.router.navigate(['/table',name]);
    
  }
}
