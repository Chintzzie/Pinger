
export class cUtil{


public static convertToStringWithDelimitor(inp:string[]|string,delimitor:string):string{
  if (inp instanceof Array){
    let result="";
    inp.forEach(stringElement=>{
      result+=stringElement+delimitor;
    });
    result=result.slice(0,result.length-1);
    return result;
  }
  else{
    return inp;
  }

};

public static convertToStringArray(input:string[]|string):string[]{
  if (input instanceof Array){
    return input;
  }
  else if(input.indexOf("|")>-1){
    return input.split("|");
  }
  else if(input.indexOf(" ")>-1){
    return input.split(" ");
  }
  return [input];
}



public static addClass(element:HTMLElement,className:string){
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

public static removeClass(element:HTMLElement,className:string){
  if(!className){
    return;
  }
  if (element.classList.contains(className)){
    element.classList.remove(className);
  }
}

public static animate(element:HTMLElement,className:string,duration:number){
  this.addClass(element,className);
  setTimeout(()=>{
  this.removeClass(element,className);
  },duration);
}


}
