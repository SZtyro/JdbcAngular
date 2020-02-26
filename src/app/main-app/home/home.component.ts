import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../../services/http-client.service';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { GmailWidgetComponent } from '../widgets/gmail-widget/gmail-widget.component';
import { GmailService } from 'src/app/services/Gmail/gmail.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'main-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  x: GmailWidgetComponent = new GmailWidgetComponent(this.service);

  tableNames: String[] = [];
  opened: boolean = true;

  public options: GridsterConfig = {
    pushItems: true,
    displayGrid: 'none',
    minCols: 14,
    maxCols: 14,
    minRows: 7,
    fixedRowHeight: 100,
    fixedColWidth: 100,

    setGridSize: true,
    mobileBreakpoint: 0,
    gridType: 'scrollVertical',
    resizable: {
      enabled: true
    },
    draggable: {
      enabled: true
    }
  }
  public items: GridsterItem[];

  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    private service:GmailService) {

    this.items = [
      this.x
    ];


  }




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

  setTableNames(data) {
    this.tableNames = data;

  }

  openTable(name) {
    this.router.navigate(['/home']);
    //this.router.navigate(['/table',name]);

  }
}
