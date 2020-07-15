import { Context, QuickReply } from './types';

type ResBodyProps = {
  outputs: Object[];
  quickReplies?: QuickReply[];
  contexts?: Context[];
}

export default function ResBody(props: ResBodyProps) {
  const res = {
    version: '2.0',
    template: {
      outputs: props.outputs,
      quickReplies: props.quickReplies
    },
    context: props.contexts ? {
      values: props.contexts
    } : undefined
  };
  return res;
}
