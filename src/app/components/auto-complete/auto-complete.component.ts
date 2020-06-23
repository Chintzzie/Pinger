import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, TemplateRef, ContentChild, ElementRef, AfterContentInit, AfterViewChecked } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import { SelectionListComponent } from '../selection-list/selection-list.component';
import { VsfTemplateDirective } from '../util/vsf-template.directive';

@Component({
  selector: 'vsf-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AutoCompleteComponent,
    multi: true
  }]
})
export class AutoCompleteComponent implements OnInit,ControlValueAccessor,AfterViewInit,AfterContentInit,AfterViewChecked {

  @Input() suggestions=[];

  @Input() autoCompleteStyle={};

  @Input() promptLabel:string="Enter some input";

  @Output() completed:EventEmitter<string>=new EventEmitter<string>();

  @Output() termChanged:EventEmitter<string>=new EventEmitter<string>();

  @ContentChild(VsfTemplateDirective) suggestionTemplateDirective:VsfTemplateDirective;

  @ViewChild('inputRef') inputRef:ElementRef<any>;

  @ViewChild(SelectionListComponent) selectionList:SelectionListComponent;

  constructor() { }


  SUGGESTION_TEMPLATE_TAG="autoCompleteItem";

  suggestionTemplate:TemplateRef<any>;

  inputElement:HTMLInputElement;

  showSuggestions:boolean=false;

  value:string;

  onValueChange:Function;

  mousein=false;

  focusin=false;

  ngAfterViewChecked(): void {
    this.selectionList.itemWidth=this.inputElement.offsetWidth+"px";
  }

  ngAfterContentInit(): void {
    if(!!this.suggestionTemplateDirective && this.suggestionTemplateDirective.getName()==this.SUGGESTION_TEMPLATE_TAG){
      this.suggestionTemplate=this.suggestionTemplateDirective.getTemplate();
    }
  }

  ngAfterViewInit(): void {
    this.inputElement=this.inputRef.nativeElement;
  }



  writeValue(obj: any): void {
    if (obj=="" || obj==undefined){
      return;
    }else{
      this.value=obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onValueChange=fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  ngOnInit(): void {
  }

  triggerCompleted(){
    this.showSuggestions=false;
    this.inputElement.blur();
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
    this.value=this.inputElement.value;
    this.onValueChange(this.value);
    if(this.value==""){
      this.showSuggestions=false;
    }else{
      this.showSuggestions=true;
      this.updateSuggestions();
    }
  }

  updateSuggestions(){
    this.termChanged.emit(this.value);
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
    if(this.focusin)
      this.showSuggestions=true;
  }

  mouseLeft(){
    this.mousein=false;
    if(!this.focusin)
      this.showSuggestions=false;
  }

  suggestionClicked(index,showFurtherSuggestions){
    this.inputElement.value=this.suggestions[index];
    this.value=this.inputElement.value;
    if(showFurtherSuggestions)
      this.inputChanged();
    else{
      this.onValueChange(this.value);
      this.triggerCompleted();
    }

  }

}
