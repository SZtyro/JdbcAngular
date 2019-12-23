import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../class/Entities';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor( private httpClient:HttpClient ) { }


  getEntities(){
    return this.httpClient.get<Employee[]>('http://localhost:8080/entities');
  }
}

