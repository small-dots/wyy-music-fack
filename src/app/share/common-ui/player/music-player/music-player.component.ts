import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppStoreModule} from '../../../../store/store.module';
import {getCurrentIndex, getCurrentSong, getPlayList, getPlayModel, getSongList} from '../../../../store/slector/player.select';
import {SettleSingers, Song} from '../../../../services/date-types/commenTypes';
import {PlayModels} from './playTypes';
import {setCurrentIndex} from '../../../../store/actions/player-actions';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.less']
})
/**
 * 播放器组件
 */
export class MusicPlayerComponent implements OnInit {
  @ViewChild('audio', {static: true}) private audio: ElementRef;
  private audioEl: HTMLAudioElement;
  sliderValue = 0; // 实际的进度条

  bufferPercent = 0; // 缓冲的进度条

  songList: Song[];
  playList: Song[];
  currentIndex: number;
  currentSong: Song;

  currtime: number; // 当前歌曲播放时间
  songtime: number; // 歌曲总时间
  songar: SettleSingers[]; // 歌曲的歌手

  playing = false; // 播放状态--是否正在播放
  songReadOnly = false; // 是否可以播放，默认不能


  constructor(
    // 此处监听下播放事件
    private store$: Store<AppStoreModule>
  ) {
    // @ts-ignore
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
    statusArr.forEach((item) => {
      // @ts-ignore
      appStore.pipe(select(item.type)).subscribe(item.callback);
    });
  }


  ngOnInit(): void {
    this.audioEl = this.audio.nativeElement;
  }

  watchList(list: Song[], type: string) {
    this[type] = list;
  }

  watchCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  watchPlayModel(mode: PlayModels) {
  }

  watchCurrentSong(song: Song) {
    if (song) {
      this.currentSong = song;
      this.songtime = song.dt / 1000;
      this.songar = song.ar;
    }
    console.log('this.currentSong', this.currentSong);
  }

// 播放器的播事件放（歌曲播放时触发）
  onCanplay() {
    this.songReadOnly = true;
    this.play();
  }

  private play() {
    this.audioEl.play();
    this.playing = true;
  }

  /**
   * 获取当前歌曲的播放时间
   */
  onTimeUpdate(e: Event) {
    this.currtime = (<HTMLAudioElement> e.target).currentTime;
    this.sliderValue = (this.currtime / this.songtime) * 100; // 歌曲播放时进度跟着前进
    const buffer = this.audioEl.buffered;
    if (buffer.length && this.bufferPercent < 100) {
      // buffer.end(0) 获取缓冲进度条的最终位置
      this.bufferPercent = (buffer.end(0) / this.songtime) * 100;
    }
  }

  /**
   * 获取歌曲的封面
   */
  get picUrl(): string {
    return this.currentSong ? this.currentSong.al.picUrl : 'https://p2.music.126.net/iy7L0RHu_mHhQ6EMLvbf0A==/109951164226850851.jpg';
  }

  /**
   * 播放或者暂停
   */
  playOrPause() {
    if (!this.currentSong) {
      if (this.playList.length) {
        this.updateIndex(0);
      }
    } else {
      if (this.songReadOnly) {
        this.playing = !this.playing;
        // 如果正在播放，则继续播放
        if (this.playing) {
          this.audioEl.play();
          // 如果状态为不在播放，则命令audio暂停播放
        } else {
          this.audioEl.pause();
        }
      }
    }
  }

  /**
   * 上一曲
   */
  prev(index) {
    if (!this.songReadOnly) {
      return;
    }

    // 如果只一首歌曲，则循环播放
    if (this.playList.length === 1) {
      this.loop();
    }
    // 如果下一曲的index等于歌曲列表长度，则播放第一首，否则播放下一首
    const newIndex = index < 0 ? this.playList.length - 1 : index;
    this.updateIndex(newIndex);
  }

  /**
   * 下一曲
   */
  next(index) {
    if (!this.songReadOnly) {
      return;
    }

    // 如果只一首歌曲，则循环播放
    if (this.playList.length === 1) {
      this.loop();
    }
    // 如果下一曲的index等于歌曲列表长度，则播放第一首，否则播放下一首
    const newIndex = index >= this.songList.length ? 0 : index;
    this.updateIndex(newIndex);
  }

  private updateIndex(index) {
    // 更新事件
    this.store$.dispatch(setCurrentIndex({currentIndex: index}));
    this.songReadOnly = false;
  }

  private loop() {
    this.audioEl.currentTime = 0;
    this.play();
  }

// 监听 当改变滑块时 返回滚动进度条的百分比 0-100
  slidePercentChange(e: number) {
    // 此处改变进度条时会改变歌曲的播放进程，但会造成卡顿的情况，所以在鼠标抬起时改变为好
    this.audioEl.currentTime = this.songtime * (e / 100);
  }
}
