import {
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter, forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {from, fromEvent, merge, Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, map, pluck, takeUntil, tap} from 'rxjs/operators';
import {SliderEventType, SliderValue} from '../../../services/date-types/commenTypes';
import {DOCUMENT} from '@angular/common';
import {inArray} from '../../utils/inArray';
import {getElementOffset} from './music-slider-helper';
import {getPercent, limitNumberInRange} from '../../utils/number';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-music-slider',
  templateUrl: './music-slider.component.html',
  styleUrls: ['./music-slider.component.less'],
  // 默认情况下是 encapsulation: ViewEncapsulation.Emulated（全局样式只进不出。父组件的样式不会作用于子组件的DOM）
  // None 意味着 Angular 不使用视图封装。Angular 会把 CSS 添加到全局样式中。而不会应用上前面讨论过的那些作用域规则、隔离和保护等。
  // 从本质上来说，这跟把组件的样式直接放进 HTML 是一样的。(译注：能进能出。)
  encapsulation: ViewEncapsulation.None,
// 注入TOKEN
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MusicSliderComponent),
    multi: true
  }]
})
// 音乐播放器的滑块部分 进度条
export class MusicSliderComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() vercital = false; // 是否是垂直方向的进度条
  @Input() wyMin = 0; // 滑块的最小值
  @Input() wyMax = 100; // 滑块的最小值
  @Input() bufferOffset: SliderValue = 0;
  @Output() wyOnAfterChange = new EventEmitter<SliderValue>();

  public sliderDom: HTMLDivElement;

  // 用于绑定流
  private dragStart$: Observable<number>;
  private dragMove$: Observable<number>;
  private dragEnd$: Observable<Event>;

  // 用于取消流
  // tslint:disable-next-line:variable-name
  private dragStart_: Subscription | null;
  // tslint:disable-next-line:variable-name
  private dragMove_: Subscription | null;
  // tslint:disable-next-line:variable-name
  private dragEnd_: Subscription | null;

  private isDragging = false; // 是否正在滑动

  value: SliderValue = null;
  offset: SliderValue = null;
  @ViewChild('musicSlider', {static: true}) private slider: ElementRef;

  constructor(
    // 不使用原生的document(不利于渲染)，使用angular封装的 DOCUMENT
    @Inject(DOCUMENT) private doc: Document,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.sliderDom = this.slider.nativeElement;
    this.createDragingObservable();
    this.subscribeDrag(['start']);
  }

  createDragingObservable() {
    // 定义坐标
    const coordinate = this.vercital ? 'pageY' : 'pageX';
    // PC端的鼠标事件
    const mouse: SliderEventType = {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup',
        filte: (e: MouseEvent) => e instanceof MouseEvent,
        pluckey: [coordinate],
      }
    ;
    // 移动端的手势事件
    const touch: SliderEventType = {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
      filte: (e: TouchEvent) => e instanceof TouchEvent,
      pluckey: ['touchs', '0', coordinate]
    };
    [mouse, touch].forEach(sourse => {
      const {start, move, end, filte, pluckey} = sourse;
      // 绑定开始事件
      sourse.startPlucked$ = fromEvent(this.sliderDom, start).pipe(
        filter(filte),
        tap((e: Event) => {
          e.stopPropagation();
          e.preventDefault();
        }),
        // 获取鼠标点击或者手势点击的位置
        pluck(...pluckey),
        map((postion: number) => this.closetoValue(postion))
      );
      // 绑定结束事件
      sourse.end$ = fromEvent(this.doc, end);
      // 绑定滑过事件
      sourse.moveResolved$ = fromEvent(this.doc, move).pipe(
        filter(filte),
        tap((e: Event) => {
          e.stopPropagation();
          e.preventDefault();
        }),
        // 获取鼠标点击或者手势点击的位置
        pluck(...pluckey),
        distinctUntilChanged(), // 就是说，如果获取的坐标值一直不变，就不继续向下发射流，只有值变化了，才发射，避免一直点着一个地方不放
        map((postion: number) => this.closetoValue(postion)),
        takeUntil(sourse.end$) // 以接收到end流为结束标识
      );
    });
    // 合并下订阅
    this.dragStart$ = merge(mouse.startPlucked$, touch.startPlucked$);
    this.dragMove$ = merge(mouse.moveResolved$, touch.moveResolved$);
    this.dragEnd$ = merge(mouse.end$, touch.end$);
  }

  // 将获取的鼠标的dom值转化为坐标值
  // postion/滑块的总长度===(postion-val)/(最大值-最小值)
  private closetoValue(postion: number): number {
    console.log('postion', postion); // 打印显示鼠标点击时位置是可以获取的
    // 获取滑块总长
    const sliderLength = this.getSliderLength();

    // 滑块(左, 上)端点位置
    const sliderStart = this.getSliderStartPosition();

    // 滑块当前位置 / 滑块总长
    const ratio = limitNumberInRange((postion - sliderStart) / sliderLength, 0, 1);
    const ratioTrue = this.vercital ? 1 - ratio : ratio; // 处理下垂直的比例计算问题
    return ratioTrue * (this.wyMax - this.wyMin) + this.wyMin;
  }

  private subscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if (inArray(events, 'start') && this.dragStart$) {
      this.dragStart$.subscribe(this.onDragStart.bind(this));
    }
    if (inArray(events, 'move') && this.dragMove$) {
      this.dragMove$.subscribe(this.onDragMove.bind(this));
    }
    if (inArray(events, 'end') && this.dragEnd$) {
      this.dragEnd$.subscribe(this.onDragEnd.bind(this));
    }
  }

  /**
   * 解除订阅
   */
  private unsubscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if (inArray(events, 'start') && this.dragStart_) {
      this.dragStart_.unsubscribe();
      this.dragStart_ = null;
    }

    if (inArray(events, 'move') && this.dragMove_) {
      this.dragMove_.unsubscribe();
      this.dragMove_ = null;
    }

    if (inArray(events, 'end') && this.dragEnd_) {
      this.dragEnd_.unsubscribe();
      this.dragEnd_ = null;
    }
  }

  private onDragStart(value: number) {
    this.toggleDragMoving(true);
    this.setValue(value);

  }

  private onDragMove(value: number) {
    if (this.isDragging) {
      this.setValue(value);
      this.cdr.markForCheck();
    }
  }

  private onDragEnd() {
    this.wyOnAfterChange.emit(this.value);
    this.toggleDragMoving(false);
    this.cdr.markForCheck();
  }

  /**
   * 获取滑块的最长度 或者 高度
   */
  private getSliderLength(): number {
    return this.vercital ? this.sliderDom.clientHeight : this.sliderDom.clientWidth;
  }

  /**
   * 滑块(左, 上)端点位置
   */
  private getSliderStartPosition(): number {
    const offset = getElementOffset(this.sliderDom);
    return this.vercital ? offset.top : offset.left;
  }

  /**
   * 保存下传进来的值并更新下DOM
   */
  private setValue(value: SliderValue, needCheck = false) {
    if (needCheck) {
      if (this.isDragging) {
        return;
      }
      this.value = this.formatValue(value);
      this.updateTrackAndHandles();
    } else if (!this.valuesEqual(this.value, value)) {
      this.value = value;
      this.updateTrackAndHandles();
      this.onValueChange(this.value);
    }

  }


  private formatValue(value: SliderValue): SliderValue {
    let res = value;
    if (this.assertValueValid(value)) {
      res = this.wyMin;
    } else {
      res = limitNumberInRange(value, this.wyMin, this.wyMax);
    }
    return res;
  }


  // 判断是否是NAN
  private assertValueValid(value: SliderValue): boolean {
    return isNaN(typeof value !== 'number' ? parseFloat(value) : value);
  }

  private valuesEqual(valA: SliderValue, valB: SliderValue): boolean {
    if (typeof valA !== typeof valB) {
      return false;
    }
    return valA === valB;
  }

// 将获取的百分比复制给offset传出去给子组件，更新DOM
  private updateTrackAndHandles() {
    this.offset = this.getValueToOffset(this.value);
    console.log('3234', this.offset);
    this.cdr.markForCheck();
  }

  // 将获取的位置的值转化为百分比;
  private getValueToOffset(value: SliderValue): SliderValue {
    return getPercent(this.wyMin, this.wyMax, value);
  }

  /**
   * 绑定或者解绑事件
   */
  private toggleDragMoving(movable: boolean) {
    this.isDragging = movable;
    if (movable) { // 如果正在移动,就订阅move、end事件，从而触发onDragMove、onDragEnd方法
      this.subscribeDrag(['move', 'end']);
    } else {
      this.unsubscribeDrag(['move', 'end']);
    }
  }

  private findClosestValue(position: number): number {
    // 获取滑块总长
    const sliderLength = this.getSliderLength();

    // 滑块(左, 上)端点位置
    const sliderStart = this.getSliderStartPosition();

    // 滑块当前位置 / 滑块总长
    const ratio = limitNumberInRange((position - sliderStart) / sliderLength, 0, 1);
    const ratioTrue = this.vercital ? 1 - ratio : ratio;
    return ratioTrue * (this.wyMax - this.wyMin) + this.wyMin;
  }

  private onValueChange(value: SliderValue): void {
  }

  private onTouched(): void {
  }

  // ControlValueAccessor下的几个方法实现
  writeValue(value: SliderValue): void {
    this.setValue(value, true);
  }

  registerOnChange(fn: (value: SliderValue) => void): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

// ControlValueAccessor下的几个方法实现

// 组件销毁时解除订阅
  ngOnDestroy(): void {
    this.unsubscribeDrag();
  }
}

