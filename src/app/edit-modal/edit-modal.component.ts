import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeesComponent } from '../employees/employees.component';



@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  father:EmployeesComponent ;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.father = this.data.father;
    this.father.newRowContainer = this.data.details;
    console.log("details: " + this.data.details)
    console.log("istniejacy: " + this.father.newRowContainer);

    console.log("data: " +this.father.newRowContainer[5].split("T")[0])
  }

}
