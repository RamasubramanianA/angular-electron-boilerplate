import { Component, OnInit } from '@angular/core';
import { BpmnJS } from 'bpmn-js/lib/BaseViewer';

@Component({
  selector: 'app-flowDiagram',
  templateUrl: './flowDiagram.component.html',
  styleUrls: ['./flowDiagram.component.css']
})
export class FlowDiagramComponent implements OnInit {
  viewer;
  bpmnXML;
  constructor() { }

  ngOnInit() {
    // create a modeler
    this.viewer = new BpmnJS({ container: '#canvas' });
    // import diagram
    this.viewer.importXML(this.bpmnXML, function (err) {
      if (err) {
        // import failed :-(
      } else {
        // we did well!
        var canvas = this.viewer.get('canvas');
        canvas.zoom('fit-viewport');
      }
    });
  }

}
