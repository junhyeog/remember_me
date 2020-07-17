import { BasicCard } from './types';
export default function PatrtcCard(title: String, _id: String) {
  const basicCard: BasicCard = {};
  basicCard['description'] = title;
  basicCard['buttons'] = [
    {
      label: '자세히 보기',
      action: 'webLink',
      webLinkUrl: 'http://101.101.209.71:8080/search/result/detail/' + _id
    },
    // TODO : 즐겨찾기 버튼 
  ];
  return basicCard;
}
