import { Component, OnInit, ElementRef, Injector } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { HomeWidget } from '../../interfaces/homeWidget';


@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.css'],
  
})
export class ChartWidgetComponent implements OnInit, GridsterItem, HomeWidget {

  ngOnInit(): void {

  }

  //GRIDSTER
  x: number = 0;
  y: number = 0;
  cols: number = 4;
  rows: number = 4;

  tagName = "app-chart-widget";


  constructor(private injector: Injector) {
    

  }





}
