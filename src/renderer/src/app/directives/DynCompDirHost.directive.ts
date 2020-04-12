import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynCompDirHost]'
})
export class DynCompDirHostDirective {

  constructor( public viewContainerRef: ViewContainerRef ) {  }

}
