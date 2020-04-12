import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, Injectable, ViewChild, OnInit } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  path?: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: "Introduction to C programming.",
    children: [{ name: "History" }, { name: "Environment setup" }, { name: "Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! " }],
    path: 'p'

  },
  {
    name: "Variable",
    children: [
      {
        name: "Identifier",
        children: [{
          name: "Function name",
          path: 'Identifier p'
        }, {
          name: "Variable name ",
          path: 'Identifier p'
        }]
      },
      {
        name: "function",
        children: [
          { name: "return type" },
          { name: "paameter" },
          {
            name: "over loading",
            children: [
              {
                name: "methos overloading",
                children: [{
                  name: "parameter",
                  path: 'parameter p'
                },
                {
                  name: "return type",
                  path: 'parameter p'
                }]
              },
              {
                name: "Orange",
                children: [
                  { name: "Pumpkins" },
                  { name: "Carrots" },
                  {
                    name: "Vegetables",
                    children: [
                      {
                        name: "Green",
                        children: [
                          { name: "Broccoli" },
                          { name: "Brussels sprouts" }
                        ]
                      },
                      {
                        name: "Orange",
                        children: [{ name: "Pumpkins" }, { name: "Carrots" }]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-TOC',
  templateUrl: './TOC.component.html',
  styleUrls: ['./TOC.component.css']
})
export class TOCComponent implements OnInit {

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    this.dataSource._data.isStopped = true;
    this.treeControl.dataNodes = this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;
  onClickNode(valN: any) {
    if (valN.path)
      console.log(valN.path);
    // this.treeControl.expandAll();
    // this.treeControl.collapseAll();

  }

  ngOnInit() {

  }
}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
