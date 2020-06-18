import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {playerReducer} from './reducers/player.reducer';
import {StoreDevtools, StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({player: playerReducer}, {
      // 用于检查以下动作是否合规
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 20, // 只记录20条数据
      logOnly: environment.production // 是否只打印日志(如果是生产环境的话，只打印日志，如果是开发环境的话就全输出)
    })
  ]
})
export class AppStoreModule {
}
