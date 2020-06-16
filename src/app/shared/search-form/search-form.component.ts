import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OutletContext } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Input() eventParamNames:string[];
  @Output() search = new EventEmitter();

  searchTerm:string="";
  suggestions:string[];
  searchParam:string;

  constructor() { }

  ngOnInit(): void {
  }

  searchList(){

    this.search.emit(this.searchParam);
  }

  updateSuggestions(){

    if (this.searchParam==''){
      this.suggestions=[];
      return

    }
    this.suggestions=this.eventParamNames.filter((eventName)=>eventName.toLowerCase().indexOf(this.searchParam.toLowerCase())>-1);
    this.suggestions=[...new Set(this.suggestions.map(s=>s))];
  }

}
