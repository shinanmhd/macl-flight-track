import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { RouteReuseStrategy } from '@angular/router';
import { StorageServiceService } from '../_services/storage-service.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, StorageServiceService],
})
export class TabsPageModule {}
