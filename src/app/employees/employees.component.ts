import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { Employee } from '../class/Entities';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  keys;
  darkMode: boolean = false;

  displayedColumns: string[] = ['No', 'id', 'name', 'lastName', 'email', 'phoneNumber', 'hireDate', 'jobId', 'salary', 'commisionPCT', 'managerId', 'departmentId', 'Action'];
  page = 1;
  pageSize = 10;
  collectionSize;
  lastPage;



  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.httpClientService.getEntities().subscribe(
      response => this.handleSuccessfulResponse(response))

  }

  handleSuccessfulResponse(response) {
    this.employees = response;
    this.keys = Object.keys(response[0]);
    this.collectionSize = this.employees.length;
    this.lastPage = Math.ceil(this.collectionSize / this.pageSize);
  }

  actionVisibility(isVisible, row) {
    console.log(row);



  }

  test(index) {
    console.log(index)

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

  changePage(num) {
    if (this.page + num > 0 && this.page + num <= this.lastPage)
      this.page = this.page + num;
  }
}
