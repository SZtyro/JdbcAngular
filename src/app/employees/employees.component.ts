import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  entities:string[];
 

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.httpClientService.getEntities().subscribe(
      response => this.handleSuccessfulResponse(response))
  }

  handleSuccessfulResponse(response) {
    this.entities = response;
    
  }
}
