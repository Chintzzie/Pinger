import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, TemplateRef, ContentChild, ElementRef, AfterContentInit, AfterViewChecked, DoCheck, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import { SelectionListComponent } from '../../atoms/selection-list/selection-list.component';
import { VsfTemplateDirective } from '../../util/vsf-template.directive';
import { Inputbox } from '../../atoms/inputbox/inputbox';

@Component({
  selector: 'vsf-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
})
export class AutoCompleteComponent implements OnChanges {

  @Input() suggestionsList=[];

  @Input() autoCompleteStyle={};

  @Input() promptLabel:string="Enter some input";

  @Output() completed:EventEmitter<string>=new EventEmitter<string>();

  @ContentChild(VsfTemplateDirective) suggestionTemplateDirective:VsfTemplateDirective;

  @ViewChild(Inputbox) Inputbox:Inputbox;

  @ViewChild(SelectionListComponent) selectionList:SelectionListComponent;

  constructor() { }


  suggestions:string[]=[];

  SUGGESTION_TEMPLATE_TAG="autoCompleteItem";

  suggestionTemplate:TemplateRef<any>;

  inputbox:HTMLDivElement;

  showSuggestions:boolean=false;

  value:string;

  mousein=false;

  focusin=false;

  ngDoCheck(): void {
    if(!!this.inputbox){
      this.selectionList.itemWidth=this.inputbox.offsetWidth+"px";
	}


  }

  ngOnChanges(changes: SimpleChanges): void {
	  if(changes.suggestionsList){

		this.updateSuggestions();
	  }
}

  ngAfterContentInit(): void {
    if(!!this.suggestionTemplateDirective && this.suggestionTemplateDirective.getName()==this.SUGGESTION_TEMPLATE_TAG){
      this.suggestionTemplate=this.suggestionTemplateDirective.getTemplate();
    }
  }

  ngAfterViewInit(): void {
    this.inputbox=this.Inputbox.inputbox.nativeElement;

  }



  ngOnInit(): void {
	window.onresize=this.ngDoCheck;
	this.suggestionsList=[...new Set(this.suggestionsList.map(s=>s))];
  }

  triggerCompleted(){
    this.showSuggestions=false;
    this.inputbox.blur();
    this.completed.emit(this.value);
  }

  keyPressedOnInput(event:KeyboardEvent){
    this.selectionList.handleKeyDownEvent(event);
    let enteredKey=event.key;
    switch(enteredKey){
    	case "Enter":
        this.triggerCompleted();
        break;
    }

  }

  inputChanged(){
    this.value=this.Inputbox.value;
    if(this.value==""){
	  this.showSuggestions=false;
	  this.suggestions=[];
	  this.triggerCompleted();
    }else{
      this.showSuggestions=true;
      this.updateSuggestions();
    }
  }

  updateSuggestions(){
    this.suggestionUpdater();
  }

  inputBlurred(){
    this.focusin=false;
    if(!this.mousein)
      this.showSuggestions=false;
  }

  inputFocused(){
    this.focusin=true;
    if(this.value!="" && this.value!=undefined){
      this.inputChanged();
      this.showSuggestions=true;
    }


  }

  mouseEntered(){
    this.mousein=true;
    if(this.focusin && this.suggestions.length!=0)
	  this.showSuggestions=true;

  }

  mouseLeft(){
    this.mousein=false;
    if(!this.focusin || this.suggestions.length==0)
	  this.showSuggestions=false;

  }

  suggestionClicked(index,showFurtherSuggestions){
    this.Inputbox.value=this.suggestions[index];
    this.value=this.Inputbox.value;
    if(showFurtherSuggestions)
      this.inputChanged();
    else{
      this.triggerCompleted();
    }

  }

  suggestionUpdater(){
	this.suggestions= this.suggestionsList.filter((value:string)=>value.toLowerCase().indexOf(this.value)!=-1);

  }

}
