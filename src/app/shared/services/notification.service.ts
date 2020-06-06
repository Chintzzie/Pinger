import { Injectable } from '@angular/core';
import { Subject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
  notification:Subject<String>=new Subject<String>();

  log(msg:String):void{
    this.notification.next(msg);
  }

  getNotifications():Observable<String>{
    return this.notification.asObservable();
  }
}
