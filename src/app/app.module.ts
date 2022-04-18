import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideComponent } from './aside/aside.component';
import { DescCardComponent } from './desc-card/desc-card.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { SignInButtonComponent } from './sign-in-button/sign-in-button.component';
import { HeadlineComponent } from './headline/headline.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { FooterComponent } from './footer/footer.component';
import { ServicesComponent } from './services/services.component';
import { SearchComponent } from './search/search.component';
import { AdvertismentComponent } from './advertisment/advertisment.component';
import { MediaComponent } from './media/media.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterWrapperComponent } from './footer-wrapper/footer-wrapper.component';
import { MediaCardComponent } from './media-card/media-card.component';
import { WeatherContentComponent } from './weather-content/weather-content.component';
import { NewsContentComponent } from './news-content/news-content.component';
import { NewsHeaderBlockComponent } from './news-header-block/news-header-block.component';
import { NewsListComponent } from './news-list/news-list.component';
import { MoneyRateComponent } from './money-rate/money-rate.component';
import { TrafficContentComponent } from './traffic-content/traffic-content.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardContentComponent } from './card-content/card-content.component';
import { FeedComponent } from './feed/feed.component';
import { CardComponent } from './card/card.component';
import { MediaCardHeaderComponent } from './media-card-header/media-card-header.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { CardCarouselItemComponent } from './card-carousel-item/card-carousel-item.component';
import { CardCarouselHeaderComponent } from './card-carousel-header/card-carousel-header.component';
import { CardCarouselContentComponent } from './card-carousel-content/card-carousel-content.component';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    DescCardComponent,
    ServiceListComponent,
    SignInButtonComponent,
    HeadlineComponent,
    FooterComponent,
    ServicesComponent,
    SearchComponent,
    AdvertismentComponent,
    MediaComponent,
    HeaderComponent,
    MainComponent,
    FooterWrapperComponent,
    MediaCardComponent,
    WeatherContentComponent,
    NewsContentComponent,
    NewsHeaderBlockComponent,
    NewsListComponent,
    MoneyRateComponent,
    TrafficContentComponent,
    CardHeaderComponent,
    CardContentComponent,
    FeedComponent,
    CardComponent,
    MediaCardHeaderComponent,
    CardFooterComponent,
    CardCarouselItemComponent,
    CardCarouselHeaderComponent,
    CardCarouselContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
