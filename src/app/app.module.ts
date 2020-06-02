import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { EventListComponent } from './shared/event-list/event-list.component';
import { EventDetailComponent } from './shared/event-detail/event-detail.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot([
      {path:'',component:EventListComponent},
      {
        path:"events/:name",component:EventDetailComponent
      }
    ]),
    SharedModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
