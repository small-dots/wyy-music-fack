import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServicesModule} from './services.module';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Banner, HotTags, SongSheet} from './date-types/commenTypes';
import {map} from 'rxjs/operators';

// 首页的服务
@Injectable({
  providedIn: ServicesModule
})
export class HomeServiceService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private url: string
  ) {
  }

  /**
   * 获取网易云首页轮播图
   */
  getbanners(): Observable<Banner[]> {
    return this.http.get(this.url + 'banner').pipe(
      map((res: { banners: Banner[] }) => res.banners)
    );
  }

  /**
   * 获取热门的歌单分类标签
   */
  getHotTags(): Observable<HotTags[]> {
    return this.http.get(this.url + 'playlist/hot').pipe(
      map((res: { tags: HotTags[] }) => {
        return res.tags.sort((x: HotTags, y: HotTags) => {
          return x.postion - y.postion;
        }).slice(0, 5);
      })
    );
  }


  /**
   * 获取热门歌单列表
   */
  getHotSongList(): Observable<SongSheet[]> {
    return this.http.get(this.url + 'personalized').pipe(
      map((res: { result: SongSheet[] }) => res.result.slice(0, 16))
    );
  }
}
