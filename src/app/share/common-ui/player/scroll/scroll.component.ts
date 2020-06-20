import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import BScroll from '@better-scroll/core';
import {timer} from 'rxjs';
import ScrollBar from '@better-scroll/scroll-bar';
import MouseWheel from '@better-scroll/mouse-wheel';

// 静态使用
BScroll.use(ScrollBar);
BScroll.use(MouseWheel);

@Component({
  selector: 'app-scroll',
  template: `
    <div class="wy-scroll" #wrap>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`.wy-scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }`],
  encapsulation: ViewEncapsulation.None,
})
/**
 * 滚动组件
 */
export class ScrollComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('wrap') private wrapRef: ElementRef;

  private bs: BScroll;
  @Input() data: any[];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.refreshScroll();
    }
  }

  /**
   * 视图加载完成后 触发
   */
  ngAfterViewInit(): void {
    this.bs = new BScroll(this.wrapRef.nativeElement, {
      scrollbar: {
        interactive: true // 滚轮可以实现交互
      },
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300
      }
    });
  }

  private refresh() {
    this.bs.refresh();
  }

  refreshScroll() {
    timer(50).subscribe(() => {
      this.refresh();
    });
  }
}
