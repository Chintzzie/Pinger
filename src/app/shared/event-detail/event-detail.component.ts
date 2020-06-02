import { Component, OnInit } from '@angular/core';
import { EventDataService } from '../services/event-data.service';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../models/event';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  eventName:String;
  event:Event;
  constructor(private eventDataService:EventDataService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.eventName=this.activatedRoute.snapshot.paramMap.get('name')
    this.eventDataService.getEvent(this.eventName).subscribe(event=>this.event=event);
  }

}
