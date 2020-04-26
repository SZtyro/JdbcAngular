import { Component, OnInit, ElementRef, Injector, Inject, ViewContainerRef, ViewChild, ComponentFactoryResolver, AfterViewInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../../../services/http-client.service';
import { GridsterConfig, GridsterItemComponent, GridsterItemComponentInterface } from 'angular-gridster2';
import { GmailWidgetComponent } from '../../widgets/gmail-widget/gmail-widget.component';
import { ChartWidgetComponent } from '../../widgets/chart-widget/chart-widget.component';
import { ScriptLoaderService } from 'angular-google-charts';
import { HomeWidget } from '../../interfaces/homeWidget';
import { PhotoWidgetComponent } from '../../widgets/photo-widget/photo-widget.component';
import { SharedService } from '../../../services/Shared/shared.service';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { AuthService } from 'src/app/services/Auth/auth.service';

export interface item  {
  typeName: string,
  index?: number
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
  public items:item[] = [];

  resize(x: HomeWidget){
    x.onResize();
  }

  changed(x: HomeWidget) {
    // console.log(itemComponent);
    x.onChange();
  }

  deleteAllWidgets(){
    this.items = [];
    localStorage.removeItem('desktopWidgets');
  }


  appWidgets = {
    'GmailWidgetComponent':GmailWidgetComponent,
    'ChartWidgetComponent':ChartWidgetComponent,
    'PhotoWidgetComponent':PhotoWidgetComponent
  }


  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    private shared: SharedService,
    private auth:AuthService
  ) {
    this.auth.getUserData().subscribe((data)=>{
      console.log(data);
      if(data.imageUrl == null)
        this.auth.signIn();
        console.log("nima");
    })
    shared.homeRef = this;
    //this.items = [GmailWidgetComponent]
    this.items = [];
    this.loadWidgets();
    
    this.shared.getEditGrid().subscribe(isEditing => {
      if(!isEditing)
        this.save();
    })
    

  }
  

  loadWidgets(){
    this.items = [];
    let acc = [];
    this.items = JSON.parse(localStorage.getItem('desktopWidgets'));
    // console.log(acc);
    // if(acc != null)
    // acc.forEach(element => {
      
    //   //this.items.push(GmailWidgetComponent); dziala
    //   this.items.push({
    //     typeName: this.appWidgets[element],
    //     index: 
    //   });
    //   this.num++;
    // });
  }
  save(){
    //let acc = [];
    // this.items.forEach(elem => {
    //   acc.push(elem.type.name)
    //   acc.push(elem.index)
    // })
    localStorage.setItem('desktopWidgets', JSON.stringify(this.items));
    //console.log(JSON.parse(localStorage.getItem('desktopWidgets')))
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
