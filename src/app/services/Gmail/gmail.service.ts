import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GmailService {

  constructor(private httpClient:HttpClient) { }

  private core: String = "https://www.googleapis.com/gmail/v1/users/";

  getProfile(userId,authToken){
    return this.httpClient.get(this.core+userId+"/profile?access_token=" + authToken);
    
  }
  
  getMessages(userId,authToken,z){
    return this.httpClient.get(this.core+userId+"/messages"+z+"?access_token=" + authToken);
    
  }

  getMessage(userId,authToken,messageId){
    
    return this.httpClient.get(this.core+userId+"/messages/"+messageId+"?access_token=" + authToken);
    
  }
}
