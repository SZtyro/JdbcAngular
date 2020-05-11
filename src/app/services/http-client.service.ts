import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './Auth/auth.service';



@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient: HttpClient,
    //private auth: AuthService
  ) { }

  // url = "http://192.168.1.205:8080";
  url = "http://localhost:8080";

  getUploadedFiles() {
    return this.httpClient.get(this.url + "/getFiles")
  }
  loginUser(data) {
    return this.httpClient.post(this.url + '/login', data, { responseType: 'text' });
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

  tryLogin(token) {
    return this.httpClient.get(this.url + "/loginUser",
      {
        responseType: "text",
        headers:
          { "Authorization": token, 'Access-Control-Allow-Origin': 'http://localhost:4200' }
      });
  }

  aaa(token) {
    return this.httpClient.get(this.url + "/aaa", { responseType: "text", headers: { "Authorization": token, 'Access-Control-Allow-Origin': 'http://localhost:4200' } });
  }
  ttt() {
    // if (this.auth.expireTime > Date.now()) {
    //   //console.log("token wazny do: " + new Date(this.auth.expireTime));
    //   //console.log("wazny jeszcze przez: " + new Date(this.auth.expireTime - Date.now()).toUTCString())

    // }
    // else{
    //   console.log("token wygasl. zaloguj sie ponownie");
    // }
    return this.httpClient.get(this.url + "/ttt", { responseType: "text" });
    //return this.httpClient.get(this.url + "/ttt", { responseType: "text", headers: { 'sec-fetch-site': 'cross-site' } });
  }

  tttt() {
    return this.httpClient.jsonp(this.url + "/ttt", 'callback');
  }

  callback = function (responseJson) {
    console.log(responseJson); // output: {"id":100}
  }
}

