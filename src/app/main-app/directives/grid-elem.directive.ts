import { Directive, ElementRef, OnInit, Renderer2, Input, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ViewChild } from '@angular/core';
import { HomeWidget } from '../interfaces/homeWidget';
import { GmailWidgetComponent } from '../widgets/gmail-widget/gmail-widget.component';
import { ChartWidgetComponent } from '../widgets/chart-widget/chart-widget.component';



@Directive({
  selector: '[GridElem]'
})
export class GridElemDirective implements OnInit {

  ngOnInit(): void {

    
    
    this.renderer.setStyle(this.element.nativeElement,"border-radius","15px")
    this.renderer.setStyle(this.element.nativeElement,"padding","10px")
  }

  constructor(private element: ElementRef,
    private renderer: Renderer2,
  ) {

  }


}
