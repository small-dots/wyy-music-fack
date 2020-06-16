import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HomeResolverService} from './home-resolver-service';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent, data: {title: '发现'}, resolve: {homeDates: HomeResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    HomeResolverService
  ]
})
export class HomeRoutingModule {
}
