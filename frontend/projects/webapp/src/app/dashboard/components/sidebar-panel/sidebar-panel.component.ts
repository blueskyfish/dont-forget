import { Component, Input, OnInit } from '@angular/core';

export type SidebarPanel = 'popup' | 'aside';


@Component({
  selector: 'dfo-sidebar-panel',
  templateUrl: './sidebar-panel.component.html',
  styleUrls: ['./sidebar-panel.component.scss']
})
export class SidebarPanelComponent implements OnInit {

  @Input()
  kind: SidebarPanel;

  constructor() { }

  ngOnInit(): void {
  }

}
