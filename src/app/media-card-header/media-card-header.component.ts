import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../interface';

@Component({
  selector: 'app-media-card-header',
  templateUrl: './media-card-header.component.html',
  styleUrls: ['./media-card-header.component.less'],
})
export class MediaCardHeaderComponent implements OnInit {
  @Input() cardHeaderContent?: Service[];
  constructor() {}

  ngOnInit(): void {}
}
