import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { StartApp } from 'projects/shared/src/lib/store';

@Component({
  selector: 'dfo-webapp',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new StartApp());
  }
}
