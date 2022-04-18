import { Component, OnInit } from '@angular/core';

import { Service } from '../interface';

import { YandexService } from '../yandex.service';

@Component({
  selector: 'app-sign-in-button',
  templateUrl: './sign-in-button.component.html',
  styleUrls: ['./sign-in-button.component.less'],
})
export class SignInButtonComponent implements OnInit {
  private url = 'api/service_list';

  button?: Service;

  get() {
    this.yandexService
      .getSignInButton()
      .subscribe((button) => (this.button = button));
  }

  constructor(private yandexService: YandexService) {}

  ngOnInit(): void {
    this.get();
  }
}
