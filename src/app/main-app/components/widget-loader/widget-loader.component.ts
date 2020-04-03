import { Component, OnInit, Input, ViewContainerRef, ViewChild, ComponentFactoryResolver, Output, EventEmitter, ComponentRef, Type } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'app-widget-loader',
  templateUrl: './widget-loader.component.html',
  styleUrls: ['./widget-loader.component.scss']
})
export class WidgetLoaderComponent implements OnInit {

  @Input()
  type:Type<unknown>;
  
  @Input()
  index:number;

  constructor(public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    let childComponent = this.componentFactoryResolver.resolveComponentFactory(this.type);
    
    let ref = this.viewContainerRef.createComponent(childComponent);
    
    ref.instance["widgetNumber"]= this.index;
    //console.log(this.childs)

    
  }



}
