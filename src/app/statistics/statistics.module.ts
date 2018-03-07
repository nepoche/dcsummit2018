import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, ActivatedRoute, ParamMap } from '@angular/router';


import { StatisticsComponent } from './statistics.component';

const MainRoutes: Routes = [
  { path: 'statistics', component: StatisticsComponent }
];

@NgModule({
  imports: [
     RouterModule.forChild(MainRoutes)
  ],
  declarations: [StatisticsComponent]
})
export class StatisticsModule { }
