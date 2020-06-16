import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API_CONFIG} from './services.module';
import {from, Observable} from 'rxjs';
import {SettleSingers} from './date-types/commenTypes';
import {map} from 'rxjs/operators';
import queryString from 'query-string';

// 定义参数类型
class SingParms {
  offset: number;
  limit: number;
  cat?: string;
}

// 定义默认参数
const defaultParams: SingParms = {
  offset: 0,
  limit: 9,
  cat: '5001'
};

@Injectable({
  providedIn: 'root'
})
// 歌手的服务;

export class SingerServiceService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private url: string
  ) {
  }

  /**
   * 获取入驻歌手信息
   */
  getSettleInSingers(args: SingParms = defaultParams): Observable<SettleSingers[]> {
    const params = new HttpParams({fromString: queryString.stringify(args)});
    return this.http.get(this.url + 'artist/list', {params}).pipe(
      map((res: { artists: SettleSingers[] }) => res.artists)
    );
  }
}
