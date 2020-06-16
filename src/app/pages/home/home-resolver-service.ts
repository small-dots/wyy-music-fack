import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {HomeServiceService} from '../../services/home-service.service';
import {SingerServiceService} from '../../services/singer-service.service';
import {Banner, HotTags, SettleSingers, SongSheet} from '../../services/date-types/commenTypes';
import {forkJoin, Observable} from 'rxjs';
import {first} from 'rxjs/operators';

// 返回结果是 Banner[], HotTags[], SongSheet[], SettleSingers[]几个数据的一个集合
type HomeDataType = [Banner[], HotTags[], SongSheet[], SettleSingers[]];

@Injectable({
  providedIn: 'root',
})
/**
 * 路由守卫
 */
export class HomeResolverService implements Resolve<HomeDataType> {
  constructor(
    private homeService: HomeServiceService,
    private singerService: SingerServiceService,
  ) {
  }

  resolve(): Observable<HomeDataType> {
    // 这几个函数全部加载完后返回结果
    return forkJoin(
      // 顺序和 HomeDataType 定义的 数据类型必须一样
      [
        this.homeService.getbanners(),
        this.homeService.getHotTags(),
        this.homeService.getHotSongList(),
        this.singerService.getSettleInSingers()
      ]
    ).pipe(first()); // 只取第一个数据流，后面的流不理睬
  }
}
