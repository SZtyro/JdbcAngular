import { Component, OnInit, Input, ViewContainerRef, ViewChild, ComponentFactoryResolver, Output, EventEmitter, ComponentRef, Type } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'app-widget-loader',
  templateUrl: './widget-loader.component.html',
  styleUrls: ['./widget-loader.component.css']
})
export class WidgetLoaderComponent implements OnInit {

  @Input()
  type:Type<unknown>;
  
  @Input()
  fields:Array<Map<String,any>>;
 

  
  
  constructor(public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    let childComponent = this.componentFactoryResolver.resolveComponentFactory(this.type);
    
    let ref = this.viewContainerRef.createComponent(childComponent);
    console.log(ref.instance)
    ref.instance["rows"]= 10;
    //console.log(this.childs)

    
  }



}
