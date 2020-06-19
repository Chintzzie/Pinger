import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, DoCheck, ContentChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import {cUtil} from '../util/utilfiles';

@Component({
  selector: 'pchips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ChipsComponent,
    multi: true
  }]
})
export class ChipsComponent implements OnInit,AfterViewInit,DoCheck,ControlValueAccessor{

  @Input() seperators:string[]=[];

  @Input() chipStyle:any;

  @Input() chipSetStyle:any;

  @Output() valuesChanged:EventEmitter<any>=new EventEmitter<String[]>();

  @ViewChild('inputElement') inputElement:ElementRef;

  @ContentChild('pchips') customTemplate:TemplateRef<any>;

  values:string[]=[];

  valuesOnChanged:Function;

  valuesOnTouched:Function;

  constructor() { }

  writeValue(obj: string[]): void {
    this.values=obj;
  }

  registerOnChange(fn: any): void {
    this.valuesOnChanged=fn;
  }

  registerOnTouched(fn: any): void {
    this.valuesOnTouched=fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  inputHTMLElement:HTMLElement;



  ngDoCheck(): void {
    this.seperators=cUtil.convertToStringArray(
      cUtil.convertToStringWithDelimitor(this.seperators," ").toLocaleUpperCase()
      );
  }

  ngAfterViewInit(): void {
    this.inputHTMLElement=this.inputElement.nativeElement;

  }

  ngOnInit(): void {
  }

  focusInput(event:FocusEvent){
    this.inputHTMLElement.focus();

  }

  addItem(value:string):void{

    if (value==''){
      return;
    }
    this.values=[...this.values,value];
    this.inputElement.nativeElement.value="";
    this.valuesOnChanged(this.values);

  }

  removeItemFromClick(event:FocusEvent,index:number){
    this.removeItem(index);
    event.stopPropagation();
  }

  removeItem(index:number){
    if (this.values.length==0){
      return;
    }
    this.values=this.values.filter((value,i)=>i!=index);
    this.inputElement.nativeElement.value="";
    this.valuesOnChanged(this.values);
  }

  onBlur($event){
    this.valuesOnTouched();
  }

  onKeyDownOnInput(event: KeyboardEvent){
    switch(event.key){

      //Enter
      case "Enter": this.addItem(this.inputElement.nativeElement.value);
                return;

      //BackSpace
      case "Backspace":
              if (this.inputElement.nativeElement.value==''){
                this.removeItem(this.values.length-1);
              }
              return;

    }

    this.seperators.forEach(seperator => {
      if(seperator==event.key){
        this.addItem(this.inputElement.nativeElement.value);
        event.preventDefault();
        return;
      }
    });
  }

  onPasteOnInput(event){
    let content:string=(event.clipboardData || window['clipboardData']).getData('Text');

    this.seperators.forEach(seperator => {

      if (content.indexOf(seperator)!=-1){
        let subTerms=content.split(seperator);
        subTerms.forEach(term=>this.addItem(term));
        event.preventDefault();
        return;
      }

    });

  }

}
