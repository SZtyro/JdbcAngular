import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { Employee } from '../class/Entities';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  tableName = 'EMPLOYEES';
  

  employees: String[];
  keys: string[];
  darkMode: boolean = false;
  

  //Wszystkie klucze w obiekcie
  foreignKeyColumns;
  //Wszystkie mozliwosci klucza
  foreignKeyElems:String[] = [];
  //Typy kolumn
  type;
  //Wartosci nowego obiektu
  newRowContainer: String[] = [];
  //Akumulator usuwania
  deleteAcc:number;
  //Wiadomosc
  messageToUser:String;
  //Flaga alertu
  allertHidden:boolean = true;
  //Kolor allertu
  allertColor;
  //Kolumna z kluczem glownym
  primaryKeyColumn;

  displayedColumns: string[] = []; //= ['No', 'id', 'name', 'lastName', 'email', 'phoneNumber', 'hireDate', 'jobId', 'salary', 'commisionPCT', 'managerId', 'departmentId', 'Action'];
  page = 1;
  pageSize = 10;
  collectionSize;
  lastPage;



  closeResult: string;
  modalOptions: NgbModalOptions;

  constructor(
    private httpClientService: HttpClientService,
    private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  test(x) {
    console.log(x);
  }
  inputToContainer(i, event) {
    this.newRowContainer[i] = "'" + event.target.value + "'";

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
        let failMsg:String[] = [];
        failMsg = this.messageToUser.split("Exception:");
        this.messageToUser =  failMsg[failMsg.length - 1];
        console.log("Error",fail);
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

  closeAllert(){
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
        
        for(let i = 0; i< data.length; i++)
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
