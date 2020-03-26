import { Component, OnInit, Inject, Type } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HomeComponent } from '../home/home.component';
import { SharedService } from 'src/app/services/Shared/shared.service';
import { GmailWidgetComponent } from '../widgets/gmail-widget/gmail-widget.component';
import { ChartWidgetComponent } from '../widgets/chart-widget/chart-widget.component';
import { PhotoWidgetComponent } from '../widgets/photo-widget/photo-widget.component';

interface widgetData {
  class:Type<unknown>;
  icon;
  description: String;
}

@Component({
  selector: 'app-widget-list-modal',
  templateUrl: './widget-list-modal.component.html',
  styleUrls: ['./widget-list-modal.component.scss']
})
export class WidgetListModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WidgetListModalComponent>,
    private shared: SharedService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  widgets: widgetData[] = [
    { class: GmailWidgetComponent, icon: "far fa-envelope", description: "Manage your mailbox." },
    { class: ChartWidgetComponent, icon: "fas fa-chart-line", description: "Visualise data from connected databse." },
    { class: PhotoWidgetComponent, icon: "fas fa-folder", description: "Container for your data." }
  ];


  ngOnInit() { 

  }


  addWidget(widgetName:Type<unknown>) {
    
    this.shared.homeRef.items.push(widgetName);
    //this.shared.homeRef.items.push(GmailWidgetComponent);
    this.shared.homeRef.save();
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
