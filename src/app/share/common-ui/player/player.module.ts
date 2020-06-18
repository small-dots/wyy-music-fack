import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MusicPlayerComponent} from './music-player/music-player.component';
import {MusicSlideModule} from '../music-slide/music-slide.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    MusicPlayerComponent],
    imports: [
        CommonModule,
        MusicSlideModule,
        FormsModule
    ],
  exports: [
    MusicPlayerComponent
  ]
})
export class PlayerModule {
}
