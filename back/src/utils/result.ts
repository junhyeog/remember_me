import { Patrtc } from 'utils/types';
import { SimpleText, CarouselCard } from 'templates';
import { Context, ReqContext } from 'templates/types';
import { Document } from 'mongoose';
import PatrtcCard, { PatrtcCard2 } from 'templates/patrtcCard';

const pens: String[] = ['🖊️', '🖋️', '✒️', '✍️', '✏️'];
const dateEmj1: String[] = ['☀️', '🌙'];
const dateEmj2: String[] = ['🌞', '🌛️️️️️'];
const dateEmj3: String[] = ['💮', '🏵️'];
const sads: String[] = ['😥', '😓', '😭', '😢', '✏️'];
const units: String[] = ['⛺', '🏕️', '🎪'];
export const base_txt = '📌 검색 옵션 📌';
export const no_option_txt = '현재 설정된 옵션이 없습니다.😓\n\n 오른쪽의 카드들을 통해 검색 옵션을 추가해보세요!😲';

function randomElement(list: any[]) {
  return list[Math.floor(Math.random() * list.length)];
}

export function reqContextsToContext(reqContexts: ReqContext[]) {
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

export function parseReqContexts(reqContexts?: ReqContext[]) {
  let txt = base_txt;
  const emjs: String[] = randomElement([dateEmj1, dateEmj2, dateEmj3]);
  if (!reqContexts) return no_option_txt;
  const search_options = reqContexts.find(obj => obj.name === 'search_options');

  if (search_options) {
    //* name
    if (search_options.params.name_kor?.value) {
      txt += '\n\n' + randomElement(pens) + ' 성함: ' + search_options.params.name_kor.value;
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
      txt += '\n\n' + emjs[0] + ' 출생 일자: ' + birth_txt;
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
      txt += '\n\n' + emjs[1] + ' 사망 일자: ' + death_txt;
    }
  }
  if (txt === base_txt) {
    txt = no_option_txt;
  }
  return txt;
}

export function parseContext(context?: Context) {
  let txt = base_txt;
  const emjs: String[] = randomElement([dateEmj1, dateEmj2, dateEmj3]);
  if (context) {
    //* name
    if (context.params.name_kor) {
      txt += '\n\n' + randomElement(pens) + ' 성함: ' + context.params.name_kor;
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
      txt += '\n\n' + emjs[0] + ' 출생 일자: ' + birth_txt;
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
      txt += '\n\n' + emjs[1] + ' 사망 일자: ' + death_txt;
    }
  }
  if (txt === base_txt) {
    txt = no_option_txt;
  }
  return txt;
}

export function resultToText(result: Patrtc & Document) {
  let txt = '';
  //? name, rank
  const name_txt = randomElement(pens) + ' ' + result.name_kor + '(' + result.name_chi + ') ' + result.rank;
  const emjs: String[] = randomElement([dateEmj1, dateEmj2, dateEmj3]);
  const date_txt = emjs[1] + ' ' + result.birth_year + '.' + result.birth_month + '.' + result.birth_day + '. - ' + result.death_year + '.' + result.death_month + '.' + result.death_day + '.';
  const place_txt = '🗺 ' + result.place;
  const unit_txt = randomElement(units) + ' ' + result.kind + ' ' + result.unit;
  txt += name_txt + '\n\n';
  txt += date_txt + '\n\n';
  txt += place_txt + '\n\n';
  txt += unit_txt;
  return txt;
}

export function resultsToOutputs(page: Number, results: (Patrtc & Document)[]) {
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

export function resultsToOutputs2(page: Number, results: (Patrtc & Document)[]) {
  //? 결과가 없을 경우
  if (results.length < 1) {
    if (page === 0) return [SimpleText('즐겨찾기가 텅 비었습니다.😨')];
    else return [SimpleText('마지막 페이지입니다.' + randomElement(sads))];
  }
  //? 결과가 있을 경우
  return [
    CarouselCard(results.map((result) => PatrtcCard2(resultToText(result), result._id)))
  ];
}

export function parseRow(row?: Patrtc) {
  let txts = [];
  const emjs: String[] = randomElement([dateEmj1, dateEmj2, dateEmj3]);
  if (row) {
    //* name
    let name_txt = '';
    if (row.name_kor) {
      name_txt += randomElement(pens) + ' 성함: ' + row.name_kor;
      if (row.name_chi) {
        name_txt += ' (' + row.name_chi + ')';
      }
    }
    if (name_txt.length > 1) {
      txts.push(name_txt);
    }
    //* birth
    let birth_txt = '';
    if (row.birth_year) {
      birth_txt += row.birth_year + '년 ';
    }
    if (row.birth_month) {
      birth_txt += row.birth_month + '월 ';
    }
    if (row.birth_day) {
      birth_txt += row.birth_day + '일 ';
    }
    if (birth_txt.length > 0) {
      txts.push(emjs[0] + ' 출생 일자: ' + birth_txt);
    }
    //* death
    let death_txt = '';
    if (row.death_year) {
      death_txt += row.death_year + '년 ';
    }
    if (row.death_month) {
      death_txt += row.death_month + '월 ';
    }
    if (row.death_day) {
      death_txt += row.death_day + '일 ';
    }
    if (death_txt.length > 0) {
      txts.push(emjs[1] + ' 사망 일자: ' + death_txt);
    }
    //* place
    if (row.place) {
      txts.push('🗺' + ' 출생지: ' + row.place);
    }
    //* 군 정보
    let kind_txt = '';
    if (row.kind) {
      kind_txt += row.kind + ' ';
    }
    if (row.unit) {
      kind_txt += row.unit + ' ';
    }
    if (kind_txt.length > 0) {
      txts.push('⛺' + ' 소속: ' + kind_txt);

    }
    if (row.rank) {
      txts.push('🎖' + ' 계급: ' + row.rank);
    }
  }
  let res = '';
  txts.forEach((s) => {
    if (s.length > 1) res += '<br><div>' + s.replace('\r\n', '') + '</div>';
  });
  return res;
}

export function parseDetail(detail: String) {
  let res = '';
  detail.split('.').forEach((s) => {
    if (s.length > 1) res += '<br><div>• ' + s.replace('\r\n', '') + '.</div>';
  });
  return res;
}
