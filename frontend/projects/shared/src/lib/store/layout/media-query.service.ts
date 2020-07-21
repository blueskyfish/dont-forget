import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { UpdateHorizontMode, UpdateVerticalMode } from 'projects/shared/src/lib/store/layout/layout.actions';
import { LayoutHorizontalMode, LayoutVerticalMode } from 'projects/shared/src/lib/store/layout/layout.models';
import { isLargeMode, isSmallMode } from 'projects/shared/src/lib/store/layout/layout.util';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

const MEDIA_QUERY_DELAY = 100;

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
      '(min-width: 768px) and (orientation: portrait)',
      '(min-width: 786px) and (orientation: landscape)'
    ])
      .pipe(
        debounceTime(MEDIA_QUERY_DELAY),
        map(result => result.matches ? LayoutHorizontalMode.Large : LayoutHorizontalMode.Medium),
      )
      .subscribe((horizontalModeMode: LayoutHorizontalMode) => this.store.dispatch(new UpdateHorizontMode(horizontalModeMode)));

    this.verticalMode$ = this.breakpoint.observe(['(max-height: 512px) and (orientation: landscape)'])
      .pipe(
        debounceTime(MEDIA_QUERY_DELAY),
        map(result => result.matches ? LayoutVerticalMode.Small : LayoutVerticalMode.Normal),
      )
      .subscribe((verticalMode: LayoutVerticalMode) => this.store.dispatch(new UpdateVerticalMode(verticalMode)));
  }
}
