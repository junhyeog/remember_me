import { Patrtc } from 'utils/types';
import mongo, { Schema } from 'mongoose';

const schema = new mongo.Schema<Patrtc>(
  {
    _id: { required: true, type: Schema.Types.ObjectId },
    group: { required: true, type: 'korwar' },
    name_kor: { required: true, type: String },
    name_chi: { type: String },
    birth_year: { type: Number },
    birth_month: { type: Number },
    birth_day: { type: Number },
    die_year: { type: Number },
    die_month: { type: Number },
    die_day: { type: Number },
    place: { type: String },
    kind: { type: String },
    rank: { type: String },
    detail: { type: String },
    source: { type: String }
  },
  {
    collection: 'patrtc', // 컬렉션명 지정
  }
);
const PatrtcModel = mongo.model<Patrtc & mongo.Document>('Patrtc', schema);
export default PatrtcModel;
