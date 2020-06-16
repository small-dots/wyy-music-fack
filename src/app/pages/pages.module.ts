import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShareModule} from '../share/share.module';
import {HomeModule} from './home/home.module';


/**
 * 全部的页面
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShareModule,
    HomeModule
  ],
  exports: [
    HomeModule
  ]
})
export class PagesModule {
}
