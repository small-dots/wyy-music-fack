// 轮播图片资源
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
// 推荐歌单对象
export type SongSheet = {
  id: number; // 歌单id
  name: string; // 歌单名称
  playCount: number; // 歌单播放量
  picUrl: string; // 歌单封面图片
};

export type SettleSingers = {
  id: number;
  albumSize: number; // 专辑数量
  name: string; // 歌手姓名
  picUrl: string; // 封面图片
};
