import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName, EmailValidator,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap,debounceTime } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

declare let $:any;

function custEmailValidator(context:LoginComponent){
  return (c: AbstractControl) =>{
    let val:string=c.value;
    if (val=='' || val==null){

      return { invalidity: "Email is required!" };
    }
    let exp='.+\@.+\..+';
    if (val.match(exp)!=null ) {
      // context.validateEmail();
      return null;
    }

    return { invalidity: "Enter a valid email" };
  };
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  EmailLoading:Boolean=false;
  loading:Boolean=false;
  loginForm: FormGroup;
  isEmailValid;
  emailEntering:Boolean=false;
  invalidPwd:Boolean=false;
  showErrorsEmail:Boolean=false;












  changeLog: string[] = [];

  constructor(private router:Router,
              private fb:FormBuilder,
              private authService:AuthService,
              private notificationService:NotificationService) { }



  ngOnInit(): void {
    this.loginForm=this.fb.group({
      userName:['',[
        custEmailValidator(this)
        ]
      ],
      password:['',[Validators.required]]
    });

    this.loginForm.controls.userName.valueChanges.pipe(
      tap(()=>{
        this.showErrorsEmail=false;
      }),
      debounceTime(1000),
    ).subscribe(()=>{
      this.showErrorsEmail=true;
    });

  }

  resetForm(){
    console.log("resetting form");
    this.loginForm.reset();
  }

  toRegister(){
    $("#exampleModal").modal("toggle");
    this.router.navigate(['register']);

  }

  initiateValidation(isFocused){
    this.emailEntering=isFocused;
    if (isFocused)
      return;
    if(this.loginForm.controls.userName.valid){
      this.EmailLoading=true;
      this.validateEmail();
    }
  }

  validateEmail(){
    if (this.loginForm.controls.userName.invalid){
      this.EmailLoading=false;
      return;
    }
    this.authService.validateEmail(<string>this.loginForm.controls.userName.value).subscribe(
      (result:Boolean)=>{
        this.EmailLoading=true;
        if(result)
        {

          this.isEmailValid=true;
        }
        else{
          this.isEmailValid=false;
        }

        this.EmailLoading=false;
      }
    )
  }

  onSubmit(){
    this.loading=true;
    this.authService.login(this.loginForm.get("userName").value,this.loginForm.get("password").value).
    subscribe((isLoggedIn)=>{
      if(isLoggedIn){
        this.resetForm();
        $('#exampleModal').modal('toggle');
        this.notificationService.log("Logged in!");
      }
      else{
        this.invalidPwd=true;
        this.loginForm.get("password").setValue("");
      }
      this.loading=false;
    });

  }
}
