import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AvatarValue, HeroPanelUtil } from './hero-panel.util';

@Component({
  selector: 'dfo-hero-panel',
  template: `
    <section class="avatar" matRipple (click)="select.emit()">
      <div class="user-image">
        <svg width="100%" height="100%" [dfoAvatar]="avatar"></svg>
      </div>
      <div class="user-name">
        {{ user.name }}
      </div>
    </section>
  `,
  styleUrls: [ './hero-panel.component.scss' ]
})
export class HeroPanelComponent implements OnChanges {

  @Input()
  user: AvatarValue;

  @Output()
  select: EventEmitter<void> = new EventEmitter<void>(true);

  avatar: string;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user) {
      this.updateAvatar(changes.user.currentValue);
    }
  }

  private updateAvatar(user: AvatarValue) {
    this.avatar = HeroPanelUtil.toValue(user.id, user.name);
  }


}
