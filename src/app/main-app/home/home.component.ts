import { Component, OnInit, ElementRef, Injector, Inject, ViewContainerRef, ViewChild, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../../services/http-client.service';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { GridsterConfig, GridsterItemComponent } from 'angular-gridster2';
import { GmailWidgetComponent } from '../widgets/gmail-widget/gmail-widget.component';
import { GmailService } from 'src/app/services/Gmail/gmail.service';
import { AuthService } from 'angularx-social-login';
import { ChartWidgetComponent } from '../widgets/chart-widget/chart-widget.component';
import { Service } from 'src/app/test.service';
import { GridElemDirective } from '../directives/grid-elem.directive';

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
 

  x: GmailWidgetComponent = new GmailWidgetComponent(this.service, this.authService, new ElementRef(this));
  y: ChartWidgetComponent = new ChartWidgetComponent(this.injector);

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

  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    private service: GmailService,
    private authService: AuthService,
    private injector: Injector,
    
    @Inject(Service) service2, 
    @Inject(ViewContainerRef) viewContainerRef
  ) {
   
    

    service2.setRootViewContainerRef();
    service2.setRootViewContainerRef(viewContainerRef)
    service2.addDynamicComponent()
     this.items = [
      ChartWidgetComponent,GmailWidgetComponent
        

     ];
    // this.items = [
    //   new GmailWidgetComponent(this.service, this.authService, new ElementRef(this)),
    //    new ChartWidgetComponent(this.injector),
    //     new ChartWidgetComponent(this.injector)
        

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
