import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Event } from '../models/event';
import { EventDataService } from '../services/event-data.service';

@Component({
  selector: 'app-event-compare',
  templateUrl: './event-compare.component.html',
  styleUrls: ['./event-compare.component.css']
})
export class EventCompareComponent implements OnInit {

  events:Event[];

  Names={"availableEvents":[],"selectedEvents" :[],"droppableEvents":[]}

  constructor(private eventDataService:EventDataService) { }

  ngOnInit(): void {
    this.eventDataService.getAllEvents().subscribe((events)=>{
      this.Names["availableEvents"]=events;
    });
  }

  dropped(eventData){
    let sourceList:Event[]=this.Names[eventData.sourceLocation];
    let targetList:Event[]=this.Names[eventData.targetLocation];
    let draggedEvent:Event=eventData.draggedData;

    targetList=[...targetList,draggedEvent];
    sourceList=sourceList.filter((event)=>event.name!=draggedEvent.name);

    this.Names[eventData.sourceLocation]=sourceList;
    this.Names[eventData.targetLocation]=targetList;

  }


}
