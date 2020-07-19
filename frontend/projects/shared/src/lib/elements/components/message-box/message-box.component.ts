import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type MessageKind = 'normal' | 'info' | 'warn';

@Component({
  selector: 'bike-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  @Input()
  kind: MessageKind = 'normal';

  @Input()
  title: string = null;

  @Input()
  withClose = true;

  @Output()
  closed: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  closing(): void {
    this.closed.emit();
  }
}
