import { Component, OnInit, ElementRef, Injector, Inject, ViewContainerRef, ViewChild, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../../services/http-client.service';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { GridsterConfig, GridsterItemComponent } from 'angular-gridster2';
import { GmailWidgetComponent } from '../widgets/gmail-widget/gmail-widget.component';
import { GmailService } from 'src/app/services/Gmail/gmail.service';
import { AuthService } from 'angularx-social-login';
import { ChartWidgetComponent } from '../widgets/chart-widget/chart-widget.component';
import { ScriptLoaderService } from 'angular-google-charts';
import { HomeWidget } from '../interfaces/homeWidget';

export interface Tile {
  type;
  
  
}

@Component({
  selector: 'main-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
 

  //x: GmailWidgetComponent = new GmailWidgetComponent(this.service, this.authService, new ElementRef(this));
  
  tableNames: String[] = [];
  opened: boolean = false;
  
  

  public options: GridsterConfig = {
    pushItems: true,
    displayGrid: 'none',
    minCols: 14,
    maxCols: 14,
    minRows: 7,
    fixedRowHeight: 100,
    fixedColWidth: 100,
    itemResizeCallback: this.changed.bind(this),
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
  public items;
  
  changed(x:HomeWidget){
    console.log("zmieniony");
    x.onResize();
  }

  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    private service: GmailService,
    private authService: AuthService,
    private loaderService: ScriptLoaderService,
  
  ) {
   
    this.items=[
      ChartWidgetComponent,GmailWidgetComponent,ChartWidgetComponent
  ]

    
    //  this.items = [
    //   ChartWidgetComponent,GmailWidgetComponent,ChartWidgetComponent
        

    //  ];
     
    // this.items = [
    //   new GmailWidgetComponent(this.service, this.authService, new ElementRef(this)),
    //    new ChartWidgetComponent(this.loaderService),
    //     new ChartWidgetComponent(this.loaderService)
        

    // ];


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
