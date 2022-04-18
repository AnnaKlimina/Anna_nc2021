import { Component, OnInit, Input } from '@angular/core';

import { Service } from '../interface';

@Component({
  selector: 'app-desc-card',
  templateUrl: './desc-card.component.html',
  styleUrls: ['./desc-card.component.less'],
})
export class DescCardComponent implements OnInit {
  @Input() signInFlag?: boolean;

  @Input() serviceList?: Service[];

  constructor() {}

  ngOnInit(): void {}
}
