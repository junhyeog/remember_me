import { ServiceResult, Patrtc, PName } from 'utils/types';
import { RESULT_SIZE } from 'utils/constant';
import { ResBody, BasicCard, SimpleText } from 'templates';
import { Context, QuickReply } from 'templates/types';
import BlockId from 'utils/blockId';

function parse_search_options(contexts?: Context[]) {
  let txt = '현재 설정된 옵션이 없습니다.\n';
  if (contexts) {
    const search_options = contexts.find(obj => obj.name === 'search_options');
    if (search_options && Object.entries(search_options.params).length > 0) {
      txt = '현재 설정된 옵션:\n'
      Object.entries(search_options.params).forEach(arr => {
        if (arr[0] === 'name_kor' && arr[1].value) {
          txt += '이름: ' + arr[1].value + '\n'
          // txt += '이름: ' + arr[1] + '\n'
        }
        else if (arr[0] === 'birth_year') {
          txt += '출생년: ' + arr[1].value + '\n'
          // txt += '출생년: ' + arr[1] + '\n'
        }
        else if (arr[0] === 'birth_month') {
          txt += '출생월: ' + arr[1].value + '\n'
          // txt += '출생월: ' + arr[1] + '\n'
        }
        else if (arr[0] === 'birth_day') {
          // txt += '출생일: ' + arr[1] + '\n'
          txt += '출생일: ' + arr[1].value + '\n'
        }
      })
    }
  }
  return txt.slice(0, -1);
}


/**
 * @description 검색의 초기 화면
 */
export async function main():
  ServiceResult<'SEARCH/MAIN', Object> {
  const output1 = BasicCard('검색하기', '여러 옵션으로 검색할 수 있습니다.', [
    {
      label: '옵션 추가하기',
      action: 'block',
      messageText: '옵션 추가하기',
      blockId: BlockId.search_add
    }
  ]);
  const context1 = {
    name: 'search_options',
    lifeSpan: 10,
    params: {
      name_kor: '김무비',
      birth_year: '2019'
    }
  };
  return {
    result: ResBody({ outputs: [output1] }),
    // result: ResBody({ outputs: [output1], contexts: [context1] }),
    success: true
  };
}

/**
 * @description 검색 옵션 추가 블럭 - main 블럭에서 넘어옴
 */
export async function add(contexts: Context[]):
  ServiceResult<'SEARCH/ADD', Object> {
  console.log('service add', JSON.stringify(contexts));
  console.log();
  const output1 = SimpleText(parse_search_options(contexts));
  const output2 = BasicCard('옵션 추가/변경하기', '어떤 옵션을 추가/변경하시겠습니까?', [
    {
      label: '이름',
      action: 'block',
      messageText: '이름',
      blockId: BlockId.search_add_name
    },
    {
      label: '출생일자',
      action: 'block',
      messageText: '출생일자',
      blockId: '5f0ae7303e869f00019d1a52' // search_add_birth_year // TODO id 수정
    },
    {
      label: '사망일자',
      action: 'block',
      messageText: '사망일자',
      blockId: '5f0ae7303e869f00019d1a52' // search_add_birth_month // TODO id 수정
    }
  ]);
  return {
    result: ResBody({ outputs: [output1, output2], contexts }),
    success: true
  };
}

/**
 * @description 검색 옵션에 name_kor 추가 - add 블럭에서 넘어옴
 */
export async function add_name_kor(name_kor: String, contexts: Context[]):
  ServiceResult<'SEARCH/ADD_NAME_KOR', Object> {
  console.log('add name_kor param test(name_kor): ', name_kor);
  console.log();
  // 검색 옵션 수정
  let txt = '취소되었습니다.'
  if (name_kor !== '취소') {
    txt = '검색 옵션이 변경되었습니다.';
    const search_options_idx = contexts.findIndex(obj => obj.name === 'search_options');
    if (search_options_idx >= 0) {
      contexts[search_options_idx].params.name_kor = {
        value: name_kor,
        resolvedValue: name_kor,
      }
    }
    else {
      contexts.push({
        name: 'search_options',
        params: {
          name_kor: {
            value: name_kor,
            resolvedValue: name_kor,
          }
        }
      });
    }
  }
  // outputs
  const output1 = SimpleText(txt);
  const output2 = BasicCard('옵션 추가/변경하기', '어떤 옵션을 추가/변경하시겠습니까?', [
    {
      label: '옵션 추가/변경하기',
      action: 'block',
      messageText: '옵션 추가/변경하기',
      blockId: BlockId.search_add
    },
    {
      label: '검색하기',
      action: 'block',
      messageText: '검색',
      blockId: '5f0ae7303e869f00019d1a52' // search_search // TODO id 수정
    }
  ]);
  console.log('search add name_kor contexts', JSON.stringify(contexts));
  console.log();
  return {
    result: ResBody({
      outputs: [output1, output2],
      contexts
    }),
    success: true
  };
}
