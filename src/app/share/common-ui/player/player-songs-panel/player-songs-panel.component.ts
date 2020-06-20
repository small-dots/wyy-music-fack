import {Component, Input, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChildren, QueryList} from '@angular/core';
import {SettleSingers, Song} from '../../../../services/date-types/commenTypes';
import {Store} from '@ngrx/store';
import {AppStoreModule} from '../../../../store/store.module';
import {setCurrentIndex} from '../../../../store/actions/player-actions';
import {ScrollComponent} from '../scroll/scroll.component';

@Component({
  selector: 'app-player-songs-panel',
  templateUrl: './player-songs-panel.component.html',
  styleUrls: ['./player-songs-panel.component.less']
})
/**
 * 展示歌曲列表和歌词信息的面板
 */
export class PlayerSongsPanelComponent implements OnInit, OnChanges {
  @Input() songList: Song[]; // 歌曲的列表
  @Input() currentSong: Song; // 当前播放的歌曲，用于展示歌词
  @Input() currentIndex: number;
  @Input() show: boolean; // 是否显示 面板
  @Output() closePanel = new EventEmitter<void>();
  @ViewChildren(ScrollComponent) private scroll: QueryList<ScrollComponent>;
  songer: SettleSingers[];

  constructor(
    private store$: Store<AppStoreModule>,
  ) {
  }

  ngOnInit(): void {
    // this.songer=this.songList.cur
  }

  // 监听传参的变化;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.show) {
      if (!changes.show.firstChange && this.show) {
        this.scroll.first.refreshScroll(); // 刷新呗引用的第一个组件
      }
    }
  }

  changeCurrent(index: number) {
    this.store$.dispatch(setCurrentIndex({currentIndex: index}));
  }
}
