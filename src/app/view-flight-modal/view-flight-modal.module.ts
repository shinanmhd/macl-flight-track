import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFlightModalPageRoutingModule } from './view-flight-modal-routing.module';

import { ViewFlightModalPage } from './view-flight-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFlightModalPageRoutingModule
  ],
  declarations: [ViewFlightModalPage]
})
export class ViewFlightModalPageModule {}
