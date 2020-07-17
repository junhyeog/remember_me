import { ServiceResult, Patrtc } from 'utils/types';
import { BasicCard, ResBody, SimpleText, ErrRes } from 'templates';
import BlockId from 'utils/blockId';
import { ClientExtra, QuickReply } from 'templates/types';
import { checkPatrtc, getUser } from 'utils/user';
import UserModel from 'models/user';
import Mongoose, { Schema, Types } from 'mongoose';
import { ObjectId } from 'bson';
import { parseRow, resultsToOutputs, resultsToOutputs2 } from 'utils/result';
import { RESULT_SIZE } from 'utils/constant';

const showQuick: QuickReply = {
  label: '즐겨찾기⭐',
  action: 'block',
  // messageText:' 즐겨찾기',
  blockId: BlockId.user_favorite_get
};
const homeQuick: QuickReply = {
  label: '홈🏡',
  action: 'block',
  messageText: '홈',
  blockId: BlockId.main_home,
};


/**
 * @description 즐쳐찾기 보기
 * @param botUserKey user의 id(botUserKey)
 */
export async function favorite_get(botUserKey: String, clientExtra: ClientExtra): ServiceResult<'FAVORITE/ADD', Object> {
  console.log('=======================');
  console.log('[favorite_get] param botUserKey:', botUserKey);
  const user = await getUser(botUserKey);
  if (!user) return { success: true, result: ErrRes };
  const res = await UserModel.find({ botUserKey }).populate('favorite');
  if (res.length === 0) return { success: true, result: ErrRes };
  //* page 설정
  let page = 0;
  if (clientExtra?.page) {
    page = Number(clientExtra.page);
  }
  console.log('[favorite_get] page test (page): ', page);
  const patrtcs = res[0].favorite.slice(page * RESULT_SIZE, (page + 1) * RESULT_SIZE);
  //* QuickReplies
  const nextQuick: QuickReply = {
    label: '다음 결과',
    action: 'block',
    messageText: '다음 결과 보기',
    blockId: BlockId.main_today,
    extra: {
      page: page + 1
    }
  };
  const preQuick: QuickReply = {
    label: '이전 결과',
    action: 'block',
    messageText: '이전 결과 보기',
    blockId: BlockId.main_today,
    extra: {
      page: page - 1
    }
  };
  const quickReplies: QuickReply[] = [];
  if (page > 0) {
    quickReplies.push(preQuick);
  }
  if (patrtcs.length >= RESULT_SIZE) {
    quickReplies.push(nextQuick);
  }
  quickReplies.push(homeQuick);
  return {
    result: ResBody({ outputs: resultsToOutputs2(page, <(Patrtc & Mongoose.Document)[]><unknown>patrtcs), quickReplies }),
    success: true
  };
}

/**
 * @description 즐쳐찾기 추가
 * @param botUserKey user의 id(botUserKey)
 * @param _id 즐겨찾고자 하는 호국영령의 _id
 */
export async function favorite_add(botUserKey: String, _id1: String): ServiceResult<'FAVORITE/ADD', Object> {
  console.log('=======================');
  const _id = <ObjectId><unknown>_id1;
  console.log('[favorite_add] param botUserKey:', botUserKey);
  console.log('[favorite_add] param _id:', _id);
  const res = await checkPatrtc(_id);
  if (!res) return { success: true, result: ErrRes };
  console.log('1111111');
  getUser(botUserKey)
    .then((user) => {
      if (!user) {
        console.log('범인2');
        return { success: true, result: ErrRes };
      }
      else {
        console.log('2222222');
        console.log('[favorite_add] pushed before:', user.favorite);
      }
    });
  //check
  const fav = await UserModel.findOne({ botUserKey });
  if (fav) {
    if (fav.favorite.includes(_id)) return {
      result: ResBody({
        outputs: [SimpleText('이미 즐겨찾기에 추가되어있습니다!😵')],
        quickReplies: [showQuick]
      }),
      success: true
    };
  }
  UserModel.findOneAndUpdate({ botUserKey },
    { '$addToSet': { favorite: _id } },
    { 'new': true, 'upsert': true },
    (err: any, doc: { favorite: any; }) => {
      console.log('[favorite_add] pushed after:', doc.favorite);
      if (err) return { success: true, result: ErrRes };
    }
  );
  console.log('=======================');
  return {
    result: ResBody({
      outputs: [SimpleText('즐겨찾기에 추가되었습니다!😚')],
      quickReplies: [showQuick]
    }),
    success: true
  };
}

/**
 * @description 즐쳐찾기 삭제
 * @param botUserKey user의 id(botUserKey)
 * @param _id 삭제하고자 하는 호국영령의 _id
 */
export async function favorite_del(botUserKey: String, _id1: String): ServiceResult<'FAVORITE/ADD', Object> {
  console.log('=======================');
  const _id = <ObjectId><unknown>_id1;
  console.log('[favorite_del] param botUserKey:', botUserKey);
  console.log('[favorite_del] param _id:', _id);
  const res = await checkPatrtc(_id);
  if (!res) return { success: true, result: ErrRes };
  console.log('1111111');
  getUser(botUserKey)
    .then((user) => {
      if (!user) {
        console.log('[favorite_del] 범인2');
        return { success: true, result: ErrRes };
      }
      else {
        console.log('2222222');
        console.log('[favorite_del] pushed before:', user.favorite);
      }
    });
  UserModel.findOneAndUpdate({ botUserKey },
    { '$pull': { favorite: _id } },
    { 'new': true, 'upsert': true },
    (err: any, doc: { favorite: any; }) => {
      console.log('[favorite_add] pushed after:', doc.favorite);
      if (err) return { success: true, result: ErrRes };
    }
  );
  console.log('=======================');
  return {
    result: ResBody({
      outputs: [SimpleText('즐겨찾기에서 삭제되었습니다!😟')],
      quickReplies: [showQuick]
    }),
    success: true
  };
}