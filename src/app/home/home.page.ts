import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewFlightModalPage } from '../view-flight-modal/view-flight-modal.page';
import { StorageServiceService } from '../_services/storage-service.service';
import { IFlight } from '../_interface/iflight';
import { ApiServiceService } from '../_services/api-service.service';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  flights: IFlight[] = [];
  loading: boolean = true;

  message = 'This modal example uses the modalController to present and dismiss modals.';

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiServiceService,
    private storageService: StorageServiceService
  ) { }

  ngOnInit() {
    this.apiService.getFlights().subscribe(flights => {
      this.flights = flights;
      this.loading = false;
    });
  }

  async presentModal(flight: IFlight) {
    const modal = await this.modalCtrl.create({
      component: ViewFlightModalPage,
      componentProps: {
        flight: flight
      }
    });
    await modal.present();
  }

}
