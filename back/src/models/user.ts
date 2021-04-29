import { User } from 'utils/types';
import mongo, { Schema } from 'mongoose';
import { ObjectId } from 'bson';


const schema = new mongo.Schema<User>(
  {
    botUserKey: { required: true, type: String, unique: true },
    favorite: [{ type: ObjectId, required: true, ref: 'Patrtc' }],
    log: [{ type: String }],
  },
  {
    collection: 'user', // 컬렉션명 지정
  }
);
const UserModel = mongo.model<User & mongo.Document>('User', schema);
export default UserModel;
