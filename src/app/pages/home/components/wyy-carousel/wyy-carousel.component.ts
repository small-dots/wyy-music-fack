import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
// import {ChangeDetectionStrategy} from '@angular/compiler/src/core';

@Component({
  selector: 'app-wyy-carousel',
  templateUrl: './wyy-carousel.component.html',
  styleUrls: ['./wyy-carousel.component.less'],
  // 修改变更检测策略
  // Angualr 默认：当组件发生变化时，会将挂载在他组件树上的子组件或者父组件都重新检测一遍
  // OnPush 作用：只有组件的@Input也就是输入值发生变化时，也会检测整个组件树---提升性能
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WyyCarouselComponent implements OnInit {
  @Input() activeIndex: any;
  @Output() carouselChange = new EventEmitter<string>();

  @ViewChild('dot') dotRef: TemplateRef<'pre' | 'next'>;

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * 点击 流向箭头，将参数传递给父组件
   * @param type pre--- 向前 next---向后
   */
  goTo(type: 'pre' | 'next') {
    this.carouselChange.emit(type);
  }

}
