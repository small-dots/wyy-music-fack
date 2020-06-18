import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.less']
})
/**
 * 播放器组件
 */
export class MusicPlayerComponent implements OnInit {
  sliderValue = 35; // 实际的进度条

  bufferPercent = 89; // 缓冲的进度条

  constructor() {
  }

  ngOnInit(): void {
  }

}
