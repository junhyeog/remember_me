import { ServiceResult, Patrtc, PName } from 'utils/types';
import PatrtcModel from 'models/patrtc';
import { RESULT_SIZE } from 'utils/constant';
import { Date } from 'utils/types';
import { ResBody, SimpleText } from 'templates';


/**
 * @description 검색의 초기 화면
 */
export async function main():
  ServiceResult<'SEARCH/MAIN', Object> {
  const output1 = SimpleText('여러 옵션으로 검색할 수 있습니다.', [
    {
      label: '옵션 추가하기',
      action: 'block',
      messageText: '옵션 추가하기',
      blockId: '5f0ae7303e869f00019d1a52' // search_add
    }
  ]);
  const context1 = {
    name: 'search_options',
    lifeSpan: 10,
    params: {
      name_kor: '김무비'
    }
  };
  return {
    result: ResBody([output1], [context1]),
    success: true
  };
}


