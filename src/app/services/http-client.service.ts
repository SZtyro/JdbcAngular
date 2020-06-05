import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient: HttpClient,
    
  ) { }

  // url = "http://192.168.1.205:8080";
  url = "http://localhost:8080";

  getUploadedFiles() {
    return this.httpClient.get(this.url + "/getFiles")
  }
  loginUser(data) {
    return this.httpClient.post(this.url + '/databaseLogin', data, { responseType: 'text', headers: {'Access-Control-Allow-Origin': 'http://localhost:4200'} });
  }
  getTable(tableName) {
    return this.httpClient.post<Map<String, Object>[]>(this.url + '/getTable', tableName);
  }
  getTableNames() {
    return this.httpClient.get<String[]>(this.url + '/getTableNames');
  }
  getForeignKeyColumns(table) {
    return this.httpClient.post<String>(this.url + '/getForeignKeyColumns', table);
  }
  getIds(table) {
    return this.httpClient.post<String>(this.url + '/getIdList', table);
  }
  getType(table) {
    return this.httpClient.post<String>(this.url + '/getDataType', table);
  }
  getPrimaryKey(tableName) {
    return this.httpClient.post<String>(this.url + '/getPrimaryKey', tableName);
  }
  postRow(elem: String) {
    return this.httpClient.post<String>(this.url + "/execute", elem);
  }
  deleteRow(id: String[]) {
    return this.httpClient.post(this.url + "/delete", id);
  }

  setDashboard(mail:String, dashboard:String){
    return this.httpClient.post(this.url + "/saveDashboard",[mail,dashboard]);
  }

  getDashboard(mail:String){   
    return this.httpClient.post(this.url + "/loadDashboard",mail,{responseType: 'text'});
  }

  tryLogin(token) {
    return this.httpClient.get(this.url + "/loginUser",
      {
        
        headers:
          { "Authorization": token, 'Access-Control-Allow-Origin': 'http://localhost:4200' }
      });
  }
  checkToken(token) {
    return this.httpClient.get(this.url + "/token", { responseType: "text", headers: { "Authorization": token, 'Access-Control-Allow-Origin': 'http://localhost:4200' } });
  }
  aaa(token) {
    return this.httpClient.get(this.url + "/aaa", { responseType: "text", headers: { "Authorization": token, 'Access-Control-Allow-Origin': 'http://localhost:4200' } });
  }


}

