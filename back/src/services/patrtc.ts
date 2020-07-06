import { ServiceResult, Patrtc, PName } from 'types';
import PatrtcModel from 'models/patrtc';
import { RESULT_SIZE } from 'constant';

/**
 * @description 모든 호국선열들을 반환
 */
export async function listP():
  ServiceResult<'Patrtc_NE', { patrtcs: PName[] }> {
  const query = PatrtcModel.find();
  const result = await query.sort('name_kor').skip(2).limit(RESULT_SIZE);
  return {
    result: {
      patrtcs: result.map(p => ({
        _id: p._id,
        name_kor: p.name_kor,
        name_chi: p.name_chi,
      }))
    },
    success: true
  };
}

/**
 * @description 생년월일에 해당하는 호국선열들을 반환
 * @param birth_year 생년
 * @param birth_month 생월
 * @param birth_day 생일
 */
export async function birth(year: Number, month?: Number, day?: Number):
  ServiceResult<'Year_NE', { patrtcs: Patrtc[] }> {
  console.log(year);
  if (!year) {
    return {
      reason: 'Year_NE',
      success: false
    };
  }
  let query = PatrtcModel.find({ birth_year: year });
  if (month) {
    query = query.find({ birth_month: month });
  }
  if (month) {
    query = query.find({ birth_day: day });
  }
  const result = await query.sort('name_kor').limit(RESULT_SIZE);
  return {
    result: {
      patrtcs: result
    },
    success: true
  };
}
