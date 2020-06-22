import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API_CONFIG} from './services.module';
import {observable, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Lyric, Song, SongUrl} from './date-types/commenTypes';

@Injectable({
  providedIn: 'root'
})
export class SongServiceService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private url: string
  ) {
  }

  /**
   * 根据 歌单下的歌曲的id们，获取他们的播放URL
   * @param ids 歌单下的歌曲的id们
   */
  getSongsUrlById(ids: string): Observable<SongUrl[]> {
    const params = new HttpParams().set('id', ids);
    return this.http.get(this.url + 'song/url', {params}).pipe(
      map((res: { data: SongUrl[] }) => res.data)
    );
  }

  /**
   * 获取歌单下的歌曲数据
   * @param songs 歌曲数组或者单的的歌曲 （次数组不包括歌曲的播放URL），只能再次根据歌曲数组中的id获取歌曲的播放URL，通过 conact 拼装在一起
   */
  getSongList(songs: Song | Song[]): Observable<Song[]> {
    const arrSongs = Array.isArray(songs) ? songs.slice() : [songs];
    // 将歌曲列表内的,id组成字符串
    const ids = arrSongs.map(item => item.id).join(',');
    return this.getSongsUrlById(ids).pipe(map(urls =>
      this.conact(urls, arrSongs)));
  }

  // 将urls 拼接 进 歌曲数组
  conact(urls: SongUrl[], songList: Song[]): Song[] {
    const result = [];
    songList.forEach(item => {
      // tslint:disable-next-line:no-shadowed-variable
      const url = urls.find(url => url.id === item.id).url;
      if (url) {
        result.push({...item, url});
      }
    });
    return result;
  }

  private generateSongList(songs: Song[], urls: SongUrl[]): Song[] {
    const result = [];
    songs.forEach(song => {
      const url = urls.find(songUrl => songUrl.id === song.id).url;
      if (url) {
        result.push({...song, url});
      }
    });
    return result;
  }

  /**
   * 获取歌词
   */
  getLyric(id): Observable<Lyric> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(this.url + 'lyric', {params}).pipe(
      map((res: { [key: string]: { lyric: string } }) => {
        return {
          lyric: res.lrc.lyric,
          tlyric: res.tlyric.lyric
        };
      })
    );
  }
}
