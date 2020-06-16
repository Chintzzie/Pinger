import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Event } from '../models/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
  ,changeDetection: ChangeDetectionStrategy.OnPush
})

export class EventCardComponent implements OnInit {

  @Input() event:Event;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigateToDetail(event:Event):void{
    this.router.navigate(['events',event.name]);

  }

  checkHotness(event:Event){
    console.log("hotness checked");
    let a=(new Date(<string>event.date).getTime()-new Date().getTime());
    const period=2*24*1000*60*60;
    if (a<0)
      return {cool: true};

    if (a<=period){
      return {hot:true};
    }
    else
      return {}
  }
}
