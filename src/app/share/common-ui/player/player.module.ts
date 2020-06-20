import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MusicPlayerComponent} from './music-player/music-player.component';
import {MusicSlideModule} from '../music-slide/music-slide.module';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {TimeFormatPipe} from '../../pipe/time-format.pipe';
import { PlayerSongsPanelComponent } from './player-songs-panel/player-songs-panel.component';
import { ScrollComponent } from './scroll/scroll.component';


@NgModule({
  declarations: [
    MusicPlayerComponent,
    TimeFormatPipe,
    PlayerSongsPanelComponent,
    ScrollComponent
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
