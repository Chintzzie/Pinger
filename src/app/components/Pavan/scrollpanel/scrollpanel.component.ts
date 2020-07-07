import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vsf-scrollpanel',
  templateUrl: './scrollpanel.component.html',
  styleUrls: ['./scrollpanel.component.css']
})
export class ScrollpanelComponent implements OnInit {

   style:string;
//   @Input() widthInPixels:string = '100';
//   @Input() heightInPixels:string = '100';
  @Input() overflowX:boolean = false;
  @Input() overflowY:boolean = true;
  @Input() theme:string = 'primary';


  constructor() { }

  ngOnInit(): void {

  }

}
