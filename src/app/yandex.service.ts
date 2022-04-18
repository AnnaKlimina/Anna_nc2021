import { Injectable, Input } from '@angular/core';

import { Service, Rate, Media, Card } from './interface';

import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class YandexService {
  constructor(private http: HttpClient) {}

  private asideServiceUrl = 'api/aside_service_list';
  private footerServiceUrl = 'api/footer_service_list';
  private yandexServiceUrl = 'api/yandex_service_list';
  private newsListUrl = 'api/news_list';
  private moneyRateUrl = 'api/money_rate_list';
  private weatherContentUrl = 'api/weather_content_list';
  private trafficContentUrl = 'api/traffic_content';
  private feedUrl = 'api/feed_content_list';

  private handleError<T>(result: T) {
    return function (error: any): Observable<T> {
      console.error(error);
      return of(result as T);
    };
  }

  private get<T>(url: string, defaultResult: any): Observable<T> {
    return this.http
      .get<T>(url)
      .pipe(catchError(this.handleError<T>(defaultResult)));
  }

  getServiceList(): Observable<Service[]> {
    return this.get<Service[]>(this.asideServiceUrl, []);
  }

  getSignInButton(): Observable<Service> {
    return this.get<Service>(this.asideServiceUrl + '/0', {
      icon: '',
      label: '',
      link: '',
      id: -1,
    });
  }

  getFooterService(): Observable<Service[]> {
    return this.get<Service[]>(this.footerServiceUrl, []);
  }

  getYandexService(): Observable<Service[]> {
    return this.get<Service[]>(this.yandexServiceUrl, []);
  }

  getYandexLogo(): Observable<Service> {
    return this.get<Service>(this.yandexServiceUrl + '/0', {
      icon: '',
      label: '',
      link: '',
      id: -1,
    });
  }

  getNewsContent(): Observable<Service[]> {
    return this.get<Service[]>(this.newsListUrl, []);
  }

  getMoneyRate(): Observable<Rate[]> {
    return this.get<Rate[]>(this.moneyRateUrl, []);
  }

  getWeatherContent(): Observable<Media[]> {
    return this.get<Media[]>(this.weatherContentUrl, []);
  }

  getTrafficContent(): Observable<Media> {
    return this.get<Media>(this.trafficContentUrl, {});
  }

  getFeed(): Observable<Card[]> {
    return this.get<Card[]>(this.feedUrl, {});
  }
}
