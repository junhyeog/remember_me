import { ServiceResult, SysNumber, Patrtc, PName, OptionName } from 'utils/types';
import { RESULT_SIZE } from 'utils/constant';
import { ResBody, BasicCard, SimpleText } from 'templates';
import { Context, QuickReply, ReqContext, ClientExtra } from 'templates/types';
import BlockId from 'utils/blockId';
import { birth } from './patrtc';
import PatrtcModel from 'models/patrtc';

//? ReqContext parsing
function parseReqContexts(reqContexts?: ReqContext[]) {
  let txt = '현재 설정된 옵션:\n\n'
  if (reqContexts) {
    const search_options = reqContexts.find(obj => obj.name === 'search_options');
    if (search_options) {
      txt = '현재 설정된 옵션:\n\n'
      Object.entries(search_options.params).forEach(arr => {
        if (arr[0] === 'name_kor' && arr[1]) {
          txt += '성함: ' + arr[1].value + '\n\n'
        }
        else if (arr[0] === 'birth_year' && arr[1]) {
          txt += '출생 연도: ' + arr[1].value + '\n\n'
        }
        else if (arr[0] === 'birth_month' && arr[1]) {
          txt += '출생 월: ' + arr[1].value + '\n\n'
        }
        else if (arr[0] === 'birth_day' && arr[1]) {
          txt += '출생 일: ' + arr[1].value + '\n\n'
        }
        else if (arr[0] === 'death_year' && arr[1]) {
          txt += '사망 연도: ' + arr[1].value + '\n\n'
        }
        else if (arr[0] === 'death_month' && arr[1]) {
          txt += '사망 월: ' + arr[1].value + '\n\n'
        }
        else if (arr[0] === 'death_day' && arr[1]) {
          txt += '사망 일: ' + arr[1].value + '\n\n'
        }
      })
    }
  }
  if (txt === '현재 설정된 옵션:\n\n') {
    txt = '현재 설정된 옵션이 없습니다.\n';
  }
  return txt.slice(0, -1);
}

function parseContext(context?: Context) {
  let txt = '현재 설정된 옵션:\n\n'
  if (context) {
    Object.entries(context.params).forEach(arr => {
      if (arr[0] === 'name_kor' && arr[1]) {
        txt += '성함: ' + arr[1] + '\n\n'
      }
      else if (arr[0] === 'birth_year' && arr[1]) {
        txt += '출생 연도: ' + arr[1] + '\n\n'
      }
      else if (arr[0] === 'birth_month' && arr[1]) {
        txt += '출생 월: ' + arr[1] + '\n\n'
      }
      else if (arr[0] === 'birth_day' && arr[1]) {
        txt += '출생 일: ' + arr[1] + '\n\n'
      }
      else if (arr[0] === 'death_year' && arr[1]) {
        txt += '사망 연도: ' + arr[1] + '\n\n'
      }
      else if (arr[0] === 'death_month' && arr[1]) {
        txt += '사망 월: ' + arr[1] + '\n\n'
      }
      else if (arr[0] === 'death_day' && arr[1]) {
        txt += '사망 일: ' + arr[1] + '\n\n'
      }
    })
  }
  if (txt === '현재 설정된 옵션:\n\n') {
    txt = '현재 설정된 옵션이 없습니다.\n';
  }
  return txt.slice(0, -1);
}

function reqContextsToContext(reqContexts: ReqContext[]) {
  const search_options = reqContexts.find(obj => obj.name === 'search_options');
  if (!search_options) return undefined;
  const context: Context = {
    name: 'search_options',
    lifeSpan: 1,
    params: {
      name_kor: search_options.params.name_kor?.value,
      //
      birth_year: search_options.params.birth_year?.value ? Number(search_options.params.birth_year.value) : undefined,
      birth_month: search_options.params.birth_month?.value ? Number(search_options.params.birth_month.value) : undefined,
      birth_day: search_options.params.birth_day?.value ? Number(search_options.params.birth_day.value) : undefined,
      //
      death_year: search_options.params.death_year?.value ? Number(search_options.params.death_year.value) : undefined,
      death_month: search_options.params.death_month?.value ? Number(search_options.params.death_month.value) : undefined,
      death_day: search_options.params.death_day?.value ? Number(search_options.params.death_day.value) : undefined,
    }
  }
  return context;
}

//? services
/**
 * @description 검색의 초기 화면
 */
export async function main(): ServiceResult<'SEARCH/MAIN', Object> {
  const output1 = BasicCard('검색하기', '여러 옵션으로 검색할 수 있습니다.', [
    {
      label: '옵션 추가하기',
      action: 'block',
      messageText: '옵션 추가하기',
      blockId: BlockId.search_add
    }
  ]);
  return {
    result: ResBody({ outputs: [output1] }),
    success: true
  };
}

/**
 * @description 검색 옵션 추가 블럭 - main 블럭에서 넘어옴
 */
export async function add(reqContext: ReqContext[]): ServiceResult<'SEARCH/ADD', Object> {
  console.log('service add parmas test (contexts)', parseReqContexts(reqContext));
  console.log();
  const output1 = SimpleText(parseReqContexts(reqContext));
  const output2 = BasicCard('옵션 추가/변경하기', '어떤 옵션을 추가/변경하시겠습니까?', [
    {
      label: '성함',
      action: 'block',
      messageText: '성함',
      blockId: BlockId.search_add_name_kor
    },
    {
      label: '출생 일자',
      action: 'block',
      messageText: '출생 일자',
      blockId: BlockId.search_add_birth
    },
    {
      label: '사망 일자',
      action: 'block',
      messageText: '사망 일자',
      blockId: BlockId.search_add_death
    }
  ]);
  return {
    result: ResBody({ outputs: [output1, output2] }),
    success: true
  };
}

/**
 * @description 검색 옵션에 추가할 birth 옵션 선택 - add 블럭에서 넘어옴
 */
export async function add_birth(reqContexts: ReqContext[]): ServiceResult<'SEARCH/ADD_BIRTH', Object> {
  // console.log('[add_birth] param test(contexts): ', reqContexts);
  // console.log();
  const output1 = SimpleText(parseReqContexts(reqContexts));
  const output2 = BasicCard('출생 정보로 검색하기', '어떤 옵션을 추가/변경하시겠습니까?', [
    {
      label: '출생 연도',
      action: 'block',
      messageText: '출생 연도',
      blockId: BlockId.search_add_birth_year
    },
    {
      label: '출생 월',
      action: 'block',
      messageText: '출생 월',
      blockId: BlockId.search_add_birth_month
    },
    {
      label: '출생 일',
      action: 'block',
      messageText: '출생 일',
      blockId: BlockId.search_add_birth_day
    },
  ]);
  return {
    result: ResBody({
      outputs: [output1, output2],
    }),
    success: true
  };
}

/**
 * @description 검색 옵션에 추가할 death 옵션 선택 - add 블럭에서 넘어옴
 */
export async function add_death(reqContexts: ReqContext[]): ServiceResult<'SEARCH/ADD_DEATH', Object> {
  // console.log('[add_death] param test(contexts): ', reqContexts);
  // console.log();
  const output1 = SimpleText(parseReqContexts(reqContexts));
  const output2 = BasicCard('사망 정보로 검색하기', '어떤 옵션을 추가/변경하시겠습니까?', [
    {
      label: '사망 연도',
      action: 'block',
      messageText: '사망 연도',
      blockId: BlockId.search_add_death_year
    },
    {
      label: '사망 월',
      action: 'block',
      messageText: '사망 월',
      blockId: BlockId.search_add_death_month
    },
    {
      label: '사망 일',
      action: 'block',
      messageText: '사망 일',
      blockId: BlockId.search_add_death_day
    },
  ]);
  return {
    result: ResBody({
      outputs: [output1, output2],
    }),
    success: true
  };
}

/**
 * @description 검색 옵션 추가 - add, add_birth, add_death 블럭에서 넘어옴
 */
export async function add_option(option: OptionName, val: SysNumber | String, reqContexts: ReqContext[]): ServiceResult<'SEARCH/ADD_OPTION', Object> {
  // console.log();
  // console.log('====================================================');
  // console.log('[add_option] param test (option): ', option);
  // console.log('[add_option] param test (val): ', val);
  // console.log('[add_option] param test (reqContexts): /n', reqContexts);
  // console.log('[add_option] parse test (newContext): /n', JSON.stringify(reqContextsToContext(reqContexts)));
  // console.log('====================================================');
  // console.log();
  //? name_kor 업데이트
  let newContext = reqContextsToContext(reqContexts)
  if (option === 'name_kor' && typeof val === 'string') {
    if (newContext) {
      newContext.params.name_kor = val;
    }
    else {
      newContext = {
        name: 'search_options',
        lifeSpan: 1,
        params: {
          name_kor: val
        }
      }
    }
  }
  //? 날짜 옵션 업데이트
  if (option !== 'name_kor') {
    if (newContext) {
      console.log()
      console.log('!!! 이전', JSON.stringify(newContext), JSON.stringify(val))
      console.log()

      newContext.params[option] = (<SysNumber>val).amount;

      console.log('!!! 이후', JSON.stringify(newContext), JSON.stringify(val))
      console.log()

    }
    else {
      newContext = {
        name: 'search_options',
        lifeSpan: 1,
        params: {
          [option]: (<SysNumber>val).amount
        }
      }
    }
  }
  // output
  const output1 = SimpleText('변경 후 context\n\n' + JSON.stringify(newContext));
  const output2 = SimpleText('변경 후 context\n\n' + parseContext(newContext));
  const output3 = BasicCard('옵션 추가/변경하기', '어떤 옵션을 추가/변경하시겠습니까?', [
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
      blockId: BlockId.search_result_main
    }
  ]);
  return {
    result: ResBody({
      outputs: [output1, output2, output3],
      contexts: newContext ? [newContext] : undefined
    }),
    success: true
  };
}

//! Result Services

/**
 * @description 검색 결과 반환
 * @param contexts 검색 옵션
 * @param clientExtra 페이지 정보를 String 형식으로 저장
 */
export async function result_main(reqContexts: ReqContext[], clientExtra?: ClientExtra): ServiceResult<'SEARCH/RESULT_MAIN', Object> {
  // console.log();
  // console.log('[result_main] param test (reqContexts): ', reqContexts);
  // console.log('[result_main] param test (clientExtra): ', clientExtra);
  // console.log();
  //* page 설정
  let page = 0;
  if (clientExtra?.page) {
    page = Number(clientExtra.page);
  }
  //? DB 접근
  const context = reqContextsToContext(reqContexts)
  let query = PatrtcModel.find();
  if (context) {
    if (context.params.name_kor) {
      query = query.find({ name_kor: context.params.name_kor });
    }
    if (context.params.birth_year) {
      query = query.find({ birth_year: context.params.birth_year });
    }
    if (context.params.birth_month) {
      query = query.find({ birth_month: context.params.birth_month });
    }
    if (context.params.birth_day) {
      query = query.find({ birth_day: context.params.birth_day });
    }
    if (context.params.death_year) {
      query = query.find({ death_year: context.params.death_year });
    }
    if (context.params.death_month) {
      query = query.find({ death_month: context.params.death_month });
    }
    if (context.params.death_day) {
      query = query.find({ death_day: context.params.death_day });
    }
  }
  const result = await query.sort('name_kor').skip(page * RESULT_SIZE).limit(RESULT_SIZE);
  let text = '후보:\n\n';
  result.forEach((p) => {
    text += p.name_kor;
    text += '\n';
  });
  const nextQuick: QuickReply = {
    label: '다음 결과',
    action: 'block',
    messageText: '다음 결과 보기',
    blockId: BlockId.search_result_main,
    extra: {
      page: page + 1
    }
  }
  const preQuick: QuickReply = {
    label: '이전 결과',
    action: 'block',
    messageText: '이전 결과 보기',
    blockId: BlockId.search_result_main,
    extra: {
      page: page - 1
    }
  }
  const newQuery: QuickReply = {
    label: '새로 검색',
    action: 'block',
    messageText: '새로 검색',
    blockId: BlockId.search_main,
    extra: {
    }
  }
  let quickReplies: QuickReply[] = [];
  if (result.length >= RESULT_SIZE) {
    quickReplies.push(nextQuick);
  }
  if (page > 0) {
    quickReplies.push(preQuick);
  }
  quickReplies.push(newQuery);
  return {
    result: ResBody({ outputs: [SimpleText(text)], quickReplies }),
    success: true
  };
}
