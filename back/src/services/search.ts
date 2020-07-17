import { ServiceResult, SysNumber, Patrtc, PName, OptionName } from 'utils/types';
import { RESULT_SIZE } from 'utils/constant';
import { ResBody, BasicCard, SimpleText, CarouselCard } from 'templates';
import { Context, QuickReply, ReqContext, ClientExtra } from 'templates/types';
import BlockId from 'utils/blockId';
import { birth } from './patrtc';
import PatrtcModel from 'models/patrtc';
import { Document, Schema } from 'mongoose';
import PatrtcCard from 'templates/patrtcCard';

const pens: String[] = ['🖊️', '🖋️', '✒️', '✍️', '✏️'];
const dateEmj1: String[] = ['☀️', '🌙'];
const dateEmj2: String[] = ['🌞', '🌛️️️️️'];
const dateEmj3: String[] = ['💮', '🏵️'];
const sads: String[] = ['😥', '😓', '😭', '😢', '✏️'];
const units: String[] = ['⛺', '🏕️', '🎪'];
const base_txt = '📌 검색 옵션 📌\n';
const no_option_txt = '현재 설정된 옵션이 없습니다.😓';
function randomElement(list: any[]) {
  return list[Math.floor(Math.random() * list.length)];
}

function parseReqContexts(reqContexts?: ReqContext[]) {
  let txt = base_txt;
  const emjs: String[] = randomElement([dateEmj1, dateEmj2, dateEmj3]);
  if (!reqContexts) return no_option_txt;
  const search_options = reqContexts.find(obj => obj.name === 'search_options');

  if (search_options) {
    //* name
    if (search_options.params.name_kor?.value) {
      txt += '\n' + randomElement(pens) + '성함: ' + search_options.params.name_kor.value;
    }
    //* birth
    let birth_txt = '';
    if (search_options.params.birth_year?.value) {
      birth_txt += search_options.params.birth_year.value + '년 ';
    }
    if (search_options.params.birth_month?.value) {
      birth_txt += search_options.params.birth_month.value + '월 ';
    }
    if (search_options.params.birth_day?.value) {
      birth_txt += search_options.params.birth_day.value + '일 ';
    }
    if (birth_txt.length > 0) {
      txt += '\n' + emjs[0] + '출생 일자: ' + birth_txt;
    }
    //* death
    let death_txt = '';
    if (search_options.params.death_year?.value) {
      death_txt += search_options.params.death_year.value + '년 ';
    }
    if (search_options.params.death_month?.value) {
      death_txt += search_options.params.death_month.value + '월 ';
    }
    if (search_options.params.death_day?.value) {
      death_txt += search_options.params.death_day.value + '일 ';
    }
    if (death_txt.length > 0) {
      txt += '\n' + emjs[1] + '사망 일자: ' + death_txt;
    }
  }
  if (txt === base_txt) {
    txt = no_option_txt;
  }
  return txt;
}

function parseContext(context?: Context) {
  let txt = base_txt;
  const emjs: String[] = randomElement([dateEmj1, dateEmj2, dateEmj3]);
  if (context) {
    //* name
    if (context.params.name_kor) {
      txt += '\n' + randomElement(pens) + '성함: ' + context.params.name_kor;
    }
    //* birth
    let birth_txt = '';
    if (context.params.birth_year) {
      birth_txt += context.params.birth_year + '년 ';
    }
    if (context.params.birth_month) {
      birth_txt += context.params.birth_month + '월 ';
    }
    if (context.params.birth_day) {
      birth_txt += context.params.birth_day + '일 ';
    }
    if (birth_txt.length > 0) {
      txt += '\n' + emjs[0] + '출생 일자: ' + birth_txt;
    }
    //* death
    let death_txt = '';
    if (context.params.death_year) {
      death_txt += context.params.death_year + '년 ';
    }
    if (context.params.death_month) {
      death_txt += context.params.death_month + '월 ';
    }
    if (context.params.death_day) {
      death_txt += context.params.death_day + '일 ';
    }
    if (death_txt.length > 0) {
      txt += '\n' + emjs[1] + '사망 일자: ' + death_txt;
    }
  }
  if (txt === base_txt) {
    txt = no_option_txt;
  }
  return txt;
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
  };
  return context;
}

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
  // const output1 = SimpleText(parseReqContexts(reqContext));
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
    // result: ResBody({ outputs: parseReqContexts(reqContext) !== no_option_txt ? [output1, output2] : [output2] }),
    result: ResBody({ outputs: [output2] }),
    success: true
  };
}

/**
 * @description 검색 옵션에 추가할 birth 옵션 선택 - add 블럭에서 넘어옴
 */
export async function add_birth(reqContexts: ReqContext[]): ServiceResult<'SEARCH/ADD_BIRTH', Object> {
  // console.log('[add_birth] param test(contexts): ', reqContexts);
  // console.log();
  // const output1 = SimpleText(parseReqContexts(reqContexts));
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
      outputs: [output2],
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
  // const output1 = SimpleText(parseReqContexts(reqContexts));
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
      outputs: [output2],
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
  let newContext = reqContextsToContext(reqContexts);
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
      };
    }
  }
  //? 날짜 옵션 업데이트
  if (option !== 'name_kor') {
    if (newContext) {
      // console.log();
      // console.log('!!! 이전', JSON.stringify(newContext), JSON.stringify(val));
      // console.log();

      newContext.params[option] = (<SysNumber>val).amount;

      // console.log('!!! 이후', JSON.stringify(newContext), JSON.stringify(val));
      // console.log();

    }
    else {
      newContext = {
        name: 'search_options',
        lifeSpan: 1,
        params: {
          [option]: (<SysNumber>val).amount
        }
      };
    }
  }
  // output
  const output2 = SimpleText(parseContext(newContext));
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
      outputs: [output2, output3],
      contexts: newContext ? [newContext] : undefined
    }),
    success: true
  };
}

//! Result Services
function resultToText(result: Patrtc & Document) {
  let txt = '';
  //? name, rank
  const name_txt = randomElement(pens) + ' ' + result.name_kor + '(' + result.name_chi + ') ' + result.rank;
  const emjs: String[] = randomElement([dateEmj1, dateEmj2, dateEmj3]);
  const date_txt = emjs[1] + ' ' + result.birth_year + '.' + result.birth_month + '.' + result.birth_day + '. - ' + result.death_year + '.' + result.death_month + '.' + result.death_day + '.';
  const place_txt = '🗺 ' + result.place;
  const unit_txt = randomElement(units) + ' ' + result.kind + ' ' + result.unit;
  txt += name_txt + '\n';
  txt += date_txt + '\n';
  txt += place_txt + '\n';
  txt += unit_txt;
  return txt;
}

function resultsToOutputs(page: Number, results: (Patrtc & Document)[]) {
  //? 결과가 없을 경우
  if (results.length < 1) {
    if (page === 0) return [SimpleText('검색 결과가 존재하지 않습니다.' + randomElement(sads))];
    else return [SimpleText('마지막 페이지입니다.' + randomElement(sads))];
  }
  //? 결과가 있을 경우
  return [
    CarouselCard(results.map((result) => PatrtcCard(resultToText(result), result._id)))
  ];
}


/**
 * @description 검색 결과 반환
 * @param contexts 검색 옵션
 * @param clientExtra 페이지 정보를 String 형식으로 저장
 */
export async function result_main(reqContexts: ReqContext[], clientExtra?: ClientExtra): ServiceResult<'SEARCH/RESULT_MAIN', Object> {
  console.log();
  console.log('[result_main] param test (reqContexts[0].params): ', JSON.stringify(reqContexts[0].params));
  console.log('[result_main] param test (clientExtra): ', JSON.stringify(clientExtra));
  // console.log();
  //* page 설정
  let page = 0;
  if (clientExtra?.page) {
    page = Number(clientExtra.page);
  }
  console.log('[result_main] page test (clientExtra): ', page);
  //? DB 접근
  const context = reqContextsToContext(reqContexts);
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

  // console.log('[result_main] output test', JSON.stringify(resultsToOutputs(page, result)));
  console.log('=======================');
  const nextQuick: QuickReply = {
    label: '다음 결과',
    action: 'block',
    messageText: '다음 결과 보기',
    blockId: BlockId.search_result_main,
    extra: {
      page: page + 1
    }
  };
  const preQuick: QuickReply = {
    label: '이전 결과',
    action: 'block',
    messageText: '이전 결과 보기',
    blockId: BlockId.search_result_main,
    extra: {
      page: page - 1
    }
  };
  const newQuery: QuickReply = {
    label: '새로 검색',
    action: 'block',
    messageText: '새로 검색',
    blockId: BlockId.search_main,
    extra: {
    }
  };
  const quickReplies: QuickReply[] = [];
  if (page > 0) {
    quickReplies.push(preQuick);
  }
  if (result.length >= RESULT_SIZE) {
    quickReplies.push(nextQuick);
  }
  quickReplies.push(newQuery);
  return {
    result: ResBody({ outputs: resultsToOutputs(page, result), quickReplies }),
    success: true
  };
}

/**
 * @description id로 patrtc 검색 후 detail 정보 제공
 * @param _id patrtc id
 */
export async function result_ById(_id: String): ServiceResult<'SEARCH/DETAILBYID', Object> {
  console.log();
  console.log('[result_ById] param test (_id): ', _id);
  console.log();
  try {
    const result = await PatrtcModel.find({ _id });
    if (result.length !== 1) {
      return {
        reason: 'SEARCH/DETAILBYID',
        success: false
      };
    }
    return {
      result: result[0],
      success: true
    };
  }
  catch{
    return {
      reason: 'SEARCH/DETAILBYID',
      success: false
    };


  }
}
