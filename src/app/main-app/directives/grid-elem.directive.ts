import { Directive, ElementRef, OnInit, Renderer2, Input, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { HomeWidget } from '../interfaces/homeWidget';
import { GmailWidgetComponent } from '../widgets/gmail-widget/gmail-widget.component';
import { ChartWidgetComponent } from '../widgets/chart-widget/chart-widget.component';



@Directive({
  selector: '[GridElem]'
})
export class GridElemDirective implements OnInit {

  @Input()
  x;
  selector;

  ngOnInit(): void {
    
    //console.log(this.element.nativeElement);
    console.log(this.x)
    //this.element.nativeElement.innerHTML = 'app-gmail-widget';
     this.selector = this.renderer.createElement('p');
    
     this.renderer.appendChild(this.element.nativeElement,this.selector);
     console.log(this.selector.viewContainerRef)
     this.loadComponent();
    // let div = this.renderer.createElement('div');
    // let p = this.renderer.createElement('p');
    // p.innerHTML = "aaaaa"
    // this.renderer.setStyle(this.selector,"width","100%");
    // this.renderer.setStyle(this.selector,"height","100%");
    // this.renderer.appendChild(div,p );
    // this.renderer.appendChild(div,this.selector );
    // this.renderer.appendChild(this.element.nativeElement,div );
    //this.selector = this.renderer.createElement(this.x.tagName);
    //this.selector.innerHTML = "AAAAAAAAAAAAAAAAA"; 
  }

  constructor(private element:ElementRef,
     private renderer:Renderer2,
     public viewContainerRef: ViewContainerRef,
     private componentFactoryResolver: ComponentFactoryResolver,
     
     ) { 
    //console.log(this.x.tagName)
    //this.selector = this.renderer.createElement(this.x.tagName);
  }

  loadComponent() {
    //console.log(ChartWidgetComponent)
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.x);
    let viewContainerRef = this.viewContainerRef;
    //viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    console.log(componentRef.componentType)
    //(<GmailWidgetComponent>componentRef.instance).data = adItem.data;
    console.log("ref: " + this.viewContainerRef)
  }
}
