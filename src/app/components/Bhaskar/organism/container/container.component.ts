import { Component, OnInit, Input, DoCheck, OnChanges, SimpleChanges, ContentChild, AfterContentInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { VsfTemplateDirective } from '../../util/vsf-template.directive';

@Component({
  selector: 'vsf-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit,AfterContentInit {

	@Input('dataList') originalDataList:any[]=[];

	@Input() columns:string="col-6";

	@Input() sortingProperties=[];

	@Input() searchingProperties=[];

	@Output() loadMore:EventEmitter<any>=new EventEmitter<any>();

	@ContentChild(VsfTemplateDirective) itemTemplateRef:VsfTemplateDirective;

	constructor() { }

	lastSearchedByTerm:string="";

	lastSortedByProperty:string="";

	itemTemplate:TemplateRef<any>;

	dataList:any[]=[];

	isAscendingOrder={};

	suggestionsList:string[]=[];

	ngOnInit(): void {

		this.sortingProperties.forEach((sortingProperty)=>{
			this.isAscendingOrder[sortingProperty]=false;
		});



	}

	ngDoCheck(): void {
	}

	ngOnChanges(changes: SimpleChanges): void {
		if(!!changes.originalDataList){
			this.dataList=[...this.originalDataList];

			let tempList=[]
			this.searchingProperties.forEach((searchingProperty)=>{
				this.originalDataList.forEach((dataItem)=>{
					tempList.push(dataItem[searchingProperty]);
				})
			});
			this.suggestionsList=[...tempList];

			this.sortBy(this.lastSortedByProperty);
			this.search(this.lastSearchedByTerm);

		}
	}

	ngAfterContentInit(): void {
		if(!!this.itemTemplateRef){
			this.itemTemplate=this.itemTemplateRef.getTemplate();
		}
	}

	sortBy(property){
		this.dataList.sort((a,b):number=>{
			if(a[property]>b[property])
				return 1
			else if((a[property]<b[property]))
				return -1
			else
				return 0
		})
		if(this.isAscendingOrder[property]){
			this.dataList=this.dataList.reverse();
		}
		this.isAscendingOrder[property]=!this.isAscendingOrder[property];
	}

	sortButtonClicked(button){
		this.lastSortedByProperty=button;
		this.sortBy(button);
	}

	search(term:string){
		this.lastSearchedByTerm=term;
		term=term.toLowerCase();
		let tempDataList:any[]=[];
		this.searchingProperties.forEach((searchingProperty)=>{
			this.originalDataList.forEach((dataItem)=>{
				let val:string=dataItem[searchingProperty];
				val=val.toLowerCase();
				if(val.indexOf(term)!=-1)
					tempDataList.push(dataItem);
			});
		});
		this.dataList=[...tempDataList];
	}

	loadMoreData(){
		this.loadMore.emit();
	}
}
