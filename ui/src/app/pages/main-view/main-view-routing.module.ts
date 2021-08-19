import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './main-view.component';

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    pathMatch: 'full',
  },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainViewRoutingModule { }
