import { Component, OnInit } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { GmailService } from 'src/app/services/Gmail/gmail.service';

@Component({
  selector: 'app-gmail-widget',
  templateUrl: './gmail-widget.component.html',
  styleUrls: ['./gmail-widget.component.css']
})
export class GmailWidgetComponent implements OnInit,GridsterItem {

 
  x: number = 1;
  y: number = 1;
  cols: number = 8;
  rows: number = 3;
  

 
  constructor(private service:GmailService) { }

  ngOnInit() {
  }

  fetchMails(){
    
  }

}
