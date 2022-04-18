import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
})
export class CardComponent implements OnInit {
  @Input() card?: Card;

  constructor() {}

  ngOnInit(): void {}
}
