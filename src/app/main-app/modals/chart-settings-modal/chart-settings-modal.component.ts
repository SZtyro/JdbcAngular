import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChartWidgetComponent } from '../../widgets/chart-widget/chart-widget.component';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-chart-settings-modal',
  templateUrl: './chart-settings-modal.component.html',
  styleUrls: ['./chart-settings-modal.component.scss']
})
export class ChartSettingsModalComponent implements OnInit {

  @ViewChild('chart', { read: ElementRef, static: false }) chartElem: ElementRef;

  father:ChartWidgetComponent;

  constructor(
    public dialogRef: MatDialogRef<ChartSettingsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
    ) {
      this.father = data.father;
      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.father.chartData.chartColumns, event.previousIndex, event.currentIndex);
    //this.father.myColumnNames.next(this.father.colss);
    moveItemInArray(this.father.chartData.chartColumnsTypes,event.previousIndex, event.currentIndex)
    console.log(this.father.chartData.chartColumns);
    console.log(this.father.chartData.chartColumnsTypes);
    this.father.drawChart(this.father.chartElem.nativeElement);
    this.father.drawChart(this.chartElem.nativeElement);
  }


  reset(){
    this.father.chartData = {
      chartWrapper: null,
      chartTable: null,
      chartColumns: [],
      chartColumnsTypes: [],
      chartType: "Bar",
      chartLegendPosition: "none",
      selectedTable: null,
    }
    this.father.rawTable = [];
    this.father.toSave();
    

  }

  getForeignColumns(){
    this.father.dataBaseService.getForeignKeyColumns("'"+this.father.chartData.selectedTable+"'").subscribe(foreignColumns => {this.father.rawForeignColumns = foreignColumns})
    this.father.rawForeignColumns.forEach(element => {
      this.father.dataBaseService.getIds([this.father.chartData.selectedTable,element]).subscribe(id => {console.log(id)})
    });
  }

  selectLegendPosition(legendPosition){
    this.father.chartData.chartLegendPosition = legendPosition;
  }

  setChartType(chartType){
    this.father.chartData.chartType = chartType;
    this.father.drawChart(this.father.chartElem.nativeElement);
    this.father.drawChart(this.chartElem.nativeElement);
  }

  getTables(){
    this.father.dataBaseService.getTableNames().subscribe(tableNames => {this.father.rawTableNames = tableNames});
  }

  getRawTable(){
    this.father.dataBaseService.getTable(this.father.chartData.selectedTable).subscribe(rawTable => {this.father.rawTable = rawTable})
  }

  getColumns(){
    this.father.rawColumns = Object.keys(this.father.rawTable[0])
  }

  getColumnTypes(){
    this.father.dataBaseService.getType(this.father.chartData.selectedTable).subscribe(columnTypes => {this.father.rawColumnTypes = columnTypes})
  }

  selectTable(selectedTableName){
    this.father.chartData.selectedTable = selectedTableName;
    this.getRawTable();
    this.getColumnTypes();
  }

  addChartColumn(columnName,i){
    this.father.chartData.chartColumns.push(columnName);
    this.father.chartData.chartColumnsTypes.push(this.father.rawColumnTypes[i]);
    //console.log(this.father.data.chartColumnsTypes);
    this.father.drawChart(this.father.chartElem.nativeElement);
    this.father.drawChart(this.chartElem.nativeElement);
  }

}
