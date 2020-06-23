import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation :ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  draggedItem:any;

  autocompleteval="";

  suggestionsList=["abgc","def","ghi","jkl","zxc","hgz","ozpa","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"];

  suggestions;

  values:string[]=["Hobbs","Shaw","Xander"];

  constructor() { }

  ngOnInit(): void {
  }

  completeTriggered(){
    console.log("complete triggered");
  }

  suggestionUpdater(key:string){

    key=key.toLowerCase();
    this.suggestions= this.suggestionsList.filter((value)=>value.toLowerCase().indexOf(key)!=-1)

  }

  onChangeValues(newValues){
    this.values=newValues;
  }


  onDragStart(event,item){
    this.draggedItem=item;
  }

  onDragEnd(event,item){
    this.draggedItem=null;
  }

  onDrop(event){
    console.log("item dropped",this.draggedItem);
  }

}
