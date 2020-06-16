import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { EventDataService } from '../services/event-data.service';
import { Router } from '@angular/router';

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
  searchTerm:string="";
  eventParamNames:string[];

  ngOnInit(): void {
    this.eventDataService.getEvents().subscribe(data=> {
      this.events=data;
      this.filteredEvents=this.events;

    });
    this.eventDataService.getAllEventParamNames().subscribe(data=>{
      this.eventParamNames=data;
    })
  }

  searchEvents(searchTerm:string):void{
    this.batchToBeLoaded=1;
    this.searchTerm=searchTerm;
    this.eventDataService.getEventsByParamNames(searchTerm,this.batchSize,this.batchToBeLoaded).subscribe(events=>{
      this.events=events;
      this.filteredEvents=this.events;
      this.filterBy(this.filteredBy);
    })
  }

  loadMoreEvents():void{
    this.batchToBeLoaded+=1;
    this.eventDataService.getEventsByParamNames(this.searchTerm,this.batchToBeLoaded,this.batchSize).subscribe(events=>{
      this.events=events;
      this.filterBy(this.filteredBy);
      if (this.selectedSortBy=='Rating'){
        this.sortByRating();
        this.sortByRating();
      }
      else{
        this.sortByPrice();
        this.sortByPrice();
      }
    })
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
