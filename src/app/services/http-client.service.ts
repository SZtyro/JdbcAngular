import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor( private httpClient:HttpClient ) { }

 // url = "http://192.168.1.205:8080";
url = "http://localhost:8080";

  getUploadedFiles(){
    return this.httpClient.get(this.url + "/getFiles")
  }


  loginUser(data){
    return this.httpClient.post(this.url + '/login',data,{responseType: 'text'});
  }

  getTable(tableName){
    return this.httpClient.post<Map<String,Object>[]>(this.url + '/getTable',tableName);
    //return this.httpClient.get<Employee[]>('http://localhost:8080/entities');
  }

  getTableNames(){
    return this.httpClient.get<String[]>(this.url + '/getTableNames');
    
  }

  getForeignKeyColumns(table){
    
    return this.httpClient.post<String>(this.url + '/getForeignKeyColumns',table);
     
  }

  getIds(table){
    return this.httpClient.post<String>(this.url + '/getIdList',table);
  }

  getType(table){
    return this.httpClient.post<String>(this.url + '/getDataType',table);
  }

  getPrimaryKey(tableName){
    return this.httpClient.post<String>(this.url + '/getPrimaryKey',tableName);
  }
  postRow(elem:String){
    return this.httpClient.post<String>(this.url + "/execute",elem);
  }

  deleteRow(id:String[]){
    return this.httpClient.post(this.url + "/delete",id);
  }

  
}

