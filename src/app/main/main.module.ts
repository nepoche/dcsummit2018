import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpModule } from '@angular/http';

import { MainComponent } from './main.component';
import { BillComponent } from './bill/bill.component';
import { LegislationService } from '../shared/services/legislation.service';

const MainRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'bill/:id', component: BillComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(MainRoutes)
  ],
  declarations: [ MainComponent, BillComponent ],
  providers: [ LegislationService, BillComponent ]
})
export class MainModule { }
