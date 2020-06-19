import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MusicPlayerComponent} from './music-player/music-player.component';
import {MusicSlideModule} from '../music-slide/music-slide.module';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {TimeFormatPipe} from '../../pipe/time-format.pipe';


@NgModule({
  declarations: [
    MusicPlayerComponent,
    TimeFormatPipe
  ],
  imports: [
    CommonModule,
    MusicSlideModule,
    FormsModule,
    NgZorroAntdModule,
  ],
  exports: [
    MusicPlayerComponent,
    TimeFormatPipe
  ]
})
export class PlayerModule {
}
