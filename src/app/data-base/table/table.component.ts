import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TableComponent implements OnInit {


  


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  //Dane w formie 2-wymiarowej tabeli
  entity: String[][];
  //Dane
  dataSource;
  //Nazwa tabeli
  tableName = '';
  //Wszystkie kolumny
  keys: string[];
  //Rozszerzalna linia tabeli
  expandedElement: String | null;
  //Wszystkie klucze w obiekcie
  foreignKeyColumns;
  //Wszystkie mozliwosci klucza
  public foreignKeyElems: String[] = [];
  //Typy kolumn
  type: String[] = [];
  //Wartosci nowego obiektu
  public newRowContainer: String[] = [];
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

  closeResult: string;
  modalOptions: NgbModalOptions;

  constructor(
    private route: ActivatedRoute,
    public httpClientService: HttpClientService,
    private modalService: NgbModal,
    public dialog: MatDialog) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  ngOnInit() {
    //Pobieranie wartosci z linku
    //Fetching route parameter
    this.tableName = this.route.snapshot.paramMap.get('tableName');

    //Pobieranie danych
    //Fetching data
    this.httpClientService.getTable(this.tableName).subscribe(
      response => this.handleSuccessfulResponse(response))
  }

  openDeleteDialog(id): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      //width: '250px'
      data: {
        id: id,
        service: this.httpClientService,
        tableName: this.tableName,
        primaryKeyColumn: this.primaryKeyColumn,
        fatherRef: this
      },

    });

  }

  openAddDialog(): void {
    this.prepareNewContainer();
    const dialogRef = this.dialog.open(AddModalComponent, {
      //width: '250px'
      data: {

        father: this
      },

    });

  }

  openEditDialog(element, ind) {

    this.keys.forEach((key,index) => {
      this.newRowContainer[index] = element[key];
    });
    
    const dialogRef = this.dialog.open(EditModalComponent, {
      //width: '450px',
      data: {
        details: this.newRowContainer,
        father: this,
        index: ind,
        element: element
      },

    });
  }

  inputToContainer(i, event) {
    this.newRowContainer[i] = event.target.value;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  saveToContainer(index, elem) {
    if (this.type[index] == "NUMBER")
      this.newRowContainer[index] = elem;
    else if (this.type[index] == "VARCHAR2")
      this.newRowContainer[index] = "'" + elem + "'";
    else if (this.type[index] == "DATE")
      this.newRowContainer[index] = "'" + elem.split("T")[0] + "'";

  }

  prepareNewContainer() {
    this.newRowContainer = [];
    this.keys.forEach(element => {
      this.newRowContainer.push("");
    });
  }

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // closeAllert() {
  //   this.allertHidden = true;
  // }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  saveDataToType(data) {
    this.type = data;
    this.type.forEach((element, index) => {
      if (element == "DATE") {
        this.entity.forEach(el => {
          let dateToEdit = new Date(el[this.keys[index]]);

          let x: Number = dateToEdit.getMonth() + 1;
          el[this.keys[index]] = dateToEdit.getFullYear() + "-" + x.toString() + "-" + dateToEdit.getDate();
        });
      }
    });
  }


  handleSuccessfulResponse(response) {
    console.log("Data fetched!: ");
    console.log(response);
    this.entity = response;
    this.keys = Object.keys(response[0]);

    this.httpClientService.getType(this.tableName).subscribe(

      data => {
        this.saveDataToType(data);
        console.log("Column types fetched! ", this.type);
      },

      error => {
        console.log("Error during fetching types!: ", error);
      }

    );

    this.dataSource = new MatTableDataSource(response);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.httpClientService.getForeignKeyColumns("'" + this.tableName + "'").subscribe(

      data => {
        this.foreignKeyColumns = data;
        console.log("Foreign key columns fetched!: ", data);
      },

      error => {
        console.log("Error while fetching key columns!: ", error);
      }

    );

    this.httpClientService.getPrimaryKey(this.tableName).subscribe(

      data => {
        this.primaryKeyColumn = data;
        console.log("Primary key: ", data);
      },

      error => {
        console.log("Error while fwtching primary key!: ", error);
      }

    );
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
        console.log("Avaiable rows: ", data);
      },

      error => {
        console.log("Error while fetching foreign key elems!: ", error);
      }

    );
  }


}
