import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.less'],
})
export class MediaCardComponent implements OnInit {
  @Input() newsContent: boolean = false;
  @Input() otherContent: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
