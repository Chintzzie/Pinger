import { Injectable, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { Observable, of} from 'rxjs';
import { filter,tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventDataService implements OnInit{
  resourcePath='../../../assets/event-data.json';
  events:Event[];
  filteredEvents:Event[];
  minIndex:number=3;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get<Event[]>(this.resourcePath).subscribe(events=>this.events=events);
  }


  getAllEventNames():Observable<string[]>{
    let eventNames=[];
    return this.http.get<Event[]>(this.resourcePath).pipe(map(events=>{
      this.events=events;
      this.events.forEach(event=>eventNames.push(event.name));
      return eventNames;
    }));

    this.events.forEach(event=>eventNames.push(event.name));
    return of(eventNames);
  }

  getEvents():Observable<Event[]>{
    return this.http.get<Event[]>(this.resourcePath).pipe(map(events=>{
      this.events=events;
      return (events.slice(0,this.minIndex));
    }));

  }

  getMoreEvents(batchNumber,batchSize):Observable<Event[]>{
    if (batchSize*batchNumber>=this.events.length)
      return of(this.events);
    else
      return of(this.events.slice(0,batchSize*batchNumber));
  }
  getEvent(eventName:String):Observable<Event>{
    let selectedEvent:Event;
    this.events.forEach((event)=>{
      if (event.name==eventName)
        selectedEvent=event;
    })
    return of(selectedEvent);

  }

  getEventsByName(searchTerm:string,batchSize,batchNumber):Observable<Event[]>{
    this.filteredEvents=this.events.filter(event=>
      searchTerm=='' ||  event.name.toLocaleLowerCase().indexOf(searchTerm.toLowerCase())>-1
      )
    if (batchSize*batchNumber>=this.filteredEvents.length)
      return of(this.filteredEvents);
    else
      return of(this.filteredEvents.slice(0,batchSize*batchNumber));
  }


}
