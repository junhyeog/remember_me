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
  die_year: Number;
  die_month: Number;
  die_day: Number;
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
