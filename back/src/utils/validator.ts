import { body } from 'express-validator';

// function print(val: any) {
//   console.log(val);
//   return val;
// }

/**
 * @description date plogin -> date object
 */
export const birthVal = [
  body('action.params.birth')
    .exists()
    .customSanitizer((value) => {
      return JSON.parse(value).value;
    })
    .exists()
    .matches(/\D*\d{4}\D+\d{1,2}\D+\d{1,2}\D*/)
    .customSanitizer((value) => {
      const birthInfo = value.replace(/[^0-9]+/g, ',').split(',').map((i: String) => Number(i));
      return {
        year: birthInfo[0],
        month: birthInfo[1],
        day: birthInfo[2],
      };
    })
    .exists()
];
