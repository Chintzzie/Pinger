import { Component, OnInit, Output, Input, EventEmitter, TemplateRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'vsfInputBox',
  templateUrl: './inputbox.html',
  styleUrls: ['./inputbox.css']
})
export class Inputbox  implements AfterViewInit{
  @Input() placeholder="Enter input";
  @Input() inputStyle={};

  @Output() focus:EventEmitter<any>=new EventEmitter();
  @Output() input:EventEmitter<any>=new EventEmitter();
  @Output() keypressed:EventEmitter<any>=new EventEmitter();

  @ViewChild('inputbox') inputbox:ElementRef<any>;

  constructor() { }

  value:string;

  ngAfterViewInit(): void {

  }

}
