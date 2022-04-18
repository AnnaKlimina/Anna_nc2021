import { Component, OnInit, Input } from '@angular/core';

import { Card } from '../interface';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.less'],
})
export class CardContentComponent implements OnInit {
  @Input() content?: Card;

  constructor() {}

  ngOnInit(): void {}
}
