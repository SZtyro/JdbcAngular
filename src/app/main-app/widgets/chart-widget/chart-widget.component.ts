import { Component, OnInit, ElementRef, Injector, Renderer2, ViewChild, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { HomeWidget } from '../../interfaces/homeWidget';
import { ScriptLoaderService, GoogleChartPackagesHelper } from 'angular-google-charts';
import { HttpClientService } from 'src/app/services/http-client.service';
import { Subject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ChartSettingsModalComponent } from '../../modals/chart-settings-modal/chart-settings-modal.component';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { FakeMissingTranslationHandler } from '@ngx-translate/core';


@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss'],

})
export class ChartWidgetComponent implements OnInit, GridsterItem, HomeWidget {

  @ViewChild('mainScreen', { read: ElementRef, static: false }) elementView: ElementRef;
  @ViewChild('chart', { read: ElementRef, static: false }) chartElem: ElementRef;
  apiLoaded: boolean = false;
  chartWrapper: google.visualization.ChartWrapper;
  chartTable: google.visualization.DataTable;
  chartColumns = [];
  chartColumnsTypes = [];
  chartType = "Bar";
  chartLegendPositions = [
    'bottom',
    'lebeled',
    'left',
    'none',
    'right',
    'top'
  ];
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
  chartLegendPosition = 'right';

  selectedTable;

  rawTableNames = [];
  rawColumns;
  rawColumnTypes;
  rawTable = [];
  rawForeignColumns

  onResize() {

    this.height = this.elementView.nativeElement.offsetHeight - 20;
    this.width = this.elementView.nativeElement.offsetWidth - 20;
    this.drawChart(this.chartElem.nativeElement);
  }


  // dataTypes;
  // tableNames;
  // selectedTable;

  height;
  width;
  type;
  ngOnInit(): void {
    google.charts.load('current', {packages: ['corechart', 'controls']});

    google.charts.setOnLoadCallback(() => {
      this.apiLoaded = true;
      this.drawChart(this.chartElem.nativeElement);
    });
  }

  drawChart(ref) {
    if (this.apiLoaded) {
      this.chartWrapper = new google.visualization.ChartWrapper();
      this.chartTable = new google.visualization.DataTable();

      this.chartColumns.forEach((element, i) => {
        if (this.chartColumnsTypes[i] == "VARCHAR2")
          this.chartTable.addColumn("string", element.toString());
        else if (this.chartColumnsTypes[i] == "NUMBER")
          this.chartTable.addColumn("number", element.toString());
        else if (this.chartColumnsTypes[i] == "DATE")
          this.chartTable.addColumn("date", element.toString());

      });

      this.rawTable.forEach((row, index) => {
        let rowContainer = [];
        this.chartColumns.forEach((column, i) => {
          if (this.chartTable.getColumnType(i) == "date")
            rowContainer.push(new Date(row[column]));
          else
            rowContainer.push(row[column]);
        });
        this.chartTable.addRow(rowContainer);
      });

      var options = {
        width: this.width,
        height: this.height,
        legend: { position: "none" }
      };

      this.chartWrapper.setOptions(options);
      this.chartWrapper.setDataTable(this.chartTable);
      this.chartWrapper.setChartType(this.chartType);

      this.chartWrapper.draw(ref);
    }

  }

  //GRIDSTER
  x: number = 0;
  y: number = 0;
  cols: number = 6;
  rows: number = 4;

  chartTitle = "Chart"


  rawBase: Map<String, Object>[];
  myType = "Bar";
  baseColumnNames = [];
  myColumnNames = new Subject<String[]>();
  tableName;

  colss = [];

  myData = [];

  constructor(private loaderService: ScriptLoaderService,
    public dataBaseService: HttpClientService,
    public dialog: MatDialog
  ) {

  }




  openDialog(): void {
    const dialogRef = this.dialog.open(ChartSettingsModalComponent, {
      //width: '250px',
      data: { father: this }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


}
