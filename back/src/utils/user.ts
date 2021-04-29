import UserModel from 'models/user';
import PatrtcModel from 'models/patrtc';
import { Schema } from 'mongoose';
import { ObjectId } from 'bson';
import winston from 'winston';

export async function getUser(botUserKey: String) {
  const results1 = await UserModel.find({ botUserKey });
  if (results1.length === 0) {
    UserModel.create({ botUserKey, favorite: [] })
      .then((user) => {
        winston.log('[getUser] then :', JSON.stringify(user));
      })
      .catch((err) => {
        winston.log('[getUser] cathch :', JSON.stringify(err));
      });
  }
  const results = await UserModel.find({ botUserKey });
  if (results.length === 0) return undefined;
  return results[0];
}

export async function checkPatrtc(_id: ObjectId) {
  const result = await PatrtcModel.findById(_id);
  if (result) return true;
  return false;
}
