import { SimpleText, ResBody, BasicCard } from 'templates';
import PatrtcModel from 'models/patrtc';
import { RESULT_SIZE } from 'utils/constant';
import { ServiceResult, Date, Patrtc, PName } from 'utils/types';
import BlockId from 'utils/blockId';
import { ClientExtra, QuickReply } from 'templates/types';


/**
 * @description 생년월일에 해당하는 호국선열들을 simpleText로 반환
 * @param birth : {year: Number, month: Number, day: Number}
 */
export async function birth(birth: Date, clientExtra?: ClientExtra): ServiceResult<'PATRTC/BIRTH', Object> {
  console.log('patrtc birth param test(birth): ', JSON.stringify(birth));
  console.log('patrtc birth param test(clientExtra): ', JSON.stringify(clientExtra));
  //! page 설정
  let page = 0;
  if (clientExtra?.page) {
    page = Number(clientExtra.page);
  }
  //! DB 접근
  let query = PatrtcModel.find();
  // let query = PatrtcModel.find({ birth_year: birth.year });
  if (birth.month) {
    query = query.find({ birth_month: birth.month });
  }
  if (birth.month) {
    query = query.find({ birth_day: birth.day });
  }
  const result = await query.sort('name_kor').skip(page * RESULT_SIZE).limit(RESULT_SIZE);
  let text = '후보:\n\n';
  result.forEach((p) => {
    text += p.name_kor;
    text += '\n';
  });
  console.log('patrtc birth output test(text): ', text);
  const nextQuick: QuickReply = {
    label: '다음 결과',
    action: 'block',
    messageText: '다음 결과 보기',
    blockId: BlockId.birth_equal_sub,
    extra: {
      birth: birth,
      page: page + 1
    }
  };
  const preQuick: QuickReply = {
    label: '이전 결과',
    action: 'block',
    messageText: '이전 결과 보기',
    blockId: BlockId.birth_equal_sub,
    extra: {
      birth: birth,
      page: page - 1
    }
  };
  const newQuery: QuickReply = {
    label: '새로 검색',
    action: 'block',
    messageText: '새로 검색',
    blockId: BlockId.birth_equal,
    extra: {
    }
  };
  const quickReplies: QuickReply[] = [];
  if (result.length >= RESULT_SIZE) {
    quickReplies.push(nextQuick);
  }
  if (page > 0) {
    quickReplies.push(preQuick);
  }
  // if (page <= 0 && result.length < RESULT_SIZE) {
  //   quickReplies = undefined;
  // }
  quickReplies.push(newQuery);

  return {
    result: ResBody({ outputs: [SimpleText(text)], quickReplies }),
    success: true
  };
}


/**
 * @description 이전 결과 다음 결과를 위한 블럭
 * @param clientExtra
 */
export async function birth_sub(clientExtra?: ClientExtra):
  ServiceResult<'PATRTC/BIRTH/SUB', Object> {
  // console.log('patrtc birth param test(birth): ', JSON.stringify(birth));
  console.log(' birth sub param test(clientExtra): ', JSON.stringify(clientExtra));
  console.log();
  //! page 설정
  let page = 0;
  if (clientExtra?.page) {
    page = Number(clientExtra.page);
  }
  //! birth 설정
  const birth = clientExtra?.birth;
  console.log(' birth sub test(birth): ', JSON.stringify(birth));
  console.log();
  //! DB 접근
  let query = PatrtcModel.find();
  if (birth) {
    // let query = PatrtcModel.find({ birth_year: birth.year });
    if (birth.month) {
      query = query.find({ birth_month: Number(birth.month) });
    }
    if (birth.month) {
      query = query.find({ birth_day: Number(birth.day) });
    }
  }
  const result = await query.sort('name_kor').skip(page * RESULT_SIZE).limit(RESULT_SIZE);
  let text = '후보:\n\n';
  result.forEach((p) => {
    text += p.name_kor;
    text += '\n';
  });
  console.log('patrtc birth output test(text): ', text);
  const nextQuick: QuickReply = {
    label: '다음 결과',
    action: 'block',
    messageText: '다음 결과 보기',
    blockId: BlockId.birth_equal_sub,
    extra: {
      birth: birth,
      page: page + 1
    }
  };
  const preQuick: QuickReply = {
    label: '이전 결과',
    action: 'block',
    messageText: '이전 결과 보기',
    blockId: BlockId.birth_equal_sub,
    extra: {
      birth: birth,
      page: page - 1
    }
  };
  const newQuery: QuickReply = {
    label: '새로 검색',
    action: 'block',
    messageText: '새로 검색',
    blockId: BlockId.birth_equal,
    extra: {
    }
  };
  const quickReplies: QuickReply[] = [];
  if (result.length >= RESULT_SIZE) {
    quickReplies.push(nextQuick);
  }
  if (page > 0) {
    quickReplies.push(preQuick);
  }
  quickReplies.push(newQuery);

  // if (page <= 0 && result.length < RESULT_SIZE) {
  //   quickReplies = undefined;
  // }
  console.log('birth sub quick test: ', JSON.stringify(quickReplies));
  console.log();
  return {
    result: ResBody({ outputs: [SimpleText(text)], quickReplies }),
    success: true
  };
}
