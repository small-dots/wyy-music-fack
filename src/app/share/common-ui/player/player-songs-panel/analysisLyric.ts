// 解析歌词
import {Lyric, LyricArr} from '../../../../services/date-types/commenTypes';
import {from, zip} from 'rxjs';
import {skip} from 'rxjs/operators';

// [00:34.940]  [00:34] [0:34]
// const timeExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
// const timeExp = /\[(\d{2}):(\d{2})(\.\d{2,3})?\]/;
const timeExp = /\[(\d{1,2}):(\d{2})(?:\.(\d{2,3}))?\]/; // 匹配歌词的正则

export interface BaseLyricLine {
  txt: string;
  txtCn: string;
}

interface LyricLine extends BaseLyricLine {
  time: number;
}

export class AnalysisLyric {
  private lrc: Lyric;
  lyricArr: LyricArr[] = [];

  constructor(lrc: Lyric) {
    this.lrc = lrc;
    this.init();
  }

  private init() {
    if (this.lrc.tlyric) { // 双语解析
      this.resolvDoubleLyric();
    } else { // 单语解析
      this.resolvSingleLyric();
    }
  }

  // 单语解析
  private resolvSingleLyric() {
    const arrs = this.lrc.lyric.split('\n'); // 将获取字符串歌词转化为数组
    arrs.forEach(item => this.makeArr(item));
  }

  // 双语解析
  private resolvDoubleLyric() {
    const lines = this.lrc.lyric.split('\n'); // 将获取字符串歌词转化为数组
    const tlines = this.lrc.tlyric.split('\n').filter(item => timeExp.exec(item) !== null); // 如果未匹配到时间，就删除歌词前面的部分，比如翻译人之类的

    const moreLine = lines.length - tlines.length;
    let tempArr = [];
    if (moreLine >= 0) {
      tempArr = [lines, tlines];
    } else {
      tempArr = [tlines, lines];
    }
    const first = timeExp.exec(tempArr[1][0])[0];
    console.log('first', first);

    const skipIndex = tempArr[0].findIndex(item => {
      const exec = timeExp.exec(item);
      if (exec) {
        return exec[0] === first;
      }
    });

    const _skip = skipIndex === -1 ? 0 : skipIndex;
    const skipItems = tempArr[0].slice(0, _skip);
    if (skipItems.length) {
      skipItems.forEach(line => this.makeArr(line));
    }

    let zipLines$;
    if (moreLine > 0) {
      zipLines$ = zip(from(lines).pipe(skip(_skip)), from(tlines));
    } else {
      zipLines$ = zip(from(lines), from(tlines).pipe(skip(_skip)));
    }
    zipLines$.subscribe(([line, tline]) => this.makeArr(line, tline));
  }

  private makeArr(arr: string, tline = '') {
    const result = timeExp.exec(arr); // 匹配歌词前面的时间
    console.log('result', result);
    if (result) {
      const txt = arr.replace(timeExp, '').trim(); // 去掉时间和空格
      const txtCn = tline ? tline.replace(timeExp, '').trim() : '';
      if (txt) {
        const thirdResult = result[3] || '00';
        const len = thirdResult.length;
        // tslint:disable-next-line:variable-name
        const _thirdResult = len > 2 ? parseInt(thirdResult) : parseInt(thirdResult) * 10;
        const time = Number(result[1]) * 60 * 1000 + Number(result[2]) * 1000 + _thirdResult;
        this.lyricArr.push({txt, txtCn, time});
      }
    }
  }
}
