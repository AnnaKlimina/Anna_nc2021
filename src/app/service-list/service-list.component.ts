import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../interface';
import { YandexService } from '../yandex.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.less'],
})
export class ServiceListComponent implements OnInit {
  @Input() serviceList?: Service[];

  constructor(private yandexService: YandexService) {}

  ngOnInit(): void {}
}
