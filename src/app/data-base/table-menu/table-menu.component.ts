import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-table-menu',
  templateUrl: './table-menu.component.html',
  styleUrls: ['./table-menu.component.css']
})
export class TableMenuComponent implements OnInit {

  tableNames:String [] = [];

  constructor(private httpClientService: HttpClientService,
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
