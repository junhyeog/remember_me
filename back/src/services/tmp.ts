import { ServiceResult } from 'types';

/**
 * @description get author
 */
export async function getAuthor():
  ServiceResult<'Author_NE', { author: String }> {
  return {
    result: {
      author: 'antemrdm'
    },
    success: true
  };
}
