import { Directive, Input, HostListener } from '@angular/core';
import { SideNavService } from 'src/app/services/renderer/sideNav/sideNav.service';

@Directive({
  selector: '[appLeftEndHover]'
})
export class LeftEndHoverDirective {
  present: boolean = false;

  @Input('side') side: string;

  constructor( private sideNavService: SideNavService) { }

  
  @HostListener('mouseenter') mouseover() {
    this.present = true;
    console.log('this.present: ', this.present);
    setTimeout(()=>{ 
      console.log('function called.',this.present );
      if (this.present){
        console.log('this.side: ', this.side);
        if(this.side === 'left'){
          console.log('Left');
          this.sideNavService.open();
        } else if(this.side === 'right'){
          console.log('Right');
        }
      }
     
     }, 3000);
  }

  @HostListener('mouseleave') mouseleave() {
    this.present = false;
    console.log('this.present: ', this.present);
  }

}

// function openSideNav() 
