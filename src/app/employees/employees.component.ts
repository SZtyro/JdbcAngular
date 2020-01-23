import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MatSort } from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EmployeesComponent implements OnInit {

  tableName = 'EMPLOYEES';

  

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  employees: String[];
  keys: string[];
  darkMode: boolean = false;

  expandedElement: String | null;
  

  //Wszystkie klucze w obiekcie
  foreignKeyColumns;
  //Wszystkie mozliwosci klucza
  foreignKeyElems: String[] = [];
  //Typy kolumn
  type;
  //Wartosci nowego obiektu
  newRowContainer: String[] = [];
  //Akumulator usuwania
  deleteAcc: number;
  //Wiadomosc
  messageToUser: String;
  //Flaga alertu
  allertHidden: boolean = true;
  //Kolor allertu
  allertColor;
  //Kolumna z kluczem glownym
  primaryKeyColumn;

  displayedColumns: string[] = []; //= ['No', 'id', 'name', 'lastName', 'email', 'phoneNumber', 'hireDate', 'jobId', 'salary', 'commisionPCT', 'managerId', 'departmentId', 'Action'];
  page = 1;
  pageSize = 10;
  collectionSize;
  lastPage;

  dataSource;

  closeResult: string;
  modalOptions: NgbModalOptions;

  constructor(
    private httpClientService: HttpClientService,
    private modalService: NgbModal,
    public dialog: MatDialog) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  test(x) {
    console.log(x);
  }


  openDeleteDialog(id): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      //width: '250px'
      data: { id: id , 
              service: this.httpClientService, 
              tableName: this.tableName,
              primaryKeyColumn: this.primaryKeyColumn,
              fatherRef: this},
      
    });
    
  }

  openEditDialog(element){
    const dialogRef = this.dialog.open(EditModalComponent, {
      //width: '250px'
      data: { details: element,
              keys: this.keys },
      
    });

    console.log(element)
  }


  inputToContainer(i, event) {
    this.newRowContainer[i] = "'" + event.target.value + "'";

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }






  sendNewElem() {



    let querry: String = "Insert into " + this.tableName + " values(" + this.newRowContainer + ")";
    console.log(querry);
    this.httpClientService.postRow(querry).subscribe(

      data => {
        this.messageToUser = "New row successfully inserted!";
        console.log("PUT Request is successful ", data);
        this.allertColor = 'success';
      },

      fail => {

        this.messageToUser = fail.error.message;
        let failMsg: String[] = [];
        failMsg = this.messageToUser.split("Exception:");
        this.messageToUser = failMsg[failMsg.length - 1];
        console.log("Error", fail);
        this.allertColor = 'danger';

      }


    );
    this.allertHidden = false;
  }

  saveToContainer(index, elem) {

    //let type: String = "VARCHAR2";



    console.log(this.type[index]);

    if (this.type[index] == "NUMBER")
      this.newRowContainer[index] = elem;
    else if (this.type[index] == "VARCHAR2" || this.type[index] == "DATE")
      this.newRowContainer[index] = "'" + elem + "'";



    //this.newRowContainer[index] = elem;

    console.log(this.newRowContainer);
  }

  prepareNewContainer() {
    this.keys.forEach(element => {
      this.newRowContainer.push("null");
    });

    console.log(this.newRowContainer);
  }

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  closeAllert() {
    this.allertHidden = true;
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    

    this.httpClientService.getTable(this.tableName).subscribe(
      response => this.handleSuccessfulResponse(response))


  }

  handleSuccessfulResponse(response) {
    console.log(response);
    this.employees = response;
    this.keys = Object.keys(response[0]);
    this.collectionSize = this.employees.length;
    this.lastPage = Math.ceil(this.collectionSize / this.pageSize);

    this.dataSource = new MatTableDataSource(this.employees);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.httpClientService.getType(this.tableName).subscribe(

      data => {

        this.type = data;
        console.log("PUT Request is successful ", data);


      },

      error => {

        console.log("Error", error);

      }

    );

    this.httpClientService.getForeignKeyColumns("'" + this.tableName + "'").subscribe(

      data => {

        this.foreignKeyColumns = data;
        console.log("PUT Request is successful ", data);

      },

      error => {

        console.log("Error", error);

      }

    );

    this.httpClientService.getPrimaryKey(this.tableName).subscribe(

      data => {

        this.primaryKeyColumn = data;
        console.log("Primary key: ", data);

      },

      error => {

        console.log("Error", error);

      }

    );
    //Pobieranie kolumn zawierajacych klucze obce
    //Fetching columns containing foreign keys

    // this.httpClientService.gt().subscribe(
    //   response => this.foreignKeyColumns)

    //   console.log(this.foreignKeyColumns);

    this.displayedColumns = this.displayedColumns.concat(this.keys);
  }

  //Pobieranie istniejacych kluczy 
  //Fetching already exhisting keys
  getAvaiableRows(table) {
    this.foreignKeyElems = [];
    //Wyswietl ladowanie przed przyjeciem danych
    //Show loading befor fetching data
    this.foreignKeyElems[0] = "Loading";
    this.httpClientService.getIds(table).subscribe(


      data => {

        for (let i = 0; i < data.length; i++)
          this.foreignKeyElems[i] = data[i];
        console.log("PUT Request is successful ", data);

      },

      error => {

        console.log("Error", error);

      }

    );
  }

  changeTheme() {

    let table = document.getElementById("table");

    if (table.classList.contains("table-light")) {
      table.classList.add("table-dark");
      table.classList.remove("table-light");
    } else if (table.classList.contains("table-dark")) {
      table.classList.add("table-light");
      table.classList.remove("table-dark");

    }

    this.darkMode = !this.darkMode;

  }


}
