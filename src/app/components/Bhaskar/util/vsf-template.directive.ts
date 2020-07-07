import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[vsfTemplate]'
})
export class VsfTemplateDirective {

  @Input('vsfTemplate') name: string;

  constructor(public template:TemplateRef<any>) { }

  getName(){
    return this.name;
  }

  getTemplate(){
    return this.template;
  }



}
