import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * The component of the sidebar action.
 */
@Component({
  selector: 'dfo-sidebar-action',
  template: `
    <div class="sidebar-action" [class.active]="selected" matRipple (click)="clickOnAction($event)">
      <div class="icon" *ngIf="icon">
        <mat-icon [svgIcon]="icon"></mat-icon>
      </div>
      <p class="title">{{ title }}</p>
      <div class="arrow">
        <mat-icon [svgIcon]="arrow"></mat-icon>
      </div>
    </div>
  `,
  styleUrls: ['./sidebar-action.component.scss']
})
export class SidebarActionComponent implements OnInit {

  /**
   * The icon of the action.
   *
   * **Note**: If the value is `null` or `undefined`, the icon is hidden.
   */
  @Input()
  icon: string;

  /**
   * The title of the action
   */
  @Input()
  title: string;

  /**
   * The arrow icon on the right side (Default is `chevron-right`).
   */
  @Input()
  arrow: string = 'chevron-right';

  /**
   * The selected state of the action.
   */
  @Input()
  selected = false;

  /**
   * The action is clicked.
   */
  @Output()
  clicked: EventEmitter<void> = new EventEmitter<void>(true);

  constructor() { }

  ngOnInit(): void {
  }


  clickOnAction(ev: Event): void {
    ev.preventDefault();
    ev.stopPropagation();
    this.clicked.emit();
  }
}
