import mongo, { Schema } from 'mongoose';

export type ServiceResult<T = undefined, R = undefined> = Promise<{
  success: boolean;
  reason?: T;
  result?: R;
}>;

export interface Patrtc {
  _id: Schema.Types.ObjectId;
  group: 'korwar';
  name_kor: String;
  name_chi: String;
  birth_year: Number;
  birth_month: Number;
  birth_day: Number;
  death_year: Number;
  death_month: Number;
  death_day: Number;
  place: String;
  serial: String;
  kind: String;
  unit: String;
  rank: String;
  detail: String;
  source: String;
}

export interface User {
  _id: Schema.Types.ObjectId;
  name: String;
  birth_year: Number;
  birth_month: Number;
  birth_day: Number;
  place: String;
  kind: String;
  unit: String;
  rank: String;
  favorite: Schema.Types.ObjectId[];
}

// export type ContextParam = {
//   value: String;
//   resolvedValue: String;
// }


export type PName = {
  _id: Schema.Types.ObjectId;
  name_kor: String;
  name_chi: String;
}

export type Date = {
  year: Number;
  month?: Number;
  day?: Number;
}

export type SysNumber = {
  amount: Number;
  unit?: any;
}

export type OptionName = 'name_kor' | 'birth_year' | 'birth_month' | 'birth_day' | 'death_year' | 'death_month' | 'death_day';

