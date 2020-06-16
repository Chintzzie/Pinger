import {NgModule,ElementRef,AfterViewInit,HostListener,Output,EventEmitter,NgZone,Directive, Input, AfterViewChecked} from '@angular/core';
import {CommonModule} from '@angular/common';

@Directive({
  selector: '[cDraggable]'
})
export class Draggable implements AfterViewInit,AfterViewChecked{

  @Input() toBeDroppedAt:string[]|string;

  @Input() focusClassName:string="";

  @Input('cDraggable') locationName:string;

  @Input() draggedData:any={};

  @Output() onDragStart: EventEmitter<any> = new EventEmitter();

  @Output() onDragEnd: EventEmitter<any> = new EventEmitter();

  constructor(public elementRef: ElementRef, public zone: NgZone) {}


  el:HTMLElement=this.elementRef.nativeElement;

  ngAfterViewInit(): void {
    this.el.draggable=true;
  }

  ngAfterViewChecked(): void {
    this.toBeDroppedAt=convertToStringArray(this.toBeDroppedAt);
  }

  @HostListener('dragstart', ['$event'])
    dragStart(event:DragEvent) {

        event.dataTransfer.setData("targetLocation",convertToStringWithPipe(this.toBeDroppedAt));
        event.dataTransfer.setData("sourceLocation",this.locationName);
        event.dataTransfer.setData("focusClassName",this.focusClassName);
        event.dataTransfer.setData("draggedData",JSON.stringify(this.draggedData));

        this.toBeDroppedAt.forEach(dropLocation => {
          Array.from(document.getElementsByClassName(dropLocation)).forEach( (element:HTMLElement) => {
            addClass(element,this.focusClassName);
          });
        });


    }


  @HostListener('dragend', ['$event'])
  dragEnd(event:DragEvent) {

    this.toBeDroppedAt.forEach(dropLocation => {
      Array.from(document.getElementsByClassName(dropLocation)).forEach( (element:HTMLElement) => {
        removeClass(element,this.focusClassName);
      });
    });

  }

}


@Directive({
  selector: '[cDroppable]'
})
export class Droppable implements AfterViewInit{

  @Input('cDroppable') locationName:string;

  @Input() errorClassName:string="";

  @Input() successClassName:string="";

  @Input() animationDuration:number=500;

  @Output() onDrop: EventEmitter<any> = new EventEmitter();

  el:HTMLElement;


  constructor(public elementRef: ElementRef, public zone: NgZone) {
    this.el=elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.el.className=this.locationName;
  }



  getHostElement():HTMLElement{
    return this.el;
  }

  @HostListener('dragover',['$event'])
  dragOver(event:DragEvent){

    event.preventDefault();

  }

  @HostListener('drop', ['$event'])
  drop(event:DragEvent) {
	event.preventDefault();

    let targetLocations=convertToStringArray(event.dataTransfer.getData("targetLocation"));
    let sourceLocation=event.dataTransfer.getData("sourceLocation");
    let focusClassName=event.dataTransfer.getData("focusClassName");
    let draggedData=JSON.parse(event.dataTransfer.getData("draggedData"));

    if (targetLocations.includes(this.locationName)){


      this.onDrop.emit({targetLocation: this.locationName,sourceLocation: sourceLocation,draggedData:draggedData});

      animate(this.el,this.successClassName,this.animationDuration)
    }
    else{

      animate(this.el,this.errorClassName,this.animationDuration);

    }

    targetLocations.forEach(targetLocation=>{

      Array.from(document.getElementsByClassName(targetLocation)).forEach((element:HTMLElement) => {

        removeClass(element,focusClassName);

      });

    })



  }

  @HostListener('dragenter', ['$event'])
  dragEnter(event:DragEvent) {
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event'])
  dragLeave(event:DragEvent) {
    event.preventDefault();
  }

}


function convertToStringWithPipe(inp:string[]|string):string{
  if (inp instanceof Array){
    let result="";
    inp.forEach(stringElement=>{
      result+=stringElement+"|";
    });
    result=result.slice(0,result.length-1);
    return result;
  }
  else{
    return inp;
  }

}

function convertToStringArray(input:string[]|string):string[]{
  if (input instanceof Array){
    return input;
  }
  else if(input.indexOf("|")>-1){
    return input.split("|");
  }
  return [input];
}



function addClass(element:HTMLElement,className:string){
  if(!className){
    return;
  }
  if (!element.classList){
    element.className=className;
  }
  else{
    element.classList.add(className);
  }
}

function removeClass(element:HTMLElement,className:string){
  if(!className){
    return;
  }
  if (element.classList.contains(className)){
    element.classList.remove(className);
  }
}

function animate(element:HTMLElement,className:string,duration:number){
  addClass(element,className);
  setTimeout(()=>{
    removeClass(element,className);
  },duration);
}


@NgModule({
  imports: [CommonModule],
  exports: [Draggable,Droppable],
  declarations: [Draggable,Droppable]
})
export class DragDropModule { }
