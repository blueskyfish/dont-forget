import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AvatarValue, SidebarHeroUtil } from './sidebar-hero.util';

@Component({
  selector: 'dfo-hero-panel',
  template: `
    <section class="avatar" matRipple (click)="select.emit()">
      <div class="user-image">
        <svg width="100%" height="100%" [dfoAvatar]="avatar"></svg>
      </div>
      <div class="user-name">
        {{ user?.name }}
      </div>
    </section>
  `,
  styleUrls: [ './sidebar-hero.component.scss' ]
})
export class SidebarHeroComponent implements OnChanges {

  @Input()
  user: AvatarValue;

  @Output()
  select: EventEmitter<void> = new EventEmitter<void>(true);

  avatar: string;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user && changes.user.currentValue) {
      this.updateAvatar(changes.user.currentValue);
    }
  }

  private updateAvatar(user: AvatarValue) {
    this.avatar = SidebarHeroUtil.toValue(user.id, user.name);
  }


}
