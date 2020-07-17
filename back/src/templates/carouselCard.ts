import { BasicCard, Carousel, CarouselHeader } from './types';
export default function carouselCard(items: BasicCard[], header?: CarouselHeader) {
  const carousel: Carousel = {
    type: 'basicCard',
    items
  };
  if (header) {
    carousel['header'] = header;
  }
  return { carousel };
}
