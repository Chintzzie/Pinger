import { Component, OnInit, Input, TemplateRef, ContentChild, AfterViewInit, ContentChildren, QueryList, Output, EventEmitter, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { VsfTemplateDirective } from '../util/vsf-template.directive';

@Component({
	selector: 'vsfSelection-list',
	templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectionListComponent implements OnInit,AfterViewInit,OnChanges {

  @Input() items=[];

  @Input() itemStyle:any={};

  @Input() listStyle:any={};

  @Input() customItemTemplate:TemplateRef<any>;

  @Output() itemSelected:EventEmitter<number>=new EventEmitter<number>();

  @Output() itemIncluded:EventEmitter<number>=new EventEmitter<number>();

	@ContentChildren(VsfTemplateDirective) customContentTemplates:QueryList<VsfTemplateDirective>;

  constructor() { }

  itemWidth:string="0px";

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.items){
      this.hoveredIndex=-1;
    }
  }

	ITEM_TEMPLATE_TAG="selectionListItem";

	hoveredIndex:number=-1;

	ngAfterViewInit(): void {
		this.customContentTemplates.forEach((customTemplate)=>{
			if(customTemplate.getName()==this.ITEM_TEMPLATE_TAG){
				this.customItemTemplate=customTemplate.getTemplate();
			}
		});
	}

	ngOnInit(): void {
	}


	handleKeyDownEvent(event:KeyboardEvent){
		let enteredKey=event.key;
		switch(enteredKey){
			case "ArrowUp":
        if (this.hoveredIndex!=-1){
          this.hoveredIndex-=1;
        }
        event.preventDefault();
        break;
      case "ArrowDown":
        if(this.hoveredIndex<this.items.length-1){
          this.hoveredIndex+=1;
        }
        event.preventDefault();
        break;
      case "Enter":
        if(this.hoveredIndex!=-1){
          this.itemClicked();
        }
        break;
      case "ArrowRight":
        if(this.hoveredIndex!=-1){
          this.itemConsidered();
        }
    }


  }

  itemClicked(){
    this.itemSelected.emit(this.hoveredIndex);
  }

  itemConsidered(){
    this.itemIncluded.emit(this.hoveredIndex);
  }


}
