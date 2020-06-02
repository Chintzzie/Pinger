import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { EventDataService } from '../services/event-data.service';
import { Router } from '@angular/router';
import {JQ_TOKEN } from '../services/jquery.service';

declare var $: any;
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  constructor(private eventDataService:EventDataService,
              private router:Router) { }


  events:Event[];
  batchToBeLoaded:number=1;
  batchSize:number=3;
  filteredEvents:Event[];
  isAscendingRatingSort:Boolean=true;
  isAscendingPriceSort:Boolean=true;
  selectedSortBy:String="";
  filteredBy:String="";
  searchVal:String="";
  searchTerm:string="";
  eventNames:string[];
  suggestions:string[];
  searchIn;

  ngOnInit(): void {
    this.eventDataService.getEvents().subscribe(data=> {
      this.events=data;
      this.filteredEvents=this.events;

    });
    this.eventDataService.getAllEventNames().subscribe(data=>{
      this.eventNames=data;
    })
  }



  update(s){
    this.searchIn=s;
    this.searchVal=s;
    this.updateSuggestions();
  }
  updateSuggestions(){
    if (this.searchVal==''){
      this.suggestions=[];
      return

    }
    this.suggestions=this.eventNames.filter((eventName)=>eventName.toLowerCase().indexOf(<string>this.searchVal.toLowerCase())>-1);
    this.suggestions=[...new Set(this.suggestions.map(s=>s))];
  }

  searchEvents(searchTerm:string):void{
    this.batchToBeLoaded=1;
    this.searchTerm=searchTerm;
    this.eventDataService.getEventsByName(searchTerm,this.batchSize,this.batchToBeLoaded).subscribe(events=>{
      this.events=events;
      this.filteredEvents=this.events;
      this.filterBy(this.filteredBy);
    })
  }

  loadMoreEvents():void{
    this.batchToBeLoaded+=1;
    this.eventDataService.getEventsByName(this.searchTerm,this.batchToBeLoaded,this.batchSize).subscribe(events=>{
      this.events=events;
      this.filterBy(this.filteredBy);

    })
  }

  navigateToDetail(event:Event):void{
    this.router.navigate(['events',event.name]);

  }
  checkHotness(event:Event):Boolean{
    let a=(new Date(<string>event.date).getTime()-new Date().getTime());
    const period=2*24*1000*60*60;
    if (a<0)
      a=a*-1;

    if (a<=period){
      return true;
    }
    else
      return false;
  }

  checkFilterParam(criteria:String):Boolean{
    if (this.filteredBy==criteria)
      return true
    else
      return false
  }
  checkSortParam(criteria:String):Boolean{
    if (this.selectedSortBy==criteria)
      return true
    else
      return false
  }
  filterBy(filterBy:String):void{
    this.filteredBy=filterBy;

    this.filteredEvents=this.events.filter((a:Event)=>filterBy=='' || a.category==filterBy);
  }
  sortByRating():void{
    this.selectedSortBy="Rating";
    this.filteredEvents.sort(
      (a:Event,b:Event):number=>{
      if (a.rating>b.rating )
        if (this.isAscendingRatingSort)
          return 1
        else
          return -1
      else if(a.rating<b.rating)
        if (this.isAscendingRatingSort)
          return -1
        else
          return 1
      else
        return 0
    })

    this.isAscendingRatingSort=!this.isAscendingRatingSort;
  }

  sortByPrice():void{

    this.selectedSortBy="Price";
    this.filteredEvents.sort(
      (a:Event,b:Event):number=>{
      if (a.price>b.price )
        if (this.isAscendingPriceSort)
          return 1
        else
          return -1
      else if(a.price<b.price)
        if (this.isAscendingPriceSort)
          return -1
        else
          return 1
      else
        return 0
    })

    this.isAscendingPriceSort=!this.isAscendingPriceSort;
  }

}
