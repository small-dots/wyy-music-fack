import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SongSheet} from '../../../services/date-types/commenTypes';

@Component({
  selector: 'app-song-list-single',
  templateUrl: './song-list-single.component.html',
  styleUrls: ['./song-list-single.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// 歌单的卡片展示
export class SongListSingleComponent implements OnInit {
  @Input() songInfo: SongSheet; // 从父页面 循环获取歌单 的信息
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onPlay = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * 点击播放小按钮，将歌单的id传出去
   */
  playSheetList(id: number) {
    this.onPlay.emit(id);
  }
}
