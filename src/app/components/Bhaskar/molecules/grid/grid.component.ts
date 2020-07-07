import { Component, OnInit, Input, ViewChild, ElementRef, AfterContentInit, AfterViewInit, ViewEncapsulation, ContentChild, TemplateRef, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { VsfTemplateDirective } from '../../util/vsf-template.directive';

@Component({
  selector: 'vsf-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit,AfterViewInit,AfterContentInit,OnChanges {

	@Input() dataList:any[]=[];

	@Input() columns:string="";

	@Input() gridStyle:any={};

	@Input() itemTemplate:TemplateRef<any>;

	@ContentChild(VsfTemplateDirective) itemTemplateRef:VsfTemplateDirective;

	@Output() needMoreData:EventEmitter<any>=new EventEmitter<any>();

	constructor() { }



	showLoading:boolean=false;


	ngAfterContentInit(): void {
		if(!!this.itemTemplateRef){
			this.itemTemplate=this.itemTemplateRef.getTemplate();
		}else{
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if(!!changes.dataList){
			this.showLoading=false;
		}
	}


	ngAfterViewInit(): void {
	}

	ngOnInit(): void {

	}

	scrolledToBottom(){
		this.needMoreData.emit();
		this.showLoading=true;
		setTimeout(()=>{
			this.showLoading=false;
		},5000);

	}

}
