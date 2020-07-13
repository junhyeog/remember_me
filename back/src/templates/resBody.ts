import { ContextValue } from './types';

export default function ResBody(outputs: Object[], contextValue?: ContextValue[]) {
  if (contextValue) {
    return {
      version: '2.0',
      template: {
        outputs
      },
      context: {
        values: contextValue
      }
    };
  }
  return {
    version: '2.0',
    template: {
      outputs
    }
  };
}
