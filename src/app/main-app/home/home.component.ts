import { Component, OnInit, ElementRef, Injector, Inject, ViewContainerRef, ViewChild, ComponentFactoryResolver, AfterViewInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../../services/http-client.service';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { GridsterConfig, GridsterItemComponent, GridsterItemComponentInterface } from 'angular-gridster2';
import { GmailWidgetComponent } from '../widgets/gmail-widget/gmail-widget.component';
import { GmailService } from 'src/app/services/Gmail/gmail.service';
import { AuthService } from 'angularx-social-login';
import { ChartWidgetComponent } from '../widgets/chart-widget/chart-widget.component';
import { ScriptLoaderService } from 'angular-google-charts';
import { HomeWidget } from '../interfaces/homeWidget';
import { PhotoWidgetComponent } from '../widgets/photo-widget/photo-widget.component';
import { SharedService } from 'src/app/services/Shared/shared.service';

export interface Tile {
  type;


}

@Component({
  selector: 'main-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {


  tableNames: String[] = [];
  opened: boolean = false;

  num:number = 0;
  
  public options: GridsterConfig = {
    pushItems: true,
    displayGrid: 'none',
    minCols: 14,
    maxCols: 14,
    minRows: 7,
    fixedRowHeight: 100,
    fixedColWidth: 100,
    itemResizeCallback: this.resize.bind(this),
    itemChangeCallback: this.changed.bind(this),
    setGridSize: true,
    mobileBreakpoint: 0,
    gridType: 'scrollVertical',
    resizable: {
      enabled: false
    },
    draggable: {
      enabled: false
    }
  }
  public items:Type<HomeWidget>[];
  editGrid: boolean = false;

  resize(x: HomeWidget){
    x.onResize();
  }

  changed(x: HomeWidget) {
    // console.log(itemComponent);
    x.onChange();
  }



  appWidgets = {
    'GmailWidgetComponent':GmailWidgetComponent,
    'ChartWidgetComponent':ChartWidgetComponent,
    'PhotoWidgetComponent':PhotoWidgetComponent
  }


  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    private shared: SharedService

  ) {
    shared.homeRef = this;
    //this.items = [GmailWidgetComponent]
    //this.items = [];
    this.items = [];
    let acc = [];
    
    acc = JSON.parse(localStorage.getItem('desktopWidgets'));
    console.log(acc);
    if(acc != null)
    acc.forEach(element => {
      
      //this.items.push(GmailWidgetComponent); dziala
      this.items.push(this.appWidgets[element]);
      this.num++;
    });

  }


  save(){
    let acc = [];
    this.items.forEach(elem => {
      acc.push(elem.name)
    })
    localStorage.setItem('desktopWidgets', JSON.stringify(acc));
    console.log(JSON.parse(localStorage.getItem('desktopWidgets')))
    console.log("Storage save")
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
