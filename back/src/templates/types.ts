export type Button = {
  label: String; // 버튼에 적힐 문구
  action: 'block' | 'webLink'; // 버튼 클릭시 수행될 작업
  messageText?: String; // 블록 연결시 사용자의 발화로 노출될 문구
  blockId?: String; // 호출할 블록의 id
  webLinkUrl?: String;
  extra?: any;
}

export type QuickReply = {
  label: String; // 노출되는 문구
  action: 'block' | 'message' // 클릭시 수행될 작업
  messageText?: String; //클릭시 사용자의 발화로 노출될 문구
  blockId: String; // 호출할 블록의 id
  extra?: any;
}

export interface Thumbnail {
  imageUrl: String
}

export type BasicCard = {
  title?: String; // 
  description?: String; // 
  thumbnail?: Thumbnail;
  buttons?: Button[];
}

interface ContextParams extends Object {
  name_kor?: String;
  birth_year?: Number;
  birth_month?: Number;
  birth_day?: Number;
  death_year?: Number;
  death_month?: Number;
  death_day?: Number;
}

export type Context = {
  name: String;
  lifeSpan: Number;
  params: ContextParams;
}

type ContextParamProp = {
  value: String;
  resolvedValue: String;
}

interface ReqContextParams extends Object {
  name_kor?: ContextParamProp;
  birth_year?: ContextParamProp;
  birth_month?: ContextParamProp;
  birth_day?: ContextParamProp;
  death_year?: ContextParamProp;
  death_month?: ContextParamProp;
  death_day?: ContextParamProp;
}
export interface ReqContext {
  name: String;
  lifespan: Number;
  ttl: Number;
  params: ReqContextParams;
}
export interface ClientExtra extends Object {
  page?: String;
  birth?: {
    year?: String;
    month?: String;
    day?: String;
  }
}

export interface CarouselHeader {
  title?: String;
  description?: String;
  thumbnail?: Thumbnail;
}

export interface Carousel {
  type: String;
  items: BasicCard[];
  header?: CarouselHeader;
}