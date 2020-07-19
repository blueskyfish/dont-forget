import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dfo-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.scss']
})
export class PictureListComponent implements OnInit {

  @Input()
  color: string = '#999999';

  constructor() { }

  ngOnInit(): void {
  }

}
