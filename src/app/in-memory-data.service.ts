import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Service, Rate, Media, Card, Channel } from './interface';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const aside_service_list: Service[] = [
      {
        icon: 'https://yastatic.net/s3/home-static/_/Z/6/nfVezDRqofwQZ5e669DSK84Tw.svg',
        label: 'Войти',
        link: 'https://passport.yandex.ru/auth?origin=home_yandexid&retpath=https%3A%2F%2Fyandex.ru&backpath=https%3A%2F%2Fyandex.ru',
        id: 0,
      },
      {
        icon: 'https://yastatic.net/s3/home-static/_/7/b/D-rWsV7wtCTSK7KcKySHLQhwg.svg',
        label: 'Почта',
        link: 'https://passport.yandex.ru/auth?origin=home_disk&retpath=https%3A%2F%2Fdisk.yandex.ru%2F%3Fsource%3Ddomik-main&backpath=https%3A%2F%2Fyandex.ru',
        id: 1,
      },
      {
        icon: 'https://yastatic.net/s3/home-static/_/x/1/-TtNplC5O-tRjvwluglYJocbs.svg',
        label: 'Диск',
        link: 'https://passport.yandex.ru/auth?origin=home_disk&retpath=https%3A%2F%2Fdisk.yandex.ru%2F%3Fsource%3Ddomik-main&backpath=https%3A%2F%2Fyandex.ru',
        id: 2,
      },
      {
        icon: 'https://yastatic.net/s3/home-static/_/b/q/uyhbff3FsvR1n380s8eZAkOtI.svg',
        label: 'Попробовать Плюс',
        link: 'https://yabs.yandex.ru/count/WZyejI_zO0e2hH40X1rd7ZhO3zxKm0K02WCn1yceOG00000useqKG2H80c3M6738zjl4gR34muq1W049a07ewEQqpu20W0AO0UZevhHFk07yehZP8S011DW1ukJwc07e0R81y0A-meRx0x031EW4npBu1BsDjm681RsDjm6G1RsDjm6W1RNkDwW5ryOki0NNnYwu1TV6Bi05m8st0RW6WAW1oGREp6y8RAIbGga7dDdmF4XAW6Em1u20c3Iu1_upq0SI0idu2e2r6AeB43y8bZkSsG00cAvpjIdIw0kzZRS1y0iBw0oNGCwPlyF0ZUdIGg0Em8GzW12nyEKS2FWGW142wH9QtcpDXjKl4FWI0gWJ_ilfyBk6wzpW4zV6Bg0KryOkg1IzZRS1o1G2w1IC0jWLmOhsxAEFlFnZy90MtG6O5f2Meeq6eCaMWHUO5_BfYoce5md05xGIs1V0X3sW60km6DVoeeq6q1WX-1ZqwDRDwwRVyJo06P0P0Q0PgWEm6RWP__y1qXaIUM5YSrzpPN9sPN8lSZKvCYqpw1c0mWFm6O320u4Q__z37YJAns2O6jJ3Kx0Qyj_4ZiATzEr4zHe10000i1jJk1i3WXmDLtL1Eb1LL6GtSaPMD-aSW1t_VvaTg1u17G0uXB2OKQizENxBBMUBP1gARf7sDAIf33gNZTWHfq_9h1Y4nvgZjk40e5_V8d7W65ctmKrUrV7g1lY8JS6y213ZL0C1vDprhbZ5WPMFg0aCVhrDBjuZDk3JKW00~1',
        id: 3,
      },
      // {
      //   icon: '',
      //   label: '',
      //   link: '',
      //   id: 3,
      // },
    ];

    const yandex_service_list: Service[] = [
      {
        icon: "data:image/svg+xml;charset=utf8,%3Csvg width='140' height='100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M121.943 65.335c2.261 0 3.865-.412 5.057-1.275v-3.988c-1.234.863-2.714 1.398-4.77 1.398-3.494 0-4.933-2.714-4.933-6.99 0-4.482 1.768-6.784 4.975-6.784 1.891 0 3.741.658 4.728 1.275v-4.153c-1.028-.576-2.837-.987-5.263-.987-6.249 0-9.498 4.482-9.498 10.772 0 6.908 3.166 10.732 9.704 10.732zm-30.59-1.81v-3.988c-1.521 1.028-4.07 1.933-6.455 1.933-3.578 0-4.934-1.686-5.14-5.14h11.8v-2.59c0-7.195-3.166-9.909-8.058-9.909-5.962 0-8.8 4.564-8.8 10.813 0 7.196 3.537 10.69 9.786 10.69 3.125 0 5.428-.822 6.867-1.809zM46.537 44.242v8.182h-6.538v-8.182h-4.892v20.681h4.892V56.29h6.538v8.634h4.893v-20.68h-4.893zM73.509 61.06h-2.18V44.242H57.063v1.768c0 5.057-.328 11.595-2.055 15.049h-1.522v8.593h4.523v-4.729h10.978v4.729h4.523v-8.593zm33.468 3.864h5.55l-7.853-11.142 6.908-9.539h-4.934l-6.908 9.539v-9.539h-4.892v20.681h4.892V54.768l7.237 10.155zm-23.56-17.227c2.426 0 3.166 2.015 3.166 4.605v.411h-6.825c.124-3.29 1.316-5.016 3.66-5.016zm-16.98 13.363h-6.908c1.357-3.125 1.727-8.758 1.727-12.335v-.617h5.18V61.06z' fill='%23000'/%3E%3Cpath d='M30.995 64.923H26.02v-24.71H23.8c-4.07 0-6.208 2.055-6.208 5.098 0 3.453 1.48 5.057 4.522 7.113l2.508 1.686-7.236 10.813H12l6.496-9.662c-3.741-2.673-5.838-5.263-5.838-9.662 0-5.51 3.824-9.251 11.101-9.251h7.236v28.575z' fill='%23FC3F1D'/%3E%3C/svg%3E",
        link: 'https://yandex.ru/?clid=2343952-511&win=397',
        id: 0,
      },
      {
        icon: 'https://yastatic.net/s3/home/services/block/market_new2.svg',
        label: 'Маркет',
        link: 'https://market.yandex.ru/?clid=505&utm_source=main_stripe_big&wprid=1638456242.01452.85273.4246&src_pof=505&icookie=BjTSpthBw9GkYa2Whk6C28z7YgDYirwG%2BFRIGDZ5B%2Bh3NixA%2BPYuRqA%2Fpd%2FtlOaehj3GYxV3peccONF6LxLaov1SSZk%3D&utm_source_service=morda',
        id: 4,
      },
      {
        icon: 'https://yastatic.net/s3/home/services/block/video_new.svg',
        label: 'Видео',
        link: 'https://yandex.ru/video/?utm_source=main_stripe_big',
        id: 5,
      },
      {
        icon: 'https://yastatic.net/s3/home/services/block/images_new.svg',
        label: 'Картинки',
        link: 'https://yandex.ru/images/?utm_source=main_stripe_big',
        id: 6,
      },
      {
        icon: 'https://yastatic.net/s3/home/services/block/news_new.svg',
        label: 'Новости',
        link: 'https://yandex.ru/news/?utm_source=main_stripe_big',
        id: 7,
      },
      {
        icon: 'https://yastatic.net/s3/home/services/block/maps_new3.svg',
        label: 'Карты',
        link: 'https://yandex.ru/maps/?utm_source=main_stripe_big',
        id: 8,
      },
      {
        icon: 'https://yastatic.net/s3/home/services/block/translate_new.svg',
        label: 'Переводчик',
        link: 'https://translate.yandex.ru/?utm_source=main_stripe_big',
        id: 9,
      },
      {
        icon: 'https://yastatic.net/s3/home/services/block/music_new.svg',
        label: 'Музыка',
        link: 'https://music.yandex.ru/?utm_source=main_stripe_big',
        id: 10,
      },
      {
        icon: 'https://yastatic.net/s3/home/services/block/tv.svg',
        label: 'Программа',
        link: 'https://tv.yandex.ru/?utm_source=main_stripe_big',
        id: 11,
      },
      {
        icon: 'https://yastatic.net/s3/home/services/block/autoru_new.svg',
        label: 'Авто.ру',
        link: 'https://auto.ru/?utm_source=main_stripe_big',
        id: 12,
      },
      {
        icon: [
          'https://yastatic.net/s3/home/services/block/uslugi_new.svg',
          'https://yastatic.net/s3/home/services/block/kinopoisk_redesign0.svg',
          'https://yastatic.net/s3/home/services/block/travel_new.svg',
          'https://yastatic.net/s3/home/services/block/mail_new.svg',
        ],
        label: 'ещё',
        link: 'https://yandex.ru/all',
        id: 13,
      },
    ];

    const footer_service_list: Service[] = [
      {
        id: 1,
        label: 'Директ',
        link: 'https://direct.yandex.ru/?from=maintest_ru_razmestitrekl',
      },
      {
        id: 2,
        label: 'Метрика',
        link: 'https://metrika.yandex.ru/?utm_source=yandexru.v14w&utm_medium=web&utm_campaign=static',
      },
      {
        id: 3,
        label: 'Реклама',
        link: 'https://yandex.ru/adv/?from=main_bottom',
      },
      {
        id: 4,
        label: 'Вакансии',
        link: 'https://yandex.ru/jobs',
      },
      {
        id: 5,
        label: 'Блог',
        link: 'https://yandex.ru/blog/company/',
      },
      {
        id: 6,
        label: 'Компания',
        link: 'https://yandex.ru/company/',
      },
      {
        id: 7,
        label: 'About',
        link: 'https://yandex.ru/company/',
      },
      {
        id: 8,
        label: 'Конфиденциальность',
        link: 'https://yandex.ru/legal/confidential/',
      },
      {
        id: 9,
        label: 'Пользовательское соглашение',
        link: 'https://yandex.ru/legal/rules/',
      },
      {
        id: 10,
        label: 'Настройки',
        link: 'https://yandex.ru/tune/search?retpath=https%3A%2F%2Fyandex.ru%2F&nosync=1"',
      },
    ];

    const news_list: Service[] = [
      {
        id: 1,
        icon: 'https://avatars.mds.yandex.net/get-ynews-logo/135513/1040-1478692902361-square/logo-square',
        label:
          'Глава РФПИ Дмитриев заявил, что ВОЗ задерживает одобрение «Спутника V» из-за бюрократии',
        link: 'https://yandex.ru/news/story/Glava_RFPI_Dmitriev_zayavil_chto_VOZ_zaderzhivaet_odobrenie_Sputnika_V_iz-zabyurokratii--31303f658c90b0759734d57fdf8dc479?lang=ru&from=main_portal&fan=1&stid=N57j12trbfs7i_10bK98&t=1638497401&persistent_id=170845880&lr=213&msid=1638497867.25967.85479.155576&mlid=1638497401.glob_225.31303f65&utm_medium=topnews_news&utm_source=morda_desktop',
      },
      {
        id: 2,
        icon: 'https://avatars.mds.yandex.net/get-ynews-logo/135513/1040-1478692902361-square/logo-square',
        label:
          'Гендиректор «СДС-Уголь» заявил, что готов ответить за ЧП на шахте «Листвяжная»',
        link: 'https://yandex.ru/news/story/Gendirektor_SDS-Ugol_zayavil_chto_gotov_otvetit_zaCHP_nashakhte_Listvyazhnaya--909a28002bee5ae6405fe867d27081d7?lang=ru&from=main_portal&fan=1&stid=otT4hV-zc2Ia8M-SMdWs&t=1638497401&persistent_id=170859361&lr=213&msid=1638497867.25967.85479.155576&mlid=1638497401.glob_225.909a2800&utm_medium=topnews_news&utm_source=morda_desktop',
      },
      {
        id: 3,
        icon: 'https://avatars.mds.yandex.net/get-ynews-logo/135513/1002-1544074003449-square/logo-square',
        label:
          'Глава МИД России Лавров: Москва отреагирует, если США введут против нее новые санкции',
        link: 'https://yandex.ru/news/story/Glava_MID_Rossii_Lavrov_Moskva_otreagiruet_esli_SSHA_vvedut_protiv_nee_novye_sankcii--8c9b5315845286bf90b58afa1fa6949e?lang=ru&from=main_portal&fan=1&stid=foUG1mFRnQw-5wORaKhF&t=1638497401&persistent_id=170855663&lr=213&msid=1638497867.25967.85479.155576&mlid=1638497401.glob_225.8c9b5315&utm_medium=topnews_news&utm_source=morda_desktop',
      },
      {
        id: 4,
        icon: 'https://avatars.mds.yandex.net/get-ynews-logo/135513/1002-1544074003449-square/logo-square',
        label:
          '«Ведомости»: Минтранс отказался от идеи проверки QR-кодов при продаже билетов на самолет',
        link: 'https://yandex.ru/news/story/Vedomosti_Mintrans_otkazalsya_otidei_proverki_QR-kodov_priprodazhe_biletov_nasamolet--96a6c7e4032ad010cd925b0b8f00c8b3?lang=ru&from=main_portal&fan=1&stid=9vZjfyk9o7n65SdbGmKm&t=1638497401&persistent_id=170865413&lr=213&msid=1638497867.25967.85479.155576&mlid=1638497401.glob_225.96a6c7e4&utm_medium=topnews_news&utm_source=morda_desktop',
      },
      {
        id: 5,
        icon: 'https://avatars.mds.yandex.net/get-ynews-logo/135513/1040-1478692902361-square/logo-square',
        label:
          'Глава МИД Норвегии Витфельдт выступила против нахождения войск НАТО около России',
        link: 'https://yandex.ru/news/story/Glava_MID_Norvegii_Vitfeldt_vystupila_protiv_nakhozhdeniya_vojsk_NATO_okolo_Rossii--188f76469e28a24ba3f8c029813a38c1?lang=ru&from=main_portal&fan=1&stid=UV8gsJ1UvtkyBgL4BjuJ&t=1638497401&persistent_id=170844910&lr=213&msid=1638497867.25967.85479.155576&mlid=1638497401.glob_225.188f7646&utm_medium=topnews_news&utm_source=morda_desktop',
      },
    ];

    const money_rate_list: Rate[] = [
      {
        id: 1,
        currency: 'USD',
        value: 73.67,
        change: '-0.63',
      },
      {
        id: 1,
        currency: 'EUR',
        value: 83.27,
        change: '-0.73',
      },
      {
        id: 1,
        currency: 'НЕФТЬ',
        value: 70.31,
        change: '+2.33%',
      },
    ];

    const weather_content_list: Media[] = [
      {
        id: 0,
        link: 'https://yandex.ru/pogoda/?utm_campaign=informer&utm_content=main_informer&utm_medium=web&utm_source=home&utm_term=main_number',
        title: 'пасмурно',
        header: '',
        icon: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3e%3cdefs%3e%3cradialGradient cx='88.2%25' cy='11.31%25' fx='88.2%25' fy='11.31%25' r='51.28%25' gradientTransform='matrix(0 -.975 1 0 .77 .97)' id='a'%3e%3cstop stop-color='%239699C7' offset='0%25'/%3e%3cstop stop-color='%239499C9' stop-opacity='0' offset='100%25'/%3e%3c/radialGradient%3e%3cradialGradient cx='8.17%25' cy='-6.53%25' fx='8.17%25' fy='-6.53%25' r='65.22%25' gradientTransform='matrix(0 -.975 1 0 .15 .01)' id='b'%3e%3cstop stop-color='%239699C7' offset='0%25'/%3e%3cstop stop-color='%239499C9' stop-opacity='0' offset='100%25'/%3e%3c/radialGradient%3e%3clinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='c'%3e%3cstop stop-color='%23A4C5F4' offset='0%25'/%3e%3cstop stop-color='%23A7C7F2' offset='100%25'/%3e%3c/linearGradient%3e%3cradialGradient cx='88.2%25' cy='9.46%25' fx='88.2%25' fy='9.46%25' r='49.38%25' gradientTransform='matrix(0 -.975 1 0 .79 .95)' id='d'%3e%3cstop stop-color='%23486DA8' offset='0%25'/%3e%3cstop stop-color='%23486DA8' stop-opacity='0' offset='100%25'/%3e%3c/radialGradient%3e%3cradialGradient cx='14.44%25' cy='0%25' fx='14.44%25' fy='0%25' r='51.28%25' gradientTransform='matrix(0 -.975 1 0 .14 .14)' id='e'%3e%3cstop stop-color='%23486DA8' offset='0%25'/%3e%3cstop stop-color='%23486DA8' stop-opacity='0' offset='100%25'/%3e%3c/radialGradient%3e%3clinearGradient x1='50%25' y1='0%25' x2='50%25' y2='122.37%25' id='f'%3e%3cstop stop-color='%23A4C5F4' offset='0%25'/%3e%3cstop stop-color='%23A7C7F2' offset='100%25'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg fill='none' fill-rule='evenodd'%3e%3cpath d='M29.07 21.55a4.29 4.29 0 1 0-.04-8.57 5.71 5.71 0 0 0-11.07-2.59 5.71 5.71 0 1 0-1.75 11.16h12.86z' fill='%2373A5E6' opacity='.32'/%3e%3cg transform='translate(3 10.55)'%3e%3cellipse fill='url(%23a)' opacity='.2' cx='7.5' cy='12.31' rx='6' ry='6.15'/%3e%3cellipse fill='url(%23b)' opacity='.2' cx='23.25' cy='14.62' rx='3.75' ry='3.85'/%3e%3cpath d='M7.5 18.46c-3.31 0-6-2.75-6-6.15 0-3.4 2.69-6.16 6-6.16a6 6 0 0 1 1.8.28 6.78 6.78 0 0 1 6.45-4.9 6.84 6.84 0 0 1 6.67 8 4.4 4.4 0 0 1 1.58-.3c2.49 0 4.5 2.07 4.5 4.62a4.56 4.56 0 0 1-4.5 4.61H7.5z' fill='url(%23c)'/%3e%3cellipse fill='url(%23d)' opacity='.34' cx='7.5' cy='12.31' rx='6' ry='6.15'/%3e%3cellipse fill='url(%23e)' opacity='.2' cx='24' cy='13.85' rx='4.5' ry='4.62'/%3e%3cellipse fill='url(%23f)' cx='15.75' cy='8.46' rx='6.75' ry='6.92'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e",
        label: '+2°',
      },
      {
        id: 1,
        link: 'https://yandex.ru/pogoda/?utm_campaign=informer&utm_content=main_informer&utm_medium=web&utm_source=home&utm_term=next_day_part',
        title: '',
        header: 'Днём',
        icon: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3e%3cdefs%3e%3cradialGradient cx='88.2%25' cy='11.31%25' fx='88.2%25' fy='11.31%25' r='51.28%25' gradientTransform='matrix(0 -.975 1 0 .77 .97)' id='a'%3e%3cstop stop-color='%239699C7' offset='0%25'/%3e%3cstop stop-color='%239499C9' stop-opacity='0' offset='100%25'/%3e%3c/radialGradient%3e%3cradialGradient cx='8.17%25' cy='-6.53%25' fx='8.17%25' fy='-6.53%25' r='65.22%25' gradientTransform='matrix(0 -.975 1 0 .15 .01)' id='b'%3e%3cstop stop-color='%239699C7' offset='0%25'/%3e%3cstop stop-color='%239499C9' stop-opacity='0' offset='100%25'/%3e%3c/radialGradient%3e%3clinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='c'%3e%3cstop stop-color='%23A4C5F4' offset='0%25'/%3e%3cstop stop-color='%23A7C7F2' offset='100%25'/%3e%3c/linearGradient%3e%3cradialGradient cx='88.2%25' cy='9.46%25' fx='88.2%25' fy='9.46%25' r='49.38%25' gradientTransform='matrix(0 -.975 1 0 .79 .95)' id='d'%3e%3cstop stop-color='%23486DA8' offset='0%25'/%3e%3cstop stop-color='%23486DA8' stop-opacity='0' offset='100%25'/%3e%3c/radialGradient%3e%3cradialGradient cx='14.44%25' cy='0%25' fx='14.44%25' fy='0%25' r='51.28%25' gradientTransform='matrix(0 -.975 1 0 .14 .14)' id='e'%3e%3cstop stop-color='%23486DA8' offset='0%25'/%3e%3cstop stop-color='%23486DA8' stop-opacity='0' offset='100%25'/%3e%3c/radialGradient%3e%3clinearGradient x1='50%25' y1='0%25' x2='50%25' y2='122.37%25' id='f'%3e%3cstop stop-color='%23A4C5F4' offset='0%25'/%3e%3cstop stop-color='%23A7C7F2' offset='100%25'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg transform='translate(3 6.55)'%3e%3cellipse fill='url(%23a)' opacity='.2' cx='7.5' cy='12.31' rx='6' ry='6.15'/%3e%3cellipse fill='url(%23b)' opacity='.2' cx='23.25' cy='14.62' rx='3.75' ry='3.85'/%3e%3cpath d='M7.5 18.46c-3.31 0-6-2.75-6-6.15 0-3.4 2.69-6.16 6-6.16a6 6 0 0 1 1.8.28 6.78 6.78 0 0 1 6.45-4.9 6.84 6.84 0 0 1 6.67 8 4.4 4.4 0 0 1 1.58-.3c2.49 0 4.5 2.07 4.5 4.62a4.56 4.56 0 0 1-4.5 4.61H7.5z' fill='url(%23c)'/%3e%3cellipse fill='url(%23d)' opacity='.34' cx='7.5' cy='12.31' rx='6' ry='6.15'/%3e%3cellipse fill='url(%23e)' opacity='.2' cx='24' cy='13.85' rx='4.5' ry='4.62'/%3e%3cellipse fill='url(%23f)' cx='15.75' cy='8.46' rx='6.75' ry='6.92'/%3e%3c/g%3e%3cpath d='M8.7 28.63l-1.57 3.75m9.07-5.25l-1.57 3.75' stroke='%2366AFEB' stroke-width='2.25' stroke-linecap='round' stroke-linejoin='round'/%3e%3cg fill='%2367C8E2' fill-rule='nonzero'%3e%3cpath d='M22 28a1 1 0 1 1 2 0v6a1 1 0 1 1-2 0v-6z'/%3e%3cpath d='M19.9 30.37a1 1 0 1 1 1-1.73l5.2 2.99a1 1 0 1 1-1 1.73l-5.2-2.99z'/%3e%3cpath d='M25.1 28.64a1 1 0 1 1 1 1.73l-5.2 3a1 1 0 1 1-1-1.74l5.2-3z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e",
        label: '2°',
      },
      {
        id: 2,
        link: 'https://yandex.ru/pogoda/?utm_campaign=informer&utm_content=main_informer&utm_medium=web&utm_source=home&utm_term=next_day_part',
        title: '',
        header: 'Вечером',
        icon: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3e%3cdefs%3e%3cradialGradient cx='88.2%25' cy='11.31%25' fx='88.2%25' fy='11.31%25' r='51.28%25' gradientTransform='matrix(0 -.975 1 0 .77 .97)' id='a'%3e%3cstop stop-color='%239699C7' offset='0%25'/%3e%3cstop stop-color='%239499C9' stop-opacity='0' offset='100%25'/%3e%3c/radialGradient%3e%3cradialGradient cx='8.17%25' cy='-6.53%25' fx='8.17%25' fy='-6.53%25' r='65.22%25' gradientTransform='matrix(0 -.975 1 0 .15 .01)' id='b'%3e%3cstop stop-color='%239699C7' offset='0%25'/%3e%3cstop stop-color='%239499C9' stop-opacity='0' offset='100%25'/%3e%3c/radialGradient%3e%3clinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='c'%3e%3cstop stop-color='%23A4C5F4' offset='0%25'/%3e%3cstop stop-color='%23A7C7F2' offset='100%25'/%3e%3c/linearGradient%3e%3cradialGradient cx='88.2%25' cy='9.46%25' fx='88.2%25' fy='9.46%25' r='49.38%25' gradientTransform='matrix(0 -.975 1 0 .79 .95)' id='d'%3e%3cstop stop-color='%23486DA8' offset='0%25'/%3e%3cstop stop-color='%23486DA8' stop-opacity='0' offset='100%25'/%3e%3c/radialGradient%3e%3cradialGradient cx='14.44%25' cy='0%25' fx='14.44%25' fy='0%25' r='51.28%25' gradientTransform='matrix(0 -.975 1 0 .14 .14)' id='e'%3e%3cstop stop-color='%23486DA8' offset='0%25'/%3e%3cstop stop-color='%23486DA8' stop-opacity='0' offset='100%25'/%3e%3c/radialGradient%3e%3clinearGradient x1='50%25' y1='0%25' x2='50%25' y2='122.37%25' id='f'%3e%3cstop stop-color='%23A4C5F4' offset='0%25'/%3e%3cstop stop-color='%23A7C7F2' offset='100%25'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg transform='translate(3 6.55)'%3e%3cellipse fill='url(%23a)' opacity='.2' cx='7.5' cy='12.31' rx='6' ry='6.15'/%3e%3cellipse fill='url(%23b)' opacity='.2' cx='23.25' cy='14.62' rx='3.75' ry='3.85'/%3e%3cpath d='M7.5 18.46c-3.31 0-6-2.75-6-6.15 0-3.4 2.69-6.16 6-6.16a6 6 0 0 1 1.8.28 6.78 6.78 0 0 1 6.45-4.9 6.84 6.84 0 0 1 6.67 8 4.4 4.4 0 0 1 1.58-.3c2.49 0 4.5 2.07 4.5 4.62a4.56 4.56 0 0 1-4.5 4.61H7.5z' fill='url(%23c)'/%3e%3cellipse fill='url(%23d)' opacity='.34' cx='7.5' cy='12.31' rx='6' ry='6.15'/%3e%3cellipse fill='url(%23e)' opacity='.2' cx='24' cy='13.85' rx='4.5' ry='4.62'/%3e%3cellipse fill='url(%23f)' cx='15.75' cy='8.46' rx='6.75' ry='6.92'/%3e%3c/g%3e%3cpath d='M8.7 28.63l-1.57 3.75m9.07-5.25l-1.57 3.75' stroke='%2366AFEB' stroke-width='2.25' stroke-linecap='round' stroke-linejoin='round'/%3e%3cg fill='%2367C8E2' fill-rule='nonzero'%3e%3cpath d='M22 28a1 1 0 1 1 2 0v6a1 1 0 1 1-2 0v-6z'/%3e%3cpath d='M19.9 30.37a1 1 0 1 1 1-1.73l5.2 2.99a1 1 0 1 1-1 1.73l-5.2-2.99z'/%3e%3cpath d='M25.1 28.64a1 1 0 1 1 1 1.73l-5.2 3a1 1 0 1 1-1-1.74l5.2-3z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e",
        label: '1°',
      },
    ];

    const traffic_content: Media = {
      id: 0,
      link: 'https://yandex.ru/maps/213/moscow/probki',
      icon: 'https://yastatic.net/s3/home-static/_/t/n/RM2IxJqDgcoNFZNbH1g6NU8l0.svg',
      title: 'Ближайшие 5 часов движение затруднено',
      label: '4',
    };

    const channels: Channel[] = [
      {
        link: 'https://zen.yandex.ru/kaspersky_ru?lang=ru&country_code=ru&referrer_clid=500&referrer_place=export&hide_interest_header=1&from_page=other_page',
        icon: 'https://avatars.mds.yandex.net/get-zen-logos/200214/pub_5cde8def00ad2100b39395a1_60b4d9f0a54cdb73846a6083/xxh',
        domain: 'Лаборатория Касперского',
        subheader: 'Активируй будущее!',
        content: '7530',
      },
      {
        link: 'https://zen.yandex.ru/html_academy?lang=ru&country_code=ru&referrer_clid=500&referrer_place=export&hide_interest_header=1&from_page=other_page',
        icon: 'https://avatars.mds.yandex.net/get-zen-logos/1540393/pub_59c13015a867310131b84b98_602a46f70454f6146ae0a84e/xxh',
        domain: 'HTML Academy',
        subheader: 'Курсы для каждого, кто хочет окунуться в мир вёрстки и...',
        content: '13К',
      },
      {
        link: 'https://zen.yandex.ru/androidsoftware?lang=ru&country_code=ru&referrer_clid=500&referrer_place=export&hide_interest_header=1&from_page=other_page',
        icon: 'https://avatars.mds.yandex.net/get-zen-logos/1520972/pub_60fe79875590e24129d47ede_60fe8713caa93609b6f18955/xxh',
        domain: 'Android Software',
        subheader: 'На моём канале вы найдёте обзоры различных программ...',
        content: '11.3K',
      },
      {
        link: 'https://zen.yandex.ru/esp32?lang=ru&country_code=ru&referrer_clid=500&referrer_place=export&hide_interest_header=1&from_page=other_page',
        icon: 'https://avatars.mds.yandex.net/get-zen-logos/200214/pub_5d5ff446998ed600ad85b50c_60a0d87b76444c347577b0a3/xxh',
        domain: 'Электроника, ESP32, Arduino',
        subheader: 'Проекты для тех, кто хотел бы делать нечто большее, чем...',
        content: '5735',
      },
      {
        link: 'https://zen.yandex.ru/poznyaevru?lang=ru&country_code=ru&referrer_clid=500&referrer_place=export&hide_interest_header=1&from_page=other_page',
        icon: 'https://avatars.mds.yandex.net/get-zen-logos/212539/pub_599a922f50c9e5a72de44a98_5f92947db28cf05184463129/xxh',
        domain: 'Блог системного администрирования',
        subheader: 'Пишу статьи по работе с Windows, Linux и MacOS...',
        content: '94.2К',
      },
      {
        link: 'https://zen.yandex.ru/rumicom?lang=ru&country_code=ru&referrer_clid=500&referrer_place=export&hide_interest_header=1&from_page=other_page',
        icon: 'https://avatars.mds.yandex.net/get-zen-logos/1540393/pub_5abd084edb0cd906818b40e9_6193c9d11383af4131b4dffe/xxh',
        domain: 'Xiaomi News',
        subheader: 'Читайте самые свежие новости из мира Xiaomi',
        content: '9185',
      },
      {
        link: 'https://zen.yandex.ru/oskardroid112?lang=ru&country_code=ru&referrer_clid=500&referrer_place=export&hide_interest_header=1&from_page=other_page',
        icon: 'https://avatars.mds.yandex.net/get-zen-logos/201842/pub_5f21df0a4eefe07da929b0a2_5f377ad6553f996670aaaf19/xxh',
        domain: 'Оскардроид112',
        subheader: 'ЗДРАВСТВУЙТЕ, МЕНЯ ЗОВУТ СЕРГЕЙ. Я АВТОР ККАНАЛА...',
        content: '5819',
      },
      {
        link: 'https://zen.yandex.ru/id/5f38f4fb7b55c53554b0d908?lang=ru&country_code=ru&referrer_clid=500&referrer_place=export&hide_interest_header=1&from_page=other_page',
        icon: 'https://avatars.mds.yandex.net/get-zen-logos/201842/pub_5f38f4fb7b55c53554b0d908_5feabca8e08bb3522f3e8b4c/xxh',
        domain: 'ПК ДЛЯ ВСЕХ',
        subheader: 'ПК для ВСЕХ - канал, где интернет-пользователи могут...',
        content: '5217',
      },
    ];

    const feed_content_list: Card[] = [
      {
        id: 1,
        link: 'https://zen.yandex.ru/media/timeout.ru/6-emocionalno-tiajelyh-filmov-kotorye-nevozmojno-smotret-dvajdy-6109522a30e03d296274c3bb?from=feed&utm_referrer=https%3A%2F%2Fzen.yandex.com&rid=2457682457.97.1638527943501.66296&integration=morda_zen_lib&place=export&secdata=CKWQpemwLyABMAJQqwZYAWoBAQ%3D%3D&',
        icon: 'https://avatars.mds.yandex.net/get-zen_doc/4488311/pub_6109522a30e03d296274c3bb_6109523746b3276518af1c49/smart_crop_356x267',
        domain: 'Time Out',
        domainIcon:
          'https://avatars.mds.yandex.net/get-zen-logos/212539/pub_5ec6a7e4bdf7b3781050ea4b_5ec6abe33f82a0156eff23de/36x36_2x',
        domainLink:
          'https://zen.yandex.ru/s7_airlines?country_code=ru&lang=ru&hide_interest_header=1&from_page=other_page',
        contentHeader: '6 эмоционально тяжелых фильмов',
        content: `Одни фильмы отлично справляются с ролью белого шума на заднем плане,
            другие – позволяют разгрузить голову или отдохнуть душой. Но есть и
            такое кино, которое по-настоящему вовлекает, затягивает, его хочется
            досмотреть до конца и остаться под впечатлением. Time Out выбрал 6
            эмоциональных кинолент, которые трудно смотреть дважды. Жизнь
            прекрасна КиноПоиск: 8.6 IMDb: 8.6 Пожалуй, один их самых
            трогательных, но травмирующих душу фильмов. Это трагическая история
            о маленьком мальчике и его отце, который придумывает игру, чтобы не
            пугать ребенка жестокой правдой: они в концлагере...`,
        likesCount: '3.7 тыс.',
        subheader: '25 тыс. подписчиков',
        date: '3 августа',
      },
      {
        id: 2,
        link: 'https://diletant.media/articles/45300589/?utm_referrer=https%3A%2F%2Fzen.yandex.com',
        domainIcon:
          'https://avatars.mds.yandex.net/get-zen-logos/212539/pub_5a8af514799d9d0af2bd59d6_607d62f754617a67e71a182d/36x36_2x',
        domain: 'diletant.media',
        icon: 'https://avatars.mds.yandex.net/get-direct/5274980/xQt5EAMXXy085gsTUMpAmw/x450',
        domainLink:
          'https://zen.yandex.ru/diletant.media?country_code=ru&lang=ru&hide_interest_header=1&from_page=other_page',
        contentHeader: 'Фридрих Вильгельм - великий курфюрист',
        content: `Юноша получил в наследство слабое разорённое княжество и превратил
            его в сильное государство. Его называли деспотом, но слушались и
            работали на благо Пруссии.Терпение и труд Фридриха Вильгельма из
            династии Гогенцоллернов ещё при жизни стали называть Великим
            курфюрстом. Среди его современников лишь Людовик XIV удостоился
            такого уважения. Когда в 20 лет Фридрих Вильгельм встал во главе
            Бранденбурга и Пруссии (в 1640 г.), он имел лишь опустошённые войной
            земли. Отец умер, а его советники не любили наследника...`,
        likesCount: '5 тыс.',
        subheader: '118 тыс. подписчиков',
        date: '16 сентября',
      },
      {
        id: 3,
        link: 'https://zen.yandex.ru/s7_airlines?country_code=ru&lang=ru&hide_interest_header=1&from_page=other_page',
        domain: 'S7 Airlines',
        domainIcon:
          'https://avatars.mds.yandex.net/get-zen-logos/223306/pub_616d7c4b6586c159349734d1_61893362348b141844f4b915/36x36_2x',
        domainLink:
          'https://zen.yandex.ru/s7_airlines?country_code=ru&lang=ru&hide_interest_header=1&from_page=other_page',
        contentHeader: 'S7 Airlines - Есть место для каждого воспоминания',
        likesCount: '9.8 тыс.',
        subheader: '123 тыс. подписчиков',
        date: '287 295 просмотров',
        video: 'https://my-yandex-copy-app.herokuapp.com/S7.mp4',
      },

      {
        id: 4,
        domain: 'Технологии и интернет',
        subheader: 'Выбирайте и подписывайтесь',
        carousel: channels,
      },
    ];

    return {
      aside_service_list,
      footer_service_list,
      yandex_service_list,
      news_list,
      money_rate_list,
      weather_content_list,
      traffic_content,
      feed_content_list,
    };
  }

  constructor() {}
}
