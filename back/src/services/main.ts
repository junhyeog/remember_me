import { ServiceResult } from 'utils/types';
import { RESULT_SIZE } from 'utils/constant';
import { ResBody, SimpleText, CarouselCard } from 'templates';
import { QuickReply, ClientExtra } from 'templates/types';
import BlockId from 'utils/blockId';
import PatrtcModel from 'models/patrtc';
import ImgUrl from 'utils/imgUrl';
import { resultsToOutputs } from 'utils/result';

const quickReplies: QuickReply[] = [
  {
    label: '오늘의 호국영령📅',
    action: 'block',
    messageText: '오늘의 호국영령',
    blockId: BlockId.main_today,
  },
  {
    label: '검색🔍',
    action: 'block',
    messageText: '검색',
    blockId: BlockId.search_add,
  },
  {
    label: '즐겨찾기⭐',
    action: 'block',
    messageText: '즐겨찾기',
    blockId: BlockId.user_favorite_get,
  },
  // { //TODO
  //   label: '내 정보🌱',
  //   action: 'block',
  //   messageText: '내 정보',
  //   blockId: BlockId.birth_equal_sub, // TODO
  // },
  {
    label: '이용 안내📋',
    action: 'block',
    messageText: '이용 안내',
    blockId: BlockId.main_info,
  },
];

/**
 * @description 홈 블럭
 */
export async function home(): ServiceResult<'MAIN/HOME', Object> {
  const output1 = SimpleText('모바일 공훈록 기억해줘🎓입니다. 무엇을 도와드릴까요?🧐');
  return {
    result: ResBody({ outputs: [output1], quickReplies }),
    success: true
  };
}

/**
 * @description 오늘의 호국영령
 * @param clientExtra 페이지 정보를 String 형식으로 저장
 */
export async function today(clientExtra?: ClientExtra): ServiceResult<'MAIN/TODAY', Object> {
  console.log();
  console.log('[today] param test (clientExtra): ', JSON.stringify(clientExtra));
  //* page 설정
  let page = 0;
  if (clientExtra?.page) {
    page = Number(clientExtra.page);
  }
  console.log('[today] page test (page): ', page);
  //? 오늘 날짜
  const today = new Date();
  //? DB 접근
  const query = PatrtcModel.find({ birth_month: today.getMonth() + 1, birth_day: today.getDate() });
  const result = await query.sort('name_kor').skip(page * RESULT_SIZE).limit(RESULT_SIZE);
  // console.log('[today] output test', JSON.stringify(resultsToOutputs(page, result)));
  console.log('=======================');
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
  const homeQuick: QuickReply = {
    label: '홈🏡',
    action: 'block',
    messageText: '홈',
    blockId: BlockId.main_home,
  };
  const quickReplies: QuickReply[] = [];
  if (page > 0) {
    quickReplies.push(preQuick);
  }
  if (result.length >= RESULT_SIZE) {
    quickReplies.push(nextQuick);
  }
  quickReplies.push(homeQuick);
  return {
    result: ResBody({ outputs: resultsToOutputs(page, result), quickReplies }),
    success: true
  };
}

/**
 * @description 이용 안내 블럭 출력
 */
export async function info(): ServiceResult<'MAIN/INFO', Object> {
  const output1 = CarouselCard([
    {
      title: '기억해줘📬란?',
      // description: '기억해줘🌷는 매일매일 대한민국을 위해 헌신한 순국선열 및 호국영령들을 기억하고 기리자는 취지로 개발된 모바일 공훈록입니다.',
      description: '매일매일 호국영령들을 기억하고 기리자는 취지로 개발된 모바일 공훈록입니다.',
      thumbnail: {
        imageUrl: ImgUrl.main_info_1
      }
    },
    {
      title: '오늘의 호국선열📅',
      // description: '기억해줘💬의 취지를 실현하고자, 오늘과 관련된 호국선열들에 관한 정보를 제공합니다.',
      description: '기억해줘💬의 취지에 맞게, 오늘과 관련된 호국선열들에 관한 정보를 제공합니다.',
      thumbnail: {
        imageUrl: ImgUrl.main_info_2
      }
    },
    {
      title: '검색🔍',
      // description: '대한민국을 위해 헌신하신 수많은 호국영령들을 그들의 성함, 출생 일자, 사망 일자 등으로 검색할 수 있습니다.',
      description: '대한민국을 위해 헌신하신 수많은 호국영령들을 검색할 수 있습니다.',
      thumbnail: {
        imageUrl: ImgUrl.main_info_3
      }
    },
    {
      title: '즐겨찾기⭐',
      // description: '임의의 호국영령을 자신만의 즐겨찾기에 등록할 수 있습니다. 꼭 기억하고자 하는 호국영령들을 잊지 않도록 즐겨찾기에 저장해보세요!',
      description: '기억하고자 하는 호국영령들을 잊지 않도록 즐겨찾기에 저장해보세요!',
      thumbnail: {
        imageUrl: ImgUrl.main_info_4
      }
    }
  ], {
    title: '이용 안내📰',
    description: '모바일 공훈록 기억해줘🌙',
    thumbnail: {
      imageUrl: ImgUrl.main_info_header
    }
  });
  return {
    result: ResBody({ outputs: [output1], quickReplies }),
    success: true
  };
}