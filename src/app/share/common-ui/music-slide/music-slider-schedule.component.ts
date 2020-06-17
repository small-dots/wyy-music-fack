import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-music-slider-schedule',
  template: `
    <div class="wy-slider-handle" [ngStyle]="style"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
// 音乐播放器的滑 进度条
export class MusicSliderScheduleComponent implements OnInit, OnChanges {
  @Input() vercital = false; // 是否是垂直方向的进度条
  @Input() btnLength: number; // 垂直方向接收圆点的bottom，，水平方接收left，实现实际进度
  style = {};

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // 如果进度条的偏移量发生变化，判断是哪个方向发生了变化
    if (changes['btnLength']) {
      // 如果是垂直方向发生了变化，按钮的bottm样式变化
      // 如果是水平方向发生了变化，按钮的left样式变化
      this.style[this.vercital ? 'bottom' : 'left'] = this.btnLength + '%';
    }
  }

}
