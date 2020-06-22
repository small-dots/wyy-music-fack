import {Component, Input, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChildren, QueryList} from '@angular/core';
import {SettleSingers, Song} from '../../../../services/date-types/commenTypes';
import {Store} from '@ngrx/store';
import {AppStoreModule} from '../../../../store/store.module';
import {setCurrentIndex} from '../../../../store/actions/player-actions';
import {ScrollComponent} from '../scroll/scroll.component';
import {SongServiceService} from '../../../../services/song-service.service';
import {AnalysisLyric, BaseLyricLine} from './analysisLyric';

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
  // @Input() currentIndex: number;
  currentIndex: number; // 当前正在播放的歌曲的index
  @Input() show: boolean; // 是否显示 面板
  @Output() closePanel = new EventEmitter<void>();
  @ViewChildren(ScrollComponent) private scroll: QueryList<ScrollComponent>;
  songer: SettleSingers[];
  scrolly = 0;
  currentLyric: BaseLyricLine[];

  constructor(
    private store$: Store<AppStoreModule>,
    private songServe: SongServiceService
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
        this.scroll.last.refreshScroll(); // 刷新第二个组件也就是歌词面板以实现歌词发额滚动
        setTimeout(() => {
          if (this.currentSong) {
            this.scrollToCurrent();
          }
        }, 80);
      }
    }
    // 监听当前的歌曲是否发生了变化;
    if (changes.currentSong) {
      if (this.currentSong) {
        this.currentIndex = this.songList.findIndex((item) => item.id === this.currentSong.id);
        this.getAndUpdateLyric();
        if (this.show) { // 如果当前歌曲发生了变化，且歌曲面板是展开的
          this.scrollToCurrent(); // 就执行scrollToCurrent方法，实现当前歌曲可以展示在面板的可视区
        }
      } else {

      }
    }
  }


  // 点击歌曲列表实现播放
  changeCurrent(index: number) {
    this.store$.dispatch(setCurrentIndex({currentIndex: index}));
  }


  private scrollToCurrent() {
    // 获取滚动组件下的全部的li列表
    const songListRef = this.scroll.first.el.nativeElement.querySelectorAll('ul li');
    if (songListRef.length) {
      const currentLi = <HTMLElement> songListRef[this.currentIndex | 0]; // 当前需要滚动的li
      const currentTop = currentLi.offsetTop;
      console.log('11', this.scrolly);
      console.log('surrentTop', currentLi);
      // 当
      if (((currentTop - Math.abs(this.scrolly)) > currentLi.offsetHeight * 4) || (currentTop < Math.abs(this.scrolly))) {
        this.scroll.first.scrollToElement(currentLi, 300, false, false);
      }
    }
  }

  /**
   * 获取歌词、更新歌词
   */
  private getAndUpdateLyric() {
    this.songServe.getLyric(this.currentSong.id).subscribe(res => {
      // console.log('res', res);
      const lyric = new AnalysisLyric(res); // 解析从数据源直接获取的歌词
      this.currentLyric = lyric.lyricArr;
    });
  }
}
