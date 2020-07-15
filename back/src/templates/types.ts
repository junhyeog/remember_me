export type Button = {
  label: String; // 버튼에 적힐 문구
  action: 'block'; // 버튼 클릭시 수행될 작업
  messageText: String; // 블록 연결시 사용자의 발화로 노출될 문구
  blockId: String; // 호출할 블록의 id
}

export type QuickReply = {
  label: String; // 노출되는 문구
  action: 'block' | 'message'; // 클릭시 수행될 작업
  messageText: String; //클릭시 사용자의 발화로 노출될 문구
  blockId: String; // 호출할 블록의 id
  extra?: any;
}

export type BasicCard = {
  title?: String; // 
  description?: String; // 
  buttons?: Button[];
}

type ContextParamProp = {
  value: String;
  resolvedValue: String;
}

interface ContextParam extends Object {
  name_kor?: ContextParamProp;
  birth_year?: ContextParamProp;
  birth_month?: ContextParamProp;
  birth_day?: ContextParamProp;
}

export type Context = {
  name: String;
  lifeSpan?: Number;
  ttl?: Number;
  params: ContextParam;
}
export interface ClientExtra extends Object {
  page?: String;
  birth?: {
    year?: String;
    month?: String;
    day?: String;
  }
}
