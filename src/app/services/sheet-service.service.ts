import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API_CONFIG} from './services.module';
import {map, pluck, switchMap} from 'rxjs/operators';
import {Song, SongSheet} from './date-types/commenTypes';
import {Observable} from 'rxjs';
import {SongServiceService} from './song-service.service';

@Injectable({
  providedIn: 'root'
})
/**
 * 处理歌单的服务
 */
export class SheetServiceService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private url: string,
    private songService: SongServiceService
  ) {
  }

  /**
   * 获取歌单的详情
   */
  getSongSheetDetail(id: number): Observable<SongSheet[]> {
    // set接受一个字符串的参数
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(this.url + 'playlist/detail', {params}).pipe(
      map((res: { playlist: SongSheet[] }) => res.playlist)
    );
  }

  /**
   * 根据歌单id。获取歌单下的歌曲数组（次数组已经包括歌曲的播放URL）
   * @param id 歌单id
   */
  playSongs(id: number): Observable<Song[]> {
    return this.getSongSheetDetail(id).pipe(
      pluck('tracks'),
      switchMap((tracks: Song[]) => this.songService.getSongList(tracks))
    );
  }
}
