import { Component, OnInit } from '@angular/core';
import { DialogHandler } from 'projects/shared/src/lib/common/dialog';

/**
 * Logout result
 */
export enum LogoutResult {

  /**
   * The user is still logged in.
   */
  No = 'no',

  /**
   * The user is still logged out.
   */
  Yes = 'yes'
}


@Component({
  selector: 'dfo-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit {

  constructor(private handler: DialogHandler<void, LogoutResult>) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.handler.dismiss(LogoutResult.No);
  }

  logout(): void {
    this.handler.dismiss(LogoutResult.Yes);
  }
}
