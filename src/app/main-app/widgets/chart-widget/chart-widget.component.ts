import { Component, OnInit, ElementRef, Injector } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { HomeWidget } from '../../interfaces/homeWidget';
import { ScriptLoaderService, GoogleChartPackagesHelper } from 'angular-google-charts';


@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.css'],
  
})
export class ChartWidgetComponent implements OnInit, GridsterItem, HomeWidget {

  ngOnInit(): void {
    const type = GoogleChartPackagesHelper.getPackageForChartName('BarChart');
    this.loaderService.onReady.subscribe( () => {
      this.loaderService.loadChartPackages([type]).subscribe(() => {
        // Start creating your chart now
        // Example:
        const formatter = new google.visualization.BarFormat();
      });
  
    });

    this.myData = [
      ['London', 8136000],
      ['New York', 8538000],
      ['Paris', 2244000],
      ['Berlin', 3470000],
      ['Kairo', 19500000]
      
    ];
  }

  //GRIDSTER
  x: number = 0;
  y: number = 0;
  cols: number = 4;
  rows: number = 4;

  tagName = "app-chart-widget";

  myType = "PieChart";
  myColumnNames = ['City', 'Inhabitants'];
  
  myData = [[]] ;
  constructor(private loaderService: ScriptLoaderService) {
    

  }





}
