import { Directive, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[vsf-Scroller]'
})
export class Scroller {

	@Output() scrolledToBottom:EventEmitter<any>=new EventEmitter<any>();

	constructor(public el:ElementRef) {
		this.element=this.el.nativeElement;
	}

	element:HTMLElement;

	@HostListener('scroll')
	onScroll(){
		if(this.element.scrollHeight==this.element.scrollTop+this.element.clientHeight){
			this.scrolledToBottom.emit();
		}
	}

}
