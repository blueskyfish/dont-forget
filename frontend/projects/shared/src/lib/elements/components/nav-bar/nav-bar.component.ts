import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

export class NavBarClicked {
  constructor(
    public readonly type: 'menu' | 'errors',
    public readonly parent: ElementRef
  ) {
  }
}

@Component({
  selector: 'dfo-nav-bar',
  template: `
    <mat-toolbar color="primary" class="nav-bar" [class.large-mode]="largeMode">
      <div class="button-box" #buttonMenu>
        <button mat-icon-button *ngIf="!largeMode" (click)="menuClicked()">
          <mat-icon svgIcon="menu"></mat-icon>
        </button>
      </div>
      <h1 class="title-box" [innerHTML]="title | dfoSafeHtml"></h1>
      <div class="button-box" #buttonErrors>
        <button mat-icon-button (click)="errorClicked()" *ngIf="errors">
          <mat-icon
            [matBadge]="errors"
            matBadgeColor="warn"
            matBadgePosition="above after"
            svgIcon="bell-alert-outline">
          </mat-icon>
        </button>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  /**
   * The large mode
   */
  @Input()
  largeMode = true;

  /**
   * The title of the current view in the nav bar
   */
  @Input()
  title: string;

  /**
   * Shows the number of errors
   */
  @Input()
  errors: string;

  /**
   * Emit the menu event
   */
  @Output()
  navBar: EventEmitter<NavBarClicked> = new EventEmitter<NavBarClicked>(true);

  @ViewChild('buttonMenu')
  buttonMenu: ElementRef;

  @ViewChild('buttonErrors')
  buttonErrors: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  menuClicked(): void {
    if (this.buttonMenu) {
      this.navBar.emit(new NavBarClicked('menu', this.buttonMenu));
    }
  }

  errorClicked(): void {
    if (this.buttonErrors) {
      this.navBar.emit(new NavBarClicked('errors', this.buttonErrors));
    }
  }
}
