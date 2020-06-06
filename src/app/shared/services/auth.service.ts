import { Injectable } from '@angular/core';
import { of,Observable } from 'rxjs';
import { delay,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  delayTime:number=2000;
  currentUser=null;
  constructor() { }

  isLoggedIn(){
    if (this.currentUser!=null)
      return true
    else
      return false
  }


  validateEmail(email:string):Observable<Boolean>{
    if (email=="a@gmail.com"){
      return of(true).pipe(delay(this.delayTime));
    }
    else{
      return of(false).pipe(delay(this.delayTime));
    }
  }

  login(email,password):Observable<Boolean>{
    if (email=="a@gmail.com" && password=="123456"){

      return of(true).pipe(delay(this.delayTime),tap(()=>this.currentUser="Bhaskar"));
    }
    else{
      return of(false).pipe(delay(this.delayTime));
    }
  }

  logout(){
    this.currentUser=null;
  }

}
