import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { GetDyCompService } from 'src/app/services/renderer/getDyComp.service';
import { componentWithClass } from 'src/app/dataPattern/componentWithClass';
import { DynCompDirHostDirective } from 'src/app/directives/DynCompDirHost.directive';
import { DynamicComponentInterface } from 'src/app/interface/DynamicComponentInterface';

@Component({
  selector: 'app-pageWithDyCom',
  templateUrl: './pageWithDyCom.component.html',
  styleUrls: ['./pageWithDyCom.component.css']
})
export class PageWithDyComComponent implements OnInit {
  comps : componentWithClass[];

  @ViewChild( DynCompDirHostDirective, {static: true}) dyCompHost: DynCompDirHostDirective;

  constructor( private getDyCompService : GetDyCompService, private componentFactoryResolver: ComponentFactoryResolver) { }

  async ngOnInit() {
    this.comps = await this.getDyCompService.getDyCompForThisPage();
    this.setDyComponents();
  }

  setDyComponents(){
    this.comps.forEach(comp => {

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(comp.component);

      const viewContainerRef = this.dyCompHost.viewContainerRef;
      // viewContainerRef.clear();
  
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<DynamicComponentInterface>componentRef.instance).data = comp.data;
      
    });

  }

}
