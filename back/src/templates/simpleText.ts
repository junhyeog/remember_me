import { Button } from './types';
export default function simpleText(text: String, buttons?: Button[]) {
  return {
    simpleText: {
      text,
      buttons
    }
  };
}
