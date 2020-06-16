import {NgModule} from '@angular/core';
import {SongListSingleComponent} from './song-list-single/song-list-single.component';
import {PlayCountPipe} from '../play-count.pipe';


@NgModule({
  declarations: [
    SongListSingleComponent,
    PlayCountPipe

  ],
  imports: [],
  exports: [
    SongListSingleComponent,
    PlayCountPipe
  ]
})
export class CommonUiModule {
}
