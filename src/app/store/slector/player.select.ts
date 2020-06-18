import {PlayStatus} from '../reducers/player.reducer';
import {createAction, createSelector, props} from '@ngrx/store';
import {Song} from '../../services/date-types/commenTypes';
import {PlayModels} from '../../share/common-ui/player/music-player/playTypes';
// 获取播放状态
const selectPlayStatus = (state: PlayStatus) => state;

export const getPlaying = createSelector(selectPlayStatus, (status: PlayStatus) => status.playing);
// 播放列表
export const getPlayList = createSelector(selectPlayStatus, (status: PlayStatus) => status.playList);
// 歌曲列表
export const getSongList = createSelector(selectPlayStatus, (status: PlayStatus) => status.songList);
// 播放模式
export const getPlayModel = createSelector(selectPlayStatus, (status: PlayStatus) => status.playModel);
// 播放索引
export const getCurrentIndex = createSelector(selectPlayStatus, (status: PlayStatus) => status.currentIndex);
// 当前正在播放的歌曲
export const getCurrentSong = createSelector(selectPlayStatus, ({playList, currentIndex}: PlayStatus) => playList[currentIndex]);
