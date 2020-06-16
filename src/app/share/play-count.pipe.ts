import {Pipe, PipeTransform} from '@angular/core';

/**
 * 对整个项目的播放量做处理的管道，如果播放量大于一万，显示为 **万，如果小一万，原数显示
 */
@Pipe({
  name: 'playCount'
})
export class PlayCountPipe implements PipeTransform {

  transform(value: number): number | string {
    if (value < 10000) {
      return value;
    } else {
      return Math.floor(value / 10000) + '万';
    }
  }
}
