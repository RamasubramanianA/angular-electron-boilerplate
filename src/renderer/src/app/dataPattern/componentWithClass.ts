import { Type } from '@angular/core';
import { linkData } from './componentData/link';
import { paraData } from './componentData/para';


export class componentWithClass {
  constructor(public component: Type<any>, public data: any) {}
}
