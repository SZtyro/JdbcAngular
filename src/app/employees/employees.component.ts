import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { Employee } from '../class/Entities';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  entities:Employee[];

  
  displayedColumns: string[] = ['id', 'name', 'lastName', 'email','phoneNumber','hireDate','jobId','salary','commisionPCT','managerId','departmentId'];
  

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.httpClientService.getEntities().subscribe(
      response => this.handleSuccessfulResponse(response))
  }

  handleSuccessfulResponse(response) {
    this.entities = response;
    
  }

  test(x){
    console.log(x);
    
  }
}
