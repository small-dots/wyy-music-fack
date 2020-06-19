import {Pipe, PipeTransform} from '@angular/core';

/**
 * 格式化时间 m:s
 */
@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(time: number): unknown {
    if (time) {
      // tslint:disable-next-line:no-bitwise
      const temp = time | 0;
      // tslint:disable-next-line:no-bitwise
      const minute = temp / 60 | 0; // 分钟：总秒数除60取余数向下取整
      const seconds = (temp % 60).toString().padStart(2, '0'); // 秒：总秒数除60取余数向下取整，秒数为个位数时，前面补了0，
      return `${minute}:${seconds}`;
    } else {
      return '00:00';
    }
  }
}
