import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeesComponent } from '../employees/employees.component';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  father:EmployeesComponent ;
  public a:String = 'AC_MGR';
  index;
  
 
  

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    
    this.father = this.data.father;
    this.index = this.data.index;
    console.log("index: " + this.index)
  }

  closeDialog(){
    this.dialogRef.close();
  }
} 
