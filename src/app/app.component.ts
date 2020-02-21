import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from './data-base/service/http-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularJDBC';
  tableNames:String [] = [];
  opened:boolean = true;

  constructor(
    private httpClientService: HttpClientService,
    private router: Router
  ) { }

  ngOnInit() {
    this.httpClientService.getTableNames().subscribe(
      data => {

        this.setTableNames(data);
        console.log("Table names fetched! ", data);


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
