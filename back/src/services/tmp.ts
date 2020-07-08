import { ServiceResult } from 'utils/types';

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

/**
 * @description repeat message
 */
export async function repeat(params: any):
  ServiceResult<'Author_NE', any> {
  const responseBody = {
    version: '2.0',
    template: {
      outputs: [
        {
          simpleText: {
            text: params.mes
          }
        }
      ]
    }
  };
  return {
    result: responseBody,
    success: true
  };
}

