import { Component, OnInit, Input } from '@angular/core';

import { Card } from '../interface';

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.less'],
})
export class CardHeaderComponent implements OnInit {
  @Input() content?: Card;

  constructor() {}

  ngOnInit(): void {}
}
