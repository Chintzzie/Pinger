import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  constructor() { }


  checked: boolean = false;
  @Input() check: string ='';
  @Input() value: string= '';
  @Input() val: string= '';
  @Input() color: string = ''
  @Input() style: any = null
  @Input() name:string='default'

  ngOnInit(): void {
    // if(!(this.check==='true')){
    //   this.check += `${this.check}`;
    // }
    // console.log(this.val)
    // if (this.checked === true) {
    // 	this.check='checked'; 
  // }
  }
  
  getchecked(name):boolean{
    console.log(name+"sjdhjksdhgku");
    return name===this.check;
  }
}
