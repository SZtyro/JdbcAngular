import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor( private httpClient:HttpClient ) { }


  getEntities(){
    return this.httpClient.get<String>('http://localhost:8080/entities');
  }
}

