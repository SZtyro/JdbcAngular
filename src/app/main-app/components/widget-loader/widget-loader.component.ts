import { Component, OnInit, Input, ViewContainerRef, ViewChild, ComponentFactoryResolver, Output, EventEmitter, ComponentRef, Type } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { item } from '../home/home.component';
import { SharedService } from 'src/app/services/Shared/shared.service';

@Component({
  selector: 'app-widget-loader',
  templateUrl: './widget-loader.component.html',
  styleUrls: ['./widget-loader.component.scss']
})
export class WidgetLoaderComponent implements OnInit {

  @Input()
  type: item;

  @Input()
  index: number;

  constructor(public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private shared: SharedService
    ) { }

  ngOnInit() {
    if(this.type != null){
      console.log('nastepny komponent bedzie mial nr: ' + this.index)
      let childComponent = this.componentFactoryResolver.resolveComponentFactory(this.shared.homeRef.appWidgets[this.type.typeName]);

      let ref = this.viewContainerRef.createComponent(childComponent);
      
      if (this.type.index == null){
        //this.type.index = this.index;
        //this.shared.homeRef.items[this.index] = this.type;
        ref.instance["widgetNumber"] = this.index;
      }
      else{
        //ref.instance["widgetNumber"] = this.type.index
        ref.instance["widgetNumber"] = this.index
      }
      this.shared.homeRef.items[this.index].index = this.index; 
        
        console.log("//////////////////////////////////////////////////////////////////////////")
        console.log(ref.instance["widgetNumber"])
        //this.shared.homeRef.save();
      
       
      ref.instance["loaderRef"] = this.viewContainerRef;
      //console.log(this.childs)
    }
    


  }



}
