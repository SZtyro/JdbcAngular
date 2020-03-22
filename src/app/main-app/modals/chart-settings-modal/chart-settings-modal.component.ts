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
    moveItemInArray(this.father.chartColumns, event.previousIndex, event.currentIndex);
    //this.father.myColumnNames.next(this.father.colss);
    moveItemInArray(this.father.chartColumnsTypes,event.previousIndex, event.currentIndex)
    console.log(this.father.chartColumns);
    console.log(this.father.chartColumnsTypes);
    this.father.drawChart(this.father.chartElem.nativeElement);
    this.father.drawChart(this.chartElem.nativeElement);
  }

  // getTypeOfColumn(columnName){
  //   this.getColumnTypes();
  //   this.fetchColumnNames();
  //   console.log(this.father.dataTypes[this.father.baseColumnNames.indexOf(columnName)])
  //   return this.father.dataTypes[this.father.baseColumnNames.indexOf(columnName)];
  // }

  // changeBarType(item) {
  //   this.father.myType = item;
  // }

  // setTableName(newTableName) {
  //   this.father.tableName = newTableName;
  // }

  // fetchColumnNames() {
  //   this.father.baseColumnNames = Object.keys(this.father.rawBase[0]);

  // }

  // addToColumns(columnName) {
    
  //   this.father.colss.push(columnName)
  //   this.father.myColumnNames.next(this.father.colss);
  //   console.log(this.father.colss);

  // }

  // getColumns(): Observable<String[]> {
  //   return this.father.myColumnNames.asObservable();
  // }

  // getTableColumns() {
  //   this.father.dataBaseService.getTable(this.father.selectedTable).subscribe(data => { 
  //     this.father.baseColumnNames = Object.keys(data[0]);
  //     this.father.rawBase = data;
  //     this.father.myColumnNames.subscribe(columns => {
  //           // console.log("subik: ")
  //           // console.log(columns);
  //           this.father.rawBase.forEach((element, index) => {
              
  //             let rowData = [];
  //             columns.forEach(element => {
                
  //               rowData.push(data[index]["" + element]);
  //             });
  //             //this.father.myData[index] = rowData;
  //             //this.father.table.addColumn()
  //           });
  //           this.father.ngOnInit();
  //           console.log(this.father.myData);
  //         })
  //   }, error => {console.log(error)})

    
  // }
  // getDataBaseTables(){
  //   this.father.colss= [];
  //   this.father.rawBase = [];
  //   this.father.myData = [];
  //   this.father.myType = "";
  //   this.father.dataBaseService.getTableNames().subscribe(data=>{ this.father.tableNames = data}, error => {console.log(error)})
  // }
  // selectTable(item){
  //   this.father.selectedTable = item;
  // }

  // getColumnTypes(){
  //   this.father.dataBaseService.getType(this.father.selectedTable).subscribe(data => {this.father.dataTypes = data})
  // }

  reset(){
    this.father.chartColumns = [];
    //this.father.chartTable.removeColumns.;

  }

  getForeignColumns(){
    this.father.dataBaseService.getForeignKeyColumns("'"+this.father.selectedTable+"'").subscribe(foreignColumns => {this.father.rawForeignColumns = foreignColumns})
    this.father.rawForeignColumns.forEach(element => {
      this.father.dataBaseService.getIds([this.father.selectedTable,element]).subscribe(id => {console.log(id)})
    });
  }

  selectLegendPosition(legendPosition){
    this.father.chartLegendPosition = legendPosition;
  }

  setChartType(chartType){
    this.father.chartType = chartType;
    this.father.drawChart(this.father.chartElem.nativeElement);
    this.father.drawChart(this.chartElem.nativeElement);
  }

  getTables(){
    this.father.dataBaseService.getTableNames().subscribe(tableNames => {this.father.rawTableNames = tableNames});
  }

  getRawTable(){
    this.father.dataBaseService.getTable(this.father.selectedTable).subscribe(rawTable => {this.father.rawTable = rawTable})
  }

  getColumns(){
    this.father.rawColumns = Object.keys(this.father.rawTable[0])
  }

  getColumnTypes(){
    this.father.dataBaseService.getType(this.father.selectedTable).subscribe(columnTypes => {this.father.rawColumnTypes = columnTypes})
  }

  selectTable(selectedTableName){
    this.father.selectedTable = selectedTableName;
    this.getRawTable();
    this.getColumnTypes();
  }

  addChartColumn(columnName,i){
    this.father.chartColumns.push(columnName);
    this.father.chartColumnsTypes.push(this.father.rawColumnTypes[i]);
    console.log(this.father.chartColumnsTypes);
    this.father.drawChart(this.father.chartElem.nativeElement);
    this.father.drawChart(this.chartElem.nativeElement);
  }

}
