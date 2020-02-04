import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor( private httpClient:HttpClient ) { }

  loginUser(data){
    return this.httpClient.post('http://localhost:8080/login',data,{responseType: 'text'});
  }

  getTable(tableName){
    return this.httpClient.post<Map<String,Object>[]>('http://localhost:8080/getTable',tableName);
    //return this.httpClient.get<Employee[]>('http://localhost:8080/entities');
  }

  getTableNames(){
    return this.httpClient.get<String>('http://localhost:8080/getTableNames');
    
  }

  getForeignKeyColumns(table){
    
    return this.httpClient.post<String>('http://localhost:8080/getForeignKeyColumns',table);
     
  }

  getIds(table){
    return this.httpClient.post<String>('http://localhost:8080/getIdList',table);
  }

  getType(table){
    return this.httpClient.post<String>('http://localhost:8080/getDataType',table);
  }

  getPrimaryKey(tableName){
    return this.httpClient.post<String>('http://localhost:8080/getPrimaryKey',tableName);
  }
  postRow(elem:String){
    return this.httpClient.post<String>("http://localhost:8080/execute",elem);
  }

  deleteRow(id:String[]){
    return this.httpClient.post("http://localhost:8080/delete",id);
  }
}

