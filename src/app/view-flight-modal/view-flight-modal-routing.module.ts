import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFlightModalPage } from './view-flight-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFlightModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFlightModalPageRoutingModule {}
