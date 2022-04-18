import { Component, OnInit, Input } from '@angular/core';

import { Card } from '../interface';

@Component({
  selector: 'app-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.less'],
})
export class CardFooterComponent implements OnInit {
  @Input() content?: Card;

  constructor() {}

  ngOnInit(): void {}
}
