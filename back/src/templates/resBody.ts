import { Context, QuickReply } from './types';

type ResBodyProps = {
  outputs: Object[];
  quickReplies?: QuickReply[];
  contexts?: Context[];
}

export default function ResBody(props: ResBodyProps) {
  return {
    version: '2.0',
    template: {
      outputs: props.outputs,
      quickReplies: props.quickReplies
    },
    contexts: {
      values: props.contexts
    }
  };
}
