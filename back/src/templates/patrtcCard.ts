import { BasicCard } from './types';
import BlockId from 'utils/blockId';
export default function PatrtcCard(title: String, _id: String) {
  const basicCard: BasicCard = {};
  basicCard['description'] = title;
  basicCard['buttons'] = [
    {
      label: '자세히 보기',
      action: 'webLink',
      webLinkUrl: 'http://101.101.209.71:8080/search/result/detail/' + _id
    },
    {
      label: '즐겨찾기에 추가',
      action: 'block',
      blockId: BlockId.user_favorite_add,
      extra: { _id }
    },
  ];
  return basicCard;
}

export function PatrtcCard2(title: String, _id: String) {
  const basicCard: BasicCard = {};
  basicCard['description'] = title;
  basicCard['buttons'] = [
    {
      label: '자세히 보기',
      action: 'webLink',
      webLinkUrl: 'http://101.101.209.71:8080/search/result/detail/' + _id
    },
    {
      label: '즐겨찾기에서 삭제',
      action: 'block',
      blockId: BlockId.user_favorite_del,
      extra: { _id }
    },
  ];
  return basicCard;
}
