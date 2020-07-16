import { Button, BasicCard } from './types';
export default function BasicCard(title?: String, description?: String, buttons?: Button[]) {
  const basicCard: BasicCard = {};
  if (title) {
    basicCard['title'] = title;
  }
  if (description) {
    basicCard['description'] = description;
  }
  if (buttons) {
    basicCard['buttons'] = buttons;
  }
  return {
    basicCard
  };
}
