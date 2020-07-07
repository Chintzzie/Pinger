import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ContentChild, AfterContentInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { VsfTemplateDirective } from '../../util/vsf-template.directive';

@Component({
  selector: 'vsf-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.css'],
   encapsulation:ViewEncapsulation.None
})
export class ButtonGroupComponent implements AfterContentInit {

	@Input() buttons=["btn1,btn2,btn3"];

	@Input() buttonGroupStyle={};

	@Input() states={};

	@Output() clicked:EventEmitter<string>=new EventEmitter<string>();

	@ContentChild(VsfTemplateDirective) customTemplateRef:VsfTemplateDirective;

	constructor() { }

	activeIndex=-1;

	customTemplate:TemplateRef<any>;

	ngAfterContentInit(): void {
		if(!!this.customTemplateRef){
			this.customTemplate=this.customTemplateRef.getTemplate();
		}
	}

	buttonClicked(button,index){
		this.activeIndex=index;
		this.clicked.emit(button);
	}

}
