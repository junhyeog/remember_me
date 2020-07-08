import { ObjectId } from 'bson';

export type ServiceResult<T = undefined, R = undefined> = Promise<{
  success: boolean;
  reason?: T;
  result?: R;
}>;

export type Patrtc = {
  _id: ObjectId;
  name_kor: String;
  name_chi: String;
  birth_year: Number;
  birth_month: Number;
  birth_day: Number;
  die_year: Number;
  die_month: Number;
  die_day: Number;
  place: String;
  kind: String;
  rank: String;
  detail: String;
  source: String;
}

export type PName = {
  _id: ObjectId;
  name_kor: String;
  name_chi: String;
}

export type Date = {
  year: Number;
  month?: Number;
  day?: Number;
}
