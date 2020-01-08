import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../class/Entities';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor( private httpClient:HttpClient ) { }


  getEntities(){
    return this.httpClient.get<Map<String,Object>[]>('http://localhost:8080/entities');
    //return this.httpClient.get<Employee[]>('http://localhost:8080/entities');
  }

  getForeignKeyColumns(table){
    
    return this.httpClient.post<String>('http://localhost:8080/fkc',table);
     
  }

  getIds(table,column){
    return this.httpClient.post<String>('http://localhost:8080/idList',table,column);
  }

  gt(){
    return this.httpClient.get<String[]>('http://localhost:8080/fkc');
  }

  postRow(elem:String){
    return this.httpClient.post<String>("http://localhost:8080/a",elem)
  }
}

