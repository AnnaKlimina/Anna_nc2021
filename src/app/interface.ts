export interface Service {
  id?: number;
  icon?: string | string[];
  link: string;
  label?: string;
}

export interface Rate {
  id: number;
  currency: string;
  value: number;
  change: string;
}

export interface Media extends Service {
  header?: string;
  title?: string;
}

export interface Channel {
  link?: string;
  icon?: string;
  domain?: string;
  subheader?: string;
  content?: string;
}

export interface Card extends Channel {
  id?: number;
  domainIcon?: string;
  domainLink?: string;
  contentHeader?: string;
  likesCount?: string;
  date?: string;
  video?: string;
  watchCount?: number;
  carousel?: Channel[];
}
