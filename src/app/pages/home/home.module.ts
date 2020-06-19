import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home/home.component';
import {ShareModule} from '../../share/share.module';
import {WyyCarouselComponent} from './components/wyy-carousel/wyy-carousel.component';
import {MemberCardComponent} from './components/member-card/member-card.component';

@NgModule({
  declarations: [
    HomeComponent,
    WyyCarouselComponent,
    MemberCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShareModule,
  ]
})
export class HomeModule {
}
