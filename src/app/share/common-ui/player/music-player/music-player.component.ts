import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppStoreModule} from '../../../../store/store.module';
import {getCurrentIndex, getCurrentSong, getPlayList, getPlayModel, getSongList} from '../../../../store/slector/player.select';
import {Song} from '../../../../services/date-types/commenTypes';
import {PlayModels} from './playTypes';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.less']
})
/**
 * 播放器组件
 */
export class MusicPlayerComponent implements OnInit {
  sliderValue = 35; // 实际的进度条

  bufferPercent = 89; // 缓冲的进度条

  songList: Song[];
  playList: Song[];
  currentIndex: number;
  currentSong: Song;

  constructor(
    // 此处监听下播放事件
    private store$: Store<AppStoreModule>
  ) {
    const appStore = this.store$.pipe(select('player'));
    const statusArr = [
      {
        type: getSongList,
        callback: list => this.watchList(list, 'songList')
      },
      {
        type: getPlayList,
        callback: list => this.watchList(list, 'playList')
      },
      {
        type: getCurrentIndex,
        callback: index => this.watchCurrentIndex(index)
      },
      {
        type: getPlayModel,
        callback: mode => this.watchPlayModel(mode)
      },
      {
        type: getCurrentSong,
        callback: song => this.watchCurrentSong(song)
      }
    ];
    // 因为可以要监听五个事件，就写一个数组，然后循环监听就好
    statusArr.forEach(item => {
      appStore.pipe(select(item.type)).subscribe(item.callback);
    });
  }


  ngOnInit(): void {
  }

  watchList(list: Song[], type: string) {
    this[type] = list;
    console.log('list:', list);
  }

  watchCurrentIndex(index: number) {
    this.currentIndex = index;
    console.log('index', index);
  }

  watchPlayModel(mode: PlayModels) {
    console.log(mode);
  }

  watchCurrentSong(song: Song) {
    this.currentSong = song;
    console.log('this.currentSong', this.currentSong);
  }
}
