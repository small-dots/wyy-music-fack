// 轮播图片资源
import {Observable} from 'rxjs';

export type Banner = {
  target: number, // 图片
  url: string, // 图片地址
  imageUrl: string; // 图片地址
};

// 热门歌单标签
export type HotTags = {
  name: string; // 标签名称
  id: number; // 标签id
  postion: number; // 变迁标签的热度
};

// 歌手类型
export type SettleSingers = {
  id: number;
  albumSize: number; // 专辑数量
  name: string; // 歌手姓名
  picUrl: string; // 封面图片
};
// 歌曲类型
export type Song = {
  id: number;
  name: string;
  url: string; // 播放地址
  ar: SettleSingers[]; // 歌曲的演唱者
  al: { id: number; name: string; picUrl: string; }; // 歌曲的收录专辑
  dt: number; // 歌曲播放量
};

// 推荐歌单对象
export type SongSheet = {
  id: number; // 歌单id
  name: string; // 歌单名称
  playCount: number; // 歌单播放量
  picUrl: string; // 歌单封面图片
  tracks: Song[]; // 歌单下歌曲数据
};
// 歌曲URL类型
export type SongUrl = {
  id: number;
  url: string; // 歌曲URL
};
// DOM样式的类型
export type StyleType = {
  width?: string | null;
  height?: string | null;
  left?: string | null;
  bottom?: string | null;
};

// 鼠标或者手势事件的类型
export type SliderEventType = {
  start: string;
  move: string;
  end: string;
  filte: (e: Event) => boolean;
  pluckey: string[];
  startPlucked$?: Observable<number>;
  moveResolved$?: Observable<number>;
  end$?: Observable<Event>;
};
export type SliderValue = number | null;

// 歌词属性
export type Lyric = {
  lyric: string;
  tlyric: string;
};
// 最终展示的歌词形式数据
export type LyricArr = {
  txt: string;
  txtCn: string;
  time: number
};
