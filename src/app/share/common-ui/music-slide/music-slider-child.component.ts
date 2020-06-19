import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StyleType} from '../../../services/date-types/commenTypes';

@Component({
  selector: 'app-music-slider-child',
  template: `
    <div class="wy-slider-track" [class.buffer]="wyBuffer" [ngStyle]="style"></div>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
// 音乐播放器的滑块部分
export class MusicSliderChildComponent implements OnInit, OnChanges {
  @Input() vercital = false; // 是否是垂直方向的进度条
  @Input() HCLength: number; // 垂直方向接收圆点的bottom，水平方接收left，实现实际进度
  @Input() wyBuffer = false;
  style: StyleType = {};

  constructor() {
  }

  ngOnInit(): void {
    console.log('HCLength', this.HCLength);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.HCLength) {
      if (this.vercital) { // 垂直方向
        this.style.height = this.HCLength + '%';
        this.style.left = null;
        this.style.width = null;
      } else { // 水平方向;
        this.style.width = this.HCLength + '%';
        this.style.bottom = null;
        this.style.height = null;
      }
    }
  }

}
