import { Component, OnInit } from '@angular/core';
import { YandexService } from '../yandex.service';
import { Service } from '../interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
})
export class FooterComponent implements OnInit {
  footerService?: Service[];

  get() {
    this.yandexService
      .getFooterService()
      .subscribe(
        (footerServiceList) => (this.footerService = footerServiceList)
      );
  }

  constructor(private yandexService: YandexService) {}

  ngOnInit(): void {
    this.get();
  }
}
