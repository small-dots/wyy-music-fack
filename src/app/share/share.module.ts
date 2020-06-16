import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonUiModule} from './common-ui/common-ui.module';

/**
 * 公共模块
 */
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    CommonUiModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    NgZorroAntdModule,
    CommonUiModule,
  ]
})

export class ShareModule {
}
