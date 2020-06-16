import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {ServicesModule} from '../services/services.module';
import {PagesModule} from '../pages/pages.module';
import {ShareModule} from '../share/share.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    PagesModule,
    ServicesModule,
    ShareModule,
    AppRoutingModule
  ],
  exports: [
    ShareModule,
    AppRoutingModule
  ]
})


export class CoreModule {
  // 当AppModule引入CoreModule时，会执行下面的代码，此时parentModule不存在，因此不会报错
  // 但是还有别的模块引用CoreModule时，就会抛错了，保证CoreModule只能被AppModule引用
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    // @SkipSelf修饰器，在检查模块式调过他自己（CoreModule），去检查引用CoreModule的父级木块，这样就避免了这段代码无线循环执行
    // @Optional 修饰器，在parentModule找不到时，给parentModule赋值一个null，就报错
    if (parentModule) {
      throw new Error('CoreModule只能被AppModule引用');
    }
  }
}
