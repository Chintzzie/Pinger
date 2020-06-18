import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, DoCheck, ContentChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import {cUtil} from '../util/utilfiles';

@Component({
  selector: 'pchips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent implements OnInit,AfterViewInit,DoCheck{

  @Input() values:string[]=[];

  @Input() seperators:string[]=[];

  @Output() valuesChanged:EventEmitter<any>=new EventEmitter<String[]>();

  @ViewChild('inputElement') inputElement:ElementRef;

  @ContentChild('pchips') customTemplate:TemplateRef<any>;

  constructor() { }

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
    this._valuesChanged();

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
    this._valuesChanged();
  }

  _valuesChanged(){
    this.valuesChanged.emit(this.values);
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
