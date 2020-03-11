import { Component, OnInit, ElementRef, Injector, Renderer2, ViewChild } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { HomeWidget } from '../../interfaces/homeWidget';
import { ScriptLoaderService, GoogleChartPackagesHelper } from 'angular-google-charts';
import { HttpClientService } from 'src/app/services/http-client.service';
import { Subject, Observable } from 'rxjs';


@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss'],

})
export class ChartWidgetComponent implements OnInit, GridsterItem, HomeWidget {

  @ViewChild('mainScreen', {read: ElementRef, static:false}) elementView: ElementRef;
  @ViewChild('chart', {read: ElementRef, static:false}) chartElem: ElementRef;


  onResize() {

    this.height = this.elementView.nativeElement.offsetHeight;
    console.log(this.height);
   // console.log(this.renderer);
    //if(this.renderer != null)
    //this.renderer.setStyle(this.chartElem,"height","10px");
  }

  chartTypes = [
    'AnnotationChart',
    'AreaChart',
    'Bar',
    'BarChart',
    'Calendar',
    'ColumnChart',
    'ComboChart',
    'PieChart',
    'DonutChart',

  ];
  dataTypes;
  tableNames;
  selectedTable;

  height;

  ngOnInit(): void {

    //this.getDataBaseTypes();

    const type = GoogleChartPackagesHelper.getPackageForChartName(this.myType);
    this.loaderService.onReady.subscribe(() => {
      this.loaderService.loadChartPackages([type]).subscribe(() => {
        // Start creating your chart now
        // Example:
        const formatter = new google.visualization.BarFormat();
      });

    });

    // this.dataBaseService.getTable("EMPLOYEES").subscribe(data => {
    //   console.log(data)
    //   this.rawBase = data;
    //   this.fetchColumnNames();



    //   this.myColumnNames.subscribe(columns => {
    //     console.log("subik: ")
    //     console.log(columns);
    //     this.rawBase.forEach((element, index) => {
    //       let rowData = [];
    //       columns.forEach(element => {

    //         rowData.push(data[index]["" + element]);
    //       });
    //       this.myData[index] = rowData;
    //     });
    //     console.log(this.myData);
    //   })



    //   console.log(this.myData);

    // })

  }

  //GRIDSTER
  x: number = 0;
  y: number = 0;
  cols: number = 6;
  rows: number = 4;

  chartTitle = "Chart"


  rawBase: Map<String, Object>[];
  myType = "BarChart";
  baseColumnNames = [];
  myColumnNames = new Subject<String[]>();
  tableName;

  colss = [];

  myData = [];

  constructor(private loaderService: ScriptLoaderService,
    private dataBaseService: HttpClientService,
    private renderer: Renderer2
  ) {
  }


  changeBarType(item) {
    this.myType = item;
  }

  setTableName(newTableName) {
    this.tableName = newTableName;
  }

  fetchColumnNames() {
    this.baseColumnNames = Object.keys(this.rawBase[0]);

  }

  addToColumns(columnName) {
    
    this.colss.push(columnName)
    this.myColumnNames.next(this.colss);
    console.log(this.colss);

  }

  getColumns(): Observable<String[]> {
    return this.myColumnNames.asObservable();
  }

  getTableColumns() {
    this.dataBaseService.getTable(this.selectedTable).subscribe(data => { 
      this.baseColumnNames = Object.keys(data[0]);
      this.rawBase = data;
      this.myColumnNames.subscribe(columns => {
            console.log("subik: ")
            console.log(columns);
            this.rawBase.forEach((element, index) => {
              let rowData = [];
              columns.forEach(element => {
    
                rowData.push(data[index]["" + element]);
              });
              this.myData[index] = rowData;
            });
            console.log(this.myData);
          })
    }, error => {console.log(error)})
  }
  getDataBaseTables(){
    this.colss= [];
    this.rawBase = [];
    this.myData = [];
    this.myType = "";
    this.dataBaseService.getTableNames().subscribe(data=>{ this.tableNames = data}, error => {console.log(error)})
  }
  selectTable(item){
    this.selectedTable = item;
  }
}
