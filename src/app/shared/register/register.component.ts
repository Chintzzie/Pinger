import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation :ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  draggedItem:any;

  values:string[]=["Hobbs","Shaw","Xander"];

  constructor() { }

  ngOnInit(): void {
  }

  onChangeValues(newValues){
    this.values=newValues;
  }


  onDragStart(event,item){
    console.log("drag started");
    this.draggedItem=item;
  }

  onDragEnd(event,item){
    console.log("drag ended");
    this.draggedItem=null;
  }

  onDrop(event){
    console.log("item dropped",this.draggedItem);
  }

}
