import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import { NotificationService } from './shared/services/notification.service';

declare let $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'pinger';
  currentUser;
  toastMsg:String="Initial Message";

  constructor(private authService:AuthService,
              private notificationService:NotificationService){

  }
  ngOnInit(): void {

    this.notificationService.getNotifications().subscribe((msg)=>{
      this.toastMsg=msg;
      $('#toast').toast({delay:5000});
      $('#toast').toast('show');
    });


    $('#exampleModal').on('hide.bs.modal', function (e) {

      console.log("hide event triggered");
    })

    $('#exampleModal').on('show.bs.modal', function (e) {

      console.log("show event triggered");
    })


  }


  toast(){
    let opt={
    };
    $('#toast').toast({delay:5000});
    $('#toast').toast('show')
  }

  isLoggedIn(){
    if(this.authService.isLoggedIn()){
      this.currentUser=this.authService.currentUser;
      return true;
    }
    return false;

  }

  logout(){
    this.authService.logout();
    this.notificationService.log("Logged out!");
  }

  login(){
    $("#exampleModal").modal("toggle");
  }

}
