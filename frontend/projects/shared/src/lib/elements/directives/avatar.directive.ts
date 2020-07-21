import { Directive, ElementRef, Input, NgZone, SimpleChanges } from '@angular/core';
import * as jdenticon from 'jdenticon';
import { Util } from 'projects/shared/src/lib/common/util';

@Directive({
  selector: '[dfoAvatar]'
})
export class AvatarDirective {

  @Input()
  dfoAvatar: string;

  constructor(private elem: ElementRef, private zone: NgZone) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dfoAvatar && changes.dfoAvatar.currentValue) {
      this.updateAvatar(changes.dfoAvatar.currentValue);
    }
  }

  private updateAvatar(data: string): void {
    const tag = Util.get(this.elem.nativeElement, 'tagName');
    if (Util.toUpper(tag) !== 'SVG') {
      console.log('> Warn: The avatar is only render in html element "SVG" (using => %s)', tag);
    }

    this.zone.run(() => jdenticon.update(this.elem.nativeElement, data));
  }

}
