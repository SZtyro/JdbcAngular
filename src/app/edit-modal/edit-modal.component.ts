import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeesComponent } from '../employees/employees.component';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';


@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  father:EmployeesComponent ;
  public a:String = 'AC_MGR';
  index;
  
  date;
 
  

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    
    this.father = this.data.father;
    this.index = this.data.index;
    console.log("index: " + this.index)
    this.date = new FormControl(new Date());
  }


  saveDate(i,event: MatDatepickerInputEvent<Date>){
    
    console.log(i);
    event.value.getMonth()
    let x:Number = event.value.getMonth() + 1;
    console.log(event.value.getFullYear()+"-"+x.toString()+"-"+event.value.getDate());
    this.father.newRowContainer[i] = event.value.getFullYear()+"-"+x.toString()+"-"+event.value.getDate();
    console.log(this.father.newRowContainer);
    
  }

  closeDialog(){
    this.dialogRef.close();
  }
} 
