import {NgModule} from '@angular/core';
import {SongListSingleComponent} from './song-list-single/song-list-single.component';
import {PlayCountPipe} from '../play-count.pipe';
import {PlayerModule} from './player/player.module';


@NgModule({
  declarations: [
    SongListSingleComponent,
    PlayCountPipe,

  ],
  imports: [
    PlayerModule
  ],
  exports: [
    SongListSingleComponent,
    PlayCountPipe,
    PlayerModule
  ]
})
export class CommonUiModule {
}
