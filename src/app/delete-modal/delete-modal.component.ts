import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
   ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  

  ngOnInit() {
  }

  deleteRow(id){
    this.data.service.deleteRow([this.data.tableName,this.data.primaryKeyColumn.toString(),id.toString()]).subscribe(
      data => {  
        console.log("PUT Request is successful ", data);
        this.data.fatherRef.ngOnInit();
        this.closeDialog();
      },

      error => {
        console.log("Error", error);
      }

    );;
    console.log("sasda");
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
