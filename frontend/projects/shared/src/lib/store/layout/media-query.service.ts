import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { UpdateHorizontMode, UpdateVerticalMode } from './layout.actions';
import {
  HORIZONTAL_MEDIA_QUERY_LANDSCAPE,
  HORIZONTAL_MEDIA_QUERY_PORTRAIT,
  LayoutHorizontalMode,
  LayoutVerticalMode,
  VERTICAL_MEDIA_QUERY_LANDSCAPE
} from './layout.models';

const MEDIA_QUERY_DELAY = 100;

/**
 * The media query service observe the dimensions of the screen. It update the layout state automatically.
 */
@Injectable({
  providedIn: 'root'
})
export class MediaQueryService implements OnDestroy {

  horizontalMode$: Subscription;

  verticalMode$: Subscription;

  constructor(private store: Store, private breakpoint: BreakpointObserver) {
    this.initialMediaQueryObservers();
  }

  ngOnDestroy() {
    this.horizontalMode$.unsubscribe();
    this.verticalMode$.unsubscribe();
  }

  private initialMediaQueryObservers(): void {

    this.horizontalMode$ = this.breakpoint.observe([
      HORIZONTAL_MEDIA_QUERY_PORTRAIT, HORIZONTAL_MEDIA_QUERY_LANDSCAPE,
    ])
      .pipe(
        debounceTime(MEDIA_QUERY_DELAY),
        map(result => result.matches ? LayoutHorizontalMode.Large : LayoutHorizontalMode.Medium),
      )
      .subscribe((horizontalModeMode: LayoutHorizontalMode) => this.store.dispatch(new UpdateHorizontMode(horizontalModeMode)));

    this.verticalMode$ = this.breakpoint.observe([VERTICAL_MEDIA_QUERY_LANDSCAPE])
      .pipe(
        debounceTime(MEDIA_QUERY_DELAY),
        map(result => result.matches ? LayoutVerticalMode.Small : LayoutVerticalMode.Normal),
      )
      .subscribe((verticalMode: LayoutVerticalMode) => this.store.dispatch(new UpdateVerticalMode(verticalMode)));
  }
}
