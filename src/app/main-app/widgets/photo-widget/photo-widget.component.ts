import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { HomeWidget } from '../../interfaces/homeWidget';
import { FileUploader } from 'ng2-file-upload';
import { HttpClientService } from 'src/app/services/http-client.service';


@Component({
  selector: 'app-photo-widget',
  templateUrl: './photo-widget.component.html',
  styleUrls: ['./photo-widget.component.scss']
})
export class PhotoWidgetComponent implements OnInit, GridsterItem, HomeWidget {

  onResize() {

  }

  uploadProgress:number = 0;
  url;
  x: number = 0;
  y: number = 0;
  rows: number = 4;
  cols: number = 6;
  reader: FileReader;

  constructor(private clientService:HttpClientService) {
    this.reader = new FileReader();
    this.clientService.getUploadedFiles().subscribe(files => {this.files = files});
  }

  @ViewChild('fileInput',{static: true}) fileInput: ElementRef;
 
  uploader: FileUploader;
  isDropOver: boolean;
  files;
 
  ngOnInit(): void {
    
    const headers = [{name: 'Accept', value: 'application/json'}];
    this.uploader = new FileUploader({url: 'http://localhost:8080/uploadFiles', autoUpload: true, headers: headers});
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    
      };
    
     this.uploader.onProgressItem = (progress: any) => {
     this.uploadProgress =  progress['progress'];
  };
  
  this.uploader.onCompleteAll = () => this.clientService.getUploadedFiles().subscribe(files => {this.files = files});
  }
 
  fileOverAnother(e: any): void {
    this.isDropOver = e;
  }
 
  fileClicked() {
    this.fileInput.nativeElement.click();
  }


}

