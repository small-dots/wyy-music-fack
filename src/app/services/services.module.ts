import {InjectionToken, NgModule} from '@angular/core';

/**
 * http 服务模块
 */

// 将 httpL//localhost:3030 提取出去
export const API_CONFIG = new InjectionToken('ApijectionToken');

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    // 提供一个令牌和令牌的值，值可以是字符串、对象。。。
    {provide: API_CONFIG, useValue: 'http://localhost:3000/'}
  ]
})
export class ServicesModule {
}
