import {Injectable} from '@angular/core';
import {AppStoreModule} from './store.module';
import {Song} from '../services/date-types/commenTypes';
import {setCurrentIndex, setPlayList, setSongList} from './actions/player-actions';
import {Store} from '@ngrx/store';
import {toRandom} from '../share/utils/inArray';
import {PlayStatus} from './reducers/player.reducer';

@Injectable({
  providedIn: AppStoreModule
})
/**
 * 批量发起actions
 */
export class BatchActionsService {
  private playerState: PlayStatus;

  constructor(
    private store$: Store<AppStoreModule>
  ) {
  }

  /**
   * 播放列表
   */
  selectPlayList({list, index}: { list: Song[], index: number }) {
    this.store$.dispatch(setSongList({songList: list}));
    let trueIndex = index;
    let trueList = list.slice();
    if (this.playerState.playModel.type === 'random') {
      trueList = toRandom(list || []);
      trueIndex = trueList.findIndex(item => item.id === list[trueIndex].id);
    }
    this.store$.dispatch(setPlayList({playList: trueList}));
    this.store$.dispatch(setCurrentIndex({currentIndex: trueIndex})); // 默认播放第一首歌曲
  }

  /**
   * 删除歌曲
   */
  onDeleteSong(song: Song) {
    console.log('song', song);
    const songList = this.playerState.songList.slice();
    const playList = this.playerState.playList.slice();
    let currentIndex = this.playerState.currentIndex;
    const songIndex = this.playerState.songList.findIndex(item => item.id === song.id); // 找到删除的这首歌在songList中的index，删除删除
    songList.splice(songIndex, 1);

    const playIndex = this.playerState.playList.findIndex(item => item.id === song.id); // 找到删除的这首歌在songList中的index，删除删除
    songList.splice(playIndex, 1);

    if (currentIndex > playIndex || currentIndex === playList.length) {
      currentIndex--;
    }
    this.store$.dispatch(setPlayList({playList}));
    this.store$.dispatch(setSongList({songList}));
    this.store$.dispatch(setCurrentIndex({currentIndex}));
  }

  /**
   * 清空歌曲列表
   */
  onClearSong() {
    this.store$.dispatch(setPlayList({playList: []}));
    this.store$.dispatch(setSongList({songList: []}));
    this.store$.dispatch(setCurrentIndex({currentIndex: -1}));

  }

}
