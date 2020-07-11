import { ServiceResult, Patrtc, PName } from 'utils/types';
import PatrtcModel from 'models/patrtc';
import { RESULT_SIZE } from 'utils/constant';
import { Date } from 'utils/types';

/**
 * @description 생년월일에 해당하는 호국선열들을 simpleText로 반환
 * @param birth_year 생년
 * @param birth_month 생월
 * @param birth_day 생일
 */
export async function birth(birth: Date):
  ServiceResult<String, String> {
  let query = PatrtcModel.find({ birth_year: birth.year });
  if (birth.month) {
    query = query.find({ birth_month: birth.month });
  }
  if (birth.month) {
    query = query.find({ birth_day: birth.day });
  }
  const result = await query.sort('name_kor').limit(RESULT_SIZE);
  let text = '후보:\n\n';
  result.forEach((p) => {
    text += p.name_kor;
    text += '\n';
  });
  return {
    result: text,
    success: true
  };
}
