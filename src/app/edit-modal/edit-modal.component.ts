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
  //public a:String = 'AC_MGR';
  index;
  
  date = [];
 
  

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    
    this.father = this.data.father;
    this.index = this.data.index;
    this.father.type.forEach((element,ind) => {
      
        if(element == "DATE")
          this.date[ind]= new FormControl(new Date(this.father.newRowContainer[ind].toString()));
    });
    
  }


  saveDate(i,event: MatDatepickerInputEvent<Date>){
    
    event.value.getMonth()
    let x:Number = event.value.getMonth() + 1;
    this.father.newRowContainer[i] = event.value.getFullYear()+"-"+x.toString()+"-"+event.value.getDate();
    
  }

  closeDialog(){
    this.dialogRef.close();
  }
} 
