import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HomeServiceService} from '../../../services/home-service.service';
import {Banner, HotTags, SettleSingers, SongSheet} from '../../../services/date-types/commenTypes';
import {NzCarouselComponent} from 'ng-zorro-antd';
import {SingerServiceService} from '../../../services/singer-service.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {SheetServiceService} from '../../../services/sheet-service.service';
import {Store} from '@ngrx/store';
import {AppStoreModule} from '../../../store/store.module';
import {BatchActionsService} from '../../../store/batch-actions.service';
import {setCurrentIndex, setPlayList, setSongList} from '../../../store/actions/player-actions';
import {toRandom} from '../../../share/utils/inArray';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public banner: Banner[] = []; // 轮播图数组
  public hotTags: HotTags[] = []; // 热门标签数组
  public songSheetList: SongSheet[]; // 热门的歌单数组
  public activeIndex = 0; // 面板的id
  public singsList: SettleSingers[] = []; // 歌手数据
  @ViewChild(NzCarouselComponent) private carousel: NzCarouselComponent;

  constructor(
    private homeService: HomeServiceService,
    private singerService: SingerServiceService,
    private songSheetService: SheetServiceService,
    private route: ActivatedRoute,
    private store$: Store<AppStoreModule>,
    private batchActions: BatchActionsService
  ) {
  }

  ngOnInit(): void {
    // 引入 resolver 路由守卫  无需管数据的来源，等数据全部加载后，再去渲染DOM -->不会出现空白页面;
    this.route.data.pipe(map(res => res.homeDates))
      .subscribe(([banner, hotTags, songSheetList, singsList]) => {
          this.banner = banner;
          this.hotTags = hotTags;
          this.songSheetList = songSheetList;
          console.log('this.songSheetList', this.songSheetList);
          this.singsList = singsList;
        }
      );
  }

  /**
   * 获取网易云音乐轮播图资源
   */
  private getbanners() {
    this.homeService.getbanners().subscribe(res => {
      this.banner = res;
    });
  }

  /**
   * 获取热门的歌单分类标签
   */
  private getHotTags() {
    this.homeService.getHotTags().subscribe(res => {
      this.hotTags = res;
    });
  }

  /**
   * 获取热门歌单列表
   */
  private getHotSongList() {
    this.homeService.getHotSongList().subscribe((res) => {
      this.songSheetList = res;
    });
  }

  /**
   * 切换面板的回调 获取每个面板在切换时的 id
   * @param to  面板的id
   */
  nzBeforeChange({to}) {
    this.activeIndex = to;
  }

  /**
   * 获取子组件（轮播）左右箭头的参数
   * @param type 轮播流向参数 pre--- 向前 next---向后
   */
  carouselChange(type: 'pre' | 'next') {
    this.carousel[type]();
  }

  /**
   * 获取歌手信息
   */
  getSettleInSingers() {
    this.singerService.getSettleInSingers().subscribe(res => {
      this.singsList = res;
    });
  }

  /**
   * 收集歌单的id
   */
  playSheetList(id: number) {
    console.log('id', id);
    console.log('哈棍节区欧赔')
    this.songSheetService.playSongs(id).subscribe(list => {
      // this.batchActions.selectPlayList({list, index: 0});
      this.store$.dispatch(setSongList({songList: list}));
      let trueIndex = 0;
      let trueList = list.slice();
      // if (this.playerState.playModel.type === 'random') {
      //   trueList = toRandom(list || []);
      //   trueIndex = trueList.findIndex(item => item.id === list[trueIndex].id);
      // }
      this.store$.dispatch(setPlayList({playList: trueList}));
      this.store$.dispatch(setCurrentIndex({currentIndex: trueIndex})); // 默认播放第一首歌曲
    });
  }
}
