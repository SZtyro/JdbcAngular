import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { Employee } from '../class/Entities';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees:Employee[];
  keys;
  theme:String = "table-light";
  class = "table table-striped table-hover " + this.theme;
  
  displayedColumns: string[] = ['No','id', 'name', 'lastName', 'email','phoneNumber','hireDate','jobId','salary','commisionPCT','managerId','departmentId','Action'];
  hiddenActions = false;
  private isButtonVisible = true;
  liczba;

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.httpClientService.getEntities().subscribe(
      response => this.handleSuccessfulResponse(response))
      
  }

  handleSuccessfulResponse(response) {
    this.employees = response;
    this.keys = Object.keys(response[0]);

    
  }

  actionVisibility(isVisible, row){
    console.log(row);

    
    
  }

  test(index){
    console.log(index)
    
  }

  changeTheme(theme:String){
    this.theme = theme;
    
  }
}
