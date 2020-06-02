import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { HttpClientModule } from '@angular/common/http';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { RatingStarComponent } from './rating-star/rating-star.component';
import {JQ_TOKEN } from './services/jquery.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [EventListComponent, EventDetailComponent, RatingStarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class SharedModule { }
