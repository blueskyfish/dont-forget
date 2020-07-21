import { Component, Input, OnInit } from '@angular/core';
import { AvatarValue } from 'projects/shared/src/lib/elements/components/hero-panel/hero-panel.util';

export type SidebarPanel = 'popup' | 'aside';


@Component({
  selector: 'dfo-sidebar-panel',
  templateUrl: './sidebar-panel.component.html',
  styleUrls: ['./sidebar-panel.component.scss']
})
export class SidebarPanelComponent implements OnInit {

  @Input()
  userName: AvatarValue;

  @Input()
  kind: SidebarPanel;

  constructor() { }

  ngOnInit(): void {
  }

  selectHero(): void {

  }
}
