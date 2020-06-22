import {PlayModels} from '../../share/common-ui/player/music-player/playTypes';
import {Song} from '../../services/date-types/commenTypes';
import {Action, createReducer, on} from '@ngrx/store';
import {
  setPlaying,
  setPlayList,
  setSongList,
  setPlayModel,
  setCurrentIndex
} from '../actions/player-actions';

// 播放器的类型
export interface PlayStatus {
  playing: boolean; // 是否正在播放
  playModel: PlayModels; // 播放模式
  songList: Song[]; // 歌曲数组
  playList: Song[]; // 播放列表
  currentIndex: number; // 当前正在播放的索引
}

// 播放器的类型的默认值
export const InitPlayStatus: PlayStatus = {
  playing: false, // 是否正在播放
  playModel: {type: 'loop', label: '循环'}, // 播放模式
  songList: [], // 歌曲数组
  playList: [], // 播放列表
  currentIndex: -1, // 当前正在播放的索引
};

const reducer = createReducer(
  InitPlayStatus,
  // 注入动作
  // 接受一个状态，设置后返回新的状态
  on(setPlaying, (status, {playing}) => ({...status, playing})),
  on(setPlayList, (status, {playList}) => ({...status, playList})),
  on(setSongList, (status, {songList}) => ({...status, songList})),
  on(setPlayModel, (status, {playModel}) => ({...status, playModel})),
  on(setCurrentIndex, (status, {currentIndex}) => ({...status, currentIndex}))
);

/**
 * playerReducer
 */
export function playerReducer(state: PlayStatus, action: Action) {
  return reducer(state, action);
}
