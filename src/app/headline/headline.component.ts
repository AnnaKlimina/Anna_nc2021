import { Component, OnInit } from '@angular/core';

import { getDate, getTime } from '../get-time';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.less'],
})
export class HeadlineComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    setInterval(function () {
      document.getElementById('current_date')!.innerHTML = getDate();
    }, 1000);

    setInterval(function () {
      document.getElementById('current_time')!.innerHTML = getTime();
    }, 1000);
  }
}
