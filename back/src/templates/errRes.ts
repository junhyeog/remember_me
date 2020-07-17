import ResBody from './resBody';
import SimpleText from './simpleText';
import { QuickReply } from './types';
import BlockId from 'utils/blockId';

const homeQuick: QuickReply = {
  label: '홈🏡',
  action: 'block',
  messageText: '홈',
  blockId: BlockId.main_home,
};

const ErrRes = ResBody({
  outputs: [SimpleText('오류가 발생했습니다.😓\n홈🏡으로 돌아간 후 다시 시도해주세요.😭')],
  quickReplies: [homeQuick]
});

export default ErrRes;
