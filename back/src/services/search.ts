import { ServiceResult, SysNumber, Patrtc, PName, OptionName } from 'utils/types';
import { RESULT_SIZE } from 'utils/constant';
import { ResBody, BasicCard, SimpleText, CarouselCard } from 'templates';
import { Context, QuickReply, ReqContext, ClientExtra } from 'templates/types';
import BlockId from 'utils/blockId';
import { birth } from './patrtc';
import PatrtcModel from 'models/patrtc';
import { Document, Schema } from 'mongoose';
import PatrtcCard from 'templates/patrtcCard';
import { reqContextsToContext, parseContext, resultsToOutputs, no_option_txt, base_txt } from 'utils/result';

function optionCard(context?: Context) {
  // return BasicCard(parseContext(context), undefined, [
  //   {
  //     label: '검색하기',
  //     action: 'block',
  //     messageText: '검색',
  //     blockId: BlockId.search_result_main
  //   }
  // ]);
  const option_txt = parseContext(context);
  if (option_txt === no_option_txt) {
    return BasicCard(parseContext(context));
  }
  return BasicCard(base_txt, option_txt.slice(base_txt.length));
}

const nameCard = BasicCard('성함 정보 추가/변경하기', '성함 정보를 추가/변경하시려면 [성함]을, 현재의 검색 옵션으로 검색하시려면 [검색]을 눌러 주세요.\n\n*오른쪽 카드에서 출생 및 사망 옵션를 추가할 수 있습니다.', [
  {
    label: '성함',
    action: 'block',
    messageText: '성함',
    blockId: BlockId.search_add_name_kor
  },
  {
    label: '검색하기',
    action: 'block',
    messageText: '검색',
    blockId: BlockId.search_result_main
  }
]);
const birthCard = BasicCard('출생 정보 추가/변경하기', '어떤 옵션을 추가/변경하시겠습니까?', [
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

const deathCard = BasicCard('사망 정보 추가/변경하기', '어떤 옵션을 추가/변경하시겠습니까?', [
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
export async function addO(reqContext: ReqContext[]): ServiceResult<'SEARCH/ADD', Object> {
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
 * @description 검색 옵션 추가 블럭 - main 블럭에서 넘어옴
 */
export async function add(reqContext: ReqContext[]): ServiceResult<'SEARCH/ADD', Object> {
  return {
    result: ResBody({ outputs: [CarouselCard([optionCard(reqContextsToContext(reqContext)).basicCard, nameCard.basicCard, birthCard.basicCard, deathCard.basicCard])] }),
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
    // result: ResBody({
    //   outputs: [CarouselCard([BasicCard(parseContext(newContext), undefined, [
    //     {
    //       label: '검색하기',
    //       action: 'block',
    //       messageText: '검색',
    //       blockId: BlockId.search_result_main
    //     }
    //   ]).basicCard, output3.basicCard])],
    result: ResBody({ outputs: [CarouselCard([optionCard(newContext).basicCard, nameCard.basicCard, birthCard.basicCard, deathCard.basicCard])], contexts: newContext ? [newContext] : undefined }),
    // contexts: newContext ? [newContext] : undefined
    // }),
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
  console.log();
  console.log('[result_main] param test (reqContexts[0].params): ', JSON.stringify(reqContexts[0].params));
  console.log('[result_main] param test (clientExtra): ', JSON.stringify(clientExtra));
  // console.log();
  //* page 설정
  let page = 0;
  if (clientExtra?.page) {
    page = Number(clientExtra.page);
  }
  console.log('[result_main] page test (page): ', page);
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
    label: '새로운 검색',
    action: 'block',
    messageText: '새로운 검색',
    blockId: BlockId.search_add,
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
  if (result.length < 1) {
    return {
      result: ResBody({
        outputs: resultsToOutputs(page, result),
        contexts: [{ name: 'search_options', lifeSpan: 0, params: {} }],
        quickReplies
      }),
      success: true
    };
  }
  return {
    result: ResBody({
      outputs: resultsToOutputs(page, result),
      quickReplies
    }),
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
