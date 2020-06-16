import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
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

  constructor() {
  }

  ngOnInit(): void {
  }

}
