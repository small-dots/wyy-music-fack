import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MusicSliderComponent} from './music-slider.component';
import {MusicSliderScheduleComponent} from './music-slider-schedule.component';
import {MusicSliderChildComponent} from './music-slider-child.component';


@NgModule({
  declarations: [
    MusicSliderComponent,
    MusicSliderScheduleComponent,
    MusicSliderChildComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MusicSliderComponent,
  ]
})
/**
 * 音乐播放器的滑块部分
 */
export class MusicSlideModule {
}
