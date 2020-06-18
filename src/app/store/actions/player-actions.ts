import {PlayStatus} from '../reducers/player.reducer';
import {createAction, props} from '@ngrx/store';
import {Song} from '../../services/date-types/commenTypes';
import {PlayModels} from '../../share/common-ui/player/music-player/playTypes';


/**
 * 定义播放事件
 */

// 播放状态
export const setPlaying = createAction('[player] set playing', props<{ playing: boolean }>());
// 播放列表
export const setPlayList = createAction('[player] set playList', props<{ playList: Song[] }>());
// 歌曲列表
export const setSongList = createAction('[player] set songList', props<{ songList: Song[] }>());
// 播放模式
export const setPlayModel = createAction('[player] set playModel', props<{ playModel: PlayModels }>());
// 播放索引
export const setCurrentIndex = createAction('[player] set currentIndex', props<{ currentIndex: number }>());

