import { Directive, ElementRef, HostListener,Input,DoCheck,NgZone, Host, ViewEncapsulation } from '@angular/core';

@Directive({
  selector: '[vsfPassword]'

})

export class PasswordDirective {
  constructor(public el:ElementRef) { }

  @Input() showFeedback:Boolean=true;

  feedBackPanel:HTMLDivElement;
  info:HTMLSpanElement;
  feedBackTextDef:string="Enter a password";

  @HostListener('input')
  onInput(){
    this.updateFeedbackText();
  }


  @HostListener('focus')
  onFocus(){
    console.log("focus triggered");
    if(!this.feedBackPanel){
      this.createFeedbackPanel();
    }
    this.feedBackPanel.classList.add("password-panel-visible");
    this.feedBackPanel.classList.remove("password-panel-invisible");
  }

  @HostListener('blur')
  onBlur(){
    console.log("blur triggered");
    this.feedBackPanel.classList.add("password-panel-invisible");
    this.feedBackPanel.classList.remove("password-panel-visible");
  }

  createFeedbackPanel(){
    this.feedBackPanel= document.createElement("div");
    this.feedBackPanel.className='password-panel';
    this.info=document.createElement("span");
    this.info.textContent=this.feedBackTextDef;
    this.feedBackPanel.appendChild(this.info);

    this.feedBackPanel.style.minWidth=this.el.nativeElement.offsetWidth+'px';

    let targetOffSet=this.el.nativeElement.getBoundingClientRect();
    this.feedBackPanel.style.left=targetOffSet.left+'px';
    this.feedBackPanel.style.top=this.el.nativeElement.offsetHeight+targetOffSet.top+'px';

    document.body.appendChild(this.feedBackPanel);
  }

  updateFeedbackText(){
    let inpval=this.el.nativeElement.value;
    let feedBackText;
    if(inpval.length==0){
      feedBackText=this.feedBackTextDef;
      this.feedBackPanel.style.backgroundColor="aqua";
    }
    else if (inpval=="abc" ){
      feedBackText="Strong";
      this.feedBackPanel.style.backgroundColor="green";
    }
    else if(inpval=="aab"){
      feedBackText="Medium";
      this.feedBackPanel.style.backgroundColor="yellow";
    }
    else{
      feedBackText="Weak";
      this.feedBackPanel.style.backgroundColor="red";
    }

    this.info.textContent=feedBackText;
  }

}
